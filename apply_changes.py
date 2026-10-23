#!/usr/bin/env python3
from pathlib import Path
import hashlib
import shutil
import sys

ROOT = Path.cwd()
EXPECTED_BLOBS = {
    "index.html": "185313b34badd8cdeddf176e86580dbe548162df",
    "assets/css/style.css": "8cb6eb178970f720a4f91da95a236511585d198f",
    "assets/scss/style.scss": "140d1e670ef2cd2e069a06cc615d8dd367e642bd",
}
CSS_MARKER = "/* Homepage improvements: 2026-10 */"
EXPECTED_JS_SHA256 = "1531aab60d74b1127d7a4282657ddd6ea211419e404e968c988e2acbfdf7b1cc"
SCRIPT_TAG = '<script src="assets/js/homepage-enhancements.js?v=20261023-home1"></script>'

CSS_BLOCK = r"""/* Homepage improvements: 2026-10 */
.site-header {
  position: relative;
  top: auto;
  z-index: 20;
  backdrop-filter: none;
}
.header-main { gap: clamp(12px, 1.5vw, 22px); }
.brand__logo { width: 88px; height: 88px; }
.brand__text { font-size: clamp(22px, 2vw, 30px); line-height: 1.08; }
.site-nav { gap: clamp(12px, 1.25vw, 20px); }
.site-nav a { font-size: 13px; white-space: nowrap; }
.header-link { font-size: 13px; }

.hero__painting { width: min(82%, 400px); }
.hero__painting.is-landscape { width: min(92%, 460px); }
.hero__painting img { height: auto; object-fit: contain; }

.product-card__image.is-landscape { aspect-ratio: 4 / 3; }
.product-card__image.is-landscape img {
  object-fit: contain;
  background: var(--surface-strong);
}
.category-tile.is-landscape img {
  object-fit: contain;
  background: var(--surface-strong);
}
.split-promo__visual img {
  width: min(88%, 460px);
  max-height: 300px;
  height: auto;
  object-fit: contain;
  transform: none;
}
.split-promo__visual.is-landscape img {
  width: min(96%, 520px);
  max-height: 320px;
}

.home-custom-priority { padding-block: clamp(28px, 5vw, 64px); }
.home-custom-priority .split-promo {
  border: 1px solid var(--primary);
  box-shadow: 0 16px 42px rgba(142, 30, 162, .10);
}
.home-custom-priority .split-promo__content .eyebrow {
  color: var(--primary);
  font-weight: 700;
}
.home-custom-priority .split-promo__content h2 {
  font-size: clamp(36px, 4.5vw, 54px);
}

@media (max-width: 980px) {
  .brand__logo { width: 76px; height: 76px; }
  .brand__text { font-size: clamp(22px, 2.5vw, 26px); }
  .site-nav a { font-size: 12px; }
  .header-link { font-size: 12px; }
}
@media (max-width: 760px) {
  .brand__logo { width: 54px; height: 54px; }
  .brand__text { font-size: clamp(19px, 5vw, 23px); }
  .site-nav a { font-size: 14px; }
  .header-link { font-size: 12px; }
  .split-promo__visual img { width: min(90%, 420px); max-height: 280px; }
}
@media (max-width: 380px) {
  .header-link { font-size: 11px; }
}
/* End homepage improvements */
"""

def git_blob_sha(data: bytes) -> str:
    data = data.replace(b"\r\n", b"\n")
    return hashlib.sha1(b"blob " + str(len(data)).encode("ascii") + b"\0" + data).hexdigest()

def fail(message: str) -> None:
    print("ПОМИЛКА: " + message, file=sys.stderr)
    print("Файли не змінено.", file=sys.stderr)
    raise SystemExit(1)

# Preflight all existing source files before writing anything.
for rel, expected in EXPECTED_BLOBS.items():
    path = ROOT / rel
    if not path.is_file():
        fail(f"Не знайдено {rel}. Запустіть скрипт з кореня репозиторію.")
    actual = git_blob_sha(path.read_bytes())
    if actual != expected:
        fail(
            f"{rel} не відповідає перевіреній версії main "
            f"(очікуваний Git blob {expected}, отримано {actual})."
        )

index_path = ROOT / "index.html"
css_path = ROOT / "assets/css/style.css"
scss_path = ROOT / "assets/scss/style.scss"
js_path = ROOT / "assets/js/homepage-enhancements.js"

index = index_path.read_text(encoding="utf-8")
css = css_path.read_text(encoding="utf-8")
scss = scss_path.read_text(encoding="utf-8")

if CSS_MARKER in css or CSS_MARKER in scss or SCRIPT_TAG in index:
    fail("Зміни вже схоже застосовані. Повторне застосування скасовано.")
# Extract the existing individual-order promo section using its unique original image path.
image_marker = 'src="assets/images/order-simple.jpeg"'
image_pos = index.find(image_marker)
if image_pos < 0:
    fail("Не знайдено вихідний блок індивідуального замовлення.")
section_start = index.rfind("<section", 0, image_pos)
section_end_start = index.find("</section>", image_pos)
if section_start < 0 or section_end_start < 0:
    fail("Не вдалося безпечно визначити межі блоку індивідуального замовлення.")
section_end = section_end_start + len("</section>")
custom_section = index[section_start:section_end]
if custom_section.count(image_marker) != 1:
    fail("У блоці індивідуального замовлення знайдено неочікувану структуру.")
custom_section = custom_section.replace(
    'class="section section--tight"',
    'class="section section--tight home-custom-priority"',
    1
)
index_without_custom = index[:section_start] + index[section_end:]

featured_marker = (
    '<section class="section"><div class="container"><div class="section-heading">'
    '<div><p class="eyebrow">ВИБІР МАЙСТЕРНІ</p><h2>Зараз обирають</h2>'
)
featured_pos = index_without_custom.find(featured_marker)
if featured_pos < 0:
    fail("Не знайдено секцію «Зараз обирають» для безпечного переміщення блоку.")
index = (
    index_without_custom[:featured_pos]
    + custom_section + "\n"
    + index_without_custom[featured_pos:]
)

# Add the homepage enhancement script after the existing product data script.
product_script = '<script src="assets/js/products.js?v=20261022-brand3"></script>'
if index.count(product_script) != 1:
    fail("Не вдалося однозначно знайти підключення assets/js/products.js.")
index = index.replace(product_script, product_script + SCRIPT_TAG, 1)

# Bust the stylesheet cache without changing any image URL.
import re
index, link_count = re.subn(
    r'<link rel="stylesheet" href="assets/css/style\.css\?v=[^"]+">',
    '<link rel="stylesheet" href="assets/css/style.css?v=20261023-home1">',
    index,
    count=1
)
if link_count != 1:
    fail("Не вдалося оновити версію кешу для style.css.")

# Sanity checks on the in-memory result.
if index.find(image_marker) > index.find(featured_marker):
    fail("Перевірка порядку секцій не пройшла.")
if index.count(SCRIPT_TAG) != 1:
    fail("Перевірка підключення JS не пройшла.")
if "assets/images/" not in index:
    fail("Перевірка посилань на зображення не пройшла.")

# Create backups only after every validation above has passed.
backup_dir = ROOT / ".homepage-improvements-backup"
backup_dir.mkdir(exist_ok=False)
for path in (index_path, css_path, scss_path):
    shutil.copy2(path, backup_dir / path.name)

try:
    index_path.write_text(index, encoding="utf-8", newline="\n")
    css_path.write_text(css.rstrip() + "\n\n" + CSS_BLOCK, encoding="utf-8", newline="\n")
    scss_path.write_text(scss.rstrip() + "\n\n" + CSS_BLOCK, encoding="utf-8", newline="\n")
    # JS is shipped in the archive at this exact path; verify it is present.
    if not js_path.is_file():
        raise RuntimeError("Не знайдено assets/js/homepage-enhancements.js з архіву.")
except Exception:
    # Restore originals if any write fails part-way through.
    for path in (index_path, css_path, scss_path):
        backup = backup_dir / path.name
        if backup.exists():
            shutil.copy2(backup, path)
    raise

print("Зміни застосовано.")
print("Змінено: index.html, assets/css/style.css, assets/scss/style.scss.")
print("Додано: assets/js/homepage-enhancements.js.")
print("Зображення та їхні шляхи не змінювалися.")
print(f"Резервні копії: {backup_dir}/")

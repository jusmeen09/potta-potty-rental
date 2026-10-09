"""Create reproducible, versioned responsive WebP assets without altering originals.

Run after adding or replacing source photos. Requires Pillow (pip install Pillow).
The manifest and generated assets are committed so normal builds need only Node.
"""
from pathlib import Path
from hashlib import sha256
from PIL import Image, ImageOps
import json

root = Path(__file__).resolve().parent.parent
destination = root / "assets" / "responsive"
destination.mkdir(exist_ok=True)
manifest = {}
for folder in ["homepage", "about", "contact", "blog"]:
    for source in sorted((root / "assets" / folder).glob("*.webp")):
        if source.name.startswith("._"):
            continue
        original = ImageOps.exif_transpose(Image.open(source)).convert("RGB")
        version = sha256(source.read_bytes() + b"webp-q78-v1").hexdigest()[:10]
        variants = []
        for width in sorted({min(n, original.width) for n in [480, 800, 1200]}):
            height = round(original.height * width / original.width)
            target = destination / f"{folder}-{source.stem}-{version}-{width}.webp"
            if not target.exists():
                original.resize((width, height), Image.Resampling.LANCZOS).save(target, "WEBP", quality=78, method=6)
            variants.append({"src": "/" + str(target.relative_to(root)), "width": width, "height": height})
        manifest["/" + str(source.relative_to(root))] = variants
(root / "scripts" / "lib" / "image-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
print(f"Prepared responsive variants for {len(manifest)} source photos.")

# Product Images

Place your product images in this folder.

## Recommended Format
- **File type:** PNG or JPG
- **Size:** 500x500px or larger (square aspect ratio)
- **Background:** Transparent PNG preferred
- **Naming:** Use descriptive names (e.g., `headphones.png`, `smartwatch.png`, `earbuds.png`)

## Current Products
1. **Premium Headphones** - Add as `headphones.png` or `headphones.jpg`
2. **Smart Watch Pro** - Add as `smartwatch.png` or `smartwatch.jpg`
3. **Wireless Earbuds** - Add as `earbuds.png` or `earbuds.jpg`

## Usage
Images will be loaded using Next.js Image component:
```tsx
<Image
  src="/images/products/headphones.png"
  alt="Premium Headphones"
  width={200}
  height={200}
/>
```

## After Adding Images
Update the product data in `app/page.tsx` to replace the emoji icons with image paths.
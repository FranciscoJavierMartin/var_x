import { Image, Variant } from '../interfaces/category-products';

export function getColorIndex(
  product: { node: { variants: Variant[] } },
  variant: Variant,
  color: string
): number {
  return product.node.variants.findIndex(
    item =>
      item.color === color &&
      variant.style === item.style &&
      item.size === variant.size
  );
}

export function getImageByColor(
  product: { node: { variants: Variant[] } },
  variant: Variant,
  color: string,
  defaultImage: string
): any {
  const colorIndex = getColorIndex(product, variant, color);
  return colorIndex > -1
    ? product.node.variants[colorIndex].images[0].localFile
    : defaultImage;
}

export function getImagesByColor(
  product: { node: { variants: Variant[] } },
  variant: Variant,
  color: string,
  defaultImages: Image[]
): Image[] {
  const colorIndex = getColorIndex(product, variant, color);
  return colorIndex > -1
    ? product.node.variants[colorIndex].images
    : defaultImages;
}

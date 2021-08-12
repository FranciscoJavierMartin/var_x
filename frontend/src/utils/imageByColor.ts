import { Edge, Image, Variant } from '../interfaces/category-products';

export function getImageByColor(
  product: Edge,
  variant: Variant,
  color: string,
  defaultImage: string
): string {
  const colorIndex = product.node.variants.findIndex(
    item => item.color === color && variant.style === item.style
  );
  const imageSelected =
    colorIndex > -1
      ? product.node.variants[colorIndex].images[0].url
      : defaultImage;

  return `${process.env.GATSBY_STRAPI_URL}${imageSelected}`;
}

export function getImagesByColor(
  product: Edge,
  variant: Variant,
  color: string,
  defaultImages: Image[]
): Image[] {
  const colorIndex = product.node.variants.findIndex(
    item => item.color === color && variant.style === item.style
  );
  return colorIndex > -1
    ? product.node.variants[colorIndex].images
    : defaultImages;
}

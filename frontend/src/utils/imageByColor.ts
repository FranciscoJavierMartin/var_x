import { Edge, Image } from '../interfaces/category-products';

export function getImageByColor(
  product: Edge,
  color: string,
  defaultImage: string
): string {
  const colorIndex = product.node.variants.findIndex(
    variant => variant.color === color
  );
  const imageSelected =
    colorIndex > -1
      ? product.node.variants[colorIndex].images[0].url
      : defaultImage;

  return `${process.env.GATSBY_STRAPI_URL}${imageSelected}`;
}

export function getImagesByColor(
  product: Edge,
  color: string,
  defaultImages: Image[]
): Image[] {
  const colorIndex = product.node.variants.findIndex(
    variant => variant.color === color
  );
  return colorIndex > -1
    ? product.node.variants[colorIndex].images
    : defaultImages;
}

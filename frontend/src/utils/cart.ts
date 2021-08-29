export const calculateNumberOfItemsCart = (cart: any[]): number =>
  cart.reduce((acc: number, item: any) => item.qty + acc, 0);

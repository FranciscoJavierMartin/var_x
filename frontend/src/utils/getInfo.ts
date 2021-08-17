import { Stock } from '../interfaces/stock';

export const getStockDisplay = (
  stock: Stock,
  selectedVariant: number
): string => {
  let stockDisplay: string;

  switch (stock) {
    case undefined:
      stockDisplay = 'Loading inventory...';
      break;
    case null:
      stockDisplay = 'Error loading inventory...';
      break;
    default:
      if (stock[selectedVariant].qty === 0) {
        stockDisplay = 'Out of stock';
      } else {
        stockDisplay = `${stock[selectedVariant].qty} currently in stock.`;
      }
      break;
  }

  return stockDisplay;
};

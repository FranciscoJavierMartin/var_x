import { Edge } from '../interfaces/category-products';

export const alphabetic = (data: Edge[], direction: 'asc' | 'desc'): Edge[] =>
  data.sort((a: Edge, b: Edge) => {
    let res: number;
    const first = a.node.name.toLowerCase();
    const second = b.node.name.toLowerCase();

    const x = direction === 'asc' ? first : second;
    const y = direction === 'asc' ? second : first;

    if (x < y) {
      res = -1;
    } else if (x > y) {
      res = 1;
    } else {
      res = 0;
    }

    return res;
  });

export const time = (data: Edge[], direction: 'asc' | 'desc'): Edge[] =>
  data.sort((a: Edge, b: Edge) => {
    let res: number;
    const first = new Date(a.node.created_at);
    const second = new Date(b.node.created_at);

    const x = direction === 'asc' ? second : first;
    const y = direction === 'asc' ? first : second;

    if (x < y) {
      res = -1;
    } else if (x > y) {
      res = 1;
    } else {
      res = 0;
    }

    return res;
  });

export const price = (data: Edge[], direction: 'asc' | 'desc'): Edge[] =>
  data.sort((a: Edge, b: Edge) => {
    let res: number;
    const first = a.node.variants[0].price;
    const second = b.node.variants[0].price;

    const x = direction === 'asc' ? second : first;
    const y = direction === 'asc' ? first : second;

    if (x < y) {
      res = -1;
    } else if (x > y) {
      res = 1;
    } else {
      res = 0;
    }

    return res;
  });

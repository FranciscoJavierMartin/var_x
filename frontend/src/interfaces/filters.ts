export interface Option {
  checked: boolean;
  label: string;
}

export interface Filters {
  [key: string]: Option[];
}

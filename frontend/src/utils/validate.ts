const validators: { [key: string]: (val: string) => boolean } = {
  email: (val: string): boolean =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val),
  phone: (val: string): boolean =>
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(val),
  name: (val: string): boolean => val.length > 3,
  message: (val: string): boolean => val.length > 3,
};

export default function validate(values: { [key: string]: string }): {
  [key: string]: boolean;
} {
  const valid: { [key: string]: boolean } = {};

  Object.entries(values).map(([field, value]) => {
    valid[field] = validators[field](value);
  });

  return valid;
}

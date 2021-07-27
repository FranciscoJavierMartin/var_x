const validators: any = {
  email: (val: string): boolean =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val),
  phone: (val: string): boolean =>
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(val),
  name: (val: string) => val.length > 3,
  message: (val: string) => val.length > 3,
};

// TODO: Add proper types
export default function validate(values: any) {
  const valid: any = {};

  Object.entries(values).map(([field, value]) => {
    valid[field] = validators[field](value);
  });

  return valid;
}

const validators: { [key: string]: (val: string) => boolean } = {
  email: (val: string): boolean =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val),
  phone: (val: string): boolean =>
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(val),
  name: (val: string): boolean => val.length > 3,
  message: (val: string): boolean => val.length > 3,
  password: (val: string): boolean =>
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val),
  confimation: (val: string): boolean =>
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val),
  street: (val: string): boolean =>
    /^(\d+) ?([A-Za-z](?= ))? (.*?) ([^ ]+?) ?((?<= )APT)? ?((?<= )\d*)?$/.test(
      val
    ),
  zip: (val: string): boolean => /^\d{5}(-\d{4})?$/.test(val),
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

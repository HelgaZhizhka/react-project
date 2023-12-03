export const evaluatePasswordStrength = (password?: string) => {
  const rules = [
    (str: string) => str.length > 8,
    (str: string) => /[A-Z]/.test(str),
    (str: string) => /[a-z]/.test(str),
    (str: string) => /\d/.test(str),
    (str: string) => /[\^$*.\[\]{}()?\-"!@#%&/,><':;|_~`]/.test(str),
  ];

  if (!password) return 0;

  return rules.reduce((strength, rule) => strength + (rule(password) ? 1 : 0), 0);
};

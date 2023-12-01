export const evaluatePasswordStrength = (password?: string) => {
  let strength = 0;

  if (!password) return strength;

  if (password.length > 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/\d/.test(password)) strength += 1;
  if (/[\^$*.\[\]{}()?\-"!@#%&/,><':;|_~`]/.test(password)) strength += 1;
  return strength;
};

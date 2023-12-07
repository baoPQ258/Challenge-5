export const upperCase = (valueInput: string) => {
  const text = valueInput.trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
};

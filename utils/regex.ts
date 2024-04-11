export const letterRegEx = /^[a-zA-Z]$/;

export const isLetter = (str: string) => {
  return letterRegEx.test(str);
};

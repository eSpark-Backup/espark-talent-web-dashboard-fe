export const generateUniqueString = () => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < 15; i++) {
    if (i === 5 || i === 13) {
      result += '-';
    } else {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }

  return result;
};

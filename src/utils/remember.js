import CryptoJS from 'crypto-js';

const SECRET_KEY =
  process.env.VITE_SECRET_KEY || '29bd7390-6c1d-4989-98ed-4fddf59a224a';

export const saveEncryptedCredentials = (email, password, remember) => {
  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    SECRET_KEY
  ).toString();
  localStorage.setItem('remember', remember);
  localStorage.setItem('rememberedEmail', email);
  localStorage.setItem('rememberedPassword', encryptedPassword);
};

export const getDecryptedCredentials = () => {
  const email = localStorage.getItem('rememberedEmail');
  const encryptedPassword = localStorage.getItem('rememberedPassword');
  if (!email || !encryptedPassword) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
    const password = bytes.toString(CryptoJS.enc.Utf8);
    return { email, password };
  } catch {
    return null;
  }
};

export const clearSavedCredentials = () => {
  localStorage.removeItem('rememberedEmail');
  localStorage.removeItem('rememberedPassword');
};

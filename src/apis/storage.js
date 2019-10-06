const key = "vodToken";

export const saveUser = (user, token) => {
  if (getUser()) {
    return;
  }
  localStorage.setItem(key, JSON.stringify({ token, user }));
};

export const deleteUser = () => {
  localStorage.removeItem(key);
};

export const getUser = () => {
  const user = localStorage.getItem(key);
  if (!user) {
    return false;
  }
  return JSON.parse(user);
};

export const getAuthToken = () => {
  const token = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key)).token
    : "";
  return token;
};

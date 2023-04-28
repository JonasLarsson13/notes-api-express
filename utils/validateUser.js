const validateUserInfo = (username, password) => {
  if (!username || !password) return "Missing username or password";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (password.length > 20) return "Password must be less than 20 characters";
  if (!username.match(/^[a-zA-Z0-9]+$/)) return "Username must be alphanumeric";
  if (username.length < 3) return "Username must be at least 3 characters";
  if (username.length > 20) return "Username must be less than 20 characters";
  return;
};

export default validateUserInfo;

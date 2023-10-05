export const validateSignInForm = (email, password) => {
  const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  if (!isValidEmail) return "Invalid email address";
  const isValidPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  if (!isValidPassword) return "Invalid password";
  return null;
};

export const validateSignUpForm = (fullName, email, password) => {
  if (fullName === null) return "FullName Required";
  const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  if (!isValidEmail) return "Invalid email address";
  const isValidPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  if (!isValidPassword) return "Invalid password";
  return null;
};

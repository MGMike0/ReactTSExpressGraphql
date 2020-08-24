import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "Username length must be greather than 2",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Username can't contain",
      },
    ];
  }

  if (options.email.length <= 2 || !options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Email is not correct",
      },
    ];
  }

  if (options.password.length <= 2) {
    return [
      {
        field: "password",
        message: "Password must be greather than 2",
      },
    ];
  }
  return null;
};

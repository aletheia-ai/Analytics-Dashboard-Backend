export enum SignInExceptions {
  NO_USER = 'No User Registered With this Email',
  INVALID_PASSWORD = 'Password Is Incorrect',
}

export type User = {
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  email: string;
  password: string;
  phone: string;
};

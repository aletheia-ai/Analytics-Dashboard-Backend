//interface for the user verifcation type
import { User } from '.';
export interface UserVerificationType {
  userId: string | User;
  otp: string;
}

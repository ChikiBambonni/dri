import { UserRole } from '@core/enums';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  role: UserRole;
}

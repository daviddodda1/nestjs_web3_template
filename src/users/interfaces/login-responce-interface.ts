import { User } from '../entities/user.entity';

export interface LoginResponse {
  accessToken: string;
  userData: User;
}

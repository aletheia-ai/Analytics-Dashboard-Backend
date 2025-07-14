import { Injectable } from '@nestjs/common';
import { User } from '@utils/types';

@Injectable()
export class UserService {
  private readonly users: User[] = [];
  create(user: User) {
    this.users.push(user);
  }
  findAll(): User[] {
    return this.users;
  }
}

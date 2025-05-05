import { eq } from 'drizzle-orm';

import { CreateUserSchema } from '../schemas/create-user';
import IUsersRepository, { User } from '../types/usersRepository';

import { user } from '@/database/schema';
import { DbClient } from '@/database';

class UsersRepository implements IUsersRepository {
  constructor(private readonly client: DbClient) {}

  async getAll() {
    const output = await this.client.query.user.findMany();

    return output;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const userFinded = await this.client.query.user.findFirst({
      where: eq(user.email, email)
    });

    return userFinded;
  }

  async create(data: CreateUserSchema): Promise<void> {
    await this.client.insert(user).values([data]);
  }
}

export default UsersRepository;

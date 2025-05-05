import { user } from '@/database/schema';
import { CreateUserSchema } from '../schemas/create-user';

export type User = typeof user.$inferSelect;

interface IUsersRepository {
  create(data: CreateUserSchema): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  getAll(): Promise<User[]>;
}

export default IUsersRepository;

import IUsersRepository from '../types/usersRepository';
import { CreateUserSchema } from '../schemas/create-user';

import { hash } from 'bcrypt';

class CreateUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute({ email, password, ...rest }: CreateUserSchema) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      ...rest,
      email,
      password: passwordHash
    });
  }
}

export default CreateUserUseCase;

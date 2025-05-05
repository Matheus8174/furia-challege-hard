import { compare } from 'bcrypt';
import IUsersRepository from '../types/usersRepository';

type Request = {
  email: string;
  password: string;
};

class AuthenticateUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute({ email, password }: Request) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new Error('email or password incorrect');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new Error('email or password incorrect');

    return user;
  }
}

export default AuthenticateUserUseCase;

import IUsersRepository from '../types/usersRepository';

class ListAllUsers {
  constructor(private readonly usersRepository: IUsersRepository) {}

  public async execute() {
    const users = await this.usersRepository.getAll();

    return users;
  }
}

export default ListAllUsers;

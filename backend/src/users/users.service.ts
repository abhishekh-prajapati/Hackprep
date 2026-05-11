import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneByGoogleId(googleId: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { googleId } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create({
      ...userData,
      skills: [],
      languages: [],
      totalEvents: 0,
      wins: 0,
      projectsCompleted: 0,
      isOnboardingCompleted: false,
    });
    return this.usersRepository.save(newUser);
  }

  async update(id: string, updateData: Partial<User>): Promise<User | null> {
    await this.usersRepository.update(id, updateData);
    return this.findById(id);
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }
}

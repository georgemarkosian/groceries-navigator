import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByFirebaseUid(firebaseUid: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { firebaseUid } });
  }

  async findOrCreate(
    firebaseUid: string,
    email: string,
    displayName?: string,
  ): Promise<User> {
    const existing = await this.findByFirebaseUid(firebaseUid);
    if (existing) {
      return existing;
    }

    const user = this.usersRepository.create({
      firebaseUid,
      email,
      displayName,
    });
    return this.usersRepository.save(user);
  }
}

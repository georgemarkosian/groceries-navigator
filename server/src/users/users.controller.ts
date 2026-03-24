import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@CurrentUser() firebaseUser: { uid: string; email?: string; name?: string }) {
    return this.usersService.findOrCreate(
      firebaseUser.uid,
      firebaseUser.email ?? '',
      firebaseUser.name,
    );
  }
}

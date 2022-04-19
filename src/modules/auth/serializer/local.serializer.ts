import { PassportSerializer } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/user.entity';
 
@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly usersService: UserService,
  ) {
    super();
  }
 
  serializeUser(user: User, done: CallableFunction) {
    done(null, user.id);
  }
 
  async deserializeUser(userId: string, done: CallableFunction) {
    const user = await this.usersService.getById(Number(userId))

    if (!user) throw new NotFoundException('user not found');

    done(null, user);
  }
}
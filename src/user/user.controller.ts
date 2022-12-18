import { Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordDto, EditUserDto } from './dto';
import { GetUser } from '../auth/decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('index')
  index() {
    return this.userService.users({});
  }

  @Get('show/:id')
  show(@Param('id', ParseIntPipe) id: number) {
    return this.userService.show(id);
  }

  @Patch('edit/:id')
  edit(
    @Param('id', ParseIntPipe) targetId: number,
    @GetUser('id') userId: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.edit(userId, targetId, dto);
  }

  @Patch('change-password')
  changePassword(
    @GetUser('id') id: number,
    @Body() dto: ChangePasswordDto
  ) {
    return this.userService.changePassword(id, dto);
  }

  @Get('delete/:id')
  delete(
    @Param('id', ParseIntPipe) targetId: number,
    @GetUser('id') userId: number
  ) {
    return this.userService.delete(userId, targetId);
  }
}

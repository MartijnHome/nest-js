import { Body, Controller, Get, Param, ParseIntPipe, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { EditUserDto, ChangePasswordDto } from './dto';

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
  edit(@Param('id', ParseIntPipe) id: number,
       @Body() dto: EditUserDto) {
    return this.userService.edit(id, dto);
  }

  @Patch('change-password/:id')
  changePassword(@Param('id', ParseIntPipe) id: number,
       @Body() dto: ChangePasswordDto) {
    return this.userService.changePassword(id, dto);
  }

  @Get('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}

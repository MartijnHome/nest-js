import { Get, Injectable, NotFoundException, Param } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EditDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where
    });
  }

  async show(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    });

    if (!user)
      return new NotFoundException('User with id ' + id + ' not found');

    return user;
  }

  async edit(id: number, dto: EditDto) {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;
    return user;
  }

  async delete(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    });

    if (!user)
      return new NotFoundException('User with id ' + id + ' not found');

    await this.prisma.user.delete({
      where: {
        id: id
      }
    });

    return {
      msg: 'User with id ' + id + ' successfully deleted'
    };
  }
}

import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ChangePasswordDto, EditUserDto } from './dto';
import * as argon from 'argon2';

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

  async edit(userId: number, targetId: number, dto: EditUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user.isAdmin && userId !== targetId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    const target = await this.prisma.user.update({
      where: {
        id: targetId,
      },
      data: {
        ...dto,
      },
    });

    delete target.hash;
    return target;
  }

  async changePassword(userId: number, targetId: number, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user.isAdmin && userId !== targetId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    const hash = await argon.hash(dto.password);
    const target = await this.prisma.user.update({
      where: {
        id: targetId,
      },
      data: {
        hash: hash,
      },
    });

    delete target.hash;
    return target;
  }

  async delete(userId: number, targetId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user.isAdmin && userId !== targetId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    const target = await this.prisma.user.findUnique({
      where: {
        id: targetId
      }
    });

    if (!target)
      return new NotFoundException('User with id ' + targetId + ' not found');

    await this.prisma.user.delete({
      where: {
        id: targetId
      }
    });

    return {
      msg: 'User with id ' + targetId + ' successfully deleted'
    };
  }
}

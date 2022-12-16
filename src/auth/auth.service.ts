import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthSignInDto, AuthSignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signup(dto: AuthSignUpDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });
      delete user.hash;
      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw e;
    }
  }

  async signin(dto: AuthSignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user)
      throw new ForbiddenException('Credentials incorrect');

    if (!(await argon.verify(user.hash, dto.password)))
      throw new ForbiddenException('Credentials incorrect');

    const token = await this.signToken(user.id, user.email);
    return {
      msg: 'SignIn',
      token: token,
    };
  }

  async signToken(userID: number, email: string) {
    const payload = {
      sub: userID,
      email: email,
    };
    return this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: 'supersecret',
    });
  }
}

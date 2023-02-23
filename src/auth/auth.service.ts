import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import AuthResponse from './dto/auth-response.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import AuthDto from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(authDto: AuthDto): Promise<AuthResponse> {
    const { email, password } = authDto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new UnauthorizedException('Invalid password.');
    }

    return {
      jwt: this.jwtService.sign({
        email,
      }),
    };
  }

  async signUp(authDto: AuthDto): Promise<AuthResponse> {
    const { email } = await this.usersService.createUser(authDto);

    return {
      jwt: this.jwtService.sign({
        email,
      }),
    };
  }
}

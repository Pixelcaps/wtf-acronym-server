import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import AuthResponse from './dto/auth-response.dto';
import AuthDto from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() authDto: AuthDto): Promise<AuthResponse> {
    return this.authService.login(authDto);
  }

  @Post('/signup')
  register(@Body() authDto: AuthDto): Promise<AuthResponse> {
    return this.authService.signUp(authDto);
  }
}

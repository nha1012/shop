import { Controller, Request, Post, UseGuards, HttpCode, Body, Req, Res } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginGuard } from 'src/common/guards/login.guard';
import { UserEntity } from 'src/user/user.entity';
import { hash } from 'src/utils/auth.util';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // Chức năng đăng nhập
  @UseGuards(LoginGuard)
  @Post('login')
  @ApiOkResponse({ status: 200 })
  @HttpCode(200)
  @ApiBody({ type: UserEntity })

  async login(@Request() req, @Res() res) {
    req.user = req.user;
    return res.redirect('/')
  }

  // Chức năng đăng ký
  @Post('register')
  @ApiOkResponse({ status: 200 })
  @HttpCode(200)
  @ApiBody({ type: UserEntity })
  async register(@Body() user: UserEntity) {
    user.password = hash(user.password)
    return this.authService.register(user);
  }
}

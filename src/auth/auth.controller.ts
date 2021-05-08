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
  @Post('/register')
  async register(@Body() user: UserEntity, @Res() res) {
    user.roleId = '2ddccc31-3b13-4daf-b02a-8902aca48a14';
    user.password = hash(user.password);
    this.authService.register(user).then(value=>{
      return res.status(200).send("Đăng ký thành công")
    })
  }
}

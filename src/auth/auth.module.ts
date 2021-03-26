import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { SessionSerializer } from './session.serializer';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule.register({ session: true }),
        UserModule,
    ],
    providers: [UserService, AuthService, LocalStrategy, SessionSerializer],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }

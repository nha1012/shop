import { ReviewSanPhamModule } from './review-san-pham/review-san-pham.module';
import { NhaCungCapModule } from './nha-cung-cap/nha-cung-cap.module';
import { AvatarModule } from './avatar/avatar.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { WorkshiftModule } from './workshift/workshift.module';
import { ProductModule } from './product/product.module';
import { DmSanphamModule } from './dm-san-pham/dm-san-pham.module';
import { HinhAnhSanPhamModule } from './ha-san-pham/ha-san-pham.module';
import { ChuongTrinhKhuyenMaiModule } from './chuong-trinh-khuyen-mai/chuong-trinh-khuyen-mai.module';
import { OrderModule } from './order/order.module';
import { TransactionModule } from './transaction/transaction.module';
import { ProductService } from './product/product.service';
import { ProductEntity } from './product/product.entity';
import { DmSanPhamEntity } from './dm-san-pham/dm-san-pham.entity';
import { DmSanPhamService } from './dm-san-pham/dm-san-pham.service';
import { OrderEntity } from './order/order.entity';
import { OrderService } from './order/order.service';
import { ChuongTrinhKhuyenMaiValueModule } from './chuong-trinh-khuyen-mai-value/chuong-trinh-khuyen-mai-value.module';
import { UserEntity } from './user/user.entity';
import { UserService } from './user/user.service';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([ProductEntity, DmSanPhamEntity, OrderEntity, UserEntity]),
    UserModule,
    RoleModule,
    AuthModule,
    WorkshiftModule,
    AvatarModule,
    ProductModule,
    DmSanphamModule,
    NhaCungCapModule,
    ReviewSanPhamModule,
    HinhAnhSanPhamModule,
    ChuongTrinhKhuyenMaiModule,
    ChuongTrinhKhuyenMaiValueModule,
    OrderModule,
    TransactionModule,
  ],
  controllers: [
    AppController],
  providers: [AppService, ProductService, DmSanPhamService, OrderService, UserService],
})
export class AppModule { }

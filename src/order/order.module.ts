import { OrderController } from './order.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';
import { ProductService } from 'src/product/product.service';
import { ProductEntity } from 'src/product/product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity, ProductEntity])],
    controllers: [
        OrderController,],
    providers: [OrderService, ProductService],
})
export class OrderModule { }

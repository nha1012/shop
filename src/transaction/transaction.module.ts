import { TransactionController } from './transaction.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './transaction.entity';
import { TransactionService } from './transaction.service';
import { OrderEntity } from 'src/order/order.entity';
import { OrderService } from 'src/order/order.service';

@Module({
    imports: [TypeOrmModule.forFeature([TransactionEntity, OrderEntity])],
    controllers: [
        TransactionController,],
    providers: [TransactionService, OrderService],
})
export class TransactionModule { }

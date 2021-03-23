import { TransactionController } from './transaction.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './transaction.entity';
import { TransactionService } from './transaction.service';

@Module({
    imports: [TypeOrmModule.forFeature([TransactionEntity])],
    controllers: [
        TransactionController,],
    providers: [TransactionService],
})
export class TransactionModule { }

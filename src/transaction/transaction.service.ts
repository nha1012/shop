import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { EntityManager, FindManyOptions, getConnection } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import * as lodash from 'lodash';

@Injectable()
export class TransactionService extends TypeOrmCrudService<TransactionEntity> {
  constructor(@InjectRepository(TransactionEntity) repo, @InjectEntityManager() private transactionManager: EntityManager) {
    super(repo);
  }

  userPay(transaction): Promise<TransactionEntity> {
    return this.repo.save(transaction);
  }
  async updateOrderTransaction(trongTien: number, qty: number, transactionId: string) {
    return await getConnection()
      .createQueryBuilder()
      .update(TransactionEntity)
      .set({ tongTien: trongTien, qty: qty })
      .where('transactionId = :transactionId', { transactionId: transactionId })
      .execute()
  }
}

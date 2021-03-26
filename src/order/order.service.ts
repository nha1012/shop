import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { OrderEntity } from './order.entity';
import { EntityManager, getRepository } from "typeorm";

@Injectable()
export class OrderService extends TypeOrmCrudService<OrderEntity> {
  constructor(
    @InjectEntityManager() private order: EntityManager,
    @InjectRepository(OrderEntity) repo) {
    super(repo);
  }
  getBaoBaoThongKe(req) {
    return this.repo.find(req);
  }
  addToCart(order) {
    return this.order.insert(OrderEntity, order);
  }
  async getCarts(userId: string) {
    return await getRepository(OrderEntity)
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.product', 'product')
      .where("orders.status = :status and orders.userId = :userId", { status: false, userId: userId })
      .getMany()
  }
  async deleteItemById(orderId: string) {
    return await this.order.delete(OrderEntity, orderId)
  }
}

import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { OrderEntity } from './order.entity';
import { EntityManager, getRepository, getConnection } from "typeorm";

@Injectable()
export class OrderService extends TypeOrmCrudService<OrderEntity> {
  constructor(
    @InjectEntityManager() private order: EntityManager,
    @InjectRepository(OrderEntity) repo) {
    super(repo);
  }
  builder = this.order.createQueryBuilder();

  getBaoBaoThongKe(req) {
    return this.repo.find(req);
  }
  async addToCart(order) {
    return await this.repo.save(order)
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
  async findOrderByProductId(productId: string) {
    return await getRepository(OrderEntity)
      .createQueryBuilder('orders')
      .where("orders.productId = :productId and orders.status = :status", { productId: productId, status: false })
      .getOne()
  }

  async updateOrderByProductId(value: OrderEntity) {
    return await getConnection()
      .createQueryBuilder()
      .update(OrderEntity)
      .set(value)
      .where("productId = :productId and status = :status", { productId: value.productId, status: false })
      .execute()
  }
}

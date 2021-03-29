import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ProductEntity } from './product.entity';
import { EntityManager, getRepository, getConnection } from "typeorm";

@Injectable()
export class ProductService extends TypeOrmCrudService<ProductEntity> {
  constructor(@InjectRepository(ProductEntity) repo, @InjectEntityManager() private entityManager: EntityManager) {
    super(repo);
  }
  async getProductTrending() {
    return getRepository(ProductEntity)
      .createQueryBuilder('product')
      .leftJoinAndSelect("product.danhMucSanPham", 'tenDanhMuc')
      .getMany()
  }
  async getProductById(id: string) {
    return getRepository(ProductEntity)
      .createQueryBuilder('product')
      .leftJoinAndSelect("product.danhMucSanPham", 'tenDanhMuc')
      .leftJoinAndSelect("product.hinhAnhSanPhams", 'url')
      .where("product.productId = :id", { id: id })
      .getOne()
  }

  async updateSoLuongSanPham(productId: string, soLuong: number) {
    return await getConnection()
      .createQueryBuilder()
      .update(ProductEntity)
      .set({ soLuong: soLuong })
      .where("productId = :productId", { productId: productId })
      .execute()
  }
}

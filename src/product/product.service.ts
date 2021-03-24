import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ProductEntity } from './product.entity';
import { getRepository } from "typeorm";

@Injectable()
export class ProductService extends TypeOrmCrudService<ProductEntity> {
  constructor(@InjectRepository(ProductEntity) repo) {
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
      .where("product.productId = :id", { id })
      .getOne()
  }
}

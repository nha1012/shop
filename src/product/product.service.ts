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
      .limit(8)
      .where('product.soLuong > 0')
      .getMany()
  }
  async getAllProduct() {
    return getRepository(ProductEntity)
      .createQueryBuilder('product')
      .leftJoinAndSelect("product.danhMucSanPham", 'tenDanhMuc')
      .where('product.soLuong > 0')
      .getMany()
  }
  async getProductById(id: string) {
    return getRepository(ProductEntity)
      .createQueryBuilder('product')
      .leftJoinAndSelect("product.danhMucSanPham", 'tenDanhMuc')
      .leftJoinAndSelect("product.hinhAnhSanPhams", 'url')
      .leftJoinAndSelect("product.attributeValues",'attributeValues')
      .leftJoinAndSelect("attributeValues.attributes", 'attributes')
      .leftJoinAndSelect("product.reviewSanPhams",'reviewSanPhams')
      .leftJoinAndSelect("reviewSanPhams.user",'user')
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
  async getSanPhamTuongTu(danhMucSanPhamId: string, productId: string) {
    return getRepository(ProductEntity)
      .createQueryBuilder('product')
      .leftJoinAndSelect("product.danhMucSanPham", 'tenDanhMuc')
      .leftJoinAndSelect("product.hinhAnhSanPhams", 'url')
      .where("product.danhMucSanPhamId = :danhMucSanPhamId and product.productId != :productId", { danhMucSanPhamId, productId })
      .getMany()
  }
}

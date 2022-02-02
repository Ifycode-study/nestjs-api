import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Post()
  async addProduct(
    @Body('title') productTitle: string,
    @Body('description') productDesc: string,
    @Body('price') productPrice: number,
  ) {
    const generatedId: string = await this.productsService.insertProduct(
      productTitle,
      productDesc,
      productPrice,
    );
    //console.log({ id: generatedId });
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  getProducts(@Param('id') productId: string) {
    return this.productsService.getSingleProduct(productId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body('title') productTitle: string,
    @Body('description') productDesc: string,
    @Body('price') productPrice: number,
  ) {
    await this.productsService.updateProduct(
      productId,
      productTitle,
      productDesc,
      productPrice,
    );
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') productId: string) {
    await this.productsService.deleteProduct(productId);
    return null;
  }
}

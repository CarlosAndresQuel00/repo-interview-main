import "reflect-metadata";
import {
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  Params,
  NotFoundError,
  BadRequestError,
} from "routing-controllers";
import { ProductDTO } from "../dto/Product";
import { MESSAGE_ERROR } from "../const/message-error.const";
import { ProductInterface } from "../interfaces/product.interface";

@JsonController("/products")
export class ProductController {
  products: ProductInterface[] = [
    {
      id: 'P-001',
      name: 'Sistema de Cámaras IP',
      description: 'Kit de cámaras de seguridad IP con acceso remoto.',
      logo: 'https://example.com/logos/camaras-ip.png',
      date_release: new Date('2024-01-15'),
      date_revision: new Date('2025-01-15'),
    },
    {
      id: 'P-002',
      name: 'Control de Acceso Biométrico',
      description: 'Lector biométrico con reconocimiento facial y huella.',
      logo: 'https://example.com/logos/biometrico.png',
      date_release: new Date('2023-08-10'),
      date_revision: new Date('2024-08-10'),
    },
    {
      id: 'P-003',
      name: 'Alarma Inalámbrica',
      description: 'Sistema de alarma inalámbrico para hogares y oficinas.',
      logo: 'https://example.com/logos/alarma.png',
      date_release: new Date('2024-05-01'),
      date_revision: new Date('2025-05-01'),
    },
    {
      id: 'P-001',
      name: 'Sistema de Cámaras IP',
      description: 'Kit de cámaras de seguridad IP con acceso remoto.',
      logo: 'https://example.com/logos/camaras-ip.png',
      date_release: new Date('2024-01-15'),
      date_revision: new Date('2025-01-15'),
    },
    {
      id: 'P-002',
      name: 'Control de Acceso Biométrico',
      description: 'Lector biométrico con reconocimiento facial y huella.',
      logo: 'https://example.com/logos/biometrico.png',
      date_release: new Date('2023-08-10'),
      date_revision: new Date('2024-08-10'),
    },
    {
      id: 'P-003',
      name: 'Alarma Inalámbrica',
      description: 'Sistema de alarma inalámbrico para hogares y oficinas.',
      logo: 'https://example.com/logos/alarma.png',
      date_release: new Date('2024-05-01'),
      date_revision: new Date('2025-05-01'),
    }
  ];

  @Get("")
  getAll() {
    return {
      data: [...this.products],
    };
  }

  @Get("/verification/:id")
  verifyIdentifier(@Param("id") id: number | string) {
    return this.products.some((product) => product.id === id);
  }

  @Get("/:id")
  getOne(@Param("id") id: number | string) {
    const index = this.findIndex(id);

    if(index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }
    return this.products.find((product) => product.id === id);
  }

  @Post("")
  createItem(@Body({ validate:true }) productItem: ProductDTO) {
    
    const index = this.findIndex(productItem.id);

    if(index !== -1) {
      throw new BadRequestError(MESSAGE_ERROR.DuplicateIdentifier);
    }
    
    this.products.push(productItem);
    return {
      message: "Product added successfully",
      data: productItem,
    };
  }

  @Put("/:id")
  put(@Param("id") id: number | string, @Body() productItem: ProductInterface) {
    const index = this.findIndex(id);

    if(index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }

    this.products[index] = {
      ...this.products[index],
      ...productItem,
    };
    return {
      message: "Product updated successfully",
      data: productItem,
    };
  }

  @Delete("/:id")
  remove(@Param("id") id: number | string) {
    const index = this.findIndex(id);

    if(index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }
        
    this.products = [...this.products.filter((product) => product.id !== id)];
    return {
      message: "Product removed successfully",
    };
  }

  private findIndex(id: number | string) {
    return this.products.findIndex((product) => product.id === id);
  }

}

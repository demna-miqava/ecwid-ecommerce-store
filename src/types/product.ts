export interface Product {
  id: number;
  name: string;
  price: number;
  lowestPrice: number;
  description?: string;
  enabled: boolean;
  categoryIds?: number[];
  thumbnailUrl: string;
  hdThumbnailUrl: string;
  smallThumbnailUrl: string;
  imageUrl: string;
  inStock?: boolean;
  created?: string;
}

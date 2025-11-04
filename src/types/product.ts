export interface GalleryImage {
  id: number;
  originalImageUrl: string;
}

export interface ProductOption {
  type: string;
  name: string;
  choices: Array<{
    text: string;
    priceModifier: number;
  }>;
  defaultChoice: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  categoryIds?: number[];
  hdThumbnailUrl: string;
  originalImageUrl: string;
  imageUrl: string;
  inStock?: boolean;
  created?: string;
  options?: ProductOption[];
  galleryImages?: GalleryImage[];
}

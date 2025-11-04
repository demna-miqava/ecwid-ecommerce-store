export interface GalleryImage {
  id: number;
  hdThumbnailUrl: string;
  thumbnailUrl: string;
}

export interface ProductOption {
  type: string;
  name: string;
  choices: Array<{
    text: string;
    priceModifier: number;
    priceModifierType: string;
  }>;
  defaultChoice: number;
}

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
  originalThumbnailUrl: string;
  imageUrl: string;
  inStock?: boolean;
  created?: string;
  options?: ProductOption[];
  galleryImages?: GalleryImage[];
}

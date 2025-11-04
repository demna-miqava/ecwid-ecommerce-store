import type { Product } from '@/types/product'
import type { CartItem } from '@/types/cart'
import type { Category } from '@/types/category'

export const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  price: 29.99,
  imageUrl: 'https://example.com/image.jpg',
  hdThumbnailUrl: 'https://example.com/thumb.jpg',
  originalImageUrl: 'https://example.com/original.jpg',
  description: 'Test description',
}

export const mockCartItem: CartItem = {
  id: 'test-1',
  productId: 1,
  imageUrl: 'https://example.com/image.jpg',
  title: 'Test Product',
  basePrice: 29.99,
  quantity: 2,
}

export const mockCategory: Category = {
  id: 1,
  name: 'Electronics',
}

export const mockCategories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Laptops', parentId: 1 },
  { id: 4, name: 'Phones', parentId: 1 },
  { id: 5, name: 'Men', parentId: 2 },
]

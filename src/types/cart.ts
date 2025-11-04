export interface CartItem {
  id: string; // Unique identifier: `${productId}-${selectedOption?.value || 'default'}`
  productId: number;
  imageUrl: string;
  title: string;
  basePrice: number;
  selectedOption?: {
    name: string; // e.g., "Size"
    value: string; // e.g., "M"
    priceModifier: number;
  };
  quantity: number;
}

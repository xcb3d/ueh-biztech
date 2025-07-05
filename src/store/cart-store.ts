import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/data/craft-villages';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            // Nếu sản phẩm đã có, tăng số lượng
            const updatedItems = state.items.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            return { items: updatedItems };
          } else {
            // Nếu sản phẩm chưa có, thêm vào với số lượng là 1
            return { items: [...state.items, { ...product, quantity: 1 }] };
          }
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => {
            if (quantity < 1) {
                // Nếu số lượng là 0 hoặc ít hơn, xóa sản phẩm khỏi giỏ
                return { items: state.items.filter((item) => item.id !== productId) };
            }
            const updatedItems = state.items.map((item) =>
                item.id === productId ? { ...item, quantity: quantity } : item
            );
            return { items: updatedItems };
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // Tên key trong localStorage
      storage: createJSONStorage(() => localStorage), // Sử dụng localStorage
    }
  )
); 
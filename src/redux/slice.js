import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  cart: []
}

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload
    },
    addToCart(state, action) {
      const product = action.payload
      const existing = state.cart.find((item) => item.id === product.id)
      if (existing) {
        existing.quantity = Math.min(10, existing.quantity + 1)
      } else {
        state.cart.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload)
    },
    increaseQuantity(state, action) {
      const item = state.cart.find((i) => i.id === action.payload)
      if (item && item.quantity < 10) {
        item.quantity += 1
      }
    },
    decreaseQuantity(state, action) {
      const item = state.cart.find((i) => i.id === action.payload)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.cart = state.cart.filter((i) => i.id !== action.payload)
        }
      }
    },
    clearCart(state) {
      state.cart = []
    }
  }
})

export const { setProducts, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = shopSlice.actions
export default shopSlice.reducer

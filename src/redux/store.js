import { configureStore } from '@reduxjs/toolkit'
import shopReducer from './slice'

const store = configureStore({
  reducer: {
    shop: shopReducer
  }
})

export default store

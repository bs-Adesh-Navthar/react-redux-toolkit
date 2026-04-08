import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { setProducts, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from './redux/slice'
import Header from './Header'
import CartList from './CartList'
import './App.css'

function ProductsPage({ products, cart, onAdd, onRemove }) {
	const navigate = useNavigate()

	return (
		<section className="products" id="products">
			<div className="products-head">
				<h2>Products</h2>
			</div>
			{products.length === 0 ? (
				<p>Loading products...</p>
			) : (
				<div className="products-grid">
					{products.map((product) => (
						<article key={product.id} className="product-card">
							<div className="product-top">
								<img className="product-thumb" src={product.thumbnail} alt={product.title} />
								<div>
									<h3>{product.title}</h3>
									<div className="meta">Brand: {product.brand} · Category: {product.category}</div>
									<div className="price">${product.price}</div>
								</div>
							</div>

							{cart.some((item) => item.id === product.id) ? (
								<div className="cart-actions-inline">
									<button className="btn btn-danger" onClick={() => onRemove(product.id)}>
										Remove
									</button>
									<button className="btn" onClick={() => navigate('/cart')}>
										Go to cart
									</button>
								</div>
							) : (

								<button className="btn" onClick={() => onAdd(product)}>
									Add to cart
								</button>
							)}
						</article>
					))}
				</div>
			)}
		</section>
	)
}

function CartPage({ cart, onRemove, onIncrease, onDecrease, onClear, onPlaceOrder, orderMessage, clearOrderMessage }) {
	const navigate = useNavigate()

	return (
		<>
			<div className="page-top">
				<button className="btn" onClick={() => { clearOrderMessage(); navigate('/') }}>Back to products</button>
			</div>
			<CartList
				cart={cart}
				onRemove={onRemove}
				onIncrease={onIncrease}
				onDecrease={onDecrease}
				onClear={onClear}
				onPlaceOrder={onPlaceOrder}
				orderMessage={orderMessage}
			/>
		</>
	)
}

function App() {
	const dispatch = useDispatch()
	const products = useSelector((state) => state.shop.products)
	const cart = useSelector((state) => state.shop.cart)
	const [orderMessage, setOrderMessage] = useState('')

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch('https://dummyjson.com/products?limit=24')
				const data = await res.json()
				if (data.products) {
					dispatch(setProducts(data.products))
				}
			} catch (error) {
				console.error('Could not fetch products', error)
			}
		}
		fetchProducts()
	}, [dispatch])

	const handlePlaceOrder = () => {
		dispatch(clearCart())
		setOrderMessage('Order placed successfully!')
		setTimeout(() => setOrderMessage(''), 2400)
	}

	return (
		<Router>
			<Header />
			<main className="app">
				<Routes>
					<Route
						path="/"
						element={
							<ProductsPage
								products={products}
								cart={cart}
								onAdd={(product) => dispatch(addToCart(product))}
								onRemove={(id) => dispatch(removeFromCart(id))}
							/>
						}
					/>
					<Route
						path="/cart"
						element={
							<CartPage
								cart={cart}
								onRemove={(id) => dispatch(removeFromCart(id))}
								onIncrease={(id) => dispatch(increaseQuantity(id))}
								onDecrease={(id) => dispatch(decreaseQuantity(id))}
								onClear={() => dispatch(clearCart())}
								onPlaceOrder={handlePlaceOrder}
								clearOrderMessage={() => setOrderMessage('')}
								orderMessage={orderMessage}
							/>
						}
					/>
				</Routes>
			</main>
		</Router>
	)
}

export default App

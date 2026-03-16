import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const cart = useSelector((state) => state.shop.cart)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="site-header">
      <div className="logo">My Shop</div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
      <Link className="cart-badge" to="/cart">
        🛒 {totalItems}
      </Link>
    </header>
  )
}

export default Header

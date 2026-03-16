import { useState } from 'react'

export default function CartList({ cart, onRemove, onIncrease, onDecrease, onClear, onPlaceOrder, orderMessage }) {
    const [confirmState, setConfirmState] = useState(null)
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const askRemove = (item) => {
        setConfirmState({ type: 'remove', item })
    }

    const askDecrease = (item) => {
        if (item.quantity === 1) {
            setConfirmState({ type: 'decrease-remove', item })
        } else {
            onDecrease(item.id)
        }
    }

    const closeConfirm = () => setConfirmState(null)

    const confirmAction = () => {
        if (!confirmState) return
        const { type, item } = confirmState
        if (type === 'remove' || type === 'decrease-remove') {
            onRemove(item.id)
        }
        closeConfirm()
    }

    return (
        <>
            <section className="bag">
                <div className="bag-head">
                    <div>
                        <h2>Cart</h2>
                        {cart.length > 0 && (
                            <p>{totalItems} item(s) in cart</p>
                        )}
                    </div>
                </div>

                {orderMessage && <p className="order-msg">{orderMessage}</p>}

                {cart.length === 0 ? (
                    <p className="empty">Cart is Empty.</p>
                ) : (
                    <div className="cart-list">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div>
                                    <strong>{item.title}</strong>
                                    <div className="meta">Qty: {item.quantity} × ${item.price}</div>
                                    <div className="quantity-controls">
                                        <button className="qty-btn" onClick={() => askDecrease(item)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button className="qty-btn" onClick={() => onIncrease(item.id)} disabled={item.quantity >= 10}>+</button>
                                    </div>
                                </div>
                                <div className="cart-actions">
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    <button className="btn btn-danger" onClick={() => askRemove(item)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cart.length > 0 && (
                    <div className="cart-total">Total price: <strong>${totalPrice.toFixed(2)}</strong></div>
                )}
                {cart.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <button className="btn btn-danger" onClick={onClear} disabled={cart.length === 0}>
                            Remove All
                        </button>
                        <button className="btn" onClick={onPlaceOrder} disabled={cart.length === 0}>
                            Place order
                        </button>
                    </div>
                )}
            </section>

            {confirmState && (
                <div className="confirm-overlay">
                    <div className="confirm-modal">
                        <p>
                            {confirmState.type === 'remove' && `Remove ${confirmState.item.title} from the cart?`}
                            {confirmState.type === 'decrease-remove' && `Remove ${confirmState.item.title} from the cart?`}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.4rem' }}>
                            <button className="btn" onClick={closeConfirm}>Cancel</button>
                            <button className="btn btn-danger" onClick={confirmAction}>Yes, remove</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

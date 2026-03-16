// import { useCart } from "../../context/CartContext";
import "./cart.scss";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart,
    decreaseQty,
    removeFromCart
} from "../../app/cartSlice";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";

const CartPage = () => {

    // const { cart, addToCart, decreaseQty, removeFromCart, totalAmount } = useCart();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart.items);

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
  
    if (cart.length === 0) {
        return (

            <div className="empty-cart">

                <div className="empty-icon">🛒</div>

                <h2>Your cart is empty</h2>

                <p>
                    Looks like you haven’t added anything to your cart yet.
                </p>

                <button onClick={() => navigate("/products")}>
                    Continue Shopping
                </button>

            </div>
        );
    }
    const breadcrumbItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Products", path: "/products" },
  { label: "Cart" }
];

    return (
          <Layout breadcrumb={breadcrumbItems}>

        <div className="cart-page">

            <h2>🛒 Your Cart</h2>

            {cart.map((item) => (
                <div className="cart-item" key={item.id}>

                    <img src={item.image} alt={item.title}
                        loading="lazy"
                        decoding="async" />

                    <div className="info">
                        <h4>{item.title}</h4>
                        <p>${item.price}</p>

                        <div className="qty">

                            {/* <button onClick={() => decreaseQty(item.id)}>
                                -
                            </button> */}
                            <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>


                            <span>{item.quantity}</span>

                            {/* <button
                                disabled={item.quantity === 5}
                                onClick={() => addToCart(item)}
                            >
                                +
                            </button> */}
                            <button
                                disabled={item.quantity === 5}
                                onClick={() => dispatch(addToCart(item))}
                            >
                                +
                            </button>

                        </div>


                        {/* <button
                            className="remove"
                            onClick={() => removeFromCart(item.id)}
                        >
                            Remove
                        </button> */}
                        <button onClick={() => dispatch(removeFromCart(item.id))}>
                            Remove
                        </button>


                    </div>

                </div>
            ))}
            <h3>Total: ${total.toFixed(2)}</h3>

        </div>
        </Layout>
    );
};

export default CartPage;

import { useState } from "react";
import useApi from "../../api/useApi";
import { API_URLS } from "../../api/apiUrls";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQty } from "../../app/cartSlice";
import { showNotification } from "../../app/notificationSlice";
import { FaEllipsisV } from "react-icons/fa";
import { memo } from "react";

const ProductCard = ({ product, onEdit, onDelete }) => {

  const navigate = useNavigate();
  const { call: deleteProduct } = useApi(API_URLS.DELETE_PRODUCT);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const cartItem = cart.find((p) => p.id === product.id);
  const qty = cartItem?.quantity || 0;

  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await deleteProduct(Number(product.id));
    } catch (err) {
      console.log("Fake API delete failed");
    }

    onDelete(product.id);
  };

  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.title}
        loading="lazy"
        decoding="async"
      />

      <h4 onClick={() => navigate(`/products/${product.id}`)}>
        {product.title}
      </h4>

      <p>${product.price}</p>

      <div className="actions">

        {qty === 0 ? (

          <button
            className="cart-btn"
            onClick={() => {
              dispatch(addToCart(product));
              dispatch(
                showNotification({
                  message: "Item added to cart",
                  type: "success",
                })
              );
            }}
          >
            Add To Cart
          </button>

        ) : (

          <div className="qty">

            <button onClick={() => dispatch(decreaseQty(product.id))}>
              -
            </button>

            <span>{qty}</span>

            <button
              disabled={qty === 5}
              onClick={() => {
                if (qty === 5) {
                  dispatch(
                    showNotification({
                      message: "Maximum 5 quantity allowed",
                      type: "warning",
                    })
                  );
                  return;
                }
                dispatch(addToCart(product));
              }}
            >
              +
            </button>

          </div>

        )}

        <div className="menu-wrapper">
          <FaEllipsisV onClick={() => setShowMenu(!showMenu)} />

          {showMenu && (
            <div className="menu-dropdown">
              <button onClick={() => onEdit(product)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default memo(ProductCard);

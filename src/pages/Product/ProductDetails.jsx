import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";

import useApi from "../../api/useApi";
import { API_URLS } from "../../api/apiUrls";

import { addToCart, decreaseQty } from "../../app/cartSlice";
import { showNotification } from "../../app/notificationSlice";
const ProductDetails = () => {
  const { id } = useParams();
  const { call } = useApi(API_URLS.GET_PRODUCT_BY_ID);

  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.items);

  const cartItem = cart.find((p) => p.id === product?.id);
  const qty = cartItem?.quantity || 0;

  useEffect(() => {
    call(id, (res) => setProduct(res));
  }, [id]);

  if (!product) return <p>Loading...</p>;
  const breadcrumbItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Products", path: "/products" },
  { label: "Details" }
];

  return (
      <Layout breadcrumb={breadcrumbItems}>

    <div className="product-details-page">

      <div className="details-header">
        <h2>Product Details</h2>

        <div className="cart-icon" onClick={() => navigate("/products/card")}>
          <FaShoppingCart />
          {cart.length > 0 && (
            <span className="badge">{cart.length}</span>
          )}
        </div>
      </div>

      <div className="product-details">

        <div className="details-image">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="details-info">

          <h2>{product.title}</h2>

          <p className="category">{product.category}</p>

          <h3 className="price">${product.price}</h3>

          <p className="description">{product.description}</p>

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

        </div>
      </div>
    </div>
  </Layout>
  );
};

export default ProductDetails;

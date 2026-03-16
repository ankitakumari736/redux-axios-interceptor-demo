import { useEffect, useState, useMemo, useRef } from "react";
import useApi from "../../api/useApi";
import { API_URLS } from "../../api/apiUrls";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import "./product.scss";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";

const ProductsPage = () => {
  const { call: getProducts } = useApi(API_URLS.GET_PRODUCTS);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [sort, setSort] = useState("");

  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res);
  };

  const categories = useMemo(() => {
    return [...new Set(products.map((p) => p.category))];
  }, [products]);

  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleCategory = (val) => {
    setSelectedCategories((prev) =>
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]
    );
  };

  const toggleRating = (val) => {
    setSelectedRatings((prev) =>
      prev.includes(val) ? prev.filter((r) => r !== val) : [...prev, val]
    );
  };

  const togglePrice = (val) => {
    setSelectedPrices((prev) =>
      prev.includes(val) ? prev.filter((p) => p !== val) : [...prev, val]
    );
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedRatings([]);
    setSelectedPrices([]);
  };

  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (selectedCategories.length) {
      data = data.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    if (selectedRatings.length) {
      data = data.filter((p) =>
        selectedRatings.some((r) => p.rating?.rate >= r)
      );
    }

    if (selectedPrices.length) {
      data = data.filter((p) =>
        selectedPrices.some((range) => {
          if (range === "below50") return p.price < 50;
          if (range === "50to200")
            return p.price >= 50 && p.price <= 200;
          if (range === "above200") return p.price > 200;
          return false;
        })
      );
    }

    if (sort === "lowtohigh") {
      data.sort((a, b) => a.price - b.price);
    }

    if (sort === "hightolow") {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [products, selectedCategories, selectedRatings, selectedPrices, sort]);

  const addProductToUI = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProductInUI = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const removeProductFromUI = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const breadcrumbItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Products" },
  ];

  return (
    <Layout breadcrumb={breadcrumbItems}>
      <div className="products-page">

        {/* HEADER */}
        <div className="header">
          <h2>🛒 Products</h2>

          <div className="right-actions">
            <button onClick={() => setOpenModal(true)}>+ Add Product</button>

            <div
              className="cart-icon"
              onClick={() => navigate("/products/card")}
            >
              <FaShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </div>
          </div>
        </div>

        <div className="filter-bar">

          <div className="filter-wrapper" ref={filterRef}>
            <button
              className="filter-btn"
              onClick={() => setShowFilter(!showFilter)}
            >
              Filters ▾
            </button>

            {showFilter && (
              <div className="filter-dropdown">

                <div className="filter-section">
                  <h4>Categories</h4>
                  {categories.map((c) => (
                    <label key={c}>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(c)}
                        onChange={() => toggleCategory(c)}
                      />
                      {c}
                    </label>
                  ))}
                </div>

                <div className="filter-section">
                  <h4>Rating</h4>
                  {[4, 3, 2].map((r) => (
                    <label key={r}>
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(r)}
                        onChange={() => toggleRating(r)}
                      />
                      {r}★ & Above
                    </label>
                  ))}
                </div>

                <div className="filter-section">
                  <h4>Price</h4>

                  <label>
                    <input
                      type="checkbox"
                      checked={selectedPrices.includes("below50")}
                      onChange={() => togglePrice("below50")}
                    />
                    Below $50
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={selectedPrices.includes("50to200")}
                      onChange={() => togglePrice("50to200")}
                    />
                    $50 - $200
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={selectedPrices.includes("above200")}
                      onChange={() => togglePrice("above200")}
                    />
                    Above $200
                  </label>
                </div>

                <button className="clear-btn" onClick={clearAll}>
                  Clear All
                </button>

              </div>
            )}
          </div>

          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="lowtohigh">Price: Low to High</option>
            <option value="hightolow">Price: High to Low</option>
          </select>

        </div>

        <div className="product-grid">
          {filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onEdit={(data) => {
                setEditData(data);
                setOpenModal(true);
              }}
              onDelete={removeProductFromUI}
            />
          ))}
        </div>

        {openModal && (
          <ProductModal
            close={() => {
              setOpenModal(false);
              setEditData(null);
            }}
            onAdd={addProductToUI}
            onUpdate={updateProductInUI}
            editData={editData}
          />
        )}

      </div>
    </Layout>
  );
};

export default ProductsPage;
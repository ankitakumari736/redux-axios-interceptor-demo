import { useEffect, useState } from "react";
import useApi from "../../api/useApi";
import { API_URLS } from "../../api/apiUrls";
import { generateTempId } from "../../utils/generateId";


const ProductModal = ({ close, refresh, editData, onAdd, onUpdate }) => {
  const isEdit = Boolean(editData);

  const { call: addProduct } = useApi(API_URLS.ADD_PRODUCT);
  const { call: updateProduct } = useApi(API_URLS.UPDATE_PRODUCT);

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (isEdit) {
      const res = await updateProduct({ ...form, id: editData.id });
      onUpdate(res);
    } else {
      const res = await addProduct(form);

      const productWithUniqueId = {
        ...res,
        id: generateTempId(),
      };

      onAdd(productWithUniqueId);
    }

    close();
  };



  return (
    <div className="modal-backdrop">

      <div className="modal">

        <h3>{isEdit ? "Edit Product" : "Add Product"}</h3>

        <label>Title</label>
        <input
          name="title"
          placeholder="Enter product title"
          value={form.title}
          onChange={handleChange}
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          placeholder="Enter price"
          value={form.price}
          onChange={handleChange}
        />

        <label>Category</label>
        <input
          name="category"
          placeholder="Enter category"
          value={form.category}
          onChange={handleChange}
        />

        <label>Image URL</label>
        <input
          name="image"
          placeholder="Enter image url"
          value={form.image}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Enter description"
          value={form.description}
          onChange={handleChange}
        />


        <div className="actions">
          <button onClick={handleSubmit}>
            {isEdit ? "Update" : "Add"}
          </button>
          <button onClick={close}>Cancel</button>
        </div>

      </div>

    </div>
  );
};

export default ProductModal;

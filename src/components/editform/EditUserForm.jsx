import { useState, useEffect } from "react";

const EditUserForm = ({ user, onSave, onCancel }) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    company: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        city: user.address?.city || "",
        company: user.company?.name || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...user,
      name: formData.name,
      email: formData.email,
      address: {
        ...user.address,
        city: formData.city,
      },
      company: {
        ...user.company,
        name: formData.company,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">

      <h3>Edit User</h3>

      <label>Name</label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Email</label>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label>City</label>
      <input
        name="city"
        value={formData.city}
        onChange={handleChange}
      />

      <label>Company</label>
      <input
        name="company"
        value={formData.company}
        onChange={handleChange}
      />

      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>

    </form>
  );
};

export default EditUserForm;

"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaCamera } from "react-icons/fa";

export default function AddProduct() {
  const [form, setForm] = useState({
    productName: "",
    category: "",
    price: "",
    inventory: "",
    colors: "",
    status: "available",
    image: null,
    description: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value ?? "",
    }));
  };

  const handleImageChange = (e: any) => {
    setForm((prev) => ({ ...prev, image: e.target.files?.[0] || null }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "image" && e.target.image.files.length > 0) {
        formData.append(key, e.target.image.files[0]);
      } else if (key === "colors") {
        formData.append(key, String(value));
      } else {
        formData.append(key, String(value));
      }
    });

    try {
      const response = await fetch("/api/addProduct", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add product");
      }
      toast.success("✅ Product added successfully!");
      setForm({
        productName: "",
        category: "",
        price: "",
        inventory: "",
        colors: "",
        status: "available",
        image: null,
        description: "",
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg flex flex-col gap-4"
      >
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={form.productName}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
       <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="Mens">Mens</option>
          <option value="Womens">Womens</option>
          <option value="Kids">Kids</option>
          <option value="Sales">Sales</option>
          <option value="SNKRS">SNKRS</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="inventory"
          placeholder="Inventory"
          value={form.inventory}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="colors"
          placeholder="Colors (comma-separated)"
          value={form.colors}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="available">Available</option>
          <option value="out of stock">Out of Stock</option>
          <option value="discontinued">Discontinued</option>
        </select>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          required
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Add Product
        </button>
      </form>
    </>
  );
}

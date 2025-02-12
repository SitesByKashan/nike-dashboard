"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaCamera } from "react-icons/fa";

export default function AddProduct() {
const [selectedImage, setSelectedImage] = useState<string | null>(null);
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

const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files.length > 0) {
    setSelectedImage(event.target.files[0].name); // Store image name
  }
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
  
      // ✅ Reset form fields
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
  
      // ✅ Reset selected image state
      setSelectedImage(null);
  
      // ✅ Reset file input field manually
      if (e.target.image) {
        e.target.image.value = "";
      }
  
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  

  return (
    <>
<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6 rounded-3xl">
  <div className="bg-white/10 backdrop-blur-lg shadow-2xl p-10 rounded-3xl border border-white/20 max-w-lg w-full">
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      <h2 className="text-3xl font-extrabold text-center mb-2 text-white tracking-wide">
        Add New Product
      </h2>

      <input
        type="text"
        name="productName"
        placeholder="Product Name"
        value={form.productName}
        onChange={handleChange}
        required
        className="border border-gray-300 p-4 rounded-xl focus:ring-4 focus:ring-gray-500/50 text-gray-900 bg-white shadow-sm placeholder-gray-500"
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
        className="border border-gray-300 p-4 rounded-xl focus:ring-4 focus:ring-gray-500/50 text-gray-900 bg-white shadow-sm"
      >
        <option value="" disabled>Select Category</option>
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
        className="border border-gray-300 p-4 rounded-xl focus:ring-4 focus:ring-gray-500/50 text-gray-900 bg-white shadow-sm"
      />

      <input
        type="number"
        name="inventory"
        placeholder="Inventory"
        value={form.inventory}
        onChange={handleChange}
        required
        className="border border-gray-300 p-4 rounded-xl focus:ring-4 focus:ring-gray-500/50 text-gray-900 bg-white shadow-sm"
      />

      <input
        type="text"
        name="colors"
        placeholder="Colors (comma-separated)"
        value={form.colors}
        onChange={handleChange}
        className="border border-gray-300 p-4 rounded-xl focus:ring-4 focus:ring-gray-500/50 text-gray-900 bg-white shadow-sm"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border border-gray-300 p-4 rounded-xl focus:ring-4 focus:ring-gray-500/50 text-gray-900 bg-white shadow-sm"
      >
        <option value="available">Available</option>
        <option value="out of stock">Out of Stock</option>
        <option value="discontinued">Discontinued</option>
      </select>

      <div className="relative flex items-center justify-center border border-gray-300 p-4 rounded-xl text-gray-900 bg-white shadow-sm cursor-pointer hover:bg-gray-100 transition">
            <input
              type="file"
              name="image"
              id="imageUpload"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              required
            />
            <FaCamera className="w-6 h-6 text-gray-700 mr-2" />
            <span className="text-gray-700">
              {selectedImage ? selectedImage : "Upload Image"}
            </span>
          </div>

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border border-gray-300 p-4 rounded-xl focus:ring-4 focus:ring-gray-500/50 text-gray-900 bg-white shadow-sm h-24 resize-none"
      />

      <button
        type="submit"
        className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold p-4 rounded-xl hover:opacity-90 transition duration-300 shadow-lg text-lg"
      >
        🚀 Add Product
      </button>
    </form>
  </div>
</div>


    </>
  );
}

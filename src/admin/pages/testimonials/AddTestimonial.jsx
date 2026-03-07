import React, { useState, useRef } from "react";
import http from "../../../service/http";
import { Editor } from "primereact/editor";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { toast } from "react-toastify";

const AddTestimonial = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: 5,
    status: 1,
  });

  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("No file chosen");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const photoInputRef = useRef(null);

  // Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Image picker
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPhoto(file);
      setPhotoName(file.name);
    }
  };

  // Submit
  const handleSubmit = async () => {
    if (!formData.name || !formData.message || !photo) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      formDataToSend.append("image", photo);

      const response = await http.post("/testimonials/create", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        toast.success("Testimonial added successfully!");
        handleReset();
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error(error.response?.data?.message || "Failed to add testimonial");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset
  const handleReset = () => {
    setFormData({
      name: "",
      message: "",
      rating: 5,
      status: 1,
    });

    setPhoto(null);
    setPhotoName("No file chosen");

    if (photoInputRef.current) photoInputRef.current.value = "";
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-normal text-gray-700 mb-6">
          Add Testimonial
        </h1>

        {/* Name */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter name"
          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-2">
            Message <span className="text-red-500">*</span>
          </label>

          <Editor
            value={formData.message}
            style={{ height: "200px" }}
            onTextChange={(e) =>
              setFormData({ ...formData, message: e.htmlValue })
            }
          />
        </div>

        {/* Rating */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">Rating</label>

          <select
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value={5}>★★★★★ (5)</option>
            <option value={4}>★★★★ (4)</option>
            <option value={3}>★★★ (3)</option>
            <option value={2}>★★ (2)</option>
            <option value={1}>★ (1)</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>

        {/* Image */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-2">
            Image <span className="text-red-500">*</span>
          </label>

          <input
            type="file"
            ref={photoInputRef}
            onChange={handlePhotoChange}
            className="hidden"
            id="photo-upload"
            accept="image/*"
          />

          <label
            htmlFor="photo-upload"
            className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
          >
            Choose File
          </label>

          <span className="ml-3 text-sm text-gray-500">{photoName}</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
          >
            Reset
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 disabled:bg-teal-300"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTestimonial;

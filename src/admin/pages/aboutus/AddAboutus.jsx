import React, { useState, useRef } from "react";
import http from "../../../service/http";
import { Editor } from "primereact/editor";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const AddAboutus = () => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    companies_count: 0,
    employee_count: 0,
    nations_count: 0,

    description: "",
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

  // Submit Data
  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.summary ||
      !photo ||
      !formData.description
    ) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      formDataToSend.append("image", photo);

      const response = await http.post("/aboutus/create", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        alert("About Us created successfully!");
        handleReset();
      }
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Failed to submit About Us");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset
  const handleReset = () => {
    setFormData({
      title: "",
      summary: "",
      companies_count: 0,
      employee_count: 0,
      nations_count: 0,

      description: "",
    });

    setPhoto(null);
    setPhotoName("No file chosen");

    if (photoInputRef.current) photoInputRef.current.value = "";
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-normal text-gray-700 mb-6">
          Add About Us
        </h1>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter title"
          />
        </div>

        {/* Summary */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">
            Summary <span className="text-red-500">*</span>
          </label>

          <Editor
            style={{
              height: "200px",
              border: "1px solid #D9D4C6",
              // borderRadius: "8px",
            }}
            value={formData.summary}
            onTextChange={(e) =>
              setFormData({ ...formData, summary: e.htmlValue })
            }
          />
        </div>

        {/* Counts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-sm">Companies Count</label>
            <input
              type="number"
              name="companies_count"
              value={formData.companies_count}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm">Employee Count</label>
            <input
              type="number"
              name="employee_count"
              value={formData.employee_count}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm">Nations Count</label>
            <input
              type="number"
              name="nations_count"
              value={formData.nations_count}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Button text */}
        {/* <div className="mb-6">
          <label className="text-sm">Button Text</label>
          <input
            type="text"
            name="button_text"
            value={formData.button_text}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Learn More"
          />
        </div> */}

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>

          <Editor
            value={formData.description}
            style={{ height: "200px" }}
            onTextChange={(e) =>
              setFormData({ ...formData, description: e.htmlValue })
            }
          />
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

export default AddAboutus;

import React, { useState, useRef } from "react";
import http from "../../../service/http";

import { Editor } from "primereact/editor";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { toast } from "react-toastify";

const AddChairmanMsg = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: 1,
  });
  const [photo, setPhoto] = useState(null);
  const [mobileImage, setMobileImage] = useState(null);
  const [photoName, setPhotoName] = useState("No file chosen");
  const [mobileName, setMobileName] = useState("No file chosen");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const photoInputRef = useRef(null);
  const mobileInputRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoName(file.name);
    }
  };

  const handleMobileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMobileImage(file);
      setMobileName(file.name);
    }
  };

  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handleSubmit = async () => {
    if (!formData.title || !photo || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);

      formDataToSend.append("active", formData.status);

      if (photo) {
        formDataToSend.append("image", photo);
      }

      const token = localStorage.getItem("authToken");

      const response = await http.post("/chairmanmsg", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status == 201) {
        const result = await response.data;
        toast.success("Chairman msg created successfully!");
        handleReset();
      } else {
        const error = await response.data;
        toast.error(
          `Error: ${error.message || "Failed to create Chairman msg."}`
        );
      }
    } catch (error) {
      console.error("Error submitting:", error);
      toast.error(
        error.response.data.message ||
          "An error occurred while submitting the form"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      status: 1,
    });
    setPhoto(null);
    setMobileImage(null);
    setPhotoName("No file chosen");
    setMobileName("No file chosen");

    if (photoInputRef.current) photoInputRef.current.value = "";
    if (mobileInputRef.current) mobileInputRef.current.value = "";
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-normal text-gray-700 mb-6">
            Add Service
          </h1>

          <div>
            {/* Title Field */}
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter Name"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Description Field */}
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">
                Description
              </label>

              <Editor
                style={{
                  height: "200px",
                  border: "1px solid #D9D4C6",
                  // borderRadius: "8px",
                }}
                value={formData.description}
                onTextChange={(e) =>
                  setFormData({ ...formData, description: e.htmlValue })
                }
              />
            </div>

            {/* Photo Field */}
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">
                Photo <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  ref={photoInputRef}
                  onChange={handlePhotoChange}
                  accept="image/*"
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300 transition-colors"
                >
                  Choose File
                </label>
                <span className="ml-3 text-sm text-gray-500">{photoName}</span>
              </div>
            </div>

            {/* Status Field */}
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition-colors font-medium"
              >
                Reset
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors font-medium disabled:bg-teal-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .toolbar-btn {
          padding: 4px 8px;
          border: 1px solid #d1d5db;
          background: white;
          border-radius: 3px;
          cursor: pointer;
          font-size: 14px;
          min-width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .toolbar-btn:hover {
          background: #f3f4f6;
        }
        .toolbar-select {
          padding: 4px 8px;
          border: 1px solid #d1d5db;
          border-radius: 3px;
          font-size: 14px;
          height: 28px;
          background: white;
          cursor: pointer;
        }
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default AddChairmanMsg;

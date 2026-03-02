import React, { useState, useEffect, useRef } from "react";
import http from "../../../service/http";
import { useParams } from "react-router-dom";

import { Editor } from "primereact/editor";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { toast } from "react-toastify";

const EditSettings = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    shortdescription: "",
    description: "",
    address: "",
    status: 1,
  });

  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("No file chosen");
  const [mobileName, setMobileName] = useState("No file chosen");

  const [mobileImage, setMobileImage] = useState(null);

  const [preview, setPreview] = useState(null);
  const [mobilePreview, setMobilePreview] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const photoInputRef = useRef(null);
  const mobileInputRef = useRef(null);

  useEffect(() => {
    const loadBanner = async () => {
      try {
        const res = await http.get(`/allsettings/1`);
        const data = res.data.data;

        setFormData({
          email: data.email,
          phone: data.phone,
          shortdescription: data.shortdescription,
          description: data.description,
          address: data.address,
          status: data.active ? 1 : 0,
        });

        setPreview(data.image_url);
        setMobilePreview(data.logo_img);
      } catch (error) {
        console.error("Error loading banner:", error);
      }
    };

    loadBanner();
  }, []);

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
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleMobileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMobileImage(file);
      setMobileName(file.name);
      setMobilePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.email ||
      !formData.description ||
      !formData.phone ||
      !formData.address
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("shortdescription", formData.shortdescription);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("active", formData.status);

      if (photo) formDataToSend.append("image_url", photo);

      if (mobileImage) formDataToSend.append("logo_img", mobileImage);

      const res = await http.put(`/allsettings/1`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        toast.success("Settings updated successfully!");
      }
    } catch (error) {
      console.error("Error updating:", error);
      toast.error(error.response.data.message || "Failed to update banner");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-normal text-gray-700 mb-6">Settings</h1>

          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email Address"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter Phone Number"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter Address"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-2">
              Short Description
            </label>

            <Editor
              style={{
                height: "200px",
                border: "1px solid #D9D4C6",
                // borderRadius: "8px",
              }}
              value={formData.shortdescription}
              onTextChange={(e) =>
                setFormData({ ...formData, shortdescription: e.htmlValue })
              }
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-2">
              Description <span className="text-red-500">*</span>
            </label>

            <Editor
              style={{ height: "200px" }}
              value={formData.description}
              onTextChange={(e) =>
                setFormData({ ...formData, description: e.htmlValue })
              }
            />
          </div>

          {/* Photo */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-2">Photo</label>

            {/* Current Preview */}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-48 h-28 object-cover rounded mb-3 border"
              />
            )}

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
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded cursor-pointer"
              >
                Choose File
              </label>
              <span className="ml-3 text-sm text-gray-500">{photoName}</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-2">Logo</label>

            {/* Current Preview */}
            {mobilePreview && (
              <img
                src={mobilePreview}
                alt="Preview"
                className="w-48 h-28 object-cover rounded mb-3 border"
              />
            )}

            <div className="flex items-center">
              <input
                type="file"
                ref={mobileInputRef}
                onChange={handleMobileImageChange}
                accept="image/*"
                className="hidden"
                id="mobile-upload"
              />
              <label
                htmlFor="mobile-upload"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300 transition-colors"
              >
                Choose File
              </label>
              <span className="ml-3 text-sm text-gray-500">{mobileName}</span>
            </div>
          </div>

          {/* Status */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
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

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 disabled:bg-teal-300"
          >
            {isSubmitting ? "Updating..." : "Update Settings"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSettings;

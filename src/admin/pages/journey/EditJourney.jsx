import React, { useState, useEffect, useRef } from "react";
import http from "../../../service/http";
import { useParams } from "react-router-dom";

import { Editor } from "primereact/editor";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { toast } from "react-toastify";

const EditJourney = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",

    description: "",
    status: 1, // or true (backend accepts both)
  });

  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("No file chosen");
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const photoInputRef = useRef(null);

  useEffect(() => {
    const loadBanner = async () => {
      try {
        const res = await http.get(`/journeys/${id}`);
        const data = res.data;

        setFormData({
          title: data.title || "",

          description: data.description || "",
          status: data.active ? 1 : 0,
        });
      } catch (error) {
        console.error("Error loading banner:", error);
      }
    };

    loadBanner();
  }, [id]);

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

  // ---------------------------------------
  // SUBMIT UPDATE
  // ---------------------------------------
  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);

      formDataToSend.append("year_range", formData.year_range);
      formDataToSend.append("step_number", formData.step_number);
      formDataToSend.append("subtitle", formData.subtitle);

      formDataToSend.append("description", formData.description);
      formDataToSend.append("active", formData.status);

      const res = await http.put(`/journeys/${id}`, {
        title: formData.title,
        description: formData.description,
        active: formData.status,
      });

      if (res.status === 200) {
        toast.success("Journey updated successfully!");
      }
    } catch (error) {
      console.error("Error updating:", error);
      toast.error(error.response.data.message || "Failed to update journey");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-normal text-gray-700 mb-6">
            Edit Journey
          </h1>

          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
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
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditJourney;

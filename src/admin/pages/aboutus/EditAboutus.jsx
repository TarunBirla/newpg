import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import http from "../../../service/http";
import { Editor } from "primereact/editor";

const EditAboutus = () => {
  const { id } = useParams();
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
  const [currentImage, setCurrentImage] = useState(null); // existing image
  const [isSubmitting, setIsSubmitting] = useState(false);

  const photoInputRef = useRef(null);

  // Fetch existing data
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await http.get(`/aboutus/single`);
        const data = res.data;

        setFormData({
          title: data.title,
          summary: data.summary,
          companies_count: data.companies_count,
          employee_count: data.employee_count,
          nations_count: data.nations_count,
          description: data.description,
        });

        setCurrentImage(data.image_url);
      } catch (err) {
        console.error("Error loading About Us:", err);
        alert("Failed to load data");
      }
    };

    fetchAbout();
  }, []);

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

  // Submit Update
  const handleSubmit = async () => {
    if (!formData.title || !formData.summary || !formData.description) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Only append image if user selected a new one
      if (photo) {
        formDataToSend.append("image", photo);
      }

      const response = await http.put(
        `/aboutus/update?id=${id}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        alert("About Us updated successfully!");
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("Failed to update About Us");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-normal text-gray-700 mb-6">
          Edit About Us
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
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        {/* Summary */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-1">
            Summary <span className="text-red-500">*</span>
          </label>
          <Editor
            style={{ height: "200px" }}
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
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="text-sm">Employee Count</label>
            <input
              type="number"
              name="employee_count"
              value={formData.employee_count}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="text-sm">Nations Count</label>
            <input
              type="number"
              name="nations_count"
              value={formData.nations_count}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>

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

        {/* Current Image Preview */}
        {currentImage && (
          <div className="mb-6">
            <p className="text-sm text-gray-700 mb-2">Current Image:</p>
            <img
              src={currentImage}
              alt="Current"
              className="h-32 rounded shadow"
            />
          </div>
        )}

        {/* New Image Upload */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-2">
            Change Image
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
            Choose New Image
          </label>

          <span className="ml-3 text-sm text-gray-500">{photoName}</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
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

export default EditAboutus;

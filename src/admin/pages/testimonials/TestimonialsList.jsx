import React, { useEffect, useState } from "react";
import { Trash2, Plus, Edit, Star } from "lucide-react";
import http from "../../../service/http";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

export default function TestimonialList() {
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await http.get("/testimonials");
      setTestimonials(res.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const filteredTestimonials =
    testimonials?.filter((item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  const totalEntries = filteredTestimonials.length;
  const totalPages = Math.ceil(totalEntries / entries);

  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, totalEntries);

  const currentTestimonials = filteredTestimonials.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, entries]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;

    try {
      setDeleteLoadingId(id);

      await http.delete(`/testimonials/delete/${id}`);

      toast.success("Testimonial deleted successfully");
      fetchTestimonials();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to delete testimonial",
      );
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, i) => (
      <Star key={i} size={14} fill="#facc15" stroke="#facc15" />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-semibold">Testimonial List</h1>

          <button
            onClick={() => navigate("/dashboard/testimonials/add")}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            <Plus size={18} />
            Add Testimonial
          </button>
        </div>

        {/* Controls */}
        <div className="flex justify-between p-6">
          <div className="flex items-center gap-2">
            Show
            <select
              value={entries}
              onChange={(e) => setEntries(Number(e.target.value))}
              className="border px-2 py-1 rounded"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            entries
          </div>

          <div className="flex items-center gap-2">
            Search:
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">S.N.</th>
                <th className="p-3 text-left">Photo</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Rating</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-6">
                    <RotatingLines width="30" strokeColor="#000" />
                  </td>
                </tr>
              ) : currentTestimonials.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-6">
                    No testimonials found
                  </td>
                </tr>
              ) : (
                currentTestimonials.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{item.id}</td>

                    <td className="p-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </td>

                    <td className="p-3">{item.name}</td>

                    <td className="p-3 max-w-xs">
                      <div
                        className="truncate"
                        dangerouslySetInnerHTML={{ __html: item.message }}
                      />
                    </td>

                    <td className="p-3  gap-1">
                      <div className="flex gap-1 items-center">
                        {renderStars(item.rating)}
                      </div>
                    </td>

                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/testimonials/edit/${item.id}`)
                        }
                        className="bg-gray-900 text-white p-2 rounded-full"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deleteLoadingId === item.id}
                        className="bg-red-500 text-white p-2 rounded-full"
                      >
                        {deleteLoadingId === item.id ? (
                          <RotatingLines width="18" strokeColor="#fff" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-6 border-t">
          <div>
            Showing {startIndex + 1} to {endIndex} of {totalEntries}
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="border px-3 py-1 rounded"
            >
              Prev
            </button>

            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={index} className="px-2">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === page ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border px-3 py-1 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

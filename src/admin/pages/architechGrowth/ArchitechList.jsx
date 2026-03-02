import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Edit } from "lucide-react";
import http from "../../../service/http";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

export default function ArchitechList() {
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [architech, setArchitech] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetcharchitech = async () => {
    try {
      setLoading(true);
      const res = await http.get("/architech");
      setArchitech(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching architech:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetcharchitech();
  }, []);

  const filteredarchitech =
    architech?.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    ) || [];

  // Pagination calculations
  const totalEntries = filteredarchitech.length;
  const totalPages = Math.ceil(totalEntries / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, totalEntries);
  const currentarchitech = filteredarchitech.slice(startIndex, endIndex);

  // Reset to first page when search or entries change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, entries]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
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

  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  const handleDeletearchitech = async (id) => {
    if (!window.confirm("Are you sure you want to delete this architech?"))
      return;

    try {
      setDeleteLoadingId(id);
      await http.delete(`/architech/${id}`);

      toast.success("architech deleted successfully!");
      fetcharchitech();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response.data.message || "Failed to delete architech.");
    } finally {
      setDeleteLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <style>{`
        .image-zoom-container {
          overflow: hidden;
          border-radius: 4px;
          display: inline-block;
        }
        
        .image-zoom {
          transition: transform 0.3s ease;
          display: block;
          width: 100%;
          
        }
        
        .image-zoom-container:hover .image-zoom {
          transform: scale(1.2);
        }
        
        .table-container {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        
        .table-container::-webkit-scrollbar {
          height: 8px;
        }
        
        .table-container::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .table-container::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        
        .table-container::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        .responsive-table {
          min-width: 800px;
        }

        @media (max-width: 768px) {
          .responsive-table {
            min-width: 700px;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 md:p-6 border-b border-gray-200">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            Architech List
          </h1>
          <button
            onClick={() => navigate("/dashboard/architech/add")}
            className="flex items-center gap-2 cursor-pointer bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center"
          >
            <Plus size={18} />
            Add Architech
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 md:p-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <select
              value={entries}
              onChange={(e) => setEntries(Number(e.target.value))}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-600">entries</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm text-gray-600">Search:</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 flex-1 sm:w-64"
            />
          </div>
        </div>

        {/* Table - Always visible with horizontal scroll on mobile */}
        <div className="table-container">
          <table className="w-full responsive-table">
            <thead className="bg-gray-50 border-y border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  S.N.
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Designation
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Photo
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="9" className="px-4 py-4 text-center">
                    <div className="flex justify-center items-center w-full h-20">
                      <RotatingLines
                        strokeColor="#1E1E1E"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="20"
                        visible={true}
                      />
                    </div>
                  </td>
                </tr>
              ) : currentarchitech.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-4 text-center">
                    No data available
                  </td>
                </tr>
              ) : (
                currentarchitech.map((architech) => (
                  <tr
                    key={architech.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {architech.id}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {architech.name}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-800">
                      {architech.designation}
                    </td>

                    <td
                      className="max-w-xs truncate text-sm "
                      dangerouslySetInnerHTML={{
                        __html: architech.description,
                      }}
                    ></td>
                    <td className="px-4 py-4">
                      <div className="image-zoom-container">
                        <img
                          src={architech.image_url}
                          alt={architech.title}
                          className="image-zoom h-10 w-auto object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold 
                      ${
                        architech.active === true
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                          : "bg-red-100 text-red-700 border border-red-300"
                      }`}
                      >
                        {architech.active === true ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            navigate(
                              `/dashboard/architech/edit/${architech.id}`
                            )
                          }
                          className="bg-gray-900 cursor-pointer text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        {/* <button
                          onClick={() => handleDeletearchitech(architech.id)}
                          className="bg-red-500 cursor-pointer text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button> */}
                        <button
                          className={`bg-red-500  h-8 w-8 cursor-pointer flex items-center justify-center  text-white p-2 rounded-full hover:bg-red-600 transition-colors
                                                ${
                                                  deleteLoadingId ===
                                                  architech.id
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                                }`}
                          disabled={deleteLoadingId === architech.id}
                          onClick={() => handleDeletearchitech(architech.id)}
                        >
                          {deleteLoadingId === architech.id ? (
                            <RotatingLines
                              width="20"
                              strokeColor="#fff"
                              visible={true}
                              strokeWidth="5"
                            />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot className="bg-gray-50 border-t border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  S.N.
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Title
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Photo
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Footer with Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 md:p-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {endIndex} of {totalEntries} entries
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-1 flex-wrap justify-center">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 py-1.5 text-gray-500"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1.5 text-sm border rounded transition-colors ${
                      currentPage === page
                        ? "bg-blue-500 text-white border-blue-500"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

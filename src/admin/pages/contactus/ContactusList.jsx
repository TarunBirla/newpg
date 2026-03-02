import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import http from "../../../service/http";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

export default function ContactusList() {
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [aboutus, setAboutus] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchaboutus = async () => {
    try {
      setLoading(true);
      const res = await http.get("/contacus");
      setAboutus(res.data?.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching aboutus:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchaboutus();
  }, []);

  const filteredaboutus =
    aboutus?.filter(
      (about) =>
        about?.name?.toLowerCase().includes(search.toLowerCase()) ||
        about?.email?.toLowerCase().includes(search.toLowerCase()) ||
        about?.phone_number?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  // Pagination calculations
  const totalEntries = filteredaboutus.length;
  const totalPages = Math.ceil(totalEntries / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, totalEntries);
  const currentaboutus = filteredaboutus.slice(startIndex, endIndex);

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

  const handleDeleteabout = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contactus?"))
      return;

    try {
      setDeleteLoadingId(id);
      await http.delete(`/contacus/${id}`);

      toast.success("Contactus deleted successfully!");
      fetchaboutus();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response.data.message || "Failed to delete Contactus.");
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [showRepliesModal, setShowRepliesModal] = useState(false);
  const [selectedReplies, setSelectedReplies] = useState([]);

  const [selectedContactId, setSelectedContactId] = useState(null);
  const handleSubmitReply = async () => {
    try {
      setReplyLoading(true);

      await http.post("contacus/reply", {
        contact_id: selectedContactId,
        reply_message: replyMessage,
      });

      toast.success("Reply sent successfully!");

      setReplyLoading(false);
      setShowReplyModal(false);
      setReplyMessage("");

      // Refresh list if needed
      fetchaboutus();
    } catch (error) {
      console.error("Reply Error:", error);
      toast.error(error.response.data.message || "Failed to send reply.");
      setReplyLoading(false);
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
            Contact Us List
          </h1>
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
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Message
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
              ) : currentaboutus.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-4 py-4 text-center">
                    No queries found
                  </td>
                </tr>
              ) : (
                currentaboutus.map((about, index) => (
                  <tr
                    key={about.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {about.name}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-800">
                      {about.email}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">
                      {about.phone_number}
                    </td>

                    <td
                      className="max-w-xs truncate text-sm "
                      dangerouslySetInnerHTML={{ __html: about?.message }}
                    ></td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="bg-blue-500 cursor-pointer text-xs font-normal text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                          onClick={() => {
                            setSelectedContactId(about.id);
                            setShowReplyModal(true);
                          }}
                        >
                          Reply
                        </button>

                        {about.replies && about.replies.length > 0 && (
                          // Show View Task button if tasks exist
                          <button
                            className="bg-green-500 cursor-pointer text-xs font-normal text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                            onClick={() => {
                              setSelectedContactId(about.id);
                              setSelectedReplies(about.replies);
                              setShowRepliesModal(true);
                            }}
                          >
                            <Eye size={16} />
                          </button>
                        )}

                        <button
                          className={`bg-red-500  h-8 w-8 cursor-pointer flex items-center justify-center  text-white p-2 rounded-full hover:bg-red-600 transition-colors
                        ${
                          deleteLoadingId === about.id
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                          disabled={deleteLoadingId === about.id}
                          onClick={() => handleDeleteabout(about.id)}
                        >
                          {deleteLoadingId === about.id ? (
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
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Message
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
      {showReplyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full  md:max-w-xl  max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-medium mb-4">Reply to Contact</h2>

            {/* Reply Editor */}
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Write your reply..."
              className="w-full border border-gray-300 rounded p-3 h-50 text-sm font-normal"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-1 cursor-pointer bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => {
                  setShowReplyModal(false);
                  setReplyMessage("");
                }}
              >
                Cancel
              </button>

              <button
                className="px-4 py-1 h-8 w-32 cursor-pointer flex justify-center items-center bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleSubmitReply}
                disabled={!replyMessage || replyLoading}
              >
                {replyLoading ? (
                  <RotatingLines
                    strokeColor="#ffffff"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="20"
                    visible={true}
                  />
                ) : (
                  "Send Reply"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {showRepliesModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-5 rounded shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Replies</h2>

            {selectedReplies.length === 0 ? (
              <p className="text-gray-500 text-sm">No replies found.</p>
            ) : (
              selectedReplies.map((rep, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded py-3 px-3 mb-3 shadow-sm "
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-500">
                      {new Date(rep.createdAt).toLocaleString()}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                      {rep.replied_by}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 whitespace-pre-line">
                    {rep.reply_message}
                  </p>
                </div>
              ))
            )}

            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-1 bg-gray-300 rounded cursor-pointer hover:bg-gray-400"
                onClick={() => setShowRepliesModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

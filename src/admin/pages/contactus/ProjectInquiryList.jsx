import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import http from "../../../service/http";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

export default function ProjectInquiryList() {
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await http.get("/projectinquiry");
      setInquiries(res.data?.data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const filteredInquiries =
    inquiries?.filter(
      (item) =>
        item?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.email?.toLowerCase().includes(search.toLowerCase()) ||
        item?.project_type?.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  // Pagination
  const totalEntries = filteredInquiries.length;
  const totalPages = Math.ceil(totalEntries / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = Math.min(startIndex + entries, totalEntries);

  const currentInquiries = filteredInquiries.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, entries]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;

    try {
      setDeleteLoadingId(id);

      await http.delete(`/projectinquiry/${id}`);

      toast.success("Inquiry deleted successfully");
      fetchInquiries();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete inquiry");
    } finally {
      setDeleteLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow">
        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-semibold">Project Inquiries</h1>
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
            Search
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">S.N.</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Project Type</th>
                <th className="p-3 text-left">Budget</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center p-6">
                    <RotatingLines width="30" strokeColor="#000" />
                  </td>
                </tr>
              ) : currentInquiries.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-6">
                    No inquiries found
                  </td>
                </tr>
              ) : (
                currentInquiries.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{startIndex + index + 1}</td>

                    <td className="p-3">{item.name}</td>

                    <td className="p-3">{item.email}</td>

                    <td className="p-3">{item.project_type}</td>

                    <td className="p-3">{item.budget}</td>

                    <td
                      className="p-3 max-w-xs truncate"
                      dangerouslySetInnerHTML={{ __html: item.message }}
                    />

                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deleteLoadingId === item.id}
                        className="bg-red-500 h-8 w-8 text-white p-2 rounded-full"
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

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}

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

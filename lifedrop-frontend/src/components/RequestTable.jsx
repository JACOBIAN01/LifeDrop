import { useAllRequests } from "../Hooks/ManageRequest";
import LoadingText from "./Loading";
import { HeartPulse } from "lucide-react";

export default function RequestTable() {
  const { requests, loading, error } = useAllRequests();

  return (
    <div className="relative mt-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <HeartPulse size={22} className="text-red-500" /> Blood Requests
        </h2>
        {loading && <LoadingText text="Fetching requests..." />}
      </div>

      {/* Error / Empty States */}
      {error && (
        <p className="p-6 text-red-500 font-medium">
          ⚠️ Error loading requests.
        </p>
      )}
      {!loading && requests.length === 0 && (
        <p className="p-6 text-gray-500 font-medium">
          No blood requests available.
        </p>
      )}

      {/* Table */}
      {requests.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "Email", "Blood Group", "City", "State"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-700 tracking-wide"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((req) => (
                <tr
                  key={req.id}
                  className="hover:bg-gradient-to-r from-rose-50 to-white transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {req.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{req.email}</td>
                  <td className="px-6 py-4 font-bold text-red-600">
                    {req.bloodGroupNeeded}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{req.city}</td>
                  <td className="px-6 py-4 text-gray-700">{req.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

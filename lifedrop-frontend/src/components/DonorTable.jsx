import { useAllDonors } from "../Hooks/DonorStatus";
import LoadingText from "./Loading";
import { Users } from "lucide-react";

export default function DonorsTable() {
  const { donors, loading, error } = useAllDonors();

  return (
    <div className="relative mt-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Users size={22} className="text-red-500" /> Donors Directory
        </h2>
        {loading && <LoadingText text="Fetching donors..." />}
      </div>

      {/* Error / Empty States */}
      {error && (
        <p className="p-6 text-red-500 font-medium">⚠️ Error loading donors.</p>
      )}
      {!loading && donors.length === 0 && (
        <p className="p-6 text-gray-500 font-medium">
          No donors found. Please check back later.
        </p>
      )}

      {/* Table */}
      {donors.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "Email", "Blood Group", "City", "Phone"].map(
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
              {donors.map((donor) => (
                <tr
                  key={donor.id}
                  className="hover:bg-gradient-to-r from-red-50 to-white transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {donor.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{donor.email}</td>
                  <td className="px-6 py-4 font-bold text-red-600">
                    {donor.bloodType}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{donor.city}</td>
                  <td className="px-6 py-4 text-gray-700">{donor.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

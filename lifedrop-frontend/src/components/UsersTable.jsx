import useUsers from "../Hooks/Users";
import LoadingText from "../components/Loading";
import { Users } from "lucide-react";

export default function UsersTable() {
  const { users, loading, error } = useUsers();

  return (
    <div className="relative mt-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Users size={22} className="text-indigo-500" /> User Management
        </h2>
        {loading && <LoadingText text="Fetching users..." />}
      </div>

      {/* Error / Empty States */}
      {error && (
        <p className="p-6 text-red-500 font-medium">⚠️ Error loading users.</p>
      )}
      {!loading && users.length === 0 && (
        <p className="p-6 text-gray-500 font-medium">No users found.</p>
      )}

      {/* Table */}
      {users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "Email", "User Type"].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-700 tracking-wide"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gradient-to-r from-indigo-50 to-white transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.userType === "admin"
                          ? "bg-indigo-100 text-indigo-700"
                          : user.userType === "donor"
                          ? "bg-red-100 text-red-700"
                          : user.userType === "org"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.userType}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

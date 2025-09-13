export default function DeleteConfirmation({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-40">
      <div className="bg-white rounded-lg p-6 shadow-xl shadow-gray-500 w-80 text-center">
        <h2 className="text-lg font-semibold text-red-600 mb-4">
          Confirm Delete
        </h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this request?
        </p>
        <div className="flex justify-around">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

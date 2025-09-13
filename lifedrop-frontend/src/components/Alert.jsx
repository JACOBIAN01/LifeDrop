


const MessageBox = ({ message, type, onClose }) => {
  if (!message) return null;

  const bgColor = type === "success" ? "bg-green-100" : "bg-red-100";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";
  const borderColor =
    type === "success" ? "border-green-400" : "border-red-400";

  return (
    <div
      className={`p-4 mb-4 rounded-lg border-2 ${bgColor} ${borderColor} flex justify-between items-center`}
    >
      <p className={`font-semibold ${textColor}`}>{message}</p>
      <button onClick={onClose} className={`text-xl font-bold text-gray-600`}>
        &times;
      </button>
    </div>
  );
};

export default MessageBox;
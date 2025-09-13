export default function LoadingText({ text = "Loading" }) {
  return (
    <div className="flex justify-center items-center min-h-[20px]">
      <p className="text-lg font-semibold text-gray-700">
        {text}
        <span className="animate-pulse">.</span>
        <span className="animate-pulse delay-200">.</span>
        <span className="animate-pulse delay-400">.</span>
      </p>
    </div>
  );
}

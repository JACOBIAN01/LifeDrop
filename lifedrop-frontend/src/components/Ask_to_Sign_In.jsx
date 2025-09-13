import Navbar from "./Navbar";
export default function Ask_to_Sign_In() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white shadow-xl rounded-3xl p-8 text-center">
          <h1 className="text-3xl font-bold text-rose-500 mb-4">
            Please Sign in to Continue
          </h1>
          <p className="text-gray-600">
            You need to be signed in to request blood or access this page.
          </p>
        </div>
      </div>
    </>
  );
}
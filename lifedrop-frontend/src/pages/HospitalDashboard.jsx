/* eslint-disable no-irregular-whitespace */
import { useNavigate } from "react-router-dom";

// Lucide Icons
import { Building2, Heart, Home, ShieldCheck, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";

export default function OrgDashboard({ orgData }) {
  const navigate = useNavigate(); // Motivational quotes for organizations

  const quotes = [
    "Saving lives is a noble cause. Thank you for your service.",
    "Your organization is a beacon of hope for many.",
    "Connecting donors and recipients, one pint at a time.",
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <>
      <Navbar />
      <div className="bg-rose-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
           {/* Motivational Quote Card */}
          <div className="bg-red-100 border border-red-200 rounded-2xl shadow-sm p-4 text-center">
            <p className="italic text-red-800 text-lg font-medium">
                          “{randomQuote}”
            </p>
          </div>
           {/* Profile Card */}
          <div className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
                       
              <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center">
                <Building2 size={40} className="text-red-600" />       
              </div>
                       
              <div>
                {" "}
                             
                <h2 className="text-3xl font-bold flex items-center gap-2">
                                  {orgData?.hospitalName || "Organization Name"}
                                 
                  {orgData?.verified && (
                    <ShieldCheck
                      size={24}
                      className="text-green-300"
                      title="Verified"
                    />
                  )}
                     
                </h2>
                             
                <p className="text-lg opacity-90">
                  {orgData?.email || "No Email"}
                </p>
                             
                <p className="mt-2 font-semibold">
                   Type: {orgData?.hospitalType || "N/A"}         
                </p>
              </div>
            </div>
                   
            <div className="bg-white text-red-600 rounded-2xl p-6 flex flex-col items-center shadow-md">
               
              <p className="text-sm flex items-center gap-1">
                          <MapPin size={16} /> Location        
              </p>{" "}     
              <p className="text-2xl font-bold">{orgData?.city || "N/A"}</p>   
                 
            </div>
          </div>



                  {/* Organization Details Card */}     
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-red-700 font-semibold text-xl mb-6 flex items-center gap-3">
                 <Building2 size={20} />Organization Details  
                   
            </h3>
                   
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
                       
              <p>
                <span className="font-medium text-red-800">
                  Contact Person:
                </span>
                {orgData?.contactPerson || "N/A"}
              </p>
                       
              <p>
                <span className="font-medium text-red-800">Phone:</span>
                {orgData?.phone || "N/A"}
              </p>
                     
              <p>
                <span className="font-medium text-red-800">City:</span>{" "}
                {orgData?.city || "N/A"}
              </p>
                     
              <p>
                <span className="font-medium text-red-800">State:</span>{" "}
                {orgData?.state || "N/A"}
              </p>
                       
              <p className="md:col-span-2">
                <span className="font-medium text-red-800">Address:</span>{" "}
                {orgData?.address || "N/A"}
              </p>
                       
            </div>
                 
          </div>


           {/* Action Buttons */}     
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-6">
                   
            <button
              onClick={() => navigate("/request")}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
            >
                        <Heart size={20} /> Create a Request      
            </button>
                 
            <button
              onClick={() => navigate("/")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-xl text-lg font-semibold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
            >
                        <Home size={20} /> Home        
            </button>  
          </div>
             
        </div>
      </div>
    </>
  );
}

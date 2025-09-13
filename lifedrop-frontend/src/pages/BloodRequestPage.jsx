import { useState } from "react";
import Navbar from "../components/Navbar";
import { PostBloodRequest } from "../services/api";
import { useCurrentUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Phone,
  Hospital,
  MapPin,
  Droplet,
  AlertCircle,
} from "lucide-react";
import Ask_to_Sign_In from "../components/Ask_to_Sign_In"

export default function BloodRequestPage() {
  const user = useCurrentUser();
  const navigate = useNavigate();

  const [bloodGroupNeeded, setBloodGroupNeeded] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [neededBy, setNeededBy] = useState("");
  const [patientCondition, setPatientCondition] = useState("Normal");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState();

  const [buttonText, setButtonText] = useState("Submit Blood Request");


  if (user === null) return <Ask_to_Sign_In />;

  if (!user?.displayName || !user?.email)
    alert("Please Update your Name and Email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      uid: user?.uid,
      name: user?.displayName,
      email: user?.email,
      bloodGroupNeeded,
      hospitalName,
      hospitalAddress,
      city,
      state,
      country,
      neededBy,
      patientCondition,
      phoneNumber,
      status:"Pending",
    };

    try {
      setButtonText("Blood Request Succesfully Submitted!");
      await PostBloodRequest(requestData);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error adding document: ", err);
      alert(err);
    }
  };

  return (
    <>
      <Navbar user={user} />
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50 py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-8 animate-fadeIn">
          <h2 className="text-3xl font-bold text-center text-rose-600 mb-6">
            Request Blood
          </h2>

          {patientCondition === "Urgent" || patientCondition === "Critical" ? (
            <div className="flex items-center justify-center mb-4 bg-red-100 text-red-700 rounded-xl p-3">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>This is an {patientCondition} request!</span>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Info */}
            <div className="border p-4 rounded-xl bg-rose-50">
              <input
                type="text"
                placeholder="Full Name"
                value={user?.displayName}
                readOnly
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 bg-gray-50 mb-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={user?.email}
                readOnly
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 bg-gray-50"
              />
            </div>

            {/* Blood Group */}
            <div className="flex items-center border rounded-xl px-4 py-2 bg-white shadow-sm">
              <Droplet className="w-5 h-5 text-rose-500 mr-2" />
              <select
                value={bloodGroupNeeded}
                onChange={(e) => setBloodGroupNeeded(e.target.value)}
                required
                className="w-full focus:outline-none"
              >
                <option value="">Select Blood Group</option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                  (bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Hospital Info */}
            <div className="border p-4 rounded-xl bg-rose-50 space-y-2">
              <div className="flex items-center space-x-2">
                <Hospital className="w-5 h-5 text-rose-500" />
                <input
                  type="text"
                  placeholder="Hospital Name"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-rose-500" />
                <input
                  type="text"
                  placeholder="Hospital Address"
                  value={hospitalAddress}
                  onChange={(e) => setHospitalAddress(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>
            </div>

            {/* Needed By & Patient Condition */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center border rounded-xl px-4 py-2 bg-white shadow-sm w-full">
                <Calendar className="w-5 h-5 text-rose-500 mr-2" />
                <input
                  type="date"
                  value={neededBy}
                  onChange={(e) => setNeededBy(e.target.value)}
                  required
                  className="w-full focus:outline-none"
                />
              </div>
              <select
                value={patientCondition}
                onChange={(e) => setPatientCondition(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white shadow-sm"
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            {/* Contact Info */}
            <div className="flex items-center border rounded-xl px-4 py-2 bg-white shadow-sm">
              <Phone className="w-5 h-5 text-rose-500 mr-2" />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                pattern="[0-9]{10}"
                className="w-full focus:outline-none"
              />
            </div>

            {/* Status */}
            <input
              type="text"
              placeholder="Status (Optional)"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-gradient-to-r from-rose-500 to-red-500 text-white py-3 rounded-2xl transform transition duration-300"
            >
              <Droplet className="w-5 h-5 mr-2" /> {buttonText}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}


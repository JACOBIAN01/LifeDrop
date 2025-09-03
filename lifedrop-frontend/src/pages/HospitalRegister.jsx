import { useState } from "react";
import Navbar from "../components/Navbar";
import { Building2, Phone, MapPin, ShieldCheck } from "lucide-react";
import { useCurrentUser } from "../services/AuthService";
import Ask_to_Sign_In from "./BloodRequestPage";
import { OrgRegister } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function HospitalRegistrationPage() {
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalType, setHospitalType] = useState("Hospital");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const user = useCurrentUser();
  if (user === null) {
    return (
      <>
        <Ask_to_Sign_In />
      </>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orgData = {
      uid:user.uid,
      hospitalName,
      hospitalType,
      address,
      city,
      state,
      country,
      pincode,
      phone,
      email,
      website,
      contactPerson,
      verified,
    };
    
    try {
      await OrgRegister(orgData);
      navigate("/hdash");
      alert("Your Org SUccessfully Registered!");
    } catch (err) {
      console.error("Error adding document: ", err);
      alert(err);
    }
  };

  return (
    <>
      <Navbar user={user} />
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-rose-600 mb-8">
            🏥 Hospital Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Hospital Details */}
            <div>
              <h3 className="text-xl font-semibold text-rose-500 flex items-center gap-2 mb-4">
                <Building2 size={20} /> Hospital Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Hospital Name"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-300"
                />
                <select
                  value={hospitalType}
                  onChange={(e) => setHospitalType(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-300"
                >
                  <option value="Hospital">Hospital</option>
                  <option value="Clinic">Clinic</option>
                  <option value="NGO">NGO</option>
                  <option value="Blood Bank">Blood Bank</option>
                </select>
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="text-xl font-semibold text-rose-500 flex items-center gap-2 mb-4">
                <Phone size={20} /> Contact Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-300"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-300"
                />
                <input
                  type="text"
                  placeholder="Website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-300"
                />
                <input
                  type="text"
                  placeholder="Contact Person"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-300"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-xl font-semibold text-rose-500 flex items-center gap-2 mb-4">
                <MapPin size={20} /> Address Details
              </h3>
              <textarea
                placeholder="Full Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-300"
              />
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-300"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-300"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-300"
                />
              </div>
              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
                className="mt-4 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-300"
              />
            </div>

            {/* Verification */}
            <div>
              <h3 className="text-xl font-semibold text-rose-500 flex items-center gap-2 mb-4">
                <ShieldCheck size={20} /> Verification
              </h3>
              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={verified}
                  onChange={() => setVerified(!verified)}
                  className="form-checkbox h-5 w-5 text-rose-500"
                />
                <span>Verified Hospital</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-rose-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-rose-600 transition"
            >
              Register Hospital
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

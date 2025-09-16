import { useState, useEffect } from "react";
import { useCurrentUser } from "../services/AuthService";
import useDonorStatus from "../Hooks/DonorStatus";
import { useCurrentUserDetails } from "../services/AuthService";
import { useOrgDetails } from "../Hooks/OrgHooks";
import DonorDashboard from "../Dashboards/DonorDashboard";
import NonDonorDashboard from "../Dashboards/NonDonorDashboard";
import OrgDashboard from "../Dashboards/HospitalDashboard";
import Ask_to_Sign_In from "../components/Ask_to_Sign_In";
import Navbar from "../components/Navbar";
import AdminDashboard from "./AdminDashboard";

export default function Dashboard() {
 const { user, _ } = useCurrentUser();
  const { isDonor, donorData } = useDonorStatus();
  const userDetails = useCurrentUserDetails();
  const orgDetails = useOrgDetails();
  const [NonDonor, SetNonDonor] = useState(false);
  const [Donor, SetDonor] = useState(false);
  const [Org, SetOrg] = useState(false);
  const [Data, SetData] = useState(null);
  const [Admin, setAdmin] = useState(false);

  // run only when userDetails changes
  useEffect(() => {
    if (!user || !userDetails) return;
    if (userDetails.userType === "admin") {
      setAdmin(true);
      SetDonor(false);
      SetNonDonor(false);
      SetOrg(false);
      SetData(null);
    }
    if (userDetails.userType === "donor") {
      SetDonor(true);
      SetNonDonor(false);
      SetOrg(false);
      SetData(donorData); // from useDonorStatus()
    } else if (userDetails.userType === "user") {
      SetNonDonor(true);
      SetDonor(false);
      SetOrg(false);
      SetData(null); // or some other logic
    } else if (userDetails.userType === "org") {
      SetOrg(true);
      SetDonor(false);
      SetNonDonor(false);
      SetData(orgDetails); // from useOrgDetails()
    }
  }, [user,userDetails, donorData, orgDetails]);

  if (user === undefined) {
    return <Loading message="Loading Data..." />;
  }
  if (!userDetails) return <Loading message="Loading Data..." />;
  if (user && isDonor === undefined)
    return <Loading message="Checking Dashboard..." />;
  if (user && isDonor && !donorData)
    return <Loading message="Loading Donor Data..." />;
  if (!user) {
    return <Ask_to_Sign_In />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <Navbar />
      <div className="mx-auto">
        {Donor && <DonorDashboard donorData={Data} />}
        {NonDonor && <NonDonorDashboard user={user} />}
        {Org && <OrgDashboard orgData={Data} />}
        {Admin && <AdminDashboard />}
      </div>
    </div>
  );
}



function Loading({ message }) {
  return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <h1 className="text-xl font-semibold text-red-700 animate-pulse">
        {message}
      </h1>
    </div>
  );
}

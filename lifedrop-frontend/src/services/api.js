import axios from "axios";

const API_URL = "http://localhost:5000/api";

export async function PostBloodRequest(requestData) {
  const res = await axios.post(`${API_URL}/bloodRequest`, requestData);
  return res.data;
}

export async function DonorRegistration(donorData) {
  const res = await axios.post(`${API_URL}/NewDonorRegistration`, donorData);
  return res.data;
}

export async function OrgRegister(orgData) {
  const res = await axios.post(`${API_URL}/register-org`, orgData);
  return res.data;
}

export async function UpdateRequestStatus(id, status) {
  const res = await axios.post(`${API_URL}/update-status`, { id, status });
  return res.data;
}

export async function SendWhatsappMessage(to, message) {
  console.log("Inside Send WHatsapp Fuhnction to-:"+to);
  const res = await axios.post(`${API_URL}/send-message`, {
    to,
    message,
  });
  return res.success;
}

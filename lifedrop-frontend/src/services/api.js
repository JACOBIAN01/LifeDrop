import axios from "axios"

const API_URL = "http://localhost:5000/api";

export async function PostBloodRequest(requestData){
  const res = await axios.post(`${API_URL}/bloodRequest`,requestData)
  return res.data;
}

export async function DonorRegistration(donorData){
  const res = await axios.post(`${API_URL}/NewDonorRegistration`,donorData);
    return res.data;
}

export async function OrgRegister(orgData){
  const res = await axios.post(`${API_URL}/register-org`,orgData)
  return res.data;
}
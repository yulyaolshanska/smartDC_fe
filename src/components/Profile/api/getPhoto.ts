import axios from './axios';

export const getDoctorAvatar = async (doctorId: number) => {
  const url = `/doctor/${doctorId}/avatar`;
  const response = await axios.get(url, {});
  return response.data;
};

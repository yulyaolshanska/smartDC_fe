import axios from './axios';

export const getDoctorAvatar = async (doctorId: number) => {
  try {
    const url = `/doctor/${doctorId}/avatar`;
    const response = await axios.get(url, {});
    return response.data;
  } catch (error) {
    `The following error occured while trying to get photo: ${error}`;
  }
};

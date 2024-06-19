import axios from 'axios';

const baseUrl = 'http://localhost:3000/guests';

const getAllGuests = async () => {
  const request = await axios.get(`${baseUrl}`);
  return request.data;
};

const getGuestById = async (guestId: string) => {
  const request = await axios.get(`${baseUrl}/${guestId}`);
  return request.data;
};

const updateGuestById = async (
  guestId: string,
  updateData: { status: string; authorizedAt: string },
) => {
  const request = await axios.patch(`${baseUrl}/${guestId}`, updateData);
  return request.data;
};

export default {
  getAllGuests,
  getGuestById,
  updateGuestById,
};

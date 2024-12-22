import axios from 'axios';

const API_URL = 'http://localhost:3000/events';

export const getEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(API_URL, eventData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await axios.put(`${API_URL}/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    await axios.delete(`${API_URL}/${eventId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEvent = async (eventId) => {
  try {
    const response = await axios.get(`${API_URL}/${eventId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

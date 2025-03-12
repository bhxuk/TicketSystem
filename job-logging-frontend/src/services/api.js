import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

// Fetch all jobs
export const getJobs = async () => {
    const response = await axios.get(`${API_URL}/jobs`);
    return response.data;
};

// Create a new job
export const createJob = async (jobData) => {
    const response = await axios.post(`${API_URL}/jobs`, jobData);
    return response.data;
};

// Add a note to a job
export const addNote = async (jobId, note) => {
    const response = await axios.post(`${API_URL}/jobs/${jobId}/notes`, { note });
    return response.data;
};

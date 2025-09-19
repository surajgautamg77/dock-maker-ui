import axios from "axios";

const API_BASE = "https://buddy.pharynxai.in/bajaj.api/api/chat";

export const fetchAudienceQueries = async () => {
  const response = await axios.get(`${API_BASE}/audience-query`);
  return response.data;
};



export const sendQuery = async (question) => {
  const response = await axios.post(
    `${API_BASE}/query`,
    { question , audio: true },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};



export const submitUserQuery = async (question) => {
  try {
    const response = await fetch(`${API_BASE}/audience-query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit query");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting query:", error);
    throw error;
  }
};

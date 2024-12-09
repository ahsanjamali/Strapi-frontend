const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const getFeaturesData = async () => {
  const res = await fetch(`${API_URL}/api/features`);
  return res.json();
};

export const getWhyChooseUsData = async () => {
  const res = await fetch(`${API_URL}/api/why-choose-us`);
  return res.json();
};

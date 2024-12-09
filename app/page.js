"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [features, setFeatures] = useState([]);
  const [activeFeature, setActiveFeature] = useState(null);
  const [whyChooseUs, setWhyChooseUs] = useState(null);

  // Get the API URL from environment variable
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuresResponse, whyChooseUsResponse] = await Promise.all([
          fetch(`${API_URL}/api/features?populate=*`),
          fetch(`${API_URL}/api/why-choose-us`),
        ]);

        const featuresData = await featuresResponse.json();
        const whyChooseUsData = await whyChooseUsResponse.json();

        if (featuresData.data && featuresData.data.length > 0) {
          setFeatures(featuresData.data);
          setActiveFeature(featuresData.data[0]);
        }

        if (whyChooseUsData.data) {
          setWhyChooseUs(whyChooseUsData.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [API_URL]);

  return (
    <main className="min-h-screen p-8 bg-white text-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-500">
            {whyChooseUs?.subtitle}
          </h2>
          <h1 className="text-4xl font-bold mb-6">{whyChooseUs?.title}</h1>
          <p className="text-gray-600">{whyChooseUs?.description}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="relative w-full md:w-1/2 flex">
            {activeFeature && (
              <div className="relative flex w-full">
                <div className="bg-red-600 bg-opacity-80 rounded-full p-8 text-white shadow-lg z-10 w-[400px] h-[400px] flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-4">
                    {activeFeature.title || "No Title"}
                  </h3>
                  <p>{activeFeature.description || "No Description"}</p>
                </div>
                <div className="absolute right-0 w-[400px] h-[400px] rounded-full overflow-hidden">
                  <img
                    src={`${API_URL}${activeFeature.Aimage.url}`}
                    alt={activeFeature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 space-y-4">
            {features.map((feature) => (
              <div
                key={feature.id}
                onClick={() => setActiveFeature(feature)}
                className={`flex items-center gap-2 p-4 rounded-lg transition-colors cursor-pointer ${
                  activeFeature?.id === feature.id
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-red-500 hover:text-white"
                }`}
              >
                <span className="text-xl">&lt;</span>
                <span className="font-medium">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

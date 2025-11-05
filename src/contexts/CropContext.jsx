// src/contexts/CropContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import Toast from "react-native-toast-message";

const CropContext = createContext();

export const CropProvider = ({ children }) => {
  const [cropHistory, setCropHistory] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedOnce, setFetchedOnce] = useState(false);

  const clearCropData = () => {
    setCropHistory([]); // ✅ Clears crop data
    setFetchedOnce(false);
  };

  const fetchCropHistory = async (uniqueId) => {
    if (!uniqueId || isFetching) return;
    try {
      setIsFetching(true);
      const res = await fetch(
        `https://ayur-sathi.vercel.app/api/crops/${uniqueId}`
      );

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.warn("⚠️ Non-JSON response:", text);
        throw new Error("Invalid server response");
      }

      if (res.ok && data.success && Array.isArray(data.data)) {
        setCropHistory(data.data);
        setFetchedOnce(true);
      } else {
        Toast.show({
          type: "error",
          text1: "Failed to fetch crop history",
          text2: data.message || "Unknown error",
        });
      }
    } catch (err) {
      console.error("❌ Error fetching crops:", err);
      Toast.show({
        type: "error",
        text1: "Network or server error",
        text2: err.message,
      });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <CropContext.Provider
      value={{
        cropHistory,
        setCropHistory,
        fetchCropHistory,
        isFetching,
        fetchedOnce,
        clearCropData, // ✅ ADDED HERE
      }}
    >
      {children}
    </CropContext.Provider>
  );
};

export const useCrops = () => useContext(CropContext);

export default CropContext;

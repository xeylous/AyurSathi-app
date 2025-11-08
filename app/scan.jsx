import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

export default function ScanQR() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loadingPermission, setLoadingPermission] = useState(true);
  const [statusMessage, setStatusMessage] = useState(""); // 👈 dynamic message
  const [lastScanTime, setLastScanTime] = useState(Date.now());
  const cameraRef = useRef(null);
  const router = useRouter();

  const boxSize = 260;

  // ✅ Request permission
  useEffect(() => {
    (async () => {
      if (!permission?.granted) await requestPermission();
      setLoadingPermission(false);
    })();
  }, []);

  // ✅ Dynamic "no QR detected" watcher
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (!scanned && now - lastScanTime > 5000 && !statusMessage.includes("No QR")) {
        setStatusMessage("No QR detected — try adjusting camera.");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [scanned, lastScanTime, statusMessage]);

  // ✅ Loading
  if (loadingPermission) {
    return (
      <View className="flex-1 items-center justify-center bg-[#f5f8cc]">
        <ActivityIndicator size="large" color="#4F772D" />
        <Text className="mt-3 text-[#4F772D] text-lg font-semibold">
          Checking camera access...
        </Text>
      </View>
    );
  }

  // ✅ No permission
  if (!permission?.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-[#f5f8cc] px-5">
        <Text className="text-lg text-red-700 font-semibold text-center mb-4">
          Camera access is required to scan QR codes.
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-[#90A955] px-6 py-3 rounded-lg"
        >
          <Text className="text-black font-bold text-base">Grant Camera Access</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ✅ Handle barcode scanned
  const handleBarCodeScanned = ({ data }) => {
    setLastScanTime(Date.now()); // reset timer
    setStatusMessage("Scanning...");

    if (scanned) return;
    setScanned(true);
    setStatusMessage("QR scanned successfully!");
    setTimeout(() => setStatusMessage(""), 3000); // clear after 3s

    alert(`Scanned QR: ${data}`);
  };

  // ✅ Reset scanning
  const handleScanAgain = () => {
    setScanned(false);
    setStatusMessage("");
    setLastScanTime(Date.now());
  };

  return (
    <View className="flex-1 bg-[#f5f8cc] items-center justify-center relative">
      {/* ✅ Camera inside rounded box */}
      <View
        style={{
          width: boxSize,
          height: boxSize,
          borderRadius: 24,
          overflow: "hidden",
          borderWidth: 4,
          borderColor: "#90A955",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CameraView
          ref={cameraRef}
          style={{ width: "100%", height: "100%" }}
          zoom={0.4}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        />
      </View>

      {/* ✅ Dynamic message area */}
      {statusMessage ? (
        <Text className="absolute bottom-28 self-center text-[#4F772D] text-base font-semibold bg-[#ECF39E] px-4 py-2 rounded-lg text-center w-[80%]">
          {statusMessage}
        </Text>
      ) : null}

      {/* ✅ Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-5 bg-[#90A955] px-4 py-2 rounded-lg flex-row items-center"
      >
        <ArrowLeft size={18} color="black" />
        <Text className="ml-1 text-black font-semibold">Back</Text>
      </TouchableOpacity>

      {/* ✅ Scan Again Button */}
      {scanned && (
        <TouchableOpacity
          onPress={handleScanAgain}
          className="absolute bottom-10 self-center bg-[#90A955] px-6 py-3 rounded-lg"
        >
          <Text className="text-black font-bold text-base">Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

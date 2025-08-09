import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function QrScanner() {
  const [code, setCode] = useState("");
  const scannerRef = useRef(null);
  const isRunningRef = useRef(false);

  const startScanner = () => {
    if (!scannerRef.current) return;

    scannerRef.current
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setCode(decodedText);
          if (isRunningRef.current) {
            isRunningRef.current = false;
            scannerRef.current
              .stop()
              .catch((err) => console.warn("Stop error:", err));
          }
        }
      )
      .then(() => {
        isRunningRef.current = true;
      })
      .catch((err) => console.error("Start failed:", err));
  };

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");
    scannerRef.current = scanner;
    startScanner();

    return () => {
      if (isRunningRef.current) {
        isRunningRef.current = false;
        scanner.stop().catch(() => {});
      }
    };
  }, []);

  const handleCheckin = () => {
    if (!code.trim()) {
      alert("Vui lòng quét QR hoặc nhập mã!");
      return;
    }
    alert(`Check-in với mã: ${code}`);
    setCode("");
    startScanner();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          📷 Quét hoặc nhập mã
        </h2>

        {/* Khung camera */}
        <div
          id="reader"
          className="w-full border border-gray-300 rounded-lg overflow-hidden"
          style={{ minHeight: "300px" }}
        ></div>

        {/* Input code */}
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Quét hoặc nhập mã..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleCheckin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition"
        >
          ✅ Check-in
        </button>
      </div>
    </div>
  );
}

// QrScannerBox.jsx
import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function QrScannerBox({ onDetected }) {
  const [code, setCode] = useState("");
  const scannerRef = useRef(null);
  const isRunningRef = useRef(false);

  const startScanner = () => {
    if (!scannerRef.current) return;

    scannerRef.current
      .start(
        { facingMode: "environment" }, 
        { fps: 10, qrbox: { width: 250, height: 250 } }, // ✅ khung quét vuông
        (decodedText) => {
          setCode(decodedText);
          if (onDetected) onDetected(decodedText);
        }
      )
      .then(() => {
        isRunningRef.current = true;
      })
      .catch((err) => console.error("Start failed:", err));
  };

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;
    startScanner();

    return () => {
      if (isRunningRef.current) {
        isRunningRef.current = false;
        scanner.stop().catch(() => {});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mb-4">
      <h2 className="text-center text-lg font-bold mb-2">
        Đưa mã QR vào khung quét
      </h2>

      {/* Khung camera hình vuông */}
      <div
        id="qr-reader"
        className="w-full border border-gray-300 rounded-lg overflow-hidden"
        style={{
          aspectRatio: "1 / 1", // ✅ luôn giữ tỷ lệ 1:1
          maxWidth: "300px",    // giới hạn tối đa 300px
          margin: "0 auto",     // căn giữa
        }}
      ></div>

    </div>
  );
}

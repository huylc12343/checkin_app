// CheckinView.jsx
import React, { useState, useRef } from "react";
import TicketResult from "./ticket_result";
import QrScannerBox from "./qr_reader";
import { Html5Qrcode } from "html5-qrcode"; // thêm import
const API_BASE_URL = "http://localhost:8000";

export default function CheckinView() {
  const [orderCode, setOrderCode] = useState("");
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  async function searchTicket() {
    if (!orderCode.trim()) {
      setResult({ type: "error", message: "Vui lòng nhập mã vé." });
      return;
    }
    setResult({ type: "info", message: "Đang tìm kiếm..." });

    try {
      const response = await fetch(`${API_BASE_URL}/api/ticket/${orderCode}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Có lỗi xảy ra.");
      setResult({ type: "ticket", data });
    } catch (error) {
      setResult({ type: "error", message: error.message });
    }
  }

  async function confirmCheckIn(code) {
    setResult({ type: "info", message: "Đang xử lý check-in..." });
    try {
      const response = await fetch(`${API_BASE_URL}/api/checkin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_code: code }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Không thể check-in.");
      setResult({ type: "success", message: data.message });
      setTimeout(searchTicket, 1000);
    } catch (error) {
      setResult({ type: "error", message: error.message });
    }
  }

  // ✅ Hàm xử lý khi người dùng chọn file ảnh
  const handleFileSelected = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const scanner = new Html5Qrcode("qr-file-scanner"); // tạo scanner tạm
    try {
      const decodedText = await scanner.scanFile(file, true);
      setOrderCode(decodedText); // gán vào input
      setResult({ type: "success"
});
    } catch (err) {
      setResult({ type: "error", message: "Không đọc được QR từ ảnh." });
      console.error("Scan failed", err);
    }
  };

  return (
    <div className="container mx-auto max-w-lg p-4 bg-white shadow rounded">
      <h1 className="text-center text-blue-700 text-2xl font-bold mb-4">
        🔍 Hệ Thống Check-in
      </h1>

      {/* ✅ Khung quét QR đặt trên input */}
      <div className="mb-6">
        <QrScannerBox onDetected={(code) => setOrderCode(code)} />
      </div>

      {/* Ô nhập mã vé */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Mã vé</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={orderCode}
            onChange={(e) => setOrderCode(e.target.value)}
            placeholder="Nhập mã hoặc quét"
            className="flex-grow p-2 border border-gray-300 rounded-lg text-lg font-bold text-blue-700"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-gray-600 text-white w-12 h-12 rounded-lg text-xl"
          >
            📁
          </button>
          <input
            id="qr-file-input"
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleFileSelected} // ✅ xử lý khi chọn file
          />
        </div>
      </div>

      {/* Nút tra cứu */}
      <button
        onClick={searchTicket}
        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
      >
        Tra cứu vé
      </button>

      {/* ✅ Nút xác nhận checkin */}
      <button
        className="w-full mt-2 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
      >
        ✅ Xác nhận Check-in
      </button>

      {result && (
        <div className="mt-4">
          <TicketResult result={result} onCheckIn={confirmCheckIn} />
        </div>
      )}

      {/* ✅ scanner tạm để đọc QR từ file (ẩn) */}
      <div id="qr-file-scanner" style={{ display: "none" }}></div>
    </div>
  );
}

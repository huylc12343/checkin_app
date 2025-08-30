// ticket_result.jsx
import React from "react";

export default function TicketResult({ result, onCheckIn }) {
  if (result.type === "info") {
    return <p className="text-blue-600">{result.message}</p>;
  }

  if (result.type === "error") {
    return <p className="text-red-600">{result.message}</p>;
  }

  if (result.type === "success") {
    return <p className="text-green-600">{result.message}</p>;
  }

  if (result.type === "ticket") {
    const data = result.data;
    return (
      <div className="p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-bold mb-2">🎫 Thông tin vé</h2>
        <ul className="space-y-1">
          <li><b>Mã vé:</b> {data.values[0]}</li>
          <li><b>Tên khách:</b> {data.values[1]}</li>
          <li><b>Email:</b> {data.values[2]}</li>
          <li><b>SĐT:</b> {data.values[3]}</li>
          <li><b>Loại vé:</b> {data.values[6]}</li>
          <li><b>Số lượng:</b> {data.values[4]}</li>
          <li><b>Trạng thái:</b> {data.is_available || "Chưa check-in"}</li>
        </ul>

        <button
          onClick={() => onCheckIn(data.values[0])}
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ✅ Xác nhận Check-in
        </button>
      </div>
    );
  }

  return null;
}

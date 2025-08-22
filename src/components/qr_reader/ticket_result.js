// TicketResult.jsx
import React from "react";

export default function TicketResult({ result, onCheckIn }) {
  if (result.type === "error")
    return (
      <div className="p-4 rounded bg-red-100 border-l-4 border-red-500">
        ❌ {result.message}
      </div>
    );

  if (result.type === "info")
    return (
      <div className="p-4 rounded bg-blue-100 border-l-4 border-blue-500">
        ℹ️ {result.message}
      </div>
    );

  if (result.type === "success")
    return (
      <div className="p-4 rounded bg-green-100 border-l-4 border-green-500">
        ✅ {result.message}
      </div>
    );

  if (result.type === "ticket") {
    const data = result.data;
    return (
      <div className="p-4 rounded bg-green-50 border-l-4 border-green-600">
        <p>
          <strong>Mã vé:</strong> {data.order_code}
        </p>
        <p>
          <strong>Tên KH:</strong> {data.customer_name}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Điện thoại:</strong> {data.phone}
        </p>
        <p>
          <strong>Số lượng vé:</strong> {data.ticket_quantity}
        </p>
        <p>
          <strong>Loại vé:</strong> {data.ticket_type}
        </p>
        <p>
          <strong>Ghi chú:</strong> {data.note || ""}
        </p>
        <p>
          <strong>Trạng thái:</strong>{" "}
          {data.is_checked_in ? "✅ Đã check-in" : "❌ Chưa check-in"}
        </p>
        {!data.is_checked_in && (
          <button
            onClick={() => onCheckIn(data.order_code)}
            className="mt-3 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Xác nhận Check-in
          </button>
        )}
      </div>
    );
  }

  return null;
}

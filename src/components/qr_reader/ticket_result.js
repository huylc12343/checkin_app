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

    // Map màu theo trạng thái
    const statusStyles = {
      available: "bg-green-50 border-green-600",
      checked_in: "bg-yellow-50 border-yellow-600",
      unavailable: "bg-red-50 border-red-600",
    };

    const boxStyle = statusStyles[data.status] || "bg-gray-50 border-gray-400";

    // Nếu vé không khả dụng → chỉ hiển thị thông báo
    if (data.status === "unavailable") {
      return (
        <div className={`p-4 rounded border-l-4 ${boxStyle}`}>
          ❌ Vé không khả dụng
        </div>
      );
    }

    return (
      <div className={`p-4 rounded border-l-4 ${boxStyle}`}>
        <p>
          <strong>Mã vé:</strong> {data.values?.[0] || "N/A"}
        </p>
        <p>
          <strong>Tên KH:</strong> {data.values?.[1] || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {data.values?.[5] || "N/A"}
        </p>
        <p>
          <strong>Điện thoại:</strong> {data.values?.[6] || "N/A"}
        </p>
        <p>
          <strong>Số lượng vé:</strong> {data.values?.[3] || "N/A"}
        </p>
        <p>
          <strong>Thứ tự vé:</strong> {data.ticket_no}
        </p>
        <p>
          <strong>Loại vé:</strong> {data.values?.[2] || "N/A"}
        </p>
        <p>
          <strong>Ghi chú:</strong> {data.values?.[16] || ""}
        </p>
        <p>
          <strong>Trạng thái:</strong>{" "}
          {data.status === "available"
            ? "✅ Vé khả dụng"
            : `📌 Đã check-in (${data.checkin_time || ""})`}
        </p>

        {/* Chỉ hiển thị nút check-in nếu vé khả dụng */}
        {data.status === "available" && (
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

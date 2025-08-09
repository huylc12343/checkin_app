import React from "react";
import QrScanner from "./components/qr_reader/qr_reader";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>📌 Ứng dụng đọc QR Code</h1>
      <QrScanner />
      {/* <QrReaderFromImage /> */}
    </div>
  );
}

export default App;

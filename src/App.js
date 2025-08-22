// App.jsx
import React, { useState } from "react";
import CheckinView from "./components/qr_reader/checkin_view";
import QrScannerModal from "./components/qr_reader/qr_reader";

export default function App() {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <CheckinView onOpenScanner={() => setShowScanner(true)} />
      {showScanner && <QrScannerModal onClose={() => setShowScanner(false)} />}
    </div>
  );
}

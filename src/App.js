import React from "react";
import QrScanner from "./components/qr_reader/qr_reader";

function App() {
  return (
    <div style={{ padding: "10px" }}>
      <QrScanner />
      {/* <QrReaderFromImage /> */}
    </div>
  );
}

export default App;

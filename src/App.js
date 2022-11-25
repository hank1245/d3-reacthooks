import React, { useState } from "react";
// import Video from "./Video";
import "./App.css";
import BrushChart from "./BrushChart";

function App() {
  const [data, setData] = useState(
    Array.from({ length: 30 }).map(() => Math.round(Math.random() * 100))
  );
  const onAddDataClick = () =>
    setData([...data, Math.round(Math.random() * 100)]);

  return (
    <React.Fragment>
      <h2>Sub-selections with d3-brush</h2>

      <BrushChart data={data} />
      <button onClick={onAddDataClick}>Add data</button>
    </React.Fragment>
  );
}

export default App;

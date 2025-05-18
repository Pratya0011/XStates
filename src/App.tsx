import { useState } from "react";
import "./App.css";
import Location from "./Components/Location";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Location />
    </>
  );
}

export default App;

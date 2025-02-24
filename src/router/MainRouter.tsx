import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/Home.tsx";
import App from "../App.tsx";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;

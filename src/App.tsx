import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/styles/app.scss";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound/indesx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

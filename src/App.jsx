import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Door from "./pages/Door.jsx";
import Room from "./pages/Room.jsx";
import Card from "./pages/Card.jsx";
import Search from "./pages/Search.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="door/:doorKey" element={<Door />} />
          <Route path="door/:doorKey/:subId" element={<Room />} />
          <Route path="door/:doorKey/:subId/:cardId" element={<Card />} />
          <Route path="search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

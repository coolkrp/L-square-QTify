import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AlbumDetails from "./components/AlbumDetails/AlbumDetails";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/albumdetails/:id" element={<AlbumDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
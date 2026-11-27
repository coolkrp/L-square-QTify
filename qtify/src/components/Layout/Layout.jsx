import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { BACKEND_ENDPOINT } from "../../api/backend";
import Navbar from "../Navbar/Navbar";
import MusicBar from "../MusicBar/MusicBar";

function Layout() {
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const [topResponse, newResponse] = await Promise.all([
          axios.get(`${BACKEND_ENDPOINT}/albums/top`),
          axios.get(`${BACKEND_ENDPOINT}/albums/new`),
        ]);
        setSearchData([...topResponse.data, ...newResponse.data]);
      } catch {
        setSearchData([]);
      }
    };

    loadAlbums();
  }, []);

  return (
    <div className="App">
      <Navbar searchData={searchData} />
      <Outlet />
      <MusicBar />
    </div>
  );
}

export default Layout;
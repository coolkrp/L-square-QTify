import "./App.css";
import { BACKEND_ENDPOINT } from "./api/backend";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Section
        title="Top Albums"
        apiUrl={`${BACKEND_ENDPOINT}/albums/top`}
        type="album"
      />
      <Section
        title="New Albums"
        apiUrl={`${BACKEND_ENDPOINT}/albums/new`}
        type="album"
      />
      <Section
        title="Songs"
        apiUrl={`${BACKEND_ENDPOINT}/songs`}
        type="song"
      />
    </div>
  );
}

export default App;
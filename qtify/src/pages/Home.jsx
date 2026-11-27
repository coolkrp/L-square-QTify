import { BACKEND_ENDPOINT } from "../api/backend";
import Hero from "../components/Hero/Hero";
import Section from "../components/Section/Section";
import FaqSection from "../components/Faq/FaqSection";

function Home() {
  return (
    <>
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
      <FaqSection />
    </>
  );
}

export default Home;
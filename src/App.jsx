import { useRef, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Activites from "./components/Activites.jsx";
import Galerie from "./components/Galerie.jsx";
import Reviews from "./components/Reviews.jsx";
import Soutien from "./components/Soutien.jsx";
import Trajectoire from "./components/Trajectoire.jsx";
import MemberSpace from "./components/MemberSpace.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const trajRef = useRef(null);
  const [memberOpen, setMemberOpen] = useState(false);

  const scrollToTrajectoire = () => {
    trajRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar onMemberClick={() => setMemberOpen(true)} />
      <MemberSpace open={memberOpen} onClose={() => setMemberOpen(false)} />
      <main>
        <Hero onDiscover={scrollToTrajectoire} />
        <About />
        <Trajectoire open sectionRef={trajRef} />
        <Activites />
        <Galerie />
        <Reviews />
        <Soutien />
      </main>
      <Footer />
    </>
  );
}

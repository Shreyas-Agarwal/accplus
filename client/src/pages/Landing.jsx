import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import PhoneForm from "../components/PhoneForm";
import Footer from "../components/Footer";
import {Phone} from "../components/Phone";
import FeatureCards from "../components/FeatureCards";

export default function Landing() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeatureCards />
      <Footer />
    </>
  );
}

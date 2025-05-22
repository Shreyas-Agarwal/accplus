// import Navbar from "../components/Navbar";
// import HeroSection from "../components/HeroSection";
// import PhoneForm from "../components/PhoneForm";
// import Footer from "../components/Footer";
// import {Phone} from "../components/Phone";
// import FeatureCards from "../components/FeatureCards";

// export default function Landing() {

//   return (
//     <div
//       style={{
//         height: '100vh',          // make exact viewport height
//         background: 'linear-gradient(135deg, #fff, #ccc)',
//         display: 'flex',
//         flexDirection: 'column',
//       }}
//     >
//       <Navbar />
      
//       {/* HeroSection fills available vertical space */}
//       <div style={{ flex: 1, overflow: 'hidden' }}>
//         <HeroSection />
//       </div>

//       {/* Footer with fixed height */}
//       {/* <Footer /> */}
//     </div>
//   );
// }


import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import PhoneForm from "../components/PhoneForm";
import Footer from "../components/Footer";
import {Phone} from "../components/Phone";
import FeatureCards from "../components/FeatureCards";
import backgroundImage from '../assets/backgroundImage.png';

export default function Landing() {
  return (
    <div
      style={{ // Theme Styling
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `
        linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(204, 204, 204, 1.8)),
         url(${backgroundImage})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Navbar />
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <HeroSection />
      </div>

    </div>
  );
}

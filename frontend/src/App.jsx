import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Hero from "./components/Hero";
import SolutionsSection from "./components/Solutions";
import WorkShowcase from "./components/WorkShowcase";
import PartnersInvestors from "./components/PartnersInvestors";
import Testimonials from "./components/Testimonials";
import ScrollToTop from "./components/ScrollToTop";

import Reveal from "./components/Reveal";

import Services from "./pages/Services";
import About from "./pages/About";
import Portfolio from "./components/portfolio/Portfolio";
import OurStory from "./pages/OurStory";
import Productspage from "./pages/Productspage";

import ProductDetails from "./pages/ProductDetails";
import Solutions from "./pages/Solutions";

function HomePage() {
  return (
    <>
      <Reveal><Hero /></Reveal>
      <Reveal><SolutionsSection /></Reveal>
      <Reveal><WorkShowcase /></Reveal>
      <Reveal><PartnersInvestors /></Reveal>
      <Reveal><Testimonials /></Reveal>
    </>
  );
}

function App() {
  return (
    <div style={{ overflowX: "hidden", maxWidth: "100vw", position: "relative" }}
      className="text-white bg-[radial-gradient(circle_at_right,_#02050A_10%,_#050B12_55%,_#0A192F_100%)]">

      <div style={{ overflowX: "hidden", position: "relative", zIndex: 10 }}>
        <MainLayout>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/products" element={<Productspage />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/solutions" element={<Solutions />} />
          </Routes>
        </MainLayout>
      </div>

    </div>
  );
}

export default App;
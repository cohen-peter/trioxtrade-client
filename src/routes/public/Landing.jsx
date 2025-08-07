import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import AboutUs from "../../components/landing/AboutUs";
import ServicesSection from "../../components/landing/Services";
import InvestmentPlans from "../../components/landing/Plans";
import PreFooter from "../../components/landing/PreFooter";
import Footer from "../../components/landing/Footer";
import { Box, Divider, Toolbar } from "@mui/material";
import { useEffect } from "react";

// function to handle the navbar scroll
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const LandingPage = () => {

  // handles navbar scroll from other pages
  useEffect(() => {
    const target = sessionStorage.getItem("scrollToTarget");
    if (target) {
      scrollToSection(target);
      sessionStorage.removeItem("scrollToTarget");
    }
  }, []);

  return(
    <>
    <Navbar />
    {/* Navbar is fixed so I need toolbar to push the hero down */}
    <Toolbar /> 

    {/* 64px for navbar height so add to each section margin so as not to stay
    under the navbar on scroll */}

    {/* Hero */}
    <Box id="home" sx={{ scrollMarginTop: "64px" }}>
      <Hero />
    </Box>
    
    {/* About section */}
    <Box id="about" sx={{ scrollMarginTop: "64px" }}>
      <AboutUs />
    </Box>

    {/* Service section */}
    <Box id="services" sx={{ scrollMarginTop: "64px" }}>
      <ServicesSection />
    </Box>
    
    {/* Plan section */}
    <Box id="plans" sx={{ scrollMarginTop: "64px" }}>
      <InvestmentPlans />
    </Box>
    
    {/* Pre footer and footer section along with divider component to seperate both */}
    <PreFooter />
    <Divider 
      sx={{ 
        width:"100%", 
        borderColor: "secondary.main", 
        borderBottomWidth: "5px"
      }} 
    />
    <Footer />
    </>
  );
};

export default LandingPage;
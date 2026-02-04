import Image from "next/image";
import Header from "@/app/_components/Header"
import Hero from "@/app/_components/Hero"
import Footer from "@/app/_components/Footer"
import HowItWorks from "@/app/_components/HowItWorks"
import Testimonials from "@/app/_components/Testimonials"
import Feature from "@/app/_components/Features"
import Pricing from "@/app/_components/Pricing"

export default function Home() {
  return (
    <div>
      {/* header  */}
      <Header />
      <Hero />
      <Feature />
      <HowItWorks/>
      <Pricing/>
      <Testimonials/>

      <Footer />
      {/* footer  */}
    </div>
  );
}

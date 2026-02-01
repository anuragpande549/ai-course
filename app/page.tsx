import Image from "next/image";
import Header from "@/app/_components/Header"
import Hero from "@/app/_components/Hero"

export default function Home() {
  return (
    <div>
      {/* header  */}
      <Header />
      <Hero />
      {/* footer  */}
    </div>
  );
}

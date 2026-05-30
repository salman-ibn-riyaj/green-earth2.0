import AboutCampaign from "@/components/Aboutcampaign";
import Hero from "@/components/Hero";
import OurImpact from "@/components/Ourimpact";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero/>
      <OurImpact></OurImpact>
      <AboutCampaign/>
    </div>
  );
}

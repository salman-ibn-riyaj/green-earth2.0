import AboutCampaign from "@/components/Aboutcampaign";
import AllTrees from "@/components/AllTrees";
import Hero from "@/components/Hero";
import OurImpact from "@/components/Ourimpact";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero/>
      <AllTrees/>
      <OurImpact></OurImpact>
      <AboutCampaign/>
    </div>
  );
}

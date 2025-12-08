import { Globe } from "../components/globe";
import { TechMarquee } from "../components/TechMarquee";



export default function Testimonial() {
  return (
    <div className="items-start mt-25 md:mt-35 c-space">
      <h2 className="text-heading">My Tech Universe</h2>

      {/* Globe Section - Made Bigger */}
      <div className="flex items-center justify-center my-16">
        <figure className="scale-125 md:scale-150">
          <Globe />
        </figure>
      </div>



      {/* Technology Marquee - Made Bigger */}
      <div className="mt-16">
        <h3 className="mb-8 text-3xl font-bold text-center text-white md:text-4xl">Technologies I Work With</h3>
        <div className="scale-110 md:scale-125">
          <TechMarquee />
        </div>
      </div>
    </div>
  );
}

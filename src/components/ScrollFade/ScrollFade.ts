import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll("[data-scroll-fade]").forEach((element) => {
  gsap.fromTo(element, { opacity: 0 }, { opacity: 1, scrollTrigger: element });
});

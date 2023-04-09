import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "@/utils";
gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll("[data-scroll-fade]").forEach((element) => {
  const animation = gsap.fromTo(
    element,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        fastScrollEnd: true,
      },
    }
  );
  if (isReducedMotion()) {
    animation.progress(1);
  }
});

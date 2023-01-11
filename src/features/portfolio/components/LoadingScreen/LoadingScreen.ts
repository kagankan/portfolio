import { gsap, Power1, Expo } from "gsap";
import { isReducedMotion, LOADING_END_EVENT_TYPE } from "@/utils";
const MESH_SIZE = 120;
const DELAY = 0.5;

if (isReducedMotion()) {
  gsap
    .timeline({ delay: DELAY })
    .fromTo(".LoadingScreen", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.4 })
    .add(() => {
      window.dispatchEvent(new CustomEvent(LOADING_END_EVENT_TYPE));
    });
} else {
  gsap
    .timeline({ delay: DELAY })
    .set(".LoadingScreen", { "--mesh-size": `${MESH_SIZE}px` })
    .fromTo(".LoadingScreen", { "--line-current": "0%" }, { "--line-current": "100%", ease: Power1.easeInOut }, "+=0.2")
    .fromTo(
      ".LoadingScreen",
      { "--mesh-current": "0px" },
      { "--mesh-current": `${MESH_SIZE / 2}px`, duration: 0.8, ease: Expo.easeIn },
      "-=0.2"
    )
    .fromTo(".LoadingScreen", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.6 }, "<+=0.4")
    .add(() => {
      window.dispatchEvent(new CustomEvent(LOADING_END_EVENT_TYPE));
    });
}

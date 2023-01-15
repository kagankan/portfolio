import { gsap } from "gsap";
import { splitText } from "@/components/SplitText/exports";
import { LOADING_END_EVENT_TYPE, isReducedMotion } from "@/utils";

const nameContainer = document.querySelector<HTMLElement>("[data-hero-name-container]");
const nameSource = document.querySelector<HTMLElement>("[data-hero-name-source]");
const titleContainer = document.querySelector<HTMLElement>("[data-hero-title-container]");
const titleSource = document.querySelector<HTMLElement>("[data-hero-title-source]");
gsap.set(".Hero", { "--hero-before-mask": `0%`, "--hero-after-mask": `100%` });
const timeline = gsap.timeline({ paused: true });
timeline
  .fromTo(".Hero", { "--hero-before-mask": "0%" }, { "--hero-before-mask": "100%", duration: 0.5 })
  .fromTo(".Hero", { "--hero-after-mask": "100%" }, { "--hero-after-mask": "0%", duration: 0.5 });
if (nameContainer && nameSource) {
  timeline.add(splitText(nameContainer, nameSource, 0.04), "-=0.2");
}
if (titleContainer && titleSource) {
  timeline.add(splitText(titleContainer, titleSource, 0.03));
}
timeline
  .to(".Hero__Label", { "--clip-size": "100%", duration: 0.2 })
  .to(".Hero__Label", { "--overlay-left": "100%", duration: 0.2 });
if (!isReducedMotion()) {
  window.addEventListener(
    LOADING_END_EVENT_TYPE,
    () => {
      timeline.play();
    },
    { once: true }
  );
} else {
  timeline.seek(timeline.duration());
}

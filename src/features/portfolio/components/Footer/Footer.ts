import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitText } from "@/utils/splitText";

gsap.registerPlugin(ScrollTrigger);

const timeline = gsap.timeline({
  paused: true,
  scrollTrigger: {
    trigger: ".Footer",
    start: "50% bottom",
  },
});
const SPEED = 0.05;

const source = document.querySelector<HTMLElement>("[data-footer-text-source]");
const container = document.querySelector<HTMLElement>("[data-footer-text-container]");
if (source && container) {
  timeline.add(splitText(container, source, SPEED));
}

import { gsap } from "gsap";

export const splitText = (container: HTMLElement, source: HTMLElement, speed = 0.05) => {
  const timeline = gsap.timeline();
  const text = source.textContent;
  text?.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.ariaHidden = "true";
    span.textContent = char;
    span.dataset.index = index.toString();
    container.appendChild(span);
    gsap.set(span, { opacity: 0, yPercent: 50, ...(char === " " ? {} : { display: "inline-block" }) });
    timeline.to(span, { opacity: 1, yPercent: 0, duration: 0.2 }, speed * index);
  });
  return timeline;
};

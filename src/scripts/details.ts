import { gsap } from "gsap";
import { isReducedMotion } from "@/utils";

const DETAILS_SELECTOR = "details";
const SUMMARY_SELECTOR = "summary";
const CONTENT_SELECTOR = "[data-details-content]";
const BEFORE_CLOSE_CLASS = "is-closing";
const getDuration = () => (isReducedMotion() ? 0 : 0.2);

const allDetails = document.querySelectorAll(DETAILS_SELECTOR);
allDetails.forEach((details) => {
  const summary = details.querySelector(SUMMARY_SELECTOR);
  const content = details.querySelector(CONTENT_SELECTOR);

  if (!summary || !content) return;

  // details/summary の開閉アニメーション
  gsap.set(content, { overflow: "hidden" });
  summary.addEventListener("click", (event) => {
    if (details.open) {
      // 閉じる
      event.preventDefault();
      details.classList.add(BEFORE_CLOSE_CLASS);
      gsap.to(content, {
        height: 0,
        onComplete: () => {
          details.open = false;
          details.classList.remove(BEFORE_CLOSE_CLASS);
        },
        duration: getDuration(),
      });
    } else {
      // 開く
      gsap.fromTo(content, { height: 0 }, { height: "auto", duration: getDuration() });
    }
  });
});

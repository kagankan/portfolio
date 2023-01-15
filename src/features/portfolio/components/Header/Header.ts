import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion, themeStorage } from "@/utils";

gsap.registerPlugin(ScrollTrigger);

// SPメニュー開閉
const navToggle = document.querySelector<HTMLButtonElement>("[data-header-nav-toggle]");
if (navToggle) {
  const targetId = navToggle.getAttribute("aria-controls");
  if (targetId) {
    const nav = document.getElementById(targetId);
    const open = () => {
      nav?.removeAttribute("hidden");
      navToggle.setAttribute("aria-expanded", "true");
    };
    const close = () => {
      nav?.setAttribute("hidden", "");
      navToggle.setAttribute("aria-expanded", "false");
    };
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        // 閉じる
        close();
      } else {
        // 開く
        open();
      }
    });

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width && height) {
        // SP
        close();
      } else {
        // PC
        open();
      }
    });
    resizeObserver.observe(navToggle);

    // 外をクリックしたら閉じる
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (target instanceof HTMLElement) {
        if (!document.querySelector(".Header")?.contains(target)) {
          close();
        }
      }
    });
  }
}

ScrollTrigger.create({
  trigger: "body",
  start: "top top",
  toggleClass: { targets: ".Header", className: "is-scroll" },
});

const disableGsap = () => {
  ScrollTrigger.getAll().forEach((scrollTrigger) => {
    const animation = scrollTrigger.animation;
    if (animation) {
      animation.progress(1);
      scrollTrigger.disable();
    }
  });
};
const enableGsap = () => {
  ScrollTrigger.getAll().forEach((scrollTrigger) => {
    scrollTrigger.enable();
    const animation = scrollTrigger.animation;
    if (animation) {
      animation.progress(0);
    }
  });
};

const commands = {
  "motion-disable": () => {
    themeStorage.set("reduced-motion", "reduce");
    document.documentElement.setAttribute("data-motion", "reduce");
    disableGsap();
  },
  "motion-enable": () => {
    themeStorage.set("reduced-motion", "no-preference");
    document.documentElement.setAttribute("data-motion", "no-preference");
    enableGsap();
  },
  "motion-default": () => {
    themeStorage.remove("reduced-motion");
    document.documentElement.removeAttribute("data-motion");
    if (isReducedMotion()) {
      disableGsap();
    } else {
      enableGsap();
    }
  },
  default: () => {
    themeStorage.remove("color-scheme");
    document.documentElement.removeAttribute("data-theme");
  },
  light: () => {
    themeStorage.set("color-scheme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  },
  dark: () => {
    themeStorage.set("color-scheme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  },
  off: () => {
    document.querySelectorAll<HTMLLinkElement>(`link[rel="stylesheet"]`).forEach((style) => {
      style.media = "not all";
    });
  },
  on: () => {
    document.querySelectorAll<HTMLLinkElement>(`link[rel="stylesheet"]`).forEach((style) => {
      style.removeAttribute("media");
    });
  },
} as const;

document.querySelectorAll("[data-header-theme]").forEach((button) => {
  const key = button.getAttribute("data-header-theme");
  if (!key) return;
  const callback = Object.hasOwn(commands, key) ? commands[key as keyof typeof commands] : () => void 0;
  button.addEventListener("click", () => {
    callback();
    button
      .closest(`[role="radiogroup"]`)
      ?.querySelectorAll("[data-header-theme]")
      .forEach((radio) => {
        radio.setAttribute("aria-checked", (radio === button).toString());
      });
  });
});

{
  const selectedReducedMotion = themeStorage.get("reduced-motion");
  if (selectedReducedMotion === "reduce") {
    document.querySelector<HTMLElement>(`[data-header-theme="motion-disable"]`)?.click();
  } else if (selectedReducedMotion === "no-preference") {
    document.querySelector<HTMLElement>(`[data-header-theme="motion-enable"]`)?.click();
  }
}

{
  const selectedColorScheme = themeStorage.get("color-scheme");
  if (selectedColorScheme === "dark") {
    document.querySelector<HTMLElement>(`[data-header-theme="dark"]`)?.click();
  } else if (selectedColorScheme === "light") {
    document.querySelector<HTMLElement>(`[data-header-theme="light"]`)?.click();
  }
}

document.querySelectorAll<HTMLDetailsElement>(".Header details").forEach((details) => {
  // 外をクリックで閉じる
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (target instanceof HTMLElement) {
      if (!details.contains(target)) {
        details.open = false;
      }
    }
  });
});

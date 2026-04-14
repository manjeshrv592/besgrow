"use client";

import { useEffect } from "react";

/**
 * Global scroll-triggered fade-in observer.
 * Watches all elements with the `.fade-in` class and adds `.is-visible`
 * when they enter the viewport. Uses MutationObserver to pick up
 * dynamically rendered elements (e.g. from Sanity or client components).
 *
 * Mount once in the root layout — no wrapper needed on server components,
 * just add the `.fade-in` CSS class to any element.
 */
export default function ScrollFadeObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -120px 0px" },
    );

    // Observe all current .fade-in elements
    const observe = () =>
      document.querySelectorAll(".fade-in:not(.is-visible), .fade-in-left:not(.is-visible), .fade-in-right:not(.is-visible)").forEach((el) => io.observe(el));

    observe();

    // Re-scan when DOM mutates (covers lazy / client-rendered content)
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}

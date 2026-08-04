import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const positions = new Map();

function ScrollMemory() {
  const { key } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    function remember() {
      positions.set(key, window.scrollY);
    }

    window.addEventListener("scroll", remember, { passive: true });
    return () => window.removeEventListener("scroll", remember);
  }, [key]);

  // Back and forward return to where the visitor left off; a new page starts
  // at the top.
  useLayoutEffect(() => {
    window.scrollTo(0, navigationType === "POP" ? (positions.get(key) ?? 0) : 0);
  }, [key, navigationType]);

  return null;
}

export default ScrollMemory;

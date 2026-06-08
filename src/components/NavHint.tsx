import React, { useState, useEffect, useRef } from "react";
import "../css/NavHint.css";

export default function NavHint() {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const show = () => {
      setVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(false), 5000);
    };

    window.addEventListener("mousemove", show);
    return () => {
      window.removeEventListener("mousemove", show);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className={`nav-hint${visible ? " nav-hint--on" : ""}`} aria-hidden="true">
      <span className="nav-hint-arrow">↑</span>
      <span className="nav-hint-label">hover to navigate</span>
    </div>
  );
}

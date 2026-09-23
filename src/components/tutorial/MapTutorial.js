import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./MapTutorial.css";

const TutorialIcon = ({ type }) => {
  const icons = {
    rotate: <><path d="M10 18V8a2 2 0 0 1 4 0v7"/><path d="M14 14v-4a2 2 0 0 1 4 0v7c0 5-3 8-7 8-3 0-5-1.5-6.5-4L3 18a2 2 0 0 1 3.5-2l2 2"/><path d="M4 5h6M7 2 4 5l3 3M24 5h-6M21 2l3 3-3 3"/></>,
    zoom: <><circle cx="13" cy="13" r="7"/><path d="m18 18 5 5M13 9v8M9 13h8"/></>,
    select: <><path d="M7 5h14v12H10l-5 4V7a2 2 0 0 1 2-2Z"/><path d="M11 9h6M11 13h4"/></>,
    route: <><circle cx="6" cy="21" r="2"/><circle cx="22" cy="5" r="2"/><path d="M8 21h4a4 4 0 0 0 4-4v-8a4 4 0 0 1 4-4"/></>,
  };
  return <svg viewBox="0 0 28 28" aria-hidden="true">{icons[type]}</svg>;
};

const MapTutorial = ({ onClose }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const nextButtonRef = useRef(null);
  const cardRef = useRef(null);
  const steps = ["rotate", "zoom", "select", "route"];
  const current = steps[step];
  const isLast = step === steps.length - 1;

  useEffect(() => nextButtonRef.current?.focus(), [step]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = [...cardRef.current.querySelectorAll("button")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="tutorial-layer" role="dialog" aria-modal="true" aria-labelledby="tutorial-title">
      <div className="tutorial-card" ref={cardRef}>
        <button className="tutorial-skip" onClick={onClose}>{t("tutorial.skip")}</button>
        <div className={`tutorial-icon tutorial-icon-${current}`}><TutorialIcon type={current} /></div>
        <p className="tutorial-step">{t("tutorial.step", { current: step + 1, total: steps.length })}</p>
        <h2 id="tutorial-title">{t(`tutorial.${current}.title`)}</h2>
        <p className="tutorial-description">{t(`tutorial.${current}.description`)}</p>
        <div className="tutorial-footer">
          <div className="tutorial-dots" aria-hidden="true">
            {steps.map((item, index) => <span key={item} className={index === step ? "active" : ""} />)}
          </div>
          <button
            ref={nextButtonRef}
            className="tutorial-next"
            onClick={() => isLast ? onClose() : setStep((value) => value + 1)}
          >
            {isLast ? t("tutorial.done") : t("tutorial.next")}
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapTutorial;

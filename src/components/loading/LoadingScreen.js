import React, { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import { useTranslation } from "react-i18next";
import "./LoadingScreen.css";

const LoadingScreen = ({ onReady, onFinished }) => {
  const { active, progress, loaded, total } = useProgress();
  const { t } = useTranslation();
  const [isLeaving, setIsLeaving] = useState(false);
  const hasStarted = useRef(false);
  const completionScheduled = useRef(false);

  useEffect(() => {
    if (active || total > 0) hasStarted.current = true;

    if (!hasStarted.current || active || progress < 100 || completionScheduled.current) return undefined;

    completionScheduled.current = true;
    const settleTimer = window.setTimeout(() => {
      setIsLeaving(true);
      onReady?.();
    }, 220);
    const finishTimer = window.setTimeout(() => onFinished?.(), 900);

    return () => {
      window.clearTimeout(settleTimer);
      window.clearTimeout(finishTimer);
      completionScheduled.current = false;
    };
  }, [active, progress, total, onReady, onFinished]);

  const displayedProgress = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div className={`loading-screen ${isLeaving ? "is-leaving" : ""}`} role="status" aria-live="polite">
      <div className="loading-ambient" aria-hidden="true" />
      <div className="loading-content">
        <div className="loading-logo-frame">
          <span className="loading-logo-ring" aria-hidden="true" />
          <img src={`${process.env.PUBLIC_URL}/oa_logo.png`} alt={t("loading.logoAlt")} className="loading-logo" />
        </div>
        <div className="loading-copy">
          <p className="loading-kicker">{t("loading.kicker")}</p>
          <h1>{t("loading.title")}</h1>
        </div>
        <div className="loading-progress-block">
          <div className="loading-progress-meta">
            <span>{t("loading.preparing")}</span>
            <strong>{displayedProgress}%</strong>
          </div>
          <div
            className="loading-progress-track"
            role="progressbar"
            aria-label={t("loading.progressLabel")}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={displayedProgress}
          >
            <span className="loading-progress-fill" style={{ transform: `scaleX(${displayedProgress / 100})` }} />
          </div>
          <p className="loading-assets">
            {total > 0 ? t("loading.assets", { loaded, total }) : t("loading.starting")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

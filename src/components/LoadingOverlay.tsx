import React from "react";

type LoadingOverlayProps = {
  message?: string;
};
const LoadingOverlay = ({ message }: LoadingOverlayProps) => {
  return (
    <div className="loading-overlay-container">
      <img
        src="/img/sourcify_blue_rounded.png"
        className="loading-overlay animate-bounce"
        alt="Bouncing Sourcify logo for loading content"
      />
      {message && <div className="mt-1">{message}</div>}
    </div>
  );
};

export default LoadingOverlay;

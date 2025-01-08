import React from "react";

const SolidityLogo = () => {
  return (
    <svg
      style={{
        width: "0.9rem",
        verticalAlign: "middle",
        marginLeft: "0.8rem",
        marginRight: "0.4rem",
      }}
      viewBox="0 0 100 160"
      focusable="false"
    >
      <path
        opacity="0.8"
        d="M50 44.3013L25 1L0 44.3013L25 87.6025L50 44.3013Z"
      ></path>
      <path
        opacity="0.45"
        d="M50 44.3091L75 1.00781L25 1.00781L0 44.3091H50Z"
      ></path>
      <path
        opacity="0.6"
        d="M75 1.00781L25 1.00781L50 44.3091H100L75 1.00781Z"
      ></path>
      <path
        opacity="0.8"
        d="M50 115.699L75 159L100 115.699L75 72.3975L50 115.699Z"
      ></path>
      <path
        opacity="0.45"
        d="M50 115.691L25 158.993H75L100 115.691L50 115.691Z"
      ></path>
      <path
        opacity="0.6"
        d="M25 158.993H75L50 115.691L0 115.691L25 158.993Z"
      ></path>
    </svg>
  );
};

export default ({ description }: { description: string }) => {
  return (
    <div>
      <div
        className="theme-admonition theme-admonition-tip alert alert--info"
        style={{
          marginBottom: "1em",
        }}
      >
        <div
          style={{
            font: "var(--ifm-heading-font-weight) var(--ifm-h5-font-size)/var(--ifm-heading-line-height) var(--ifm-heading-font-family)",
            marginBottom: "0.3rem",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              verticalAlign: "middle",
            }}
          >
            Available only for
          </span>
          <SolidityLogo />
          <span
            style={{
              fontSize: "1.1rem",
              verticalAlign: "middle",
              textTransform: "capitalize",
              color: "#1a1b1c",
            }}
          >
            Solidity
          </span>
        </div>
        <div>
          <p style={{ marginBottom: "0" }}>{description}</p>
        </div>
      </div>
    </div>
  );
};

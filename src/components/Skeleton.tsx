import React, { PropsWithChildren } from "react";

const Skeleton = ({
  type = "line",
  width = "100%",
  height = "16px",
  borderRadius = "4px",
  style = {},
  className = "",
  lines = 3,
  avatar = false,
}) => {
  const baseStyle = {
    background:
      "linear-gradient(90deg, var(--tt-gray-light-100, #e0e0e0) 0%, var(--tt-gray-light-200, #cfcfcf) 50%, var(--tt-gray-light-100, #e0e0e0) 100%)",
    backgroundSize: "200% 100%",
    animation: "skeleton-loading 1.5s ease-in-out infinite",
    borderRadius,
    ...style,
  };

  const styles = `
    @keyframes skeleton-loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    .dark .skeleton-bg {
      background: linear-gradient(90deg, var(--tt-gray-dark-100, #2a2a2a) 0%, var(--tt-gray-dark-200, #3a3a3a) 50%, var(--tt-gray-dark-100, #2a2a2a) 100%);
    }
  `;

  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const skeletonClass = `skeleton-bg ${className}`;

  if (type === "circle") {
    return (
      <div
        className={skeletonClass}
        style={{
          ...baseStyle,
          width,
          height,
          borderRadius: "50%",
        }}
      />
    );
  }

  if (type === "text") {
    return (
      <div className={className} style={{ width: "100%" }}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={skeletonClass}
            style={{
              ...baseStyle,
              width: index === lines - 1 ? "70%" : "100%",
              height,
              marginBottom: index === lines - 1 ? 0 : "8px",
            }}
          />
        ))}
      </div>
    );
  }

  if (type === "card") {
    return (
      <div
        className={className}
        style={{
          padding: "16px",
          border: "1px solid var(--tt-border-color)",
          borderRadius: "8px",
          backgroundColor: "var(--tt-card-bg-color)",
          ...style,
        }}
      >
        {avatar && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <div
              className={skeletonClass}
              style={{
                ...baseStyle,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "12px",
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                className={skeletonClass}
                style={{
                  ...baseStyle,
                  width: "40%",
                  height: "14px",
                  marginBottom: "6px",
                }}
              />
              <div
                className={skeletonClass}
                style={{
                  ...baseStyle,
                  width: "60%",
                  height: "12px",
                }}
              />
            </div>
          </div>
        )}

        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={skeletonClass}
            style={{
              ...baseStyle,
              width: index === lines - 1 ? "75%" : "100%",
              height: "14px",
              marginBottom: index === lines - 1 ? 0 : "8px",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={skeletonClass}
      style={{
        ...baseStyle,
        width,
        height,
      }}
    />
  );
};

export default Skeleton;

// Composant CenteredLayout avec skeleton
export const CenteredLayout = ({
  loading = false,
  children,
}: PropsWithChildren<{ loading?: boolean }>) => {
  const layoutStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#f5f5f5",
  };

  const contentStyle = {
    maxWidth: "800px",
    width: "100%",
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  if (loading) {
    return (
      <div style={layoutStyle}>
        <div style={contentStyle}>
          {/* Skeleton du header */}
          <div style={{ marginBottom: "24px" }}>
            <Skeleton
              type="line"
              width="60%"
              height="32px"
              style={{ marginBottom: "12px" }}
            />
            <Skeleton type="line" width="80%" height="16px" />
          </div>

          {/* Skeleton du contenu principal */}
          <div style={{ marginBottom: "24px" }}>
            <Skeleton type="card" avatar={true} lines={4} />
          </div>

          {/* Skeleton des éléments supplémentaires */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <Skeleton type="card" lines={3} />
            <Skeleton type="card" lines={3} />
          </div>

          {/* Skeleton de la liste */}
          <div>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: index < 2 ? "1px solid #e0e0e0" : "none",
                }}
              >
                <Skeleton
                  type="circle"
                  width="32px"
                  height="32px"
                  style={{ marginRight: "12px" }}
                />
                <div style={{ flex: 1 }}>
                  <Skeleton
                    type="line"
                    width="70%"
                    height="14px"
                    style={{ marginBottom: "6px" }}
                  />
                  <Skeleton type="line" width="40%" height="12px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={layoutStyle}>
      <div style={contentStyle}>{children}</div>
    </div>
  );
};

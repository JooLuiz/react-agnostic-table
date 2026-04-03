import { useState, type ReactNode } from "react";

type PlaygroundPanelProps = {
  title: string;
  description: string;
  code: string;
  children: ReactNode;
  controls?: ReactNode;
  defaultView?: "render" | "code";
};

const PlaygroundPanel = ({
  title,
  description,
  code,
  children,
  controls,
  defaultView = "render",
}: PlaygroundPanelProps) => {
  const [view, setView] = useState<"render" | "code">(defaultView);

  return (
    <section className="playground-panel">
      <div className="playground-header">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="playground-tabs">
          <button
            type="button"
            className={view === "render" ? "tab-button tab-button-active" : "tab-button"}
            onClick={() => setView("render")}
          >
            Rendered Component
          </button>
          <button
            type="button"
            className={view === "code" ? "tab-button tab-button-active" : "tab-button"}
            onClick={() => setView("code")}
          >
            Code
          </button>
        </div>
      </div>

      {controls && view === "render" && <div className="playground-controls">{controls}</div>}

      {view === "render" ? (
        <div className="playground-canvas">{children}</div>
      ) : (
        <pre className="playground-code">
          <code>{code}</code>
        </pre>
      )}
    </section>
  );
};

export default PlaygroundPanel;

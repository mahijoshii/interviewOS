import type { PropsWithChildren, ReactNode } from "react";

export function Card({ title, eyebrow, action, children }: PropsWithChildren<{ title?: string; eyebrow?: string; action?: ReactNode }>) {
  return (
    <section className="card">
      {(title || eyebrow || action) && (
        <div className="cardHeader">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2>{title}</h2>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

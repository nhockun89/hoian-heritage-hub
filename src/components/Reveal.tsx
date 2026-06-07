/**
 * <Reveal> — a component that fades its children in when they
 * scroll into view.
 *
 * Replaces the previous `useScrollReveal` hook, which ran two
 * observers over the whole document and called
 * `document.querySelectorAll('.reveal-on-scroll')` on every
 * DOM mutation. The hook had a single consumer (App.tsx) and
 * competed with hand-applied `is-visible` class names in
 * HeroSection.tsx.
 *
 * The <Reveal> component owns its own IntersectionObserver. It
 * observes one element at a time. There is no document-level
 * mutation observer. Components opt in by wrapping their JSX.
 *
 * Usage:
 *   <Reveal>...</Reveal>
 *   <Reveal as="section" delay={150}>...</Reveal>
 *
 * The visual effect (opacity 0 → 1) is the same as the old CSS
 * in src/index.css and is added by this component.
 */

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

export interface RevealProps {
  readonly children: ReactNode;
  /** Element to render. Defaults to "div". */
  readonly as?: ElementType;
  /** Optional class names appended to the element. */
  readonly className?: string;
  /** Inline-style override. */
  readonly style?: CSSProperties;
  /** Delay in ms before the reveal fires once the element is in
   *  view. Used to stagger siblings. */
  readonly delay?: number;
  /** Threshold passed to IntersectionObserver. */
  readonly threshold?: number;
}

export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  style,
  delay = 0,
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (delay > 0) {
              window.setTimeout(() => setVisible(true), delay);
            } else {
              setVisible(true);
            }
            observer.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const mergedStyle: CSSProperties = {
    transitionDelay: delay > 0 ? `${delay}ms` : undefined,
    ...style,
  };

  return (
    <Tag
      ref={ref as React.Ref<unknown>}
      className={`reveal-on-scroll ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={mergedStyle}
    >
      {children}
    </Tag>
  );
}

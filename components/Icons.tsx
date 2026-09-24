import type { SVGProps } from "react";

const base = (p: SVGProps<SVGSVGElement>, size = 18) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, ...p,
});

type P = SVGProps<SVGSVGElement> & { size?: number };
export const Arrow = ({ size, ...p }: P) => <svg {...base(p, size)}><path d="M7 17L17 7" /><path d="M8 7h9v9" /></svg>;
export const Down = ({ size, ...p }: P) => <svg {...base(p, size)}><path d="M12 5v14" /><path d="M6 13l6 6 6-6" /></svg>;
export const Download = ({ size, ...p }: P) => <svg {...base(p, size)}><path d="M12 4v11" /><path d="M7 10l5 5 5-5" /><path d="M5 20h14" /></svg>;
export const Close = ({ size, ...p }: P) => <svg {...base(p, size)}><path d="M6 6l12 12M18 6L6 18" /></svg>;
export const Menu = ({ size, ...p }: P) => <svg {...base(p, size)}><path d="M4 8h16M4 16h16" /></svg>;
export const Left = ({ size, ...p }: P) => <svg {...base(p, size)}><path d="M15 5l-7 7 7 7" /></svg>;
export const Right = ({ size, ...p }: P) => <svg {...base(p, size)}><path d="M9 5l7 7-7 7" /></svg>;
export const Copy = ({ size, ...p }: P) => <svg {...base(p, size)}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>;

export function Star({ size = 28, color = "#F4A300", className }: { size?: number; color?: string; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ flexShrink: 0, fill: color }}>
      <polygon points="50,0 59.9,26 85.4,14.6 74,40.1 100,50 74,59.9 85.4,85.4 59.9,74 50,100 40.1,74 14.6,85.4 26,59.9 0,50 26,40.1 14.6,14.6 40.1,26" />
    </svg>
  );
}

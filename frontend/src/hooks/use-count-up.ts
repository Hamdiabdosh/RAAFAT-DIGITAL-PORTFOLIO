import { useEffect, useState } from "react";

function parseStatValue(value: string): { num: number; suffix: string; prefix: string } {
  const match = value.match(/^([^0-9]*)([0-9]+)(.*)$/);
  if (!match) return { prefix: "", num: 0, suffix: value };
  return { prefix: match[1] ?? "", num: Number(match[2]), suffix: match[3] ?? "" };
}

export function useCountUp(value: string, active: boolean, duration = 1200) {
  const { prefix, num, suffix } = parseStatValue(value);
  const [display, setDisplay] = useState(active ? value : `${prefix}0${suffix}`);

  useEffect(() => {
    if (!active || num === 0) {
      setDisplay(value);
      return;
    }
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const current = Math.floor(progress * num);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(value);
    };
    requestAnimationFrame(step);
  }, [active, value, num, prefix, suffix, duration]);

  return display;
}

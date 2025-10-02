import { useEffect, useMemo, useState } from "react";

export function useImagePreload(urls = []) {
  const list = useMemo(() => Array.from(new Set((urls || []).filter(Boolean))), [urls]);
  const [loaded, setLoaded] = useState(0);
  const [errored, setErrored] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!list.length) {
      setDone(true);
      return;
    }
    let active = true;
    let finished = 0;
    list.forEach((src) => {
      const img = new Image();
      const onLoad = () => {
        if (!active) return;
        finished += 1;
        setLoaded((c) => c + 1);
        if (finished === list.length) setDone(true);
      };
      const onError = () => {
        if (!active) return;
        finished += 1;
        setErrored((c) => c + 1);
        if (finished === list.length) setDone(true);
      };
      img.addEventListener("load", onLoad);
      img.addEventListener("error", onError);
      img.src = src;
    });
    return () => {
      active = false;
    };
  }, [list]);

  const total = list.length;
  const progress = total ? Math.min(100, Math.round(((loaded + errored) / total) * 100)) : 100;

  return { done, progress, loaded, total, errored };
}

import { useEffect, useState } from 'react';
import { OPERATIONS_INTERVAL_MS } from './operations-data';

export function useOperationCarousel(count: number, paused: boolean, interval = OPERATIONS_INTERVAL_MS) {
  const [selected, setSelected] = useState(0);
  const [revision, setRevision] = useState(0);
  const select = (index: number) => {
    if (index < 0 || index >= count) return;
    setSelected(index);
    setRevision(value => value + 1);
  };
  useEffect(() => {
    if (paused || count < 2) return;
    const timer = window.setTimeout(() => setSelected(index => (index + 1) % count), interval);
    return () => window.clearTimeout(timer);
  }, [count, interval, paused, selected, revision]);
  return { selected, select };
}

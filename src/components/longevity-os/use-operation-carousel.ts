import { useEffect, useState } from 'react';
import { OPERATIONS_INTERVAL_MS } from './operations-data';

export function useOperationCarousel(count: number, paused: boolean) {
  const [selected, setSelected] = useState(0);
  const [revision, setRevision] = useState(0);
  const select = (index: number) => {
    if (index < 0 || index >= count) return;
    setSelected(index);
    setRevision(value => value + 1);
  };
  useEffect(() => {
    if (paused || count < 2) return;
    const timer = window.setTimeout(() => setSelected(index => (index + 1) % count), OPERATIONS_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [count, paused, selected, revision]);
  return { selected, select };
}

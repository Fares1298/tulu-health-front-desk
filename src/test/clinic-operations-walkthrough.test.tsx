import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useOperationCarousel } from '@/components/longevity-os/use-operation-carousel';
import showcases from '@/components/longevity-os/clinic-operations-data.json';

afterEach(() => { cleanup(); vi.useRealTimers(); });

describe('Supplied Clinic Operations walkthrough playback', () => {
  for (const [index, interval, count] of [[0, 4800, 4], [1, 4200, 5], [2, 4200, 5]]) {
    it(`preserves walkthrough ${index} timing and loops through its complete sequence`, () => {
      const showcase = index === undefined ? undefined : showcases[index];
      if (!showcase || interval === undefined || count === undefined) throw new Error('Missing supplied walkthrough');
      expect(showcase.interval).toBe(interval);
      expect(showcase.steps.length).toBe(count);
      vi.useFakeTimers();
      const { result } = renderHook(() => useOperationCarousel(showcase.steps.length, false, showcase.interval));
      act(() => vi.advanceTimersByTime(interval - 1));
      expect(result.current.selected).toBe(0);
      for (let step = 1; step <= count; step++) {
        act(() => vi.advanceTimersByTime(step === 1 ? 1 : interval));
        expect(result.current.selected).toBe(step % count);
      }
    });
  }
  it('restarts the supplied interval after manual navigation and pauses without advancing', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ paused }) => useOperationCarousel(5, paused, 4200), { initialProps: { paused: false } });
    act(() => vi.advanceTimersByTime(4000));
    act(() => result.current.select(3));
    act(() => vi.advanceTimersByTime(4199));
    expect(result.current.selected).toBe(3);
    rerender({ paused: true });
    act(() => vi.advanceTimersByTime(20000));
    expect(result.current.selected).toBe(3);
    rerender({ paused: false });
    act(() => vi.advanceTimersByTime(4200));
    expect(result.current.selected).toBe(4);
  });
});
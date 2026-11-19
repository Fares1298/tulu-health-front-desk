import { act, renderHook, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useOperationCarousel } from '@/components/longevity-os/use-operation-carousel';
import { OPERATIONS_FADE_MS } from '@/components/longevity-os/operations-data';

afterEach(() => { cleanup(); vi.useRealTimers(); });
describe('Operations carousel playback', () => {
  it('advances only after six seconds and loops continuously', () => {
    vi.useFakeTimers(); const { result } = renderHook(() => useOperationCarousel(3, false));
    act(() => vi.advanceTimersByTime(5999)); expect(result.current.selected).toBe(0);
    act(() => vi.advanceTimersByTime(1)); expect(result.current.selected).toBe(1);
    act(() => vi.advanceTimersByTime(6000)); expect(result.current.selected).toBe(2);
    act(() => vi.advanceTimersByTime(6000)); expect(result.current.selected).toBe(0);
  });
  it('restarts the full six-second interval after manual selection', () => {
    vi.useFakeTimers(); const { result } = renderHook(() => useOperationCarousel(3, false));
    act(() => vi.advanceTimersByTime(5000)); act(() => result.current.select(1));
    act(() => vi.advanceTimersByTime(5999)); expect(result.current.selected).toBe(1);
    act(() => vi.advanceTimersByTime(1)); expect(result.current.selected).toBe(2);
  });
  it('pauses for hover, keyboard focus or reduced motion, then resumes with a full interval', () => {
    vi.useFakeTimers(); const { result, rerender } = renderHook(({paused}) => useOperationCarousel(2, paused), {initialProps:{paused:false}});
    act(() => vi.advanceTimersByTime(4000)); rerender({paused:true});
    act(() => vi.advanceTimersByTime(12000)); expect(result.current.selected).toBe(0);
    rerender({paused:false}); act(() => vi.advanceTimersByTime(6000)); expect(result.current.selected).toBe(1);
  });
  it('cleans up its timer when unmounted', () => {
    vi.useFakeTimers(); const { unmount } = renderHook(() => useOperationCarousel(2,false));
    expect(vi.getTimerCount()).toBe(1); unmount(); expect(vi.getTimerCount()).toBe(0);
  });
  it('uses a 650ms fade, within the requested 600–700ms window', () => {
    expect(OPERATIONS_FADE_MS).toBe(650);
  });
});

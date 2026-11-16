import { createFileRoute } from '@tanstack/react-router';
import { PreservedPage, preservedHead } from '@/components/preserved-page';

export const Route = createFileRoute('/ai-front-desk')({
  head: () => preservedHead('ai-front-desk'),
  component: FrontDesk,
});

function FrontDesk() {
  return <PreservedPage name="ai-front-desk" />;
}

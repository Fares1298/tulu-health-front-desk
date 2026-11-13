import { createFileRoute } from '@tanstack/react-router';
import { PreservedPage, preservedHead } from '@/components/preserved-page';
export const Route = createFileRoute('/privacy')({ head: () => preservedHead('privacy'), component: Page });
function Page() { return <PreservedPage name="privacy" />; }

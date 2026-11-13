import { createFileRoute } from '@tanstack/react-router';
import { PreservedPage, preservedHead } from '@/components/preserved-page';
export const Route = createFileRoute('/terms')({ head: () => preservedHead('terms'), component: Page });
function Page() { return <PreservedPage name="terms" />; }

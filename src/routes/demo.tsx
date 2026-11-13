import { createFileRoute } from '@tanstack/react-router';
import { PreservedPage, preservedHead } from '@/components/preserved-page';
export const Route = createFileRoute('/demo')({ head: () => preservedHead('demo'), component: Page });
function Page() { return <PreservedPage name="demo" />; }

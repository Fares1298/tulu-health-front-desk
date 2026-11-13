import { createFileRoute } from '@tanstack/react-router';
import { PreservedPage, preservedHead } from '@/components/preserved-page';
export const Route = createFileRoute('/operations')({ head: () => preservedHead('operations'), component: Page });
function Page() { return <PreservedPage name="operations" />; }

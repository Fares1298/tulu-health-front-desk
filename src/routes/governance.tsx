import { createFileRoute } from '@tanstack/react-router';
import { PreservedPage, preservedHead } from '@/components/preserved-page';
export const Route = createFileRoute('/governance')({ head: () => preservedHead('governance'), component: Page });
function Page() { return <PreservedPage name="governance" />; }

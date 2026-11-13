import { createFileRoute } from '@tanstack/react-router';
import { PreservedPage, preservedHead } from '@/components/preserved-page';
export const Route = createFileRoute('/services')({ head: () => preservedHead('services'), component: Page });
function Page() { return <PreservedPage name="services" />; }

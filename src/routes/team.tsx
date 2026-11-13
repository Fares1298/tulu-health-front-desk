import { createFileRoute } from '@tanstack/react-router';
import { PreservedPage, preservedHead } from '@/components/preserved-page';
export const Route = createFileRoute('/team')({ head: () => preservedHead('team'), component: Page });
function Page() { return <PreservedPage name="team" />; }

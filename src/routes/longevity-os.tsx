import { createFileRoute } from '@tanstack/react-router';
import { PreservedPage, preservedHead } from '@/components/preserved-page';
export const Route = createFileRoute('/longevity-os')({ head: () => preservedHead('longevity-os'), component: Page });
function Page() { return <PreservedPage name="longevity-os" />; }

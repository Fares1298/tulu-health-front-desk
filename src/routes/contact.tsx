import { createFileRoute } from '@tanstack/react-router';
import { PreservedPage, preservedHead } from '@/components/preserved-page';
export const Route = createFileRoute('/contact')({ head: () => preservedHead('contact'), component: Page });
function Page() { return <PreservedPage name="contact" />; }

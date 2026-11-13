import { createFileRoute } from '@tanstack/react-router';
import { PreservedPage, preservedHead } from '@/components/preserved-page';
export const Route = createFileRoute('/blog')({ head: () => preservedHead('blog'), component: Page });
function Page() { return <PreservedPage name="blog" />; }

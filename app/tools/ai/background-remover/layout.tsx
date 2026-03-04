import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI Background Remover | Oruzen Tools',
    description: 'Remove backgrounds from images instantly. Powered by local, in-browser AI.
                        No data ever leaves your device—100% private.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

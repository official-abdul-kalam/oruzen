import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Word & Character Counter | Oruzen Tools',
    description: 'Analyze your text in real-time. perfect for essays, tweets, SEO content, and general writing metrics.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

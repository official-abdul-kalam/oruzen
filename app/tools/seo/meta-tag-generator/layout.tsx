import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Meta Tag Generator | Oruzen Tools',
    description: 'Create perfectly optimized meta tags for Google Search, Facebook (Open Graph), and Twitter cards. Boost your click-through rates.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

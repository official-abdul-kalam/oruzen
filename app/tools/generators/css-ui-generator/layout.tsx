import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Premium Glassmorphism Generator | Oruzen Tools',
    description: 'Create stunning, modern glass UIs in seconds. Tweak the blur, transparency, and borders to get the perfect CSS code.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Smart Image Resizer | Oruzen Tools',
    description: 'Crop, resize, and optimize images for social media instantly. Zero server uploads, absolute privacy.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

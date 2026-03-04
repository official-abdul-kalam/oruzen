import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Color Palette Extractor | Oruzen Tools',
    description: 'Upload any image to instantly extract its dominant color and a beautiful matching palette. Perfect for UI design inspiration.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

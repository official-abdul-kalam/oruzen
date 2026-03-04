import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Lossless Image Compressor | Oruzen Tools',
    description: 'Compress PNGs and JPEGs without losing quality. Set a target file size (e.g., under 100KB) and compress instantly within your browser.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

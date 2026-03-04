import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Image to WebP Compressor | Oruzen Tools',
    description: 'Compress PNG and JPG images to next-gen WebP format.
                        Files are processed entirely in your browser—100% private and secure.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

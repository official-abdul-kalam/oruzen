import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'YouTube Video Downloader | Oruzen Tools',
    description: 'Paste any YouTube link to instantly generate a high-quality (up to 1080p) MP4 download link. No software required.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

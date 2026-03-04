import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'YouTube Thumbnail Downloader | Oruzen Tools',
    description: 'Extract and download high-quality YouTube thumbnails instantly. Just paste the video URL below.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

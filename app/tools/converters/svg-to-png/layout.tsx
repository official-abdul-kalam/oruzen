import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'SVG to PNG/JPEG Converter | Oruzen Tools',
    description: 'Convert vector graphic SVG files into standard raster images flawlessly. Supports High-Res upscaling and background color handling.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

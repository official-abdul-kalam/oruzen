import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Realistic Text to Handwriting | Oruzen Tools',
    description: 'Convert digital text into ultra-realistic handwritten notes. Perfect for assignments. 100% free and private.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

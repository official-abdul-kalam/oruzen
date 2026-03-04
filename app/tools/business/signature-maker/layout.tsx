import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Free Digital Signature Maker | Oruzen Tools',
    description: 'Draw your e-signature below and download it instantly as a transparent PNG. 100% private, works entirely in your browser.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

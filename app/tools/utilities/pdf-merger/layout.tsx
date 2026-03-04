import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Merge PDFs Securely | Oruzen Tools',
    description: 'Combine multiple PDFs into a single file in seconds. Processing happens entirely in your browser—100% private and secure.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

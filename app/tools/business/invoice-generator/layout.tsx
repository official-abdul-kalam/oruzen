import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Invoice PDF Generator | Oruzen Tools',
    description: 'Create beautiful, professional PDF invoices instantly in your browser. No account required, 100% private.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Secure Password Generator | Oruzen Tools',
    description: 'Generate strong, random passwords using standard cryptography. Calculated locally in your browser.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

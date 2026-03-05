import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'JSON Formatter & Validator | Oruzen Tools',
    description: 'Format, beautify, minify, and validate raw JSON strings locally in your browser. Zero tracking, syntax highlighted.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

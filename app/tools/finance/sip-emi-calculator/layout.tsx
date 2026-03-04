import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'SIP & Loan EMI Calculator | Oruzen Tools',
    description: 'Plan your wealth clearly. Calculate Mutual Fund SIP returns or home loan EMIs instantly.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}

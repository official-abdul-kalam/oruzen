import { productsData } from "@/lib/data/products";

export function generateStaticParams() {
    return productsData.filter(p => p.category === 'open-source').map(p => ({
        id: p.id,
    }));
}

export default function OpenSourceDetailLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children;
}

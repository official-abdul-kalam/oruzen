import { productsData } from "@/lib/data/products";

export function generateStaticParams() {
    return productsData.filter(p => p.category === 'apps').map(p => ({
        id: p.id,
    }));
}

export default function AppDetailLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children;
}

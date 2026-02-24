import { productsData } from "@/lib/data/products";

export function generateStaticParams() {
    return productsData.filter(p => p.category === 'software').map(p => ({
        id: p.id,
    }));
}

export default function SoftwareDetailLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children;
}

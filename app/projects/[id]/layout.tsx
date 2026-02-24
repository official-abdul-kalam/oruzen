import { studentProjectsData } from "@/lib/data/projects";

export function generateStaticParams() {
    return studentProjectsData.map(p => ({
        id: p.id,
    }));
}

export default function StudentProjectDetailLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children;
}

"use client";

import { useEffect, useState } from "react";
import { getSharedAuthCookie } from "@/lib/auth-utils";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const token = getSharedAuthCookie();
        if (!token) {
            const currentUrl = window.location.href;
            const authUrl = `https://account.oruzen.com/signin?redirect_url=${encodeURIComponent(currentUrl)}`;
            window.location.href = authUrl;
        } else {
            setIsAuthenticated(true);
        }
    }, []);

    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-primary font-medium">
                Verifying session...
            </div>
        );
    }

    return <>{children}</>;
}

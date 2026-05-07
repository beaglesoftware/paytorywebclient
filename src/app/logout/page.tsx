"use client";

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();

    deleteCookie("access_token");

    router.replace("/")
    return (
        <div>Logging out...</div>
    )
}
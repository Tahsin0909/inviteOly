"use client"

import { Calendar, Database } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const activeClass =
    "text-primary  font-medium"

const normalClass =
    "text-gray-700 dark:text-white"

const ResourceNavigation = () => {
    const pathname = usePathname()

    return (
        <div>
            <h1 className="font-bold text-2xl mb-4">Resources</h1>

            <div className="space-y-3">
                <Link
                    href="/resources/drug-database"
                    className={cn(
                        "flex items-center gap-1 text-sm",
                        pathname === "/resources/drug-database"
                            ? activeClass
                            : normalClass
                    )}
                >
                    <Database size={18} />
                    <span className="text-nowrap">Drug Database</span>
                </Link>

                <Link
                    href="/resources/catalyst-calendar"
                    className={cn(
                        "flex items-center gap-1 text-sm",
                        pathname === "/resources/catalyst-calendar"
                            ? activeClass
                            : normalClass
                    )}
                >
                    <Calendar size={18} />
                    <span className="text-nowrap">Catalyst Calendar</span>
                </Link>
            </div>
        </div>
    )
}

export default ResourceNavigation

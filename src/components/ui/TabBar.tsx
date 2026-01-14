"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const TabBar = () => {
  const pathname = usePathname()

  const isActive = (tab: string) => {
    if (tab === "dashboard") return pathname === "/dashboard"
    if (tab === "itenary") return pathname === "/dashboard/itenary"
    if (tab === "member") return pathname === "/dashboard/member"
    return false
  }

  return (
    <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center border-b border-gray-200">
      <div className="flex items-center space-x-6">
        <Link href="/dashboard">
          <span
            className={`cursor-pointer text-lg font-semibold ${isActive("dashboard") ? "text-blue-700" : "text-gray-600"}`}
          >
            Dashboard
          </span>
        </Link>
        <Link href="/dashboard/member">
          <span
            className={`cursor-pointer text-lg font-semibold ${isActive("member") ? "text-blue-700" : "text-gray-600"}`}
          >
            Members
          </span>
        </Link>
        <Link href="/dashboard/itenary">
          <span
            className={`cursor-pointer text-lg font-semibold ${isActive("itenary") ? "text-blue-700" : "text-gray-600"}`}
          >
            Itinerary
          </span>
        </Link>
      </div>
      <div className="text-right">
        <div className="text-xl text-blue-800">Total Trip Cost: RM1,400</div>
        <div className="text-sm text-gray-500">RM350 per person</div>
      </div>
    </div>
  )
}

export default TabBar


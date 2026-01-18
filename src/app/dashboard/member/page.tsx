"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { initialMembers } from "@/data/seed";
import { Member } from "@/types";
import { MemberCard } from "@/components/members/MemberCard";
import { Navigation } from "@/components/shared/navigation";
import TabBar from "@/components/ui/TabBar";
import { GroupAggregate } from "@/components/members/GroupAggregate";
import { PreferenceChart } from "@/components/members/PreferenceChart";
import { IndividualMemberDetails } from "@/components/members/IndividualMemberDetails";

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const pathname = usePathname(); // get current route

  const handleUpdateMember = (updatedMember: Member) => {
    setMembers((prevMembers) =>
      prevMembers.map((m) => (m.id === updatedMember.id ? updatedMember : m))
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 relative">
      <div className="sticky top-0 z-20">
        <Navigation />
        <TabBar />
      </div>

      <main className="container mx-auto px-6 lg:px-24 py-2">

        <header className="flex items-center gap-4 py-4">
            <div className="shrink-0 rounded-full bg-violet-100 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-violet-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25m0 0c0 3.727 3.023 6.75 6.75 6.75s6.75-3.023 6.75-6.75m-13.5 0h13.5m0 0V3m0 11.25c0 3.727-3.023 6.75-6.75 6.75s-6.75-3.023-6.75-6.75"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">My Members</h1>
          </header>


        {pathname === "/dashboard/member" && (
          <div className="space-y-6">
            <PreferenceChart members={members} />
            <IndividualMemberDetails members={members} />
            <GroupAggregate members={members} />

            <div>
              <h2 className="text-xl font-semibold mb-4">Group Members</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {members.map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    onUpdate={handleUpdateMember}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

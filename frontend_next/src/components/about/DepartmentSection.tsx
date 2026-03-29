'use client';

/**
 * DepartmentSection — Mission-critical team grouping
 * Orchestrates team members by architectural department.
 * Adheres to 150-line rule.
 */
import { TeamMember } from '@/hooks/core-hooks';
import { MemberCard } from './MemberCard';

interface DepartmentSectionProps {
  department: string;
  members: TeamMember[];
}

export function DepartmentSection({ department, members }: DepartmentSectionProps) {
  if (members.length === 0) return null;

  return (
    <section className="border-y border-gray-100 py-24 odd:bg-gray-50/50 even:bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 flex items-center gap-6">
          <div className="h-px flex-grow bg-gray-200" />
          <h2 className="text-3xl leading-none font-black tracking-tighter whitespace-nowrap text-gray-900 lowercase italic">
            {department} <span className="text-primary not-italic">Division.</span>
          </h2>
          <div className="h-px flex-grow bg-gray-200" />
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

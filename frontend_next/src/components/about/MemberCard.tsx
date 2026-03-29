'use client';

/**
 * MemberCard — mission-critical team asset
 * Precision-engineered card for team member visualization.
 * Adheres to 150-line rule.
 */
import { Linkedin } from 'lucide-react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { TeamMember } from '@/hooks/core-hooks';

interface MemberCardProps {
  member: TeamMember;
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-sm transition-all duration-700 hover:shadow-2xl">
      <div className="relative h-80 overflow-hidden">
        <Image
          src={
            member.image ||
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
          }
          alt={member.name}
          fill
          className="object-cover grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-gray-900/80 via-transparent to-transparent p-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="flex gap-4">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-900 transition-colors hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-grow flex-col p-8">
        <h4 className="mb-1 text-xl leading-none font-black tracking-tighter text-gray-900 lowercase italic">
          {member.name}
        </h4>
        <p className="text-primary mb-4 text-[10px] font-black tracking-[0.2em] uppercase">
          {member.role}
        </p>
        <p className="line-clamp-3 text-xs leading-relaxed font-medium text-gray-500 lowercase">
          {member.bio}
        </p>
      </div>
    </Card>
  );
}

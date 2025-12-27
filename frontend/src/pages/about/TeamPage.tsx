import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import { useTeam } from '@/hooks/useApi';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  image_url: string;
  bio: string;
  linkedin_url?: string;
  twitter_url?: string;
  order: number;
}

const TeamPage: React.FC = () => {
  const { data: teamMembers = [], isLoading, error } = useTeam();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorMessage message="Failed to load team members. Please try again later." />
      </div>
    );
  }

  // Fallback mock data if API returns empty
  const displayMembers: TeamMember[] = teamMembers.length > 0 ? teamMembers : [
    // Leadership
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      role: 'CEO & Founder',
      department: 'Leadership',
      image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: '15+ years in renewable energy. PhD in Electrical Engineering from MIT.',
      linkedin_url: '#',
      twitter_url: '',
      order: 1
    },
    {
      name: 'Marcus Adebayo',
      role: 'Chief Technology Officer',
      department: 'Leadership',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'Former Tesla engineer. Expert in battery management systems.',
      email: 'marcus.adebayo@pentorax.com',
      linkedin: '#'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Head of Operations',
      department: 'Leadership',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      bio: 'MBA from Harvard. 10 years scaling clean-tech companies.',
      email: 'elena.rodriguez@pentorax.com',
      linkedin: '#'
    },
    {
      name: 'Julian Smith',
      role: 'Principal Engineer',
      department: 'Leadership',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      bio: 'Led solar projects across 15 countries. Stanford graduate.',
      email: 'julian.smith@pentorax.com',
      linkedin: '#'
    },
    // Engineering Team
    {
      name: 'Amara Okafor',
      role: 'Senior Software Engineer',
      department: 'Engineering',
      image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=400&q=80',
      bio: 'Full-stack developer specializing in IoT and real-time systems.',
      email: 'amara.okafor@pentorax.com'
    },
    {
      name: 'David Kim',
      role: 'Hardware Engineer',
      department: 'Engineering',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      bio: 'Designs and tests solar inverters and power electronics.',
      email: 'david.kim@pentorax.com'
    },
    {
      name: 'Fatima Hassan',
      role: 'Data Scientist',
      department: 'Engineering',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
      bio: 'AI/ML expert optimizing energy consumption patterns.',
      email: 'fatima.hassan@pentorax.com'
    },
    {
      name: 'Chen Wei',
      role: 'Quality Assurance Lead',
      department: 'Engineering',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      bio: 'Ensures every system meets international safety standards.',
      email: 'chen.wei@pentorax.com'
    },
    // Operations Team
    {
      name: 'Chioma Nwosu',
      role: 'Installation Manager',
      department: 'Operations',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80',
      bio: 'Coordinates field teams across Nigeria. 500+ installations.',
      email: 'chioma.nwosu@pentorax.com'
    },
    {
      name: 'Ahmed Ibrahim',
      role: 'Customer Success Lead',
      department: 'Operations',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      bio: 'Ensures customer satisfaction and handles technical support.',
      email: 'ahmed.ibrahim@pentorax.com'
    },
    {
      name: 'Lisa Martinez',
      role: 'Supply Chain Director',
      department: 'Operations',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80',
      bio: 'Manages global supplier relationships and logistics.',
      email: 'lisa.martinez@pentorax.com'
    },
    {
      name: 'Yusuf Musa',
      role: 'Field Technician Lead',
      department: 'Operations',
      image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=400&q=80',
      bio: 'Trains and leads installation crews nationwide.',
      email: 'yusuf.musa@pentorax.com'
    },
  ];

  // Get unique departments from displayMembers
  const departments = Array.from(new Set(displayMembers.map((m: TeamMember) => m.department)));

  return (
    <>
      <SEO
        title="Our Team | Meet the PentoraX Energy Experts"
        description="Meet the visionaries, engineers, and operations experts behind PentoraX. Our team of solar energy professionals is dedicated to powering Nigeria's clean energy future."
        keywords="pentorax team, solar energy experts, renewable energy professionals, solar engineers Nigeria"
        ogImage="/team.png"
      />

      <div className="bg-white min-h-screen">
        {/* Header */}
        <section className="bg-gradient-to-r from-primary to-blue-700 py-20 text-white">
          <div className="container mx-auto px-4">
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to About
            </Link>
            <h1 className="text-5xl lg:text-6xl font-extrabold mb-6">
              Meet Our <span className="text-secondary">Team</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              The brilliant minds driving the solar revolution across Nigeria and beyond.
            </p>
          </div>
        </section>

        {/* Team Grid by Department */}
        {departments.map((dept) => (
          <section key={dept} className="py-16 bg-gray-50 odd:bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">
                {dept} <span className="text-primary">Team</span>
              </h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {displayMembers
                  .filter((member: TeamMember) => member.department === dept)
                  .map((member: TeamMember, i: number) => (
                    <div 
                      key={i} 
                      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100"
                    >
                      <div className="h-72 overflow-hidden relative">
                        <img 
                          src={member.image_url} 
                          alt={member.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <div className="flex gap-3">
                            {member.linkedin_url && (
                              <a 
                                href={member.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Linkedin className="h-4 w-4 text-gray-900" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                        <p className="text-primary font-semibold mb-3 text-sm">{member.role}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-blue-700 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Want to Join Our Team?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals passionate about clean energy
            </p>
            <Link 
              to="/about/careers" 
              className="inline-block bg-secondary px-8 py-4 rounded-lg font-bold text-gray-900 hover:scale-105 transition-transform"
            >
              View Open Positions
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default TeamPage;

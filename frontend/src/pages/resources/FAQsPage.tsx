import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, BookOpen, Headset, FileText } from 'lucide-react';
import SEO from '@/components/SEO';
import { useFAQs } from '@/hooks/useApi';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-6 text-left hover:text-primary transition-colors"
      >
        <span className="text-lg font-bold text-gray-900">{q}</span>
        <ChevronDown className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <p className="pb-6 text-gray-600 leading-relaxed animate-in slide-in-from-top-2">{a}</p>}
    </div>
  );
};

const FAQsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: apiFaqs = [], isLoading, error } = useFAQs({ search: searchQuery });

  // Fallback mock data if API returns empty
  const mockFaqs = [
    { question: "How much does a solar installation cost?", answer: "Costs vary depending on system size and storage capacity. Residential systems start at roughly $4,500, with financing options available for as low as $99/month." },
    { question: "Do solar panels work on cloudy days?", answer: "Yes, modern mono-PERC panels used by PentoraX can generate up to 25-40% of their capacity even in overcast conditions." },
    { question: "What is the lifespan of the battery system?", answer: "Our LiFePO4 batteries are rated for 6,000+ cycles, which typically equates to 15-20 years of daily use." },
    { question: "How much space do I need for panels?", answer: "For a typical home, you'll need about 20-40 square meters of roof space, depending on your energy usage." },
    { question: "Can I expand my system later?", answer: "Yes! Our modular systems are designed to be expandable. You can add more panels, batteries, or upgrade your inverter as your energy needs grow." },
    { question: "What maintenance is required?", answer: "Solar systems require minimal maintenance. We recommend cleaning panels twice a year and annual professional inspections to ensure optimal performance." },
  ];

  const faqs = apiFaqs.length > 0 ? apiFaqs : mockFaqs;
  
  const filteredFAQs = searchQuery 
    ? faqs.filter((faq: any) => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <>
      <SEO
        title="FAQs & Knowledge Hub | Solar Energy Questions Answered"
        description="Find answers to common solar energy questions. Learn about costs, installation, maintenance, and system performance. Expert guides and 24/7 support available."
        keywords="solar faq, solar questions, solar installation cost, solar panel maintenance, solar energy guide"
        ogImage="/faqs.png"
      />

      <div className="bg-white animate-in fade-in duration-700">
        {/* Search/Hero */}
        <section className="py-24 bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
              PentoraX <span className="text-primary">Knowledge Hub</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Find answers, read guides, and access expert energy support.
            </p>
            <div className="max-w-2xl mx-auto relative">
              <input 
                type="text" 
                placeholder="Search for answers..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-8 py-5 rounded-2xl bg-white shadow-xl border border-gray-100 focus:ring-2 focus:ring-primary focus:outline-none text-lg" 
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12 mb-24">
              <Link 
                to="/support" 
                className="p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer group"
              >
                <BookOpen className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-3">User Guides</h3>
                <p className="text-gray-500 mb-6">
                  Step-by-step manuals on operating your PentoraX smart system.
                </p>
                <span className="text-primary font-bold group-hover:underline">Browse Guides &rarr;</span>
              </Link>

              <Link 
                to="/contact" 
                className="p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer group"
              >
                <Headset className="h-12 w-12 text-secondary mb-6" />
                <h3 className="text-2xl font-bold mb-3">Live Support</h3>
                <p className="text-gray-500 mb-6">
                  Talk to our energy specialists 24/7 for technical assistance.
                </p>
                <span className="text-primary font-bold group-hover:underline">Contact Support &rarr;</span>
              </Link>

              <Link 
                to="/case-studies" 
                className="p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer group"
              >
                <FileText className="h-12 w-12 text-blue-500 mb-6" />
                <h3 className="text-2xl font-bold mb-3">Case Studies</h3>
                <p className="text-gray-500 mb-6">
                  Read about successful installations and their energy savings.
                </p>
                <span className="text-primary font-bold group-hover:underline">Read Stories &rarr;</span>
              </Link>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 mb-10">
                <HelpCircle className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                {isLoading ? (
                  <div className="py-12">
                    <LoadingSpinner size="lg" />
                  </div>
                ) : error ? (
                  <ErrorMessage message="Failed to load FAQs. Showing cached questions." />
                ) : filteredFAQs.length > 0 ? (
                  filteredFAQs.map((f: any, i: number) => <FAQItem key={i} q={f.question} a={f.answer} />)
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    No FAQs found matching "{searchQuery}"
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-blue-700 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our solar experts are ready to help you with personalized answers
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-secondary px-8 py-4 rounded-lg font-bold text-gray-900 hover:scale-105 transition-transform"
            >
              Contact Our Team
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQsPage;

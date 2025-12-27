import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Phone, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Activity,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import SEO from '@/components/SEO';
import { useCheckWarranty, useSubmitTicket } from '@/hooks/useApi';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const SupportPage: React.FC = () => {
  const [warrantyId, setWarrantyId] = useState('');
  const [ticketData, setTicketData] = useState({
    subject: '',
    category: 'Inverter Performance',
    description: '',
    customer_name: '',
    customer_email: '',
    customer_phone: ''
  });

  const { mutate: checkWarranty, data: warrantyData, isPending: isCheckingWarranty, isSuccess: warrantySuccess, isError: warrantyError } = useCheckWarranty();
  const { mutate: submitTicket, isPending: isSubmittingTicket, isSuccess: ticketSuccess, isError: ticketError } = useSubmitTicket();

  const handleCheckWarranty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!warrantyId) return;
    checkWarranty(warrantyId);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitTicket(ticketData, {
      onSuccess: () => {
        setTicketData({
          subject: '',
          category: 'Inverter Performance',
          description: '',
          customer_name: '',
          customer_email: '',
          customer_phone: ''
        });
      }
    });
  };

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTicketData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <SEO
        title="Technical Support | 24/7 Solar System Support & Warranty"
        description="Get expert technical support for your solar system. Warranty checker, remote diagnostics, and certified specialists available 24/7. Average response time: 4 minutes."
        keywords="solar support, technical support, warranty checker, solar maintenance, solar troubleshooting, 24/7 support"
        ogImage="/support.png"
      />

      <div className="bg-white min-h-screen animate-in fade-in duration-700 font-sand">
        {/* Hero / Quick Search */}
        <section className="bg-gray-50 border-b border-gray-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Activity className="h-3 w-3 animate-pulse" />
              <span>Systems Online • Operations Center Active</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6">
              How can we help <span className="text-primary">your energy?</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
              Whether it's a technical query, a warranty claim, or real-time troubleshooting, our specialized team is standing by.
            </p>
            
            <div className="max-w-xl mx-auto flex flex-wrap justify-center gap-4">
              <a 
                href="tel:+2348081598604" 
                className="flex items-center space-x-3 bg-white border border-gray-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all group"
              >
                <div className="bg-green-50 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Emergency Support</p>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
                    +234 808 159 8604
                  </p>
                </div>
              </a>
              <div className="flex items-center space-x-3 bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Average Response</p>
                  <p className="text-sm font-bold text-gray-900">~ 4 Minutes</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Support Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Warranty Checker */}
              <div className="lg:col-span-1 bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="p-3 bg-amber-50 rounded-2xl w-fit mb-6">
                  <ShieldCheck className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Warranty Checker</h3>
                <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                  Enter your System ID or Serial Number to verify your remaining coverage and active support level.
                </p>
                
                <form onSubmit={handleCheckWarranty} className="space-y-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={warrantyId}
                      onChange={(e) => setWarrantyId(e.target.value)}
                      placeholder="e.g., PX-992384" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all font-bold uppercase placeholder:normal-case"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isCheckingWarranty}
                    className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-primary transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isCheckingWarranty ? (
                      <>
                        <LoadingSpinner size="sm" />
                        <span>Verifying...</span>
                      </>
                    ) : 'Check Status'}
                  </button>
                </form>

                {warrantySuccess && warrantyData && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center space-x-3 animate-in slide-in-from-top-4">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-xs font-black text-green-800 uppercase">Active Coverage</p>
                      <p className="text-[10px] text-green-700">{warrantyData.data?.warranty_status || 'Valid Warranty'}</p>
                    </div>
                  </div>
                )}
                {warrantyError && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-3 animate-in slide-in-from-top-4">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <p className="text-[10px] text-red-700 font-bold uppercase tracking-wider">
                      ID Not Recognized. Please check and try again.
                    </p>
                  </div>
                )}
                {ticketSuccess && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <p className="text-xs font-bold text-green-800">Ticket submitted successfully!</p>
                  </div>
                )}
              </div>

              {/* Technical Ticket Portal */}
              <div className="lg:col-span-2 bg-gray-900 text-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="p-3 bg-white/10 rounded-2xl">
                      <MessageSquare className="h-8 w-8 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold">Technician Ticket Portal</h3>
                      <p className="text-white/50 text-sm">Escalate complex technical issues to our lab engineers.</p>
                    </div>
                  </div>

                  <form onSubmit={handleTicketSubmit} className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">
                          Issue Category
                        </label>
                        <select 
                          name="category"
                          value={ticketData.category}
                          onChange={handleTicketChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all appearance-none text-sm font-bold"
                        >
                          <option className="bg-gray-800">Inverter Performance</option>
                          <option className="bg-gray-800">Battery Discharge Level</option>
                          <option className="bg-gray-800">App Connectivity</option>
                          <option className="bg-gray-800">New Hardware Install</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">
                          Your Name
                        </label>
                        <input 
                          type="text" 
                          name="customer_name"
                          value={ticketData.customer_name}
                          onChange={handleTicketChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-bold" 
                          placeholder="John Doe" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          name="customer_email"
                          value={ticketData.customer_email}
                          onChange={handleTicketChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-bold" 
                          placeholder="john@example.com" 
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">
                          Subject
                        </label>
                        <input 
                          type="text" 
                          name="subject"
                          value={ticketData.subject}
                          onChange={handleTicketChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-bold" 
                          placeholder="Brief description" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">
                          Fault Description
                        </label>
                        <textarea 
                          rows={6} 
                          name="description"
                          value={ticketData.description}
                          onChange={handleTicketChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-bold" 
                          placeholder="Details of the anomaly..."
                        ></textarea>
                      </div>
                    </div>
                    <div className="md:col-span-2 pt-4">
                      <button 
                        type="submit" 
                        disabled={isSubmittingTicket}
                        className="w-full bg-primary text-white font-black py-5 rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-primary/20 flex items-center justify-center space-x-3 disabled:opacity-50"
                      >
                        {isSubmittingTicket ? (
                          <>
                            <LoadingSpinner size="sm" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Generate Service Ticket</span>
                            <ChevronRight className="h-5 w-5" />
                          </>
                        )}
                      </button>
                      <p className="text-center text-[10px] text-white/30 mt-4 uppercase tracking-[0.2em] font-bold">
                        Standard response time: &lt; 24 Working Hours
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Values */}
        <section className="pb-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 p-4 bg-primary/5 rounded-2xl">
                  <UserCheck className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Certified Specialists</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Every support agent is a trained hardware technician, not just a customer service rep.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 p-4 bg-primary/5 rounded-2xl">
                  <Activity className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Remote Diagnostics</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    We solve 80% of software-related inverter issues remotely without needing a home visit.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 p-4 bg-primary/5 rounded-2xl">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Extended Warranties</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Purchase care plans to extend your factory warranty by up to an additional 10 years.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {/* <section className="bg-gradient-to-r from-primary to-blue-700 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Need Immediate Assistance?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our support team is available 24/7 to help you with any technical issues
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-secondary px-8 py-4 rounded-lg font-bold text-gray-900 hover:scale-105 transition-transform"
            >
              Contact Support Team
            </Link>
          </div>
        </section> */}
      </div>
    </>
  );
};

export default SupportPage;

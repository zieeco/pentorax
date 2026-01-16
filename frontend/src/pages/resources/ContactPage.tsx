
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { useSubmitContact } from '@/hooks';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { toast } from 'sonner';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Residential Solar',
    message: ''
  });
  
  const { mutate: submitContact, isPending } = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContact(formData, {
      onSuccess: () => {
        toast.success('Message Sent Successfully!', {
          description: "We'll get back to you soon.",
          duration: 5000,
        });
        setFormData({ name: '', email: '', phone: '', subject: 'Residential Solar', message: '' });
      },
      onError: () => {
        toast.error('Failed to Send Message', {
          description: 'Please try again or contact us directly.',
        });
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-white animate-in fade-in duration-700">
      {/* Header */}
      <section className="py-24 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Let's <span className="text-primary">Connect</span></h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Have a project in mind? Our energy consultants are ready to assist you.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Contact Form */}
            <div className="lg:w-3/5">
                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40">
                    <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Full Name</label>
                                <input 
                                  type="text" 
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  required
                                  className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all" 
                                  placeholder="John Doe" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Email Address</label>
                                <input 
                                  type="email" 
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  required
                                  className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all" 
                                  placeholder="john@company.com" 
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Phone (Optional)</label>
                            <input 
                              type="tel" 
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all" 
                              placeholder="+234 808 159 8604" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Interested In</label>
                            <select 
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all appearance-none"
                            >
                                <option>Residential Solar</option>
                                <option>Commercial Scale</option>
                                <option>Industrial Power</option>
                                <option>Product Distribution</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Your Message</label>
                            <textarea 
                              rows={5} 
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              required
                              className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all" 
                              placeholder="Tell us about your project..."
                            ></textarea>
                        </div>
                        <button 
                          type="submit"
                          disabled={isPending}
                          className="w-full bg-primary text-white font-bold py-5 rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-primary/20 flex items-center justify-center space-x-3 disabled:opacity-50"
                        >
                            {isPending ? (
                              <>
                                <LoadingSpinner size="sm" />
                                <span>Sending...</span>
                              </>
                            ) : (
                              <>
                                <span>Send Inquiry</span>
                                <Send className="h-5 w-5" />
                              </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Info */}
            <div className="lg:w-2/5 space-y-10">
                <div>
                    <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-xl"><Phone className="h-6 w-6 text-primary" /></div>
                            <div>
                                <p className="font-bold">Call Us</p>
                                <p className="text-gray-500">+234 808 159 8604</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-xl"><Mail className="h-6 w-6 text-primary" /></div>
                            <div>
                                <p className="font-bold">Email Us</p>
                                <p className="text-gray-500">support@pentorax.com</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 p-3 rounded-xl"><MapPin className="h-6 w-6 text-primary" /></div>
                            <div>
                                <p className="font-bold">Main Headquarters</p>
                                <p className="text-gray-500">1, Industrial Street, Ilupeju, Lagos, Nigeria</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-[2rem] p-8 text-white">
                    <div className="flex items-center space-x-3 mb-6">
                        <Clock className="h-6 w-6 text-secondary" />
                        <h4 className="text-xl font-bold">Business Hours</h4>
                    </div>
                    <ul className="space-y-3 opacity-80 text-sm font-medium">
                        <li className="flex justify-between"><span>Mon - Friday</span><span>08:00 AM - 06:00 PM</span></li>
                        <li className="flex justify-between"><span>Saturday</span><span>10:00 AM - 04:00 PM</span></li>
                        <li className="flex justify-between"><span>Sunday</span><span>Closed</span></li>
                    </ul>
                </div>
                
                {/* Visual Map Placeholder */}
                <div className="h-64 bg-gray-100 rounded-[2.5rem] relative overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-200">
                    <div className="text-center p-6">
                        <MapPin className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Interactive Map Loading...</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;


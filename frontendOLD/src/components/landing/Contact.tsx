
import React from 'react';
import { Phone, Mail, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-white text-neutral-900">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available Now
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
                Questions? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Let's Solve Them.
                </span>
              </h2>
              <p className="text-lg text-neutral-600 max-w-xl leading-relaxed">
                Our team of energy experts is ready to analyze your needs and design the perfect solar solution for your home or business. No pressure, just clear answers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="h-14 px-8 text-base bg-primary text-white hover:bg-primary/90 rounded-full shadow-lg hover:shadow-primary/25 transition-all duration-500"
                asChild
              >
                <a href="/contact">
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              
              <div className="flex items-center gap-4 px-6 h-14 rounded-full bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 transition-colors">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-neutral-900 font-medium">+234 808 159 8604</span>
              </div>
            </div>
          </div>

          {/* Right Cards Grid */}
          <div className="relative">
            {/* Interactive Grid of Options */}
            <div className="grid gap-4">
              {/* Card 1: Direct Support */}
              <div className="group relative p-6 rounded-3xl bg-neutral-50 hover:bg-white border border-neutral-200 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1 group-hover:text-primary transition-colors">Direct Line</h3>
                    <p className="text-neutral-500 text-sm">Speak directly with a senior engineer, not a bot.</p>
                  </div>
                </div>
              </div>

              {/* Card 2: Email */}
              <div className="group relative p-6 rounded-3xl bg-neutral-50 hover:bg-white border border-neutral-200 hover:border-secondary/20 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-500">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Mail className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1 group-hover:text-secondary transition-colors">Email Support</h3>
                    <p className="text-neutral-500 text-sm">support@pentorax.com</p>
                    <p className="text-xs text-neutral-400 mt-1">Typical response time: &lt; 2 hours</p>
                  </div>
                </div>
              </div>

              {/* Card 3: Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-3xl bg-neutral-50 border border-neutral-200 flex flex-col items-center justify-center text-center gap-2 group hover:bg-white hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <Clock className="h-6 w-6 text-neutral-400 group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium text-neutral-600 group-hover:text-neutral-900">24/7 Response</span>
                </div>
                <div className="p-4 rounded-3xl bg-neutral-50 border border-neutral-200 flex flex-col items-center justify-center text-center gap-2 group hover:bg-white hover:border-secondary/20 hover:shadow-lg hover:shadow-secondary/5 transition-all duration-300">
                  <ShieldCheck className="h-6 w-6 text-neutral-400 group-hover:text-secondary transition-colors" />
                  <span className="text-sm font-medium text-neutral-600 group-hover:text-neutral-900">Expert Advice</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import React from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Solutions from '@/components/landing/Solutions';
import CallToAction from '@/components/landing/CallToAction';
import Offerings from '@/components/landing/Offerings';
import Journey from '@/components/landing/Journey';
import Testimonials from '@/components/landing/Testimonials';
import CustomerStories from '@/components/landing/CustomerStories';
import CaseStudies from '@/components/landing/CaseStudies';
import Partners from '@/components/landing/Partners';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';
import Process from '@/components/landing/Process';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-background font-sans text-foreground">
      <Header />
      <main>
        <Hero />
        <Solutions />
        <Process />
        <CallToAction />
        <Offerings />
        <Journey />
        <Testimonials />
        <CustomerStories />
        <CaseStudies />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

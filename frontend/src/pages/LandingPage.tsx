import React from 'react';
import SEO from '@/components/SEO';
import Hero from '@/components/landing/Hero';
import Solutions from '@/components/landing/Solutions';
import CallToAction from '@/components/landing/CallToAction';
import Journey from '@/components/landing/Journey';
import Testimonials from '@/components/landing/Testimonials';
import CustomerStories from '@/components/landing/CustomerStories';
import Contact from '@/components/landing/Contact';
import Process from '@/components/landing/Process';

const LandingPage: React.FC = () => {
  return (
    <>
      <SEO
        title="PentoraX - Leading Solar Energy Solutions in Africa"
        description="Transform your energy future with PentoraX. We provide premium solar panel installations, inverters, and batteries for residential, commercial, and industrial needs across Africa."
        keywords="solar energy Nigeria, solar panels Africa, renewable energy, solar installation Lagos, commercial solar, residential solar, industrial solar, solar batteries, inverters"
        ogImage="/pentorax-hero.png"
      />
      <div className="bg-background font-sans text-foreground">
        <Hero />
        <Solutions />
        <Process />
        <CallToAction />
        <Journey />
        <Testimonials />
        <CustomerStories />
        {/* <CaseStudies /> */}
        {/* <Partners /> */}
        <Contact />
      </div>
    </>
  );
};

export default LandingPage;

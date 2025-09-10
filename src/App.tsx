import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Solutions from '@/components/Solutions';
import CallToAction from '@/components/CallToAction';
import Offerings from '@/components/Offerings';
import Journey from '@/components/Journey';
import Testimonials from '@/components/Testimonials';
import CustomerStories from '@/components/CustomerStories';
import CaseStudies from '@/components/CaseStudies';
import Partners from '@/components/Partners';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import PentoraxProcess from './components/Process';

const App: React.FC = () => {
  return (
    <div className="bg-white font-sans text-gray-800">
      <Header />
      <main>
        <Hero />
        <Solutions />
        <PentoraxProcess />
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

export default App;

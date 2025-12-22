
import React from 'react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title, avatar }) => (
  <div className="bg-white p-8 rounded-lg shadow-md">
    <p className="text-gray-600 italic mb-6">"{quote}"</p>
    <div className="flex items-center">
      <img className="w-12 h-12 rounded-full mr-4 object-cover" src={avatar} alt={name} />
      <div>
        <p className="font-bold text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  </div>
);


const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-blue-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <TestimonialCard
            quote="I had a chance to visit Arnergy's office in Lagos, and it's safe to say I was arnerg-ized by our conversations."
            name="Bill Gates"
            title="Breakthrough Energy (BEV) Founder (2023)"
            avatar="https://picsum.photos/100/100?image=1005"
          />
          <TestimonialCard
            quote="Arnergy is in the right segment towards meeting the Nigeria's demands for energy. We need the private sector to take leadership in such conversations. What Arnergy is doing is good not just for businesses, but for families and the climate."
            name="Nicolas Simard"
            title="The Canada High Commissioner (2021)"
            avatar="https://picsum.photos/100/100?image=1027"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

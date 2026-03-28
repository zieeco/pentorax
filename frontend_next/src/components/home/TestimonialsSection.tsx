/**
 * TestimonialsSection — 2-column testimonial cards
 * Original: frontend/src/components/landing/Testimonials.tsx
 * Uses shadcn Avatar instead of native <img>
 */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

function TestimonialCard({ quote, name, title, avatar }: TestimonialProps) {
  return (
    <Card className="shadow-md">
      <CardContent className="p-8">
        <p className="mb-6 text-gray-600 italic">&ldquo;{quote}&rdquo;</p>
        <div className="flex items-center">
          <Avatar className="mr-4 h-12 w-12">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-gray-800">{name}</p>
            <p className="text-sm text-gray-500">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-blue-50/50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <TestimonialCard
            quote="I had a chance to visit Pentorax's office in Lagos, and it's safe to say I was energized by our conversations."
            name="Bill Gates"
            title="Breakthrough Energy (BEV) Founder (2023)"
            avatar="https://picsum.photos/100/100?image=1005"
          />
          <TestimonialCard
            quote="Pentorax is in the right segment towards meeting Nigeria's demands for energy. We need the private sector to take leadership in such conversations. What Pentorax is doing is good not just for businesses, but for families and the climate."
            name="Nicolas Simard"
            title="The Canada High Commissioner (2021)"
            avatar="https://picsum.photos/100/100?image=1027"
          />
        </div>
      </div>
    </section>
  );
}

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
    <Card className="bg-card border-border/50 group relative overflow-hidden rounded-[2.5rem] shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <CardContent className="p-10">
        <div className="bg-primary/10 absolute -top-4 -right-4 h-24 w-24 rounded-full blur-3xl transition-opacity group-hover:opacity-50" />
        <p className="text-muted-foreground relative z-10 mb-8 text-lg leading-relaxed font-medium md:text-xl">
          &ldquo;{quote}&rdquo;
        </p>
        <div className="relative z-10 flex items-center">
          <Avatar className="border-primary/20 mr-4 h-14 w-14 border-2 shadow-lg">
            <AvatarImage
              src={avatar}
              alt={name}
              className="grayscale transition-all duration-500 hover:grayscale-0"
            />
            <AvatarFallback className="bg-primary text-primary-foreground font-black">
              {name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-quicksand text-foreground text-base font-black">{name}</p>
            <p className="text-muted-foreground text-[10px] font-black tracking-widest">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-muted/30 py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-20 text-center">
          <h2 className="font-quicksand from-foreground via-primary to-secondary mb-8 bg-gradient-to-r bg-clip-text text-4xl font-black tracking-tighter text-transparent lg:text-6xl">
            Voices of <span className="text-primary">Trust</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl font-medium">
            Standardizing our commitment to excellence through the words of global leaders.
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
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

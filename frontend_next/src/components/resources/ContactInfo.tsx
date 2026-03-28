'use client';

/**
 * ContactInfo — Mission-critical geolocation assets
 * Precision-engineered info block for physical and digital presence.
 * Adheres to 150-line rule.
 */
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

const assets = [
  { icon: Phone, label: 'Voice Link', value: '+234 808 159 8604' },
  { icon: Mail, label: 'Digital Hub', value: 'support@pentorax.com' },
  { icon: MapPin, label: 'Headquarters', value: '1, Industrial Street, Ilupeju, Lagos, NG' },
];

export function ContactInfo() {
  return (
    <div className="space-y-12">
      <div className="space-y-8">
        <h3 className="text-2xl leading-none font-black tracking-tighter lowercase italic">
          Global <br />
          <span className="text-primary not-italic">Presence.</span>
        </h3>
        <div className="space-y-8">
          {assets.map((a, i) => (
            <div key={i} className="group flex items-start gap-6">
              <div className="bg-primary/10 group-hover:bg-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors">
                <a.icon className="text-primary h-5 w-5 transition-colors group-hover:text-white" />
              </div>
              <div className="pt-1">
                <p className="mb-1 text-[9px] font-black tracking-widest text-gray-400 uppercase">
                  {a.label}
                </p>
                <p className="text-sm font-black text-gray-900 italic">{a.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-[2.5rem] bg-gray-900 p-10 text-white shadow-2xl">
        <div className="absolute top-0 right-0 h-24 w-24 transform rounded-bl-3xl bg-white/5 transition-transform group-hover:scale-110" />
        <div className="mb-8 flex items-center gap-4">
          <Clock className="text-primary h-5 w-5" />
          <h4 className="text-xl font-black tracking-tighter lowercase italic">
            Operational Hours
          </h4>
        </div>
        <ul className="space-y-4 text-xs font-black tracking-widest text-white/50 uppercase">
          <li className="flex items-center justify-between border-b border-white/5 pb-4 italic last:border-0 last:pb-0">
            <span>Mon - Fri</span>
            <span className="text-white">08:00 - 18:00</span>
          </li>
          <li className="flex items-center justify-between border-b border-white/5 pb-4 italic last:border-0 last:pb-0">
            <span>Saturday</span>
            <span className="text-white">10:00 - 16:00</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Sunday</span>
            <span className="text-primary">Closed</span>
          </li>
        </ul>
      </div>

      <div className="group h-72 overflow-hidden rounded-[3rem] border-8 border-gray-50 bg-gray-100 shadow-inner">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952479087442!2d3.358267!3d6.5531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzMnMTEuMiJOIDPCsDIxJzI5LjgiRQ!5e0!3m2!1sen!2sng!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Pentorax Geolocation"
          className="grayscale invert transition-all duration-1000 group-hover:grayscale-0 group-hover:invert-0"
        />
      </div>
    </div>
  );
}

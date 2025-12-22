import React, { useState, useEffect, useRef } from 'react';

interface StatItemProps {
  value: string;
  label: string;
  subLabel?: string;
  isVisible: boolean;
}

const StatItem: React.FC<StatItemProps> = ({
  value,
  label,
  subLabel,
  isVisible,
}) => {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isVisible) return;

    // Extract number and suffix from value
    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseFloat(match[1]);
    const suffix = match[2];

    // Animation duration and steps
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = targetNumber / steps;

    let currentNumber = 0;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      currentNumber = Math.min(currentNumber + increment, targetNumber);

      // Format the number based on its size
      let formattedNumber;
      if (targetNumber >= 1000000) {
        formattedNumber = (currentNumber / 1000000).toFixed(1);
        if (stepCount === steps) {
          // Ensure final value matches exactly
          formattedNumber = (targetNumber / 1000000).toFixed(1);
        }
      } else if (targetNumber >= 1000) {
        formattedNumber = (currentNumber / 1000).toFixed(1);
        if (stepCount === steps) {
          formattedNumber = (targetNumber / 1000).toFixed(1);
        }
      } else {
        formattedNumber = currentNumber.toFixed(1);
        if (stepCount === steps) {
          formattedNumber = targetNumber.toString();
        }
      }

      setDisplayValue(formattedNumber + suffix);

      if (stepCount >= steps) {
        clearInterval(timer);
        // Set final exact value
        setDisplayValue(value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div className="text-center">
      <p className="text-4xl font-extrabold text-primary transition-all duration-300 lg:text-5xl">
        {displayValue}
      </p>
      <p className="mt-2 text-lg font-semibold text-gray-700">{label}</p>
      {subLabel && <p className="text-sm text-gray-500">{subLabel}</p>}
    </div>
  );
};

const Journey: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once animation has started
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px 0px -100px 0px', // Start animation a bit before fully visible
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-background py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center justify-center">
          <h2 className="mr-4 text-3xl font-bold text-foreground">
            OUR JOURNEY SO FAR...
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM3 11h10M16 16l4-4m0 0l-4-4m4 4H9"
            />
          </svg>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <StatItem
            value="9.8GWh+"
            label="Green Energy Generated"
            isVisible={isVisible}
          />
          <StatItem
            value="9.3MWp+"
            label="Installed Solar PV Capacity"
            isVisible={isVisible}
          />
          <StatItem
            value="23.8MWh+"
            label="Active Storage System (BESS)"
            isVisible={isVisible}
          />
          <StatItem
            value="23,000MT+"
            label="Displaced CO2e Equivalent"
            isVisible={isVisible}
          />
          <StatItem
            value="200k+"
            label="Sequestered Carbon Equivalent"
            subLabel="(Tree Seedlings Grown)"
            isVisible={isVisible}
          />
          <StatItem
            value="2.2million"
            label="Avoided Diesel Equivalent (Litres)"
            isVisible={isVisible}
          />
        </div>
      </div>
    </section>
  );
};

export default Journey;

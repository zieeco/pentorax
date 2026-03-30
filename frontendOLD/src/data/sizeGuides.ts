/**
 * Size Guide Data
 * Static size guide charts for different product categories
 * @module data/sizeGuides
 */

export interface SizeGuideData {
  type: 'solar_panel' | 'battery' | 'inverter' | 'generic';
  title: string;
  description?: string;
  chart: {
    headers: string[];
    rows: Array<{ label: string; values: string[]; }>;
  };
  notes?: string[];
}

/**
 * Default size guides for product categories
 */
export const SIZE_GUIDES: Record<string, SizeGuideData> = {
  'solar-panels': {
    type: 'solar_panel',
    title: 'Solar Panel Specifications Guide',
    description: 'Find the right solar panel for your energy needs',
    chart: {
      headers: ['Power Output', 'Dimensions (cm)', 'Weight', 'Efficiency', 'Ideal For'],
      rows: [
        { 
          label: '50W - 100W', 
          values: ['50-100W', '120×54×3.5', '7-10kg', '18-20%', 'Small homes, RVs, camping'] 
        },
        { 
          label: '150W - 200W', 
          values: ['150-200W', '148×67×3.5', '12-15kg', '20-22%', 'Medium homes, small businesses'] 
        },
        { 
          label: '250W - 350W', 
          values: ['250-350W', '165×99×4.0', '18-22kg', '22-24%', 'Large homes, offices'] 
        },
        { 
          label: '400W+', 
          values: ['400W+', '200×100×4.5', '25-30kg', '24-26%', 'Commercial, industrial use'] 
        },
      ]
    },
    notes: [
      'Consider your daily energy consumption when choosing panel size',
      'Factor in available roof/installation space',
      'Higher efficiency panels cost more but require less space',
      'All dimensions include frame thickness'
    ]
  },
  
  'batteries': {
    type: 'battery',
    title: 'Battery Capacity Guide',
    description: 'Select the right battery capacity for your power backup needs',
    chart: {
      headers: ['Capacity', 'Voltage', 'Dimensions (cm)', 'Weight', 'Backup Duration*', 'Recommended Use'],
      rows: [
        { 
          label: '100Ah - 150Ah', 
          values: ['100-150Ah', '12V', '33×17×22', '25-30kg', '4-6 hours', 'Small homes, essentials only'] 
        },
        { 
          label: '200Ah - 250Ah', 
          values: ['200-250Ah', '12V', '52×24×22', '45-55kg', '8-12 hours', 'Medium homes, multiple appliances'] 
        },
        { 
          label: '300Ah+', 
          values: ['300Ah+', '12V/24V', '68×26×24', '65-80kg', '12-24 hours', 'Large homes, businesses'] 
        },
      ]
    },
    notes: [
      '*Backup duration based on typical 500W load',
      'Deep cycle batteries recommended for solar systems',
      'Consider battery chemistry: Lead-acid vs Lithium',
      'Lithium batteries are lighter but more expensive'
    ]
  },
  
  'inverters': {
    type: 'inverter',
    title: 'Inverter Sizing Guide',
    description: 'Choose an inverter that matches your power requirements',
    chart: {
      headers: ['Power Rating', 'Input Voltage', 'Dimensions (cm)', 'Weight', 'Efficiency', 'Typical Applications'],
      rows: [
        { 
          label: '500W - 1000W', 
          values: ['500-1000W', '12V/24V', '30×20×8', '3-5kg', '85-90%', 'Fans, lights, TV, laptop'] 
        },
        { 
          label: '1500W - 2000W', 
          values: ['1.5-2KW', '24V/48V', '40×25×10', '6-8kg', '90-93%', 'Fridge, microwave + essentials'] 
        },
        { 
          label: '3000W - 5000W', 
          values: ['3-5KW', '48V', '50×30×12', '10-15kg', '93-95%', 'Whole home backup, AC units'] 
        },
        { 
          label: '7500W+', 
          values: ['7.5KW+', '48V', '60×35×15', '18-25kg', '95-97%', 'Commercial, heavy appliances'] 
        },
      ]
    },
    notes: [
      'Choose inverter 20-25% larger than your max load',
      'Pure sine wave inverters recommended for sensitive electronics',
      'Higher efficiency means less energy waste',
      'Consider surge power for motor-driven appliances'
    ]
  },
  
  'generic': {
    type: 'generic',
    title: 'Product Specifications',
    description: 'Technical specifications and dimensions',
    chart: {
      headers: ['Specification', 'Value'],
      rows: [
        { label: 'Dimensions', values: ['See product description'] },
        { label: 'Weight', values: ['See product description'] },
        { label: 'Material', values: ['See product description'] },
        { label: 'Warranty', values: ['1-2 years manufacturer warranty'] },
      ]
    },
    notes: [
      'Refer to product description for detailed specifications',
      'Contact support for additional technical information'
    ]
  }
};

/**
 * Get size guide for a product category
 */
export function getSizeGuideForCategory(categorySlug?: string): SizeGuideData | null {
  if (!categorySlug) return null;
  
  // Try exact match
  if (SIZE_GUIDES[categorySlug]) {
    return SIZE_GUIDES[categorySlug];
  }
  
  // Try partial matches
  if (categorySlug.includes('solar') || categorySlug.includes('panel')) {
    return SIZE_GUIDES['solar-panels'];
  }
  if (categorySlug.includes('battery') || categorySlug.includes('batteries')) {
    return SIZE_GUIDES['batteries'];
  }
  if (categorySlug.includes('inverter')) {
    return SIZE_GUIDES['inverters'];
  }
  
  // Default to generic
  return SIZE_GUIDES['generic'];
}

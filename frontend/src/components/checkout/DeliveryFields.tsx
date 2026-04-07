'use client';

import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { CheckoutValues } from './CheckoutForm';

interface DeliveryFieldsProps {
  control: Control<CheckoutValues>;
}

export function DeliveryFields({ control }: DeliveryFieldsProps) {
  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2">
        <FormField
          control={control}
          name="shipping_name"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-muted h-12 rounded-xl border-none font-bold"
                  placeholder="John Doe"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[10px] font-black uppercase" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="shipping_phone"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                Phone Number
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-muted h-12 rounded-xl border-none font-bold"
                  placeholder="080... or 090..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[10px] font-black uppercase" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="shipping_address"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
              Logistics Address
            </FormLabel>
            <FormControl>
              <Input
                className="bg-muted h-12 rounded-xl border-none font-bold"
                placeholder="No. 12 Street, Area, LGA"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-[10px] font-black uppercase" />
          </FormItem>
        )}
      />

      <div className="grid gap-8 sm:grid-cols-2">
        <FormField
          control={control}
          name="shipping_city"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                City
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-muted h-12 rounded-xl border-none font-bold"
                  placeholder="Ikeja"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[10px] font-black uppercase" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="shipping_state"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                State
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-muted h-12 rounded-xl border-none font-bold"
                  placeholder="Lagos"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[10px] font-black uppercase" />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}

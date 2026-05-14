import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { clientEnv } from '@/lib/clientEnv';
import { Loader2 } from 'lucide-react';

interface AddressAutocompleteProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onAddressSelect: (address: { street: string; city: string; state: string; zip: string }) => void;
  error?: boolean;
}

const STATE_MAP: Record<string, string> = {
  "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA",
  "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "District of Columbia": "DC",
  "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL",
  "Indiana": "IN", "Iowa": "IA", "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA",
  "Maine": "ME", "Maryland": "MD", "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN",
  "Mississippi": "MS", "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV",
  "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY",
  "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK", "Oregon": "OR",
  "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD",
  "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT", "Virginia": "VA",
  "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY"
};

export const AddressAutocomplete = React.forwardRef<HTMLInputElement, AddressAutocompleteProps>(
  ({ className, value, onChange, onBlur, onAddressSelect, error, ...props }, ref) => {
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
      const fetchAddresses = async () => {
        if (!value || typeof value !== 'string' || value.length < 3) {
          setSuggestions([]);
          setIsOpen(false);
          return;
        }

        setIsLoading(true);
        try {
          const token = clientEnv.mapboxAccessToken;
          const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value as string)}.json?country=us&types=address&access_token=${token}&limit=5`;
          const res = await fetch(url);
          const data = await res.json();

          if (data?.features?.length > 0) {
            setSuggestions(data.features);
            setIsOpen(true);
          } else {
            setSuggestions([]);
            setIsOpen(false);
          }
        } catch (err) {
          console.error('Mapbox geocoder error:', err);
        } finally {
          setIsLoading(false);
        }
      };

      const timer = setTimeout(fetchAddresses, 400);
      return () => clearTimeout(timer);
    }, [value]);

    const handleSelect = (feature: any) => {
      // Mapbox address number is in feature.address, street name in feature.text
      const houseNumber = feature.address || '';
      const streetName = feature.text || '';
      const street = `${houseNumber} ${streetName}`.trim();

      let city = '';
      let stateFullName = '';
      let zip = '';

      if (feature.context) {
        for (const c of feature.context) {
          if (c.id.startsWith('place')) city = c.text;
          if (c.id.startsWith('region')) stateFullName = c.text;
          if (c.id.startsWith('postcode')) zip = c.text;
        }
      }

      const toTitleCase = (str: string) =>
        str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());

      onAddressSelect({
        street: toTitleCase(street),
        city: toTitleCase(city),
        state: STATE_MAP[stateFullName] || stateFullName,
        zip: zip.split('-')[0],
      });

      setIsOpen(false);
    };

    return (
      <div className="relative w-full" ref={dropdownRef}>
        <div className="relative">
          <Input
            ref={ref}
            value={value}
            onChange={(e) => {
              if (onChange) onChange(e);
            }}
            onBlur={onBlur}
            className={cn(error ? 'border-destructive' : '', className)}
            autoComplete="off"
            {...props}
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-background pl-1">
              <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
            </div>
          )}
        </div>

        {isOpen && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
            <ul className="py-1">
              {suggestions.map((feature, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2.5 hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm flex items-start gap-2"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(feature);
                  }}
                >
                  <span className="mt-0.5 text-muted-foreground shrink-0">📍</span>
                  <span>{feature.place_name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);
AddressAutocomplete.displayName = 'AddressAutocomplete';

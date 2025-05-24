import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface CountrySelectorProps {
    value: string;
    onChange: (country: string) => void;
}

const COUNTRIES = [
    { name: 'România', flag: '🇷🇴' },
    { name: 'Italia', flag: '🇮🇹' },
    { name: 'Franța', flag: '🇫🇷' },
    { name: 'Spania', flag: '🇪🇸' },
    { name: 'Germania', flag: '🇩🇪' },
    { name: 'Austria', flag: '🇦🇹' },
    { name: 'Ungaria', flag: '🇭🇺' },
    { name: 'Bulgaria', flag: '🇧🇬' },
    { name: 'Grecia', flag: '🇬🇷' },
    { name: 'Turcia', flag: '🇹🇷' },
    { name: 'Croația', flag: '🇭🇷' },
    { name: 'Serbia', flag: '🇷🇸' },
    { name: 'Republica Moldova', flag: '🇲🇩' },
    { name: 'Ucraina', flag: '🇺🇦' },
    { name: 'Polonia', flag: '🇵🇱' },
    { name: 'Cehia', flag: '🇨🇿' },
    { name: 'Slovacia', flag: '🇸🇰' },
    { name: 'Slovenia', flag: '🇸🇮' },
    { name: 'Olanda', flag: '🇳🇱' },
    { name: 'Belgia', flag: '🇧🇪' },
    { name: 'Elveția', flag: '🇨🇭' },
    { name: 'Portugalia', flag: '🇵🇹' },
    { name: 'Marea Britanie', flag: '🇬🇧' },
    { name: 'Irlanda', flag: '🇮🇪' },
    { name: 'Norvegia', flag: '🇳🇴' },
    { name: 'Suedia', flag: '🇸🇪' },
    { name: 'Danemarca', flag: '🇩🇰' },
    { name: 'Finlanda', flag: '🇫🇮' },
];

export const CountrySelector = ({ value, onChange }: CountrySelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useTranslation();

    const filteredCountries = COUNTRIES.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedCountry = COUNTRIES.find(country => country.name === value);

    return (
        <div className="relative">
            <Button
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full justify-between text-lg px-4 py-3 h-auto"
            >
        <span className="flex items-center space-x-2">
          {selectedCountry && <span className="text-xl">{selectedCountry.flag}</span>}
            <span>{value || t('profile.countrySelector.placeholder')}</span>
        </span>
                <ChevronDown className="w-5 h-5" />
            </Button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg z-10 max-h-80 overflow-hidden">
                    <div className="p-3 border-b">
                        <input
                            type="text"
                            placeholder={t('profile.countrySelector.search')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="max-h-60 overflow-y-auto">
                        {filteredCountries.map((country) => (
                            <button
                                key={country.name}
                                onClick={() => {
                                    onChange(country.name);
                                    setIsOpen(false);
                                    setSearchTerm('');
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center space-x-3 text-lg"
                            >
                                <span className="text-xl">{country.flag}</span>
                                <span>{country.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
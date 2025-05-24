import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

export const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: '',
        age: '',
        acceptTerms: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { register } = useAuth();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Numele complet este obligatoriu';
        }

        if (!formData.email.includes('@')) {
            newErrors.email = 'Email invalid';
        }

        if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
            newErrors.phone = 'Număr de telefon invalid';
        }

        if (formData.username.length < 3) {
            newErrors.username = 'Username-ul trebuie să aibă minim 3 caractere';
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Parola trebuie să aibă minim 6 caractere';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Parolele nu coincid';
        }

        const age = parseInt(formData.age);
        if (!age || age < 13 || age > 120) {
            newErrors.age = 'Vârsta trebuie să fie între 13 și 120 de ani';
        }

        if (!formData.acceptTerms) {
            newErrors.acceptTerms = 'Trebuie să accepți termenii și condițiile';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const success = await register({
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                username: formData.username,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                age: parseInt(formData.age)
            });

            if (success) {
                toast({
                    title: "Înregistrare reușită!",
                    description: "Contul tău a fost creat cu succes.",
                });
                onClose();
            } else {
                toast({
                    title: "Eroare de înregistrare",
                    description: "Datele introduse sunt invalide sau utilizatorul există deja. Verifică informațiile și încearcă din nou.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Eroare de înregistrare",
                description: "Nu s-a putut conecta la server. Verifică conexiunea la internet și încearcă din nou.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const getPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 6) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const passwordStrength = getPasswordStrength(formData.password);
    const strengthLabels = ['Foarte slabă', 'Slabă', 'Medie', 'Tare', 'Foarte tare'];
    const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                        Înregistrare
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="fullName">Nume complet *</Label>
                        <Input
                            id="fullName"
                            type="text"
                            placeholder="Introdu numele complet"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className={`mt-1 ${errors.fullName ? 'border-red-500' : ''}`}
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@exemplu.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <Label htmlFor="phone">Telefon *</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+40123456789"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="username">Username *</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="username_unic"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className={`mt-1 ${errors.username ? 'border-red-500' : ''}`}
                            />
                            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                        </div>

                        <div>
                            <Label htmlFor="age">Vârsta *</Label>
                            <Input
                                id="age"
                                type="number"
                                placeholder="25"
                                min="13"
                                max="120"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                className={`mt-1 ${errors.age ? 'border-red-500' : ''}`}
                            />
                            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="password">Parolă *</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Parolă sigură"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className={`mt-1 ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {formData.password && (
                            <div className="mt-2">
                                <div className="flex space-x-1">
                                    {[...Array(4)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1 flex-1 rounded ${
                                                i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-gray-200'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-xs mt-1 text-gray-600">
                                    Puterea parolei: {strengthLabels[passwordStrength] || strengthLabels[0]}
                                </p>
                            </div>
                        )}
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div>
                        <Label htmlFor="confirmPassword">Confirmă parola *</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirmă parola"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className={`mt-1 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>

                    <div className="flex items-start space-x-2">
                        <Checkbox
                            id="acceptTerms"
                            checked={formData.acceptTerms}
                            onCheckedChange={(checked) =>
                                setFormData({ ...formData, acceptTerms: checked as boolean })
                            }
                            className={errors.acceptTerms ? 'border-red-500' : ''}
                        />
                        <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                            Accept{' '}
                            <Button variant="link" className="p-0 h-auto text-sm">
                                termenii și condițiile
                            </Button>{' '}
                            și{' '}
                            <Button variant="link" className="p-0 h-auto text-sm">
                                politica de confidențialitate
                            </Button>
                        </Label>
                    </div>
                    {errors.acceptTerms && <p className="text-red-500 text-xs">{errors.acceptTerms}</p>}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Se înregistrează...' : 'Creează cont'}
                    </Button>

                    <div className="text-center">
                        <span className="text-sm text-gray-600">Ai deja cont? </span>
                        <Button
                            variant="link"
                            className="p-0 h-auto text-sm font-semibold"
                            onClick={onSwitchToLogin}
                            type="button"
                        >
                            Conectează-te
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
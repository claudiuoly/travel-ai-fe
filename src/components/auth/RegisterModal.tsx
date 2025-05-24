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
import { useTranslation } from '@/hooks/useTranslation';

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
    const { t } = useTranslation();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = t('auth.register.validation.fullNameRequired');
        }

        if (!formData.email.includes('@')) {
            newErrors.email = t('auth.register.validation.emailInvalid');
        }

        if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
            newErrors.phone = t('auth.register.validation.phoneInvalid');
        }

        if (formData.username.length < 3) {
            newErrors.username = t('auth.register.validation.usernameMinLength');
        }

        if (formData.password.length < 6) {
            newErrors.password = t('auth.register.validation.passwordMinLength');
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = t('auth.register.validation.passwordsNotMatch');
        }

        const age = parseInt(formData.age);
        if (!age || age < 13 || age > 120) {
            newErrors.age = t('auth.register.validation.ageInvalid');
        }

        if (!formData.acceptTerms) {
            newErrors.acceptTerms = t('auth.register.validation.termsRequired');
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
                    title: t('auth.register.success.title'),
                    description: t('auth.register.success.description'),
                });
                onClose();
                onSwitchToLogin();
            } else {
                toast({
                    title: t('auth.register.errors.invalidData.title'),
                    description: t('auth.register.errors.invalidData.description'),
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: t('auth.register.errors.serverError.title'),
                description: t('auth.register.errors.serverError.description'),
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
    const strengthLabels = [
        t('auth.register.passwordStrength.veryWeak'), 
        t('auth.register.passwordStrength.weak'), 
        t('auth.register.passwordStrength.medium'), 
        t('auth.register.passwordStrength.strong'), 
        t('auth.register.passwordStrength.veryStrong')
    ];
    const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                        {t('auth.register.title')}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="fullName">{t('auth.register.fullName')} *</Label>
                        <Input
                            id="fullName"
                            type="text"
                            placeholder={t('auth.register.fullNamePlaceholder')}
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className={`mt-1 ${errors.fullName ? 'border-red-500' : ''}`}
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="email">{t('auth.register.email')} *</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder={t('auth.register.emailPlaceholder')}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <Label htmlFor="phone">{t('auth.register.phone')} *</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder={t('auth.register.phonePlaceholder')}
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="username">{t('auth.register.username')} *</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder={t('auth.register.usernamePlaceholder')}
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className={`mt-1 ${errors.username ? 'border-red-500' : ''}`}
                            />
                            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                        </div>

                        <div>
                            <Label htmlFor="age">{t('auth.register.age')} *</Label>
                            <Input
                                id="age"
                                type="number"
                                placeholder={t('auth.register.agePlaceholder')}
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
                        <Label htmlFor="password">{t('auth.register.password')} *</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder={t('auth.register.passwordPlaceholder')}
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
                                    {t('auth.register.passwordStrength.label')} {strengthLabels[passwordStrength] || strengthLabels[0]}
                                </p>
                            </div>
                        )}
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div>
                        <Label htmlFor="confirmPassword">{t('auth.register.confirmPassword')} *</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder={t('auth.register.confirmPasswordPlaceholder')}
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
                            {t('auth.register.acceptTerms')}{' '}
                            <Button variant="link" className="p-0 h-auto text-sm">
                                {t('auth.register.termsAndConditions')}
                            </Button>{' '}
                            {t('auth.register.and')}{' '}
                            <Button variant="link" className="p-0 h-auto text-sm">
                                {t('auth.register.privacyPolicy')}
                            </Button>
                        </Label>
                    </div>
                    {errors.acceptTerms && <p className="text-red-500 text-xs">{errors.acceptTerms}</p>}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? t('auth.register.registerButtonLoading') : t('auth.register.registerButton')}
                    </Button>

                    <div className="text-center">
                        <span className="text-sm text-gray-600">{t('auth.register.hasAccount')} </span>
                        <Button
                            variant="link"
                            className="p-0 h-auto text-sm font-semibold"
                            onClick={onSwitchToLogin}
                            type="button"
                        >
                            {t('auth.register.loginLink')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
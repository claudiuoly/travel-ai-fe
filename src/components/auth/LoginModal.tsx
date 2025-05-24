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

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
}

export const LoginModal = ({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) => {
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
        rememberMe: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const success = await login(formData.identifier, formData.password);
            if (success) {
                toast({
                    title: t('auth.login.success.title'),
                    description: t('auth.login.success.description'),
                });
                onClose();
            } else {
                toast({
                    title: t('auth.login.errors.invalidCredentials.title'),
                    description: t('auth.login.errors.invalidCredentials.description'),
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: t('auth.login.errors.serverError.title'),
                description: t('auth.login.errors.serverError.description'),
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const detectInputType = (value: string) => {
        if (value.includes('@')) return t('auth.login.types.email');
        if (/^\+?[\d\s-()]+$/.test(value)) return t('auth.login.types.telefon');
        return t('auth.login.types.username');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                        {t('auth.login.title')}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="identifier">{t('auth.login.identifier')}</Label>
                        <Input
                            id="identifier"
                            type="text"
                            placeholder={t('auth.login.identifierPlaceholder')}
                            value={formData.identifier}
                            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                            required
                            className="mt-1"
                        />
                        {formData.identifier && (
                            <p className="text-xs text-gray-500 mt-1">
                                {t('auth.login.detected', { type: detectInputType(formData.identifier) })}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="password">{t('auth.login.password')}</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder={t('auth.login.passwordPlaceholder')}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            className="mt-1"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={formData.rememberMe}
                                onCheckedChange={(checked) =>
                                    setFormData({ ...formData, rememberMe: checked as boolean })
                                }
                            />
                            <Label htmlFor="remember" className="text-sm">
                                {t('auth.login.rememberMe')}
                            </Label>
                        </div>

                        <Button variant="link" className="p-0 h-auto text-sm">
                            {t('auth.login.forgotPassword')}
                        </Button>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? t('auth.login.loginButtonLoading') : t('auth.login.loginButton')}
                    </Button>

                    <div className="text-center">
                        <span className="text-sm text-gray-600">{t('auth.login.noAccount')} </span>
                        <Button
                            variant="link"
                            className="p-0 h-auto text-sm font-semibold"
                            onClick={onSwitchToRegister}
                            type="button"
                        >
                            {t('auth.login.registerLink')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
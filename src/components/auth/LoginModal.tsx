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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const success = await login(formData.identifier, formData.password);
            if (success) {
                toast({
                    title: "Conectare reușită!",
                    description: "Bun venit înapoi!",
                });
                onClose();
            } else {
                toast({
                    title: "Eroare de conectare",
                    description: "Email/telefon/username sau parolă incorrecte. Verifică datele introduse și încearcă din nou.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Eroare de conectare",
                description: "Nu s-a putut conecta la server. Verifică conexiunea la internet și încearcă din nou.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const detectInputType = (value: string) => {
        if (value.includes('@')) return 'email';
        if (/^\+?[\d\s-()]+$/.test(value)) return 'telefon';
        return 'username';
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                        Conectare
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="identifier">Email / Telefon / Username</Label>
                        <Input
                            id="identifier"
                            type="text"
                            placeholder="Introdu email, telefon sau username"
                            value={formData.identifier}
                            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                            required
                            className="mt-1"
                        />
                        {formData.identifier && (
                            <p className="text-xs text-gray-500 mt-1">
                                Detectat ca: {detectInputType(formData.identifier)}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="password">Parolă</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Introdu parola"
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
                                Ține-mă minte
                            </Label>
                        </div>

                        <Button variant="link" className="p-0 h-auto text-sm">
                            Ai uitat parola?
                        </Button>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Se conectează...' : 'Conectare'}
                    </Button>

                    <div className="text-center">
                        <span className="text-sm text-gray-600">Nu ai cont? </span>
                        <Button
                            variant="link"
                            className="p-0 h-auto text-sm font-semibold"
                            onClick={onSwitchToRegister}
                            type="button"
                        >
                            Înregistrează-te
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
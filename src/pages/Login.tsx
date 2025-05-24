
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Demo credentials check
    if (formData.identifier === 'test@gmail.com' && formData.password === 'test') {
      setTimeout(() => {
        toast({
          title: "Autentificare reușită!",
          description: "Bine ai revenit în Trajecta!"
        });
        
        // Store demo user data
        localStorage.setItem('trajecta_user', JSON.stringify({
          id: 1,
          full_name: 'Test Test',
          email: 'test@gmail.com',
          username: 'test'
        }));
        
        setIsLoading(false);
        navigate('/dashboard');
      }, 1500);
    } else {
      setTimeout(() => {
        toast({
          title: "Eroare",
          description: "Email/username sau parolă incorecte",
          variant: "destructive"
        });
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      identifier: 'test@gmail.com',
      password: 'test'
    });
    
    toast({
      title: "Credențiale demo completate",
      description: "Apasă 'Conectează-te' pentru a accesa demo-ul"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Înapoi acasă
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Trajecta
            </h1>
            <p className="text-gray-600">Bine ai revenit! Conectează-te la cont</p>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Autentificare</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="identifier">Email sau Username</Label>
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  value={formData.identifier}
                  onChange={handleInputChange}
                  placeholder="test@gmail.com sau test"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Parola</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Ține-mă conectat</span>
                </Label>
                <Link to="#" className="text-sm text-blue-600 hover:text-blue-800">
                  Ai uitat parola?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Mă conectez...
                  </div>
                ) : (
                  'Conectează-te'
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleDemoLogin}
              >
                Completează credențiale demo
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Nu ai cont încă?{' '}
                  <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                    Înregistrează-te
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Demo Credentials</h4>
          <p className="text-sm text-blue-800 mb-1">Email: test@gmail.com</p>
          <p className="text-sm text-blue-800">Parola: test</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

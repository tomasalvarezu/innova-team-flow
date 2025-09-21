import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { authAPI } from "@/lib/api";
import { Loader2 } from "lucide-react";
import teamIllustration from "@/assets/team-illustration.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!email) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El email no es válido";
    }
    
    if (!password) {
      newErrors.password = "La contraseña es requerida";
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const response = await authAPI.login(email, password);
      
      if (response.success) {
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión exitosamente",
          variant: "default",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      setErrors({ 
        general: error instanceof Error ? error.message : "Error al iniciar sesión" 
      });
      toast({
        title: "Error",
        description: "Credenciales inválidas. Intenta con demo@example.com / demo1234",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl overflow-hidden shadow-elegant">
        <div className="flex min-h-[600px]">
          {/* Left Side - Illustration */}
          <div className="flex-1 bg-dark-blue text-dark-blue-foreground p-8 flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-md mb-8">
              <img 
                src={teamIllustration} 
                alt="Equipo colaborando en proyectos de software"
                className="w-full h-auto rounded-lg shadow-soft"
              />
            </div>
            <div className="max-w-md">
              <h2 className="text-2xl font-semibold leading-relaxed mb-4">
                Forma equipos multidisciplinarios y desarrolla productos innovadores
              </h2>
              <p className="text-lg opacity-90">
                Conecta con estudiantes de Ingeniería de Software y crea soluciones reales
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex-1 p-8 flex items-center justify-center bg-background">
            <div className="w-full max-w-md">
              {/* Logo Section */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-8 h-8">
                    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                      <path d="M8 32L20 8L32 32H8Z" fill="hsl(var(--primary))" />
                      <circle cx="20" cy="20" r="6" fill="hsl(var(--secondary))" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold">
                      <span className="text-foreground">Inno</span>
                      <span className="text-primary">sistemas</span>
                    </div>
                    <div className="text-sm text-muted-foreground -mt-1">
                      Innovate & Develop Systems
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div>
                <h3 className="text-xl font-semibold mb-6 text-center">
                  Iniciar Sesión
                </h3>

                {errors.general && (
                  <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
                    {errors.general}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Ingresa tu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={errors.password ? "border-destructive" : ""}
                      disabled={isLoading}
                    />
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn-hero"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Iniciando sesión...
                      </>
                    ) : (
                      "Iniciar Sesión"
                    )}
                  </Button>
                </form>

                {/* Demo Credentials Helper */}
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground text-center mb-2">
                    <strong>Credenciales de demostración:</strong>
                  </p>
                  <div className="text-sm text-center space-y-1">
                    <p><strong>Email:</strong> demo@example.com</p>
                    <p><strong>Contraseña:</strong> demo1234</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => {
                      setEmail("demo@example.com");
                      setPassword("demo1234");
                    }}
                  >
                    Usar credenciales demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
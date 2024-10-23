import * as React from "react"
import {useState} from "react"
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {LoginCredentials} from "@/types/auth.ts";
import {useAuth} from "@/hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";
import {loginFailure, loginStart, loginSuccess} from "@/store/slices/authSlice.ts";

export function UserAuthForm(): React.JSX.Element {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });

  const { loading, error, dispatch } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = (): string | null => {
    if (!credentials.email || !credentials.password) {
      return 'Todos os campos são obrigatórios';
    }
    if (!credentials.email.includes('@')) {
      return 'Email inválido';
    }
    if (credentials.password.length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      dispatch(loginFailure(validationError));
      return;
    }

    dispatch(loginStart());

    try {
      // Simulando uma chamada API
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (credentials.email === 'user@brain.agr.br' && credentials.password === '123456') {
        dispatch(loginSuccess({ email: credentials.email, name: 'Usuário Teste' }));
        navigate('/dashboard');
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (err) {
      dispatch(loginFailure((err as Error).message));
    }
  };

  return (
    <div className="grid gap-4">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={credentials.email}
            onChange={handleChange}
            disabled={loading}
            placeholder="exemplo@email.com"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="/esqueci-minha-senha"
              className="ml-auto inline-block text-sm underline"
            >
              Esqueceu sua senha?
            </a>
          </div>
          <Input id="password"
                 name="password"
                 type="password"
                 autoComplete="current-password"
                 required
                 value={credentials.password}
                 onChange={handleChange}
                 disabled={loading}
                 placeholder="Sua senha"/>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <Button type="submit"
                disabled={loading} className="w-full">
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>

    </div>
  )
}
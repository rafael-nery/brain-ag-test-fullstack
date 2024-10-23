import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {PageInfo} from '@/types/page';

const pageConfigs: Record<string, PageInfo> = {
  '/esqueci-minha-senha': {
    title: 'Esqueci Minha Senha',
    description: 'Recuperação de senha',
    backUrl: '/login',
    backLabel: 'Voltar para o login'
  },
  '/termos': {
    title: 'Termos de Uso',
    description: 'Termos e condições de uso da plataforma',
    backUrl: '/login',
    backLabel: 'Voltar para o login'
  },
  '/privacidade': {
    title: 'Política de Privacidade',
    description: 'Nossa política de privacidade e uso de dados',
    backUrl: '/login',
    backLabel: 'Voltar para o login'
  }
};

export default function BlankPage(): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const pageInfo = pageConfigs[location.pathname] || {
    title: 'Página em Branco',
    description: 'Página de demonstração',
    backUrl: '/',
    backLabel: 'Voltar para a página principal'
  };

  const handleBack = () => {
    navigate(pageInfo.backUrl || '/');
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{pageInfo.title}</CardTitle>
          <CardDescription>
            {pageInfo.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <img
            src="https://farmcheck.brainag.app/static/media/logotipo.f0c0bd90.png"
            height={100}
            alt="brain.ag"
            className="mx-auto"
          />
          <h1 className="w-full text-center">Página em Branco</h1>
          <Button
            className="w-full"
            onClick={handleBack}
            variant="default"
          >
            {pageInfo.backLabel}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
import {UserAuthForm} from "@/pages/LoginPage/components/user-auth-form.tsx";

export default function LoginPage() {
  return (
    <>
      <div className="md:hidden">
      </div>
      <div className="container relative hidden h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img src="https://www.brain.agr.br/images/logo.png" alt="brain.ag"/>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;O projeto consiste em um cadastro de produtores rurais, com funcionalidades de CRUD, validações de dados, e um dashboard com gráficos e estatísticas.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Entre
              </h1>
              <p className="text-sm text-muted-foreground">
                Digite seu e-mail abaixo para criar sua conta
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Clicando em continuar, você concorda com nossos{" "}
              <a
                href="/termos"
                className="underline underline-offset-4 hover:text-primary"
              >
                Termos de Serviço
              </a>{" "}
              e{" "}
              <a
                href="/privacidade"
                className="underline underline-offset-4 hover:text-primary"
              >
                Política de Privacidade.
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string("Senha inválida").min(8, "Senha inválida"),
});

type FormSchemaType = z.infer<typeof formSchema>;

const SignInForm = () => {
  const route = useRouter();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({ email, password }: FormSchemaType) {
    await authClient.signIn.email({
      email,
      password,
      fetchOptions: {
        onSuccess: () => {
          route.push("/");
        },
        onError(ctx) {
          if (ctx?.error?.statusText === "UNAUTHORIZED") {
            toast.error("Email ou senha inválido!");
            form.setError("email", {
              message: "Email ou senha inválido!",
            });
            form.setError("password", {
              message: "Email ou senha inválido!",
            });
            return;
          } else {
            form.setError("email", {
              message: "Email ou senha inválido!",
            });
            form.setError("password", {
              message: "Email ou senha inválido!",
            });
            toast.error(ctx.error.message);
          }
        },
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 md:min-w-96"
      >
        <Card>
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>Faça login para continuar.</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="cursor-pointer transition-colors duration-200"
            >
              Entrar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default SignInForm;

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function LoginPage(){
  return (
    <div className="min-h-[70vh] grid place-items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="text-xl font-semibold">Ingresar</div>
          <div className="text-sm text-slate-600">Bienvenido de vuelta</div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Email</label>
            <Input type="email" placeholder="tucorreo@dominio.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Contraseña</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <Button className="w-full">Entrar</Button>
          <div className="text-sm text-center text-slate-600">
            ¿No tienes cuenta? <Link href="/" className="text-[var(--brand)]">Regístrate</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

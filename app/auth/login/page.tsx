import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="mx-auto w-full max-w-md px-6 py-16">
      <div className="card space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Ingreso</h1>
          <p className="text-sm text-slate-500">
            Accede con tu correo personal registrado.
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              placeholder="correo@personal.com"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Contraseña</label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              placeholder="********"
            />
          </div>
          <Button type="submit" className="w-full">
            Ingresar
          </Button>
        </form>
      </div>
    </main>
  );
}

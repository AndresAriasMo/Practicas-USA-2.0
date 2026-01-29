import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Practicas 360 | Gestión de prácticas",
  description:
    "Plataforma integral para la gestión de prácticas profesionales con control por etapas, trazabilidad y notificaciones."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <div>
              <p className="text-lg font-bold">Practicas 360</p>
              <p className="text-sm text-slate-500">
                Plataforma integral de prácticas profesionales
              </p>
            </div>
            <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
              <a href="/" className="hover:text-brand">
                Inicio
              </a>
              <a href="/dashboard" className="hover:text-brand">
                Dashboard
              </a>
              <a href="#" className="rounded-full bg-brand px-4 py-2 text-white">
                Ingresar
              </a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto w-full max-w-6xl px-6 py-6 text-sm text-slate-500">
            © 2024 Practicas 360 · Trazabilidad y control integral
          </div>
        </footer>
      </body>
    </html>
  );
}

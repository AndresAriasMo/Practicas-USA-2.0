import Link from "next/link";
import { Button } from "@/components/ui/button";

const highlights = [
  {
    title: "Control por etapas",
    description:
      "Flujo S0-S8 con gates obligatorios, bloqueo documental y alertas automáticas."
  },
  {
    title: "RBAC con alcance",
    description:
      "Roles estrictos por escuela/programa con trazabilidad y segregación de funciones."
  },
  {
    title: "Notas y evidencias",
    description:
      "Cálculo automático 35/35/20/10 con historial, cartas y auditoría."
  }
];

const modules = [
  "Registro y validación académica",
  "Formalización y legalización",
  "Vacantes y postulaciones",
  "Evaluaciones y sustentación",
  "Cumplimiento y notas finales",
  "Tickets, anuncios y reportes"
];

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Plataforma lista para producción
          </p>
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            Gestión integral de prácticas profesionales con trazabilidad total
          </h1>
          <p className="text-lg text-slate-600">
            Diseñada para múltiples escuelas y programas, con revisión documental
            etapa por etapa, notificaciones automáticas y dashboards por rol.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button>Solicitar demo</Button>
            <Button variant="outline">Ver arquitectura</Button>
          </div>
        </div>
        <div className="card space-y-4">
          <div>
            <p className="text-sm text-slate-500">Estado del proceso</p>
            <h3 className="text-xl font-semibold">Legalización en curso</h3>
          </div>
          <div className="space-y-3">
            {[
              "Preinducción",
              "Check académico",
              "Formalización documental",
              "Legalización",
              "Evaluación 1"
            ].map((stage, index) => (
              <div key={stage} className="flex items-center gap-3">
                <span className="badge badge-info">S{index}</span>
                <p className="text-sm text-slate-600">{stage}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-600">Plazo legalización</p>
            <p className="text-2xl font-semibold text-slate-900">15 días</p>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="card space-y-2">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-slate-600">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[0.6fr_1fr]">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Módulos obligatorios</h2>
          <p className="text-sm text-slate-600">
            Catálogo mínimo para garantizar el flujo completo con evidencias,
            notificaciones y auditoría.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {modules.map((module) => (
            <div key={module} className="card">
              <p className="text-sm font-semibold text-slate-800">{module}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl bg-brand px-8 py-10 text-white">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold">Construida para escalar</h2>
            <p className="text-sm text-blue-100">
              Arquitectura Next.js + Prisma + PostgreSQL con S3 y notificaciones
              SMTP integradas.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand"
          >
            Ver dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}

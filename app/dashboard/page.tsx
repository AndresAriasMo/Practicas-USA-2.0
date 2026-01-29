import { RoleBadge } from "@/components/role-badge";
import { timelineStages } from "@/lib/stages";

const kpis = [
  { label: "Estudiantes activos", value: "128" },
  { label: "Legalizaciones en curso", value: "42" },
  { label: "Evaluaciones pendientes", value: "19" },
  { label: "Alertas por vencimiento", value: "6" }
];

export default function DashboardPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Dashboard Coordinación
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Seguimiento integral por etapas
          </h1>
          <p className="text-sm text-slate-600">
            KPIs por escuela, control documental y alertas críticas.
          </p>
        </div>
        <RoleBadge role="COORD" scope="Escuela de Ingeniería" />
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-4">
        {kpis.map((kpi) => (
          <article key={kpi.label} className="card">
            <p className="text-sm text-slate-500">{kpi.label}</p>
            <p className="text-2xl font-semibold text-slate-900">{kpi.value}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="card">
          <h2 className="text-lg font-semibold">Timeline del proceso</h2>
          <div className="mt-4 space-y-4">
            {timelineStages.map((stage) => (
              <div key={stage.code} className="flex items-start gap-3">
                <span className="badge badge-info">{stage.code}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {stage.title}
                  </p>
                  <p className="text-xs text-slate-500">{stage.rule}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold">Alertas automáticas</h2>
          <div className="space-y-3 text-sm text-slate-600">
            <p>• Legalización vencida en 6 casos (alerta 29 días).</p>
            <p>• 12 documentos rechazados con observación pendiente.</p>
            <p>• 8 evaluaciones esperando respuesta de empresa.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

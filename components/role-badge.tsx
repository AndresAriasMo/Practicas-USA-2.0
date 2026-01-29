interface RoleBadgeProps {
  role: string;
  scope: string;
}

export function RoleBadge({ role, scope }: RoleBadgeProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Rol activo
      </p>
      <p className="text-lg font-semibold text-slate-900">{role}</p>
      <p className="text-xs text-slate-500">{scope}</p>
    </div>
  );
}

'use client';

import {
  FiFileText, FiClock, FiMessageSquare, FiFileMinus, FiHome, FiUsers,
  FiLogOut, FiCalendar, FiUserCheck
} from 'react-icons/fi';

export type Section = 'cartera' | 'resumen' | 'linea-tiempo' | 'tramites' | 'calendario' | 'equipo' | 'mensajeria' | 'facturacion';
export type Rol = 'cliente' | 'despacho';

interface ClienteResumen {
  nombre: string;
  empresa: string;
  iniciales: string;
}

const NAV: { key: Section; label: string; icon: React.ReactNode; soloDespacho?: boolean }[] = [
  { key: 'cartera', label: 'Clientes', icon: <FiUsers />, soloDespacho: true },
  { key: 'resumen', label: 'Resumen', icon: <FiHome /> },
  { key: 'linea-tiempo', label: 'Documentos', icon: <FiFileText /> },
  { key: 'tramites', label: 'Trámites', icon: <FiClock /> },
  { key: 'calendario', label: 'Vencimientos', icon: <FiCalendar /> },
  { key: 'equipo', label: 'Equipo', icon: <FiUserCheck /> },
  { key: 'mensajeria', label: 'Mensajería', icon: <FiMessageSquare /> },
  { key: 'facturacion', label: 'Facturación', icon: <FiFileMinus /> }
];

interface DemoSidebarProps {
  rol: Rol;
  cambiarRol: (rol: Rol) => void;
  section: Section;
  setSection: (s: Section) => void;
  clienteActivo: ClienteResumen | null;
  pendientesGlobal: number;
  vencimientosUrgentesGlobal: number;
  facturasPendientesGlobal: number;
  onNavigate?: () => void; // se llama tras elegir sección — usado para cerrar el Sheet en móvil
}

export default function DemoSidebar({
  rol,
  cambiarRol,
  section,
  setSection,
  clienteActivo,
  pendientesGlobal,
  vencimientosUrgentesGlobal,
  facturasPendientesGlobal,
  onNavigate
}: DemoSidebarProps) {
  return (
    <div className="flex flex-col p-5 h-full overflow-y-auto">
      <div className="flex items-center gap-2 mb-1 px-2">
        <div className="w-7 h-7 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30 flex items-center justify-center text-emerald-400 text-[13px] font-medium">
          N
        </div>
        <span className="font-medium text-[15px]">Nombre</span>
      </div>
      <span className="text-[11px] text-white/35 px-2 mb-5">Portal de cliente — demo</span>

      <div className="mb-8 px-2">
        <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 block mb-2">Estás viendo como</span>
        <div className="relative flex bg-white/[0.04] rounded-full p-1 ring-1 ring-white/10">
          <div
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-emerald-500 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{ left: rol === 'despacho' ? '4px' : 'calc(50% + 0px)' }}
          />
          <button
            onClick={() => cambiarRol('despacho')}
            className={`relative z-10 flex-1 text-[12px] font-medium py-1.5 rounded-full transition-colors duration-300 ${
              rol === 'despacho' ? 'text-[#04140F]' : 'text-white/50 hover:text-white/80'
            }`}
          >
            Despacho
          </button>
          <button
            onClick={() => cambiarRol('cliente')}
            className={`relative z-10 flex-1 text-[12px] font-medium py-1.5 rounded-full transition-colors duration-300 ${
              rol === 'cliente' ? 'text-[#04140F]' : 'text-white/50 hover:text-white/80'
            }`}
          >
            Cliente final
          </button>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV.filter(item => rol === 'despacho' || !item.soloDespacho).map(item => {
          const bloqueado = rol === 'despacho' && item.key !== 'cartera' && !clienteActivo;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                if (bloqueado) return;
                setSection(item.key);
                onNavigate?.();
              }}
              aria-disabled={bloqueado}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] transition-all duration-300 ${
                bloqueado
                  ? 'text-white/20 cursor-not-allowed pointer-events-none'
                  : section === item.key
                  ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
                  : 'text-white/55 hover:bg-white/[0.04] hover:text-white/80'
              }`}
            >
              <span className="text-[15px]">{item.icon}</span>
              {item.label}
              {item.key === 'tramites' && pendientesGlobal > 0 && (
                <span className="ml-auto text-[10px] font-mono bg-white/10 rounded-full px-1.5 py-0.5">{pendientesGlobal}</span>
              )}
              {item.key === 'calendario' && vencimientosUrgentesGlobal > 0 && (
                <span className="ml-auto text-[10px] font-mono bg-red-500/15 text-red-400 rounded-full px-1.5 py-0.5">
                  {vencimientosUrgentesGlobal}
                </span>
              )}
              {item.key === 'facturacion' && facturasPendientesGlobal > 0 && (
                <span className="ml-auto text-[10px] font-mono bg-amber-500/15 text-amber-400 rounded-full px-1.5 py-0.5">
                  {facturasPendientesGlobal}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {rol === 'despacho' && clienteActivo && (
        <div className="mt-6 mx-2 p-3 rounded-xl bg-white/[0.03] ring-1 ring-white/10">
          <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 block mb-2">Viendo expediente de</span>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[11px] font-medium shrink-0">
              {clienteActivo.iniciales}
            </div>
            <div className="min-w-0 leading-tight">
              <div className="text-[12.5px] font-medium truncate">{clienteActivo.nombre}</div>
              <div className="text-[10.5px] text-white/40 truncate">{clienteActivo.empresa}</div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[13px] font-medium">
            {rol === 'despacho' ? 'MG' : clienteActivo?.iniciales ?? 'JC'}
          </div>
          <div className="leading-tight">
            <div className="text-[13px] font-medium">{rol === 'despacho' ? 'María González' : clienteActivo?.nombre}</div>
            <div className="text-[11px] text-white/40">
              {rol === 'despacho' ? 'Gestoría Ejemplo S.L. · Staff' : 'Cliente de Gestoría Ejemplo S.L.'}
            </div>
          </div>
        </div>
        <a href="/" className="flex items-center gap-2 px-3 py-2 text-[13px] text-white/40 hover:text-white/70 transition-colors">
          <FiLogOut /> Salir de la demo
        </a>
      </div>
    </div>
  );
}
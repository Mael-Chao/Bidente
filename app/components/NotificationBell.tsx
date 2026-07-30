'use client';

import { useEffect, useRef, useState } from 'react';
import { FiBell, FiFileText, FiClock, FiMessageSquare, FiFileMinus, FiCheck } from 'react-icons/fi';

export interface Notificacion {
  id: string;
  tipo: 'documento' | 'tramite' | 'mensaje' | 'factura';
  texto: string;
  hora: string;
  leida: boolean;
}

const ICONOS: Record<Notificacion['tipo'], React.ReactNode> = {
  documento: <FiFileText />,
  tramite: <FiClock />,
  mensaje: <FiMessageSquare />,
  factura: <FiFileMinus />
};

export default function NotificationBell({
  notificaciones,
  onMarcarLeida,
  onMarcarTodasLeidas
}: {
  notificaciones: Notificacion[];
  onMarcarLeida: (id: string) => void;
  onMarcarTodasLeidas: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const noLeidas = notificaciones.filter(n => !n.leida).length;

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="relative w-9 h-9 rounded-full bg-white/[0.04] ring-1 ring-white/10 flex items-center justify-center text-white/60 hover:text-white/90 hover:ring-white/20 transition-all duration-300"
        aria-label="Notificaciones"
      >
        <FiBell size={16} />
        {noLeidas > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-emerald-500 text-[#04140F] text-[10px] font-medium flex items-center justify-center">
            {noLeidas > 9 ? '9+' : noLeidas}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[340px] max-h-[420px] overflow-y-auto rounded-[1.25rem] bg-[#0F1512] ring-1 ring-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 sticky top-0 bg-[#0F1512]">
            <span className="text-[13px] font-medium">Notificaciones</span>
            {noLeidas > 0 && (
              <button
                onClick={onMarcarTodasLeidas}
                className="text-[11.5px] text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Marcar todas como leídas
              </button>
            )}
          </div>

          {notificaciones.length === 0 ? (
            <div className="px-4 py-10 text-center text-white/35 text-[13px]">No hay notificaciones todavía.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {notificaciones.map(n => (
                <button
                  key={n.id}
                  onClick={() => onMarcarLeida(n.id)}
                  className={`w-full text-left flex items-start gap-3 px-4 py-3 transition-colors duration-200 ${
                    n.leida ? 'opacity-50 hover:opacity-70' : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-[14px] shrink-0 ${
                      n.leida ? 'bg-white/5 text-white/40' : 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
                    }`}
                  >
                    {ICONOS[n.tipo]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] text-white/80 leading-snug">{n.texto}</p>
                    <span className="text-[11px] text-white/35 mt-1 block">{n.hora}</span>
                  </div>
                  {!n.leida && <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-1.5" />}
                  {n.leida && <FiCheck className="text-white/20 shrink-0 mt-1.5" size={12} />}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
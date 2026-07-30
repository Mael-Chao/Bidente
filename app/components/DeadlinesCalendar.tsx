'use client';

import { useState } from 'react';
import { FiPlus, FiX, FiAlertCircle, FiFileText, FiUsers, FiBriefcase } from 'react-icons/fi';

export interface Vencimiento {
  id: string;
  nombre: string;
  fechaISO: string; // 'YYYY-MM-DD', para poder ordenar y calcular días restantes
  fechaLabel: string; // fecha legible, ej. "20 oct 2026"
  tipo: 'fiscal' | 'laboral' | 'legal' | 'otro';
}

const TIPO_ICONO: Record<Vencimiento['tipo'], React.ReactNode> = {
  fiscal: <FiFileText />,
  laboral: <FiUsers />,
  legal: <FiBriefcase />,
  otro: <FiAlertCircle />
};

const TIPO_LABEL: Record<Vencimiento['tipo'], string> = {
  fiscal: 'Fiscal',
  laboral: 'Laboral',
  legal: 'Legal',
  otro: 'Otro'
};

function diasRestantes(fechaISO: string): number {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fecha = new Date(fechaISO + 'T00:00:00');
  return Math.round((fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
}

function urgenciaColor(dias: number): string {
  if (dias < 0) return 'text-white/30 ring-white/10';
  if (dias <= 7) return 'text-red-400 ring-red-500/30 bg-red-500/5';
  if (dias <= 30) return 'text-amber-400 ring-amber-500/30';
  return 'text-emerald-400 ring-emerald-500/30';
}

function countdownLabel(dias: number): string {
  if (dias < 0) return 'Vencido';
  if (dias === 0) return 'Hoy';
  if (dias === 1) return 'Mañana';
  return `En ${dias} días`;
}

interface DeadlinesCalendarProps {
  vencimientos: Vencimiento[];
  puedeCrear: boolean;
  onCrear?: (nombre: string, fechaISO: string, tipo: Vencimiento['tipo']) => void;
}

export default function DeadlinesCalendar({ vencimientos, puedeCrear, onCrear }: DeadlinesCalendarProps) {
  const [formAbierto, setFormAbierto] = useState(false);
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [tipo, setTipo] = useState<Vencimiento['tipo']>('fiscal');

  const ordenados = [...vencimientos].sort((a, b) => diasRestantes(a.fechaISO) - diasRestantes(b.fechaISO));

  const handleCrear = () => {
    if (!nombre.trim() || !fecha) return;
    const fechaLabel = new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    onCrear?.(nombre.trim(), fecha, tipo);
    setNombre('');
    setFecha('');
    setTipo('fiscal');
    setFormAbierto(false);
  };

  return (
    <div>
      {puedeCrear && (
        <div className="flex justify-end mb-6">
          {!formAbierto ? (
            <button
              onClick={() => setFormAbierto(true)}
              className="inline-flex items-center gap-1.5 text-[13px] text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <FiPlus size={14} /> Añadir vencimiento
            </button>
          ) : null}
        </div>
      )}

      {formAbierto && (
        <div className="p-1.5 rounded-[1.25rem] bg-white/[0.03] ring-1 ring-white/10 mb-6">
          <div className="rounded-[calc(1.25rem-0.375rem)] bg-[#0F1512] p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[13px] font-medium text-white/70">Nuevo vencimiento</span>
              <button onClick={() => setFormAbierto(false)} className="text-white/40 hover:text-white/70 transition-colors">
                <FiX size={16} />
              </button>
            </div>
            <input
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Ej. Presentación IVA Q3"
              className="w-full rounded-xl bg-white/[0.04] ring-1 ring-white/10 px-4 py-2.5 text-[14px] outline-none focus:ring-emerald-500/40 transition-all mb-3"
            />
            <div className="flex gap-3 mb-4">
              <input
                type="date"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
                className="flex-1 rounded-xl bg-white/[0.04] ring-1 ring-white/10 px-4 py-2.5 text-[14px] outline-none focus:ring-emerald-500/40 transition-all [color-scheme:dark]"
              />
              <select
                value={tipo}
                onChange={e => setTipo(e.target.value as Vencimiento['tipo'])}
                className="rounded-xl bg-white/[0.04] ring-1 ring-white/10 px-4 py-2.5 text-[14px] outline-none focus:ring-emerald-500/40 transition-all [color-scheme:dark]"
              >
                <option value="fiscal">Fiscal</option>
                <option value="laboral">Laboral</option>
                <option value="legal">Legal</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <button
              onClick={handleCrear}
              className="rounded-full bg-emerald-500 text-[#04140F] px-5 py-2 text-[13.5px] font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Añadir
            </button>
          </div>
        </div>
      )}

      {ordenados.length === 0 ? (
        <p className="text-white/35 text-[13.5px]">No hay vencimientos próximos.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {ordenados.map(v => {
            const dias = diasRestantes(v.fechaISO);
            return (
              <div key={v.id} className="p-1.5 rounded-[1.25rem] bg-white/[0.03] ring-1 ring-white/10">
                <div className="rounded-[calc(1.25rem-0.375rem)] bg-[#0F1512] p-5 flex items-center justify-between gap-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-white/50 text-[16px] shrink-0">
                      {TIPO_ICONO[v.tipo]}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[14.5px] text-white/90 font-medium truncate">{v.nombre}</div>
                      <div className="flex items-center gap-2 mt-1 text-[12px] text-white/40">
                        <span>{v.fechaLabel}</span>
                        <span>·</span>
                        <span>{TIPO_LABEL[v.tipo]}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`shrink-0 font-mono text-[12px] px-3 py-1.5 rounded-full ring-1 ${urgenciaColor(dias)}`}>
                    {countdownLabel(dias)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
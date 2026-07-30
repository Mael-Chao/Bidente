'use client';

import { useState } from 'react';
import { FiPlus, FiUpload, FiX, FiCheckCircle } from 'react-icons/fi';

export interface SolicitudDocumento {
  id: string;
  nombre: string;
  nota: string;
  fecha: string;
  estado: 'Pendiente' | 'Recibido';
}

interface DocumentRequestsProps {
  solicitudes: SolicitudDocumento[];
  puedeCrear: boolean; // true para el despacho
  puedeCumplir: boolean; // true para el cliente
  onCrear?: (nombre: string, nota: string) => void;
  onCumplir?: (id: string) => void;
}

export default function DocumentRequests({ solicitudes, puedeCrear, puedeCumplir, onCrear, onCumplir }: DocumentRequestsProps) {
  const [formAbierto, setFormAbierto] = useState(false);
  const [nombre, setNombre] = useState('');
  const [nota, setNota] = useState('');

  const pendientes = solicitudes.filter(s => s.estado === 'Pendiente');
  const recibidas = solicitudes.filter(s => s.estado === 'Recibido');

  const handleCrear = () => {
    if (!nombre.trim()) return;
    onCrear?.(nombre.trim(), nota.trim());
    setNombre('');
    setNota('');
    setFormAbierto(false);
  };

  if (solicitudes.length === 0 && !puedeCrear) return null;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px] font-medium flex items-center gap-2">
          Documentos solicitados
          {pendientes.length > 0 && (
            <span className="text-[11px] font-mono bg-amber-500/15 text-amber-400 rounded-full px-2 py-0.5">
              {pendientes.length} pendiente{pendientes.length > 1 ? 's' : ''}
            </span>
          )}
        </h3>
        {puedeCrear && !formAbierto && (
          <button
            onClick={() => setFormAbierto(true)}
            className="inline-flex items-center gap-1.5 text-[13px] text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <FiPlus size={14} /> Solicitar documento
          </button>
        )}
      </div>

      {formAbierto && (
        <div className="p-1.5 rounded-[1.25rem] bg-white/[0.03] ring-1 ring-white/10 mb-4">
          <div className="rounded-[calc(1.25rem-0.375rem)] bg-[#0F1512] p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-medium text-white/70">Nueva solicitud</span>
              <button onClick={() => setFormAbierto(false)} className="text-white/40 hover:text-white/70 transition-colors">
                <FiX size={16} />
              </button>
            </div>
            <input
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Qué documento necesitas, ej. DNI actualizado"
              className="w-full rounded-xl bg-white/[0.04] ring-1 ring-white/10 px-4 py-2.5 text-[14px] outline-none focus:ring-emerald-500/40 transition-all mb-3"
            />
            <textarea
              value={nota}
              onChange={e => setNota(e.target.value)}
              placeholder="Nota para el cliente (opcional) — por qué lo necesitas, plazo, etc."
              rows={2}
              className="w-full rounded-xl bg-white/[0.04] ring-1 ring-white/10 px-4 py-2.5 text-[13.5px] outline-none focus:ring-emerald-500/40 transition-all resize-none mb-4"
            />
            <button
              onClick={handleCrear}
              className="rounded-full bg-emerald-500 text-[#04140F] px-5 py-2 text-[13.5px] font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Enviar solicitud
            </button>
          </div>
        </div>
      )}

      {pendientes.length > 0 && (
        <div className="flex flex-col gap-3 mb-3">
          {pendientes.map(s => (
            <div key={s.id} className="p-1.5 rounded-[1.25rem] bg-amber-500/[0.04] ring-1 ring-amber-500/20">
              <div className="rounded-[calc(1.25rem-0.375rem)] bg-[#0F1512] p-5 flex items-start justify-between gap-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span className="text-[14.5px] text-white/90 font-medium">{s.nombre}</span>
                  </div>
                  {s.nota && <p className="text-[13px] text-white/50 leading-relaxed">{s.nota}</p>}
                  <span className="text-[11.5px] text-white/35 mt-2 block">Solicitado el {s.fecha}</span>
                </div>
                {puedeCumplir && (
                  <button
                    onClick={() => onCumplir?.(s.id)}
                    className="shrink-0 inline-flex items-center gap-2 rounded-full bg-emerald-500 text-[#04140F] pl-4 pr-1.5 py-1.5 text-[13px] font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                  >
                    <FiUpload size={13} /> Subir
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {recibidas.length > 0 && (
        <div className="flex flex-col gap-2">
          {recibidas.map(s => (
            <div key={s.id} className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-white/40">
              <FiCheckCircle className="text-emerald-500/70 shrink-0" size={14} />
              <span className="line-through decoration-white/20">{s.nombre}</span>
              <span className="text-white/25">— recibido</span>
            </div>
          ))}
        </div>
      )}

      {pendientes.length === 0 && recibidas.length === 0 && puedeCrear && (
        <p className="text-white/35 text-[13px]">No hay solicitudes activas. Usa &quot;Solicitar documento&quot; para pedir algo al cliente.</p>
      )}
    </div>
  );
}
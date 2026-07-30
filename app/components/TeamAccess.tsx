'use client';

import { useState } from 'react';
import { FiPlus, FiX, FiUser, FiMail, FiTrash2, FiShield } from 'react-icons/fi';

export interface MiembroEquipo {
  id: string;
  nombre: string;
  email: string;
  rol: 'Admin' | 'Miembro';
  acceso: 'Completo' | 'Solo lectura';
}

interface TeamAccessProps {
  miembros: MiembroEquipo[];
  puedeGestionar: boolean; // true para el cliente (es su empresa, su equipo)
  onInvitar?: (nombre: string, email: string, acceso: MiembroEquipo['acceso']) => void;
  onEliminar?: (id: string) => void;
}

export default function TeamAccess({ miembros, puedeGestionar, onInvitar, onEliminar }: TeamAccessProps) {
  const [formAbierto, setFormAbierto] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [acceso, setAcceso] = useState<MiembroEquipo['acceso']>('Solo lectura');

  const handleInvitar = () => {
    if (!nombre.trim() || !email.trim()) return;
    onInvitar?.(nombre.trim(), email.trim(), acceso);
    setNombre('');
    setEmail('');
    setAcceso('Solo lectura');
    setFormAbierto(false);
  };

  return (
    <div>
      {puedeGestionar && (
        <div className="flex justify-end mb-6">
          {!formAbierto && (
            <button
              onClick={() => setFormAbierto(true)}
              className="inline-flex items-center gap-1.5 text-[13px] text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <FiPlus size={14} /> Invitar persona
            </button>
          )}
        </div>
      )}

      {formAbierto && (
        <div className="p-1.5 rounded-[1.25rem] bg-white/[0.03] ring-1 ring-white/10 mb-6">
          <div className="rounded-[calc(1.25rem-0.375rem)] bg-[#0F1512] p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[13px] font-medium text-white/70">Invitar a tu equipo</span>
              <button onClick={() => setFormAbierto(false)} className="text-white/40 hover:text-white/70 transition-colors">
                <FiX size={16} />
              </button>
            </div>
            <input
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Nombre y apellidos"
              className="w-full rounded-xl bg-white/[0.04] ring-1 ring-white/10 px-4 py-2.5 text-[14px] outline-none focus:ring-emerald-500/40 transition-all mb-3"
            />
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="correo@empresa.com"
              className="w-full rounded-xl bg-white/[0.04] ring-1 ring-white/10 px-4 py-2.5 text-[14px] outline-none focus:ring-emerald-500/40 transition-all mb-3"
            />
            <div className="mb-4">
              <span className="text-[12px] text-white/50 block mb-2">Nivel de acceso</span>
              <div className="flex gap-2">
                {(['Solo lectura', 'Completo'] as const).map(nivel => (
                  <button
                    key={nivel}
                    onClick={() => setAcceso(nivel)}
                    className={`flex-1 text-[13px] py-2 rounded-lg ring-1 transition-all duration-300 ${
                      acceso === nivel
                        ? 'bg-emerald-500/10 ring-emerald-500/40 text-emerald-400'
                        : 'bg-white/[0.02] ring-white/10 text-white/50 hover:bg-white/[0.05]'
                    }`}
                  >
                    {nivel}
                  </button>
                ))}
              </div>
              <p className="text-[11.5px] text-white/35 mt-2">
                {acceso === 'Completo'
                  ? 'Puede subir documentos, avanzar trámites y responder mensajes.'
                  : 'Puede consultar documentos, trámites y facturas, sin modificar nada.'}
              </p>
            </div>
            <button
              onClick={handleInvitar}
              className="rounded-full bg-emerald-500 text-[#04140F] px-5 py-2 text-[13.5px] font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Enviar invitación
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {miembros.map(m => (
          <div key={m.id} className="p-1.5 rounded-[1.25rem] bg-white/[0.03] ring-1 ring-white/10">
            <div className="rounded-[calc(1.25rem-0.375rem)] bg-[#0F1512] p-5 flex items-center justify-between gap-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[13px] font-medium shrink-0">
                  {m.nombre.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[14.5px] text-white/90 font-medium truncate">{m.nombre}</span>
                    {m.rol === 'Admin' && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 ring-1 ring-emerald-500/20 rounded-full px-1.5 py-0.5 shrink-0">
                        <FiShield size={9} /> Admin
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-white/40 mt-0.5">
                    <FiMail size={11} className="shrink-0" />
                    <span className="truncate">{m.email}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`text-[11px] px-2.5 py-1 rounded-full ring-1 ${
                    m.acceso === 'Completo' ? 'text-sky-400 ring-sky-500/30' : 'text-white/40 ring-white/15'
                  }`}
                >
                  {m.acceso}
                </span>
                {puedeGestionar && m.rol !== 'Admin' && (
                  <button
                    onClick={() => onEliminar?.(m.id)}
                    className="text-white/30 hover:text-red-400 transition-colors p-1"
                    aria-label={`Quitar a ${m.nombre}`}
                  >
                    <FiTrash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {miembros.length === 0 && (
          <p className="text-white/35 text-[13.5px] flex items-center gap-2">
            <FiUser size={14} /> Todavía no hay nadie más con acceso a este expediente.
          </p>
        )}
      </div>
    </div>
  );
}
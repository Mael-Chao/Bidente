'use client';

import { FiFileText, FiDownload, FiUser, FiUpload } from 'react-icons/fi';

export interface TimelineDocumento {
  id: string;
  nombre: string;
  descripcion: string;
  fecha: string;
  fechaGrupo: string;
  tipo: string;
  tamano: string;
  autor: string;
}

interface DocumentTimelineProps {
  documentos: TimelineDocumento[];
  onDescargar?: (id: string) => void;
  onSubir?: () => void; // NUEVO: si se pasa, muestra el botón "Subir documento" arriba
}

export default function DocumentTimeline({ documentos, onDescargar, onSubir }: DocumentTimelineProps) {
  const grupos: { grupo: string; items: TimelineDocumento[] }[] = [];
  for (const doc of documentos) {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.grupo === doc.fechaGrupo) {
      ultimo.items.push(doc);
    } else {
      grupos.push({ grupo: doc.fechaGrupo, items: [doc] });
    }
  }

  return (
    <div className="relative">
      {onSubir && (
        <div className="flex justify-end mb-8">
          <button
            onClick={onSubir}
            className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 text-[#04140F] pl-5 pr-2 py-2 text-[13.5px] font-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            <FiUpload size={14} /> Subir documento
          </button>
        </div>
      )}

      {grupos.map(g => (
        <div key={g.grupo} className="mb-10 last:mb-0">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[12px] font-mono uppercase tracking-[0.15em] text-white/40">{g.grupo}</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="relative pl-8">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />

            <div className="flex flex-col gap-4">
              {g.items.map(doc => (
                <div key={doc.id} className="relative">
                  <div className="absolute -left-8 top-6 w-[15px] h-[15px] rounded-full bg-[#0A0A0A] ring-2 ring-emerald-500/50 flex items-center justify-center">
                    <div className="w-[6px] h-[6px] rounded-full bg-emerald-400" />
                  </div>

                  <div className="p-1.5 rounded-[1.25rem] bg-white/[0.03] ring-1 ring-white/10">
                    <div className="rounded-[calc(1.25rem-0.375rem)] bg-[#0F1512] p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20 flex items-center justify-center text-emerald-400 text-[16px] shrink-0">
                            <FiFileText />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[15px] text-white/90 font-medium truncate">{doc.nombre}</div>
                            <p className="text-[13px] text-white/50 mt-1 leading-relaxed">{doc.descripcion}</p>
                            <div className="flex items-center gap-3 mt-2.5 text-[11.5px] text-white/35">
                              <span>{doc.fecha}</span>
                              <span>·</span>
                              <span>{doc.tipo} · {doc.tamano}</span>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <FiUser size={11} /> {doc.autor}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => onDescargar?.(doc.id)}
                          className="shrink-0 w-9 h-9 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-white/50 hover:text-emerald-400 hover:ring-emerald-500/30 transition-all duration-300"
                          aria-label={`Descargar ${doc.nombre}`}
                          title="Descargar en cualquier momento"
                        >
                          <FiDownload size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
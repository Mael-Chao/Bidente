'use client';

import { useState } from 'react';
import Stepper, { Step } from './Stepper';

interface FormData {
  tipo: string;
  numClientes: string;
  problema: string;
  interes: string;
  nombre: string;
  despacho: string;
  email: string;
  telefono: string;
}

const TIPOS = ['Despacho de abogados', 'Gestoría / asesoría fiscal', 'Asesoría laboral', 'Otro'];
const RANGOS_CLIENTES = ['Menos de 50', '50 - 200', '200 - 500', 'Más de 500'];
const PROBLEMAS = [
  'Demasiadas llamadas repitiendo lo mismo',
  'Documentos perdidos entre email y WhatsApp',
  'Falta de imagen profesional frente al cliente',
  'Ya usamos algo, pero queremos mejorarlo'
];
const INTERESES = ['Esencial', 'Profesional', 'Integral', 'No estoy seguro / quiero orientación'];

function OptionList({
  options,
  value,
  onChange
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5 mt-6">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`text-left rounded-xl px-4 py-3 text-[14.5px] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            value === opt
              ? 'bg-emerald-500/10 ring-1 ring-emerald-500/50 text-emerald-400'
              : 'bg-white/[0.03] ring-1 ring-white/10 text-white/70 hover:bg-white/[0.06]'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="mt-5">
      <label className="block text-[13px] font-medium text-white/60 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl bg-white/[0.03] ring-1 ring-white/10 px-4 py-3 text-[15px] text-white outline-none focus:ring-emerald-500/50 transition-all duration-300"
      />
    </div>
  );
}

export default function ContactStepperForm() {
  const [data, setData] = useState<FormData>({
    tipo: '',
    numClientes: '',
    problema: '',
    interes: '',
    nombre: '',
    despacho: '',
    email: '',
    telefono: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormData) => (value: string) => setData(prev => ({ ...prev, [field]: value }));

  const handleFinalStep = () => {
    // Aquí conectas con tu backend / servicio de email cuando lo tengas listo.
    // Por ahora solo mostramos confirmación en pantalla.
    console.log('Lead capturado:', data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-1.5 rounded-[2rem] bg-white/5 ring-1 ring-white/10 max-w-xl mx-auto">
        <div className="rounded-[calc(2rem-0.375rem)] bg-[#0F1512] px-8 py-16 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20 flex items-center justify-center text-emerald-400 text-[22px] mx-auto mb-5">
            ✓
          </div>
          <h3 className="text-[24px] font-medium tracking-[-0.01em] mb-2">Gracias, {data.nombre.split(' ')[0] || ''}</h3>
          <p className="text-white/55 text-[14.5px] max-w-sm mx-auto">
            He recibido los datos de {data.despacho || 'tu despacho'}. Te escribo en menos de 24h a {data.email} para agendar el diagnóstico.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="p-1.5 rounded-[2rem] bg-white/5 ring-1 ring-white/10">
        <div className="rounded-[calc(2rem-0.375rem)] bg-[#0F1512] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
          <Stepper
            onFinalStepCompleted={handleFinalStep}
            backButtonText="Atrás"
            nextButtonText="Siguiente"
            contentClassName="px-10 pt-8"
          >
            <Step>
              <span className="font-mono text-[12px] text-emerald-400/80">01 / 05</span>
              <h3 className="text-[22px] font-medium tracking-[-0.01em] mt-2 mb-1">Datos de contacto</h3>
              <p className="text-white/50 text-[13.5px]">Te escribo para agendar 15 minutos, sin compromiso.</p>
              <TextField label="Tu nombre" value={data.nombre} onChange={set('nombre')} placeholder="Nombre y apellidos" />
              <TextField label="Despacho / gestoría" value={data.despacho} onChange={set('despacho')} placeholder="Nombre del despacho" />
              <TextField label="Email" value={data.email} onChange={set('email')} type="email" placeholder="tu@despacho.com" />
              <TextField label="Teléfono (opcional)" value={data.telefono} onChange={set('telefono')} type="tel" placeholder="600 000 000" />
            </Step>

            <Step>
              <span className="font-mono text-[12px] text-emerald-400/80">02 / 05</span>
              <h3 className="text-[22px] font-medium tracking-[-0.01em] mt-2 mb-1">¿Qué tipo de negocio tenéis?</h3>
              <p className="text-white/50 text-[13.5px]">Así adapto los ejemplos a vuestro caso concreto.</p>
              <OptionList options={TIPOS} value={data.tipo} onChange={set('tipo')} />
            </Step>

            <Step>
              <span className="font-mono text-[12px] text-emerald-400/80">03 / 05</span>
              <h3 className="text-[22px] font-medium tracking-[-0.01em] mt-2 mb-1">¿Cuántos clientes activos gestionáis?</h3>
              <p className="text-white/50 text-[13.5px]">Nos ayuda a dimensionar el portal correctamente.</p>
              <OptionList options={RANGOS_CLIENTES} value={data.numClientes} onChange={set('numClientes')} />
            </Step>

            <Step>
              <span className="font-mono text-[12px] text-emerald-400/80">04 / 05</span>
              <h3 className="text-[22px] font-medium tracking-[-0.01em] mt-2 mb-1">¿Qué es lo que más os quita tiempo hoy?</h3>
              <p className="text-white/50 text-[13.5px]">Así priorizamos las funcionalidades que más os van a servir.</p>
              <OptionList options={PROBLEMAS} value={data.problema} onChange={set('problema')} />
            </Step>

            <Step>
              <span className="font-mono text-[12px] text-emerald-400/80">05 / 05</span>
              <h3 className="text-[22px] font-medium tracking-[-0.01em] mt-2 mb-1">¿Qué plan encaja mejor con vosotros?</h3>
              <p className="text-white/50 text-[13.5px]">Es solo orientativo — lo afinamos juntos en la llamada.</p>
              <OptionList options={INTERESES} value={data.interes} onChange={set('interes')} />
            </Step>


          </Stepper>
        </div>
      </div>
    </div>
  );
}
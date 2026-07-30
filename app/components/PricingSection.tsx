'use client';

import { useRef } from 'react';
import { FiCheck } from 'react-icons/fi';
import { ParticleCard, GlobalSpotlight, useMobileDetection } from './MagicBentoCard';



interface Tier {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

const TIERS: Tier[] = [
  {
    name: 'Esencial',
    price: '2.800 – 3.500 €',
    features: [
      'Login de cliente',
      'Documentos por expediente',
      'Estados básicos de trámite',
      'Diseño con tu marca'
    ]
  },
  {
    name: 'Profesional',
    price: '4.500 – 6.000 €',
    recommended: true,
    features: [
      'Todo lo de Esencial',
      'Roles de usuario',
      'Mensajería por expediente',
      'Notificaciones automáticas',
      'Integración con tu software de gestión'
    ]
  },
  {
    name: 'Integral',
    price: '7.000 – 9.000 €',
    features: [
      'Todo lo de Profesional',
      'Firma electrónica',
      'Integración API completa',
      'App móvil ligera',
      'Analítica de uso'
    ]
  }
];

export default function PricingSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();

  return (
    <section className="pricing-section relative z-10 py-24 md:py-40 px-4 md:px-12" style={{ backgroundColor: '#0A0A0A' }}>
      <GlobalSpotlight gridRef={gridRef} disableAnimations={isMobile} spotlightRadius={320} glowColor="16, 185, 129" sectionClass="pricing-section" />

      <div className="max-w-xl mx-auto text-center mb-16">
        <span className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 ring-1 ring-white/10 mb-4">
          Precios
        </span>
        <h2 className="text-[32px] md:text-[44px] font-medium tracking-[-0.02em] mb-4">
          Tres formas de empezar
        </h2>
        <p className="text-white/55 text-[15px]">
          No son pasos. Son alternativas, según lo que tu despacho o gestoría necesite hoy.
        </p>
      </div>

      <div ref={gridRef} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {TIERS.map(tier => (
          <ParticleCard
            key={tier.name}
            className={`pricing-card group rounded-[2rem] p-1.5 ${tier.recommended ? 'md:-translate-y-4' : ''}`}
            style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: tier.recommended ? '1px solid rgba(16,185,129,0.35)' : '1px solid rgba(255,255,255,0.1)'
            } as React.CSSProperties}
            disableAnimations={isMobile}
            particleCount={10}
            glowColor="16, 185, 129"
            clickEffect
            enableMagnetism
          >
            <div className="relative h-full rounded-[calc(2rem-0.375rem)] bg-[#0F1512] p-8 md:p-10 flex flex-col shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
              {tier.recommended && (
                <span className="absolute top-6 right-6 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-medium bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                  Recomendado
                </span>
              )}
              <h3 className="text-[22px] font-medium tracking-[-0.01em] mb-1">{tier.name}</h3>
              <div className="flex items-baseline gap-2 mt-4 mb-8">
                <span className="text-[30px] md:text-[34px] font-medium tracking-[-0.02em]">{tier.price}</span>
              </div>
              <ul className="flex flex-col gap-3 mb-8">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-[14px] text-white/70">
                    <FiCheck className="text-emerald-400 shrink-0 mt-[3px]" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contacto"
                className={`mt-auto group/btn inline-flex items-center justify-center gap-3 rounded-full pl-6 pr-2 py-2 text-[14px] font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98] w-fit ${
                  tier.recommended
                    ? 'bg-emerald-500 text-[#04140F]'
                    : 'bg-white/5 ring-1 ring-white/15 hover:bg-white/10'
                }`}
              >
                <span>Solicitar presupuesto</span>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-[1px] ${
                    tier.recommended ? 'bg-black/10' : 'bg-black/20'
                  }`}
                >
                  {'\u2197'}
                </span>
              </a>
            </div>
          </ParticleCard>
        ))}
      </div>

      <p className="text-center text-white/35 text-[13px] mt-10">
        Precios orientativos — se ajustan según el volumen de clientes y funcionalidades del despacho o gestoría.
      </p>

      <style jsx global>{`
        .pricing-card {
          position: relative;
        }
        .pricing-card > div {
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          --glow-radius: 320px;
        }
        .pricing-card > div::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(16, 185, 129, calc(var(--glow-intensity) * 0.7)) 0%,
            rgba(16, 185, 129, calc(var(--glow-intensity) * 0.3)) 35%,
            transparent 65%
          );
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>
    </section>
  );
}
'use client';

import { useRef, useState } from 'react';
import OptionWheel from './OptionWheel';
import { ParticleCard, GlobalSpotlight, useMobileDetection } from './MagicBentoCard';

interface Feature {
  label: string;
  title: string;
  desc: string;
  images: string[]; // 5 imágenes: 1 hero + 4 de grid, mismo tema visual
}

const FEATURES: Feature[] = [
  {
    label: 'Documentos',
    title: 'Toda la documentación, en un solo sitio',
    desc: 'Cada cliente accede únicamente a su propio expediente: contratos, facturas, justificantes y cualquier documentación asociada, todo organizado y con historial de versiones.',
    images: [
      'https://picsum.photos/seed/docs-tema-1/1000/700',
      'https://picsum.photos/seed/docs-tema-2/700/700',
      'https://picsum.photos/seed/docs-tema-3/700/700',
      'https://picsum.photos/seed/docs-tema-4/700/700',
      'https://picsum.photos/seed/docs-tema-5/700/700'
    ]
  },
  {
    label: 'Trámites',
    title: 'El estado del trámite, siempre visible',
    desc: 'Tu cliente ve exactamente en qué fase está su gestión, sin necesidad de llamar ni escribir para preguntar. Menos interrupciones para tu equipo.',
    images: [
      'https://picsum.photos/seed/tramites-tema-1/1000/700',
      'https://picsum.photos/seed/tramites-tema-2/700/700',
      'https://picsum.photos/seed/tramites-tema-3/700/700',
      'https://picsum.photos/seed/tramites-tema-4/700/700',
      'https://picsum.photos/seed/tramites-tema-5/700/700'
    ]
  },
  {
    label: 'Mensajería',
    title: 'Comunicación con historial, no emails sueltos',
    desc: 'Toda la conversación queda vinculada al expediente correspondiente, visible para cualquier miembro del equipo que la necesite consultar.',
    images: [
      'https://picsum.photos/seed/msg-tema-1/1000/700',
      'https://picsum.photos/seed/msg-tema-2/700/700',
      'https://picsum.photos/seed/msg-tema-3/700/700',
      'https://picsum.photos/seed/msg-tema-4/700/700',
      'https://picsum.photos/seed/msg-tema-5/700/700'
    ]
  },
  {
    label: 'Facturación',
    title: 'Facturas y presupuestos accesibles',
    desc: 'Tus clientes consultan y descargan su facturación directamente desde el portal, sin pedirla por correo ni esperar a que se la reenvíen.',
    images: [
      'https://picsum.photos/seed/factura-tema-1/1000/700',
      'https://picsum.photos/seed/factura-tema-2/700/700',
      'https://picsum.photos/seed/factura-tema-3/700/700',
      'https://picsum.photos/seed/factura-tema-4/700/700',
      'https://picsum.photos/seed/factura-tema-5/700/700'
    ]
  },
  {
    label: 'Tu marca',
    title: 'Con tu marca, no la nuestra',
    desc: 'Dominio propio, colores y logo de tu despacho. El portal se siente como una extensión natural de tu negocio, no una herramienta externa.',
    images: [
      'https://picsum.photos/seed/marca-tema-1/1000/700',
      'https://picsum.photos/seed/marca-tema-2/700/700',
      'https://picsum.photos/seed/marca-tema-3/700/700',
      'https://picsum.photos/seed/marca-tema-4/700/700',
      'https://picsum.photos/seed/marca-tema-5/700/700'
    ]
  }
];

export default function WhyUsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = FEATURES[activeIndex];
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();

  return (
    <section
      id="por-que-nosotros"
      className="bento-why-section relative z-10 pt-12 pb-24 md:pt-20 md:pb-40 px-4 md:px-12 overflow-hidden"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <GlobalSpotlight gridRef={gridRef} disableAnimations={isMobile} spotlightRadius={260} glowColor="16, 185, 129" sectionClass="bento-why-section" />

      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* MITAD IZQUIERDA: texto grande + bento que cambia entero */}
        <div>
          <span className="font-mono text-[13px] text-emerald-400/80 mb-4 block">
            {String(activeIndex + 1).padStart(2, '0')} / {String(FEATURES.length).padStart(2, '0')}
          </span>
          <h3 className="text-[36px] md:text-[48px] leading-[1.05] font-medium tracking-[-0.02em] mb-6 transition-all duration-500">
            {active.title}
          </h3>
          <p className="text-white/55 text-[16px] leading-relaxed max-w-lg mb-10 transition-all duration-500">
            {active.desc}
          </p>

          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-3"
            style={{ gridTemplateRows: '220px 200px 200px' }}
          >
            {/* Slot 0: hero, ancho completo */}
            <BentoSlot className="col-span-2" glowColor="16, 185, 129" disableAnimations={isMobile}>
              {FEATURES.map((f, fIdx) => (
                <img
                  key={f.label}
                  src={f.images[0]}
                  alt={f.title}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{ opacity: fIdx === activeIndex ? 1 : 0 }}
                  loading="lazy"
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-3 left-4 text-[13px] font-medium text-emerald-400 pointer-events-none">
                {active.label}
              </span>
            </BentoSlot>

            {/* Slots 1-4: grid 2x2 */}
            {[1, 2, 3, 4].map(slot => (
              <BentoSlot key={slot} glowColor="16, 185, 129" disableAnimations={isMobile}>
                {FEATURES.map((f, fIdx) => (
                  <img
                    key={f.label}
                    src={f.images[slot]}
                    alt={`${f.title} detalle ${slot}`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    style={{ opacity: fIdx === activeIndex ? 1 : 0 }}
                    loading="lazy"
                  />
                ))}
              </BentoSlot>
            ))}
          </div>
        </div>

        {/* MITAD DERECHA: rueda, ocupando todo el espacio disponible */}
        <div className="hidden md:block h-[660px] relative">
          <OptionWheel
            items={FEATURES.map(f => f.label)}
            defaultSelected={0}
            onChange={index => setActiveIndex(index)}
            textColor="#4a4a4a"
            activeColor="#10B981"
            side="right"
            fontSize={3.5}
            spacing={1.5}
            curve={1}
            tilt={9}
            blur={6}
            fade={0.5}
            minOpacity={0.15}
            smoothing={180}
            inset={20}
            loop={true}
            draggable
          />
        </div>

        {/* Selector simple para móvil */}
        <div className="flex md:hidden gap-2 flex-wrap">
          {FEATURES.map((f, idx) => (
            <button
              key={f.label}
              onClick={() => setActiveIndex(idx)}
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300 ${
                idx === activeIndex
                  ? 'bg-emerald-500 text-[#04140F]'
                  : 'bg-white/5 text-white/60 ring-1 ring-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .bento-card {
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          --glow-radius: 220px;
        }
        .bento-card::after {
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

// Una celda del bento: todas las imágenes de todos los features montadas y superpuestas,
// solo cambia qué opacidad tiene cada una según activeIndex — así el crossfade es instantáneo
// y sincronizado entre las 5 celdas sin esperar a que carguen imágenes nuevas.
function BentoSlot({
  children,
  className = '',
  glowColor,
  disableAnimations
}: {
  children: React.ReactNode;
  className?: string;
  glowColor: string;
  disableAnimations: boolean;
}) {
  return (
    <ParticleCard
      className={`bento-card relative rounded-[1.5rem] overflow-hidden border border-white/8 ${className}`}
      disableAnimations={disableAnimations}
      particleCount={6}
      glowColor={glowColor}
      clickEffect={false}
      enableMagnetism={false}
    >
      {children}
    </ParticleCard>
  );
}
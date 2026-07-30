'use client';

import { useRef, useState, useLayoutEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LineSidebar from './LineSidebar';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { label: 'Consulta inicial', desc: 'Analizamos el volumen de clientes, tipos de expediente y flujos actuales de tu despacho o gestoría para definir el alcance del portal.' },
  { label: 'Diseño del portal', desc: 'Diseñamos la experiencia con tu marca: colores, logo y estructura de secciones adaptadas a cómo trabajas con tus clientes.' },
  { label: 'Migración de datos', desc: 'Importamos documentación y expedientes existentes de forma segura, sin interrumpir la operativa diaria del despacho.' },
  { label: 'Puesta en marcha', desc: 'Publicamos el portal en tu propio dominio y damos acceso a tu equipo y a tus primeros clientes con onboarding guiado.' },
  { label: 'Soporte continuo', desc: 'Mantenimiento, mejoras y soporte directo conmigo. El portal evoluciona contigo, no se queda estático el primer día.' }
];

export default function ProcesoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const stRef = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const getScrollAmount = () => -(track.scrollWidth - viewport.clientWidth);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth - viewport.clientWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: self => {
            const idx = Math.min(
              STEPS.length - 1,
              Math.round(self.progress * (STEPS.length - 1))
            );
            setActiveIndex(idx);
          },
          onRefresh: self => {
            stRef.current = self;
          }
        }
      });

      stRef.current = tween.scrollTrigger ?? null;

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const handleSidebarClick = useCallback((index: number) => {
    const st = stRef.current;
    if (!st) return;
    const progress = index / (STEPS.length - 1);
    const scrollPos = st.start + progress * (st.end - st.start);
    window.scrollTo({ top: scrollPos, behavior: 'smooth' });
  }, []);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="relative z-10 h-screen overflow-hidden"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="h-full flex flex-col md:flex-row md:items-center px-4 md:px-12 gap-8 md:gap-16 pt-24 md:pt-0">
        <div className="max-w-xl md:hidden">
          <span className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 ring-1 ring-white/10 mb-4">
            Cómo trabajamos
          </span>
          <h2 className="text-[28px] font-medium tracking-[-0.02em]">Un proceso claro, de principio a fin</h2>
        </div>

        {/* Sidebar — visible solo en desktop, donde ocurre el pin */}
        <div className="hidden md:flex md:flex-col shrink-0 max-w-[280px]">
          <span className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 ring-1 ring-white/10 mb-6 w-fit">
            Cómo trabajamos
          </span>
          <h2 className="text-[32px] font-medium tracking-[-0.02em] mb-10">
            Un proceso claro, de principio a fin
          </h2>
          <LineSidebar
            items={STEPS.map(s => s.label)}
            activeIndex={activeIndex}
            accentColor="#10B981"
            textColor="#6b7280"
            markerColor="#2a2a2a"
            showIndex
            showMarker
            proximityRadius={90}
            maxShift={16}
            falloff="smooth"
            markerLength={44}
            tickScale={0.5}
            itemGap={28}
            fontSize={1.15}
            smoothing={120}
            onItemClick={handleSidebarClick}
          />
        </div>

        {/* Viewport horizontal — desktop: pin + track animado por GSAP. Mobile: scroll nativo */}
        <div
          ref={viewportRef}
          className="flex-1 overflow-x-auto md:overflow-hidden snap-x snap-mandatory md:snap-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <div ref={trackRef} className="flex gap-6 w-max md:will-change-transform">
            {STEPS.map((step, idx) => (
              <div
                key={step.label}
                ref={el => {
                  panelRefs.current[idx] = el;
                }}
                className="snap-center shrink-0 w-[85vw] md:w-[420px]"
              >
                <div className="p-1.5 rounded-[2rem] bg-white/[0.03] ring-1 ring-white/10 h-full">
                  <div className="h-full rounded-[calc(2rem-0.375rem)] bg-[#0A0A0A] p-8 md:p-10 flex flex-col justify-between min-h-[320px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                    <span className="font-mono text-[13px] text-emerald-400/80 mb-6">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-[24px] md:text-[26px] font-medium tracking-[-0.01em] mb-3">
                        {step.label}
                      </h3>
                      <p className="text-white/55 text-[15px] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
'use client';

import dynamic from 'next/dynamic';
import CardNav, { CardNavItem } from './components/CardNav';
import CardSwap from './components/CardSwap';
import FolderCard from './components/FolderCard';
import PricingSection from './components/PricingSection';
import ProcesoSection from './components/ProcesoSection';
import WhyUsSection from './components/WhyUsSection';
import ContactStepperForm from './components/ContactStepperForm';
import { FiFileText, FiClock, FiMessageSquare, FiFileMinus, FiLock, FiUsers, FiShield, FiZap, FiCalendar } from 'react-icons/fi';

const Ferrofluid = dynamic(() => import('./components/Ferrofluid'), { ssr: false });

const navItems: CardNavItem[] = [
  {
    label: 'Servicios',
    bgColor: '#0F1B1A',
    textColor: '#fff',
    links: [
      { label: 'Portal del cliente', href: '#servicios', ariaLabel: 'Portal del cliente' },
      { label: 'Gestión documental', href: '#servicios', ariaLabel: 'Gestión documental' },
      { label: 'Vencimientos y recordatorios', href: '#servicios', ariaLabel: 'Vencimientos y recordatorios' },
    ]
  },
  {
    label: 'Por qué nosotros',
    bgColor: '#12211F',
    textColor: '#fff',
    links: [
      { label: 'Cómo trabajamos', href: '#beneficios', ariaLabel: 'Cómo trabajamos' },
      { label: 'Precios', href: '#precios', ariaLabel: 'Precios' },
    ]
  },
  {
    label: 'Contacto',
    bgColor: '#0A1210',
    textColor: '#fff',
    links: [
      { label: 'Agendar una llamada', href: '#contacto', ariaLabel: 'Agendar una llamada' },
      { label: 'Email', href: 'mailto:hola@tudominio.com', ariaLabel: 'Enviar correo' }
    ]
  }
];

export default function LandingPage() {
  return (
<main className="relative min-h-[100dvh] bg-[#0A0A0A] text-white overflow-x-hidden">
      {/* Fondo con mesh gradient sutil */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-60"
      />

      <CardNav
        logo="/logo.svg"
        logoAlt="Logo"
        items={navItems}
        baseColor="rgba(10,14,13,0.75)"
        menuColor="#fff"
        buttonBgColor="#10B981"
        buttonTextColor="#04140F"
      />

      {/* HERO */}
 <section className="relative z-10 min-h-[100dvh] px-4 md:px-12">
        <div className="absolute inset-0 -z-10">
          <Ferrofluid
            colors={['#0EA5E9', '#10B981', '#0F172A']}
            speed={0.35}
            scale={1.4}
            turbulence={0.8}
            fluidity={0.15}
            rimWidth={0.18}
            sharpness={3}
            shimmer={0.8}
            glow={1.6}
            flowDirection="up"
            opacity={0.55}
            mouseInteraction={true}
            mouseStrength={0.8}
            mouseRadius={0.28}
          />
        </div>

        <div className="relative min-h-[100dvh] pt-28 md:pt-0">
          {/* Pila de carpetas — posicionada libremente sobre toda la sección */}
          <div
            className="hidden md:block absolute z-[5]"
            style={{ right: '10%', top: '80%', transform: 'translateY(-50%)' }}
          >
            <CardSwap
              width={440}
              height={290}
              cardDistance={70}
              verticalDistance={60}
              delay={4000}
              pauseOnHover
              skewAmount={4}
              easing="elastic"
            >
              <FolderCard icon={<FiFileText />} title="Documentos" desc="Todo el historial del expediente, con contexto de tu equipo en cada archivo." tabColor="#10B981" />
              <FolderCard icon={<FiClock />} title="Trámites" desc="Estado de cada gestión, visible para el cliente en tiempo real." tabColor="#0EA5E9" />
              <FolderCard icon={<FiCalendar />} title="Vencimientos" desc="Plazos fiscales, legales y laborales, con recordatorio automático." tabColor="#F97316" />
              <FolderCard icon={<FiMessageSquare />} title="Mensajería" desc="Conversación ligada al expediente, sin emails que se pierden." tabColor="#A78BFA" />
              <FolderCard icon={<FiFileMinus />} title="Facturación" desc="Historial de facturas y su estado, sin tener que preguntar." tabColor="#F59E0B" />
            </CardSwap>
          </div>

          {/* Versión móvil: pila normal, dentro del flujo */}
          <div className="md:hidden w-full h-[420px] relative mb-10">
            <CardSwap width={300} height={200} cardDistance={45} verticalDistance={45} delay={4000} pauseOnHover skewAmount={4} easing="elastic">
              <FolderCard icon={<FiFileText />} title="Documentos" desc="Todo el historial del expediente, con contexto de tu equipo en cada archivo." tabColor="#10B981" />
              <FolderCard icon={<FiClock />} title="Trámites" desc="Estado de cada gestión, visible para el cliente en tiempo real." tabColor="#0EA5E9" />
              <FolderCard icon={<FiCalendar />} title="Vencimientos" desc="Plazos fiscales, legales y laborales, con recordatorio automático." tabColor="#F97316" />
              <FolderCard icon={<FiMessageSquare />} title="Mensajería" desc="Conversación ligada al expediente, sin emails que se pierden." tabColor="#A78BFA" />
              <FolderCard icon={<FiFileMinus />} title="Facturación" desc="Historial de facturas y su estado, sin tener que preguntar." tabColor="#F59E0B" />
            </CardSwap>
          </div>

          {/* Texto — con su propio z-index para quedar por encima si se solapa */}
          <div className="relative z-10 w-full md:w-[55%] text-center md:text-left flex flex-col justify-center min-h-[100dvh] md:min-h-0 md:h-[100dvh]">
            <h1 className="text-[38px] leading-[1.05] md:text-[58px] font-medium tracking-[-0.02em] mb-6">
              Que tus clientes vean su expediente,
              <span className="text-emerald-400"> sin preguntar.</span>
            </h1>
            <p className="text-white/60 text-[16px] md:text-[18px] max-w-md mx-auto md:mx-0 mb-10">
              Documentos, trámites, mensajería y vencimientos de cada cliente,
              centralizados en un espacio privado, con tu marca.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
              <a href="/demo" className="group inline-flex items-center gap-3 rounded-full bg-emerald-500 text-[#04140F] pl-6 pr-2 py-2 text-[14px] font-medium ...">
                <span>Probar la demo interactiva</span>
                <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center ...">↗</span>
              </a>
              <a href="#contacto" className="rounded-full px-6 py-3 text-[14px] font-medium ring-1 ring-white/15 hover:bg-white/5 ...">
                Agendar una llamada
              </a>
            </div>
          </div>
        </div>
      </section>

      <ProcesoSection />

      <PricingSection />

      <WhyUsSection />

      <ContactStepperForm />

    <footer className="relative z-10 px-4 pb-12 text-center text-white/30 text-[13px]">
      © {new Date().getFullYear()} Bidente — Portales de cliente para despachos y gestorías
    </footer>
    </main>
  );
}

function BentoCard({
  icon,
  title,
  desc,
  className = '',
  large = false
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
  large?: boolean;
}) {
  return (
    <div className={`p-1.5 rounded-[2rem] bg-white/[0.03] ring-1 ring-white/10 ${className}`}>
      <div
        className={`h-full rounded-[calc(2rem-0.375rem)] bg-[#0A1210] p-6 md:p-8 flex flex-col gap-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 ${
          large ? 'justify-end min-h-[280px] md:min-h-[360px]' : 'min-h-[160px]'
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20 flex items-center justify-center text-emerald-400 text-[18px]">
          {icon}
        </div>
        <div>
          <h3 className={`font-medium tracking-[-0.01em] mb-2 ${large ? 'text-[24px] md:text-[28px]' : 'text-[18px]'}`}>
            {title}
          </h3>
          <p className="text-white/55 text-[14px] leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

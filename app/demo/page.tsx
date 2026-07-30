'use client';

import { useState } from 'react';
import {
  FiFileText, FiClock, FiMessageSquare, FiFileMinus, FiHome, FiUsers,
  FiSend, FiLogOut, FiCheck, FiChevronRight, FiArrowLeft, FiSearch, FiCalendar, FiUserCheck
} from 'react-icons/fi';
import DocumentTimeline, { TimelineDocumento } from '../components/DocumentTimeline';
import DocumentRequests, { SolicitudDocumento } from '../components/DocumentRequests';
import NotificationBell, { Notificacion } from '../components/NotificationBell';
import DeadlinesCalendar, { Vencimiento } from '../components/DeadlinesCalendar';
import TeamAccess, { MiembroEquipo } from '../components/TeamAccess';

type Section = 'cartera' | 'resumen' | 'linea-tiempo' | 'tramites' | 'calendario' | 'equipo' | 'mensajeria' | 'facturacion';
type Rol = 'cliente' | 'despacho';

interface Tramite {
  id: string;
  nombre: string;
  estado: 'Pendiente' | 'En proceso' | 'Listo' | 'Entregado';
}

interface Mensaje {
  id: string;
  autor: 'cliente' | 'despacho';
  texto: string;
  hora: string;
}

interface Factura {
  id: string;
  concepto: string;
  fecha: string;
  importe: string;
  estado: 'Pagada' | 'Pendiente';
}

interface NotificacionDemo extends Notificacion {
  para: Rol;
}

interface ClienteData {
  id: string;
  nombre: string;
  empresa: string;
  iniciales: string;
  timeline: TimelineDocumento[];
  tramites: Tramite[];
  mensajes: Mensaje[];
  facturas: Factura[];
  solicitudes: SolicitudDocumento[];
  vencimientos: Vencimiento[];
  usuarios: MiembroEquipo[];
}

const CLIENTES_INICIALES: ClienteData[] = [
  {
    id: 'juan',
    nombre: 'Juan Carrasco',
    empresa: 'Autónomo — Consultoría',
    iniciales: 'JC',
    timeline: [
      { id: 'tl1', nombre: 'Declaración trimestral Q2', descripcion: 'Ya presentada ante la AEAT. Guarda este justificante, no requiere ninguna acción.', fecha: '14 jul 2026', fechaGrupo: 'Julio 2026', tipo: 'PDF', tamano: '340 KB', autor: 'María González' },
      { id: 'tl2', nombre: 'Nómina junio', descripcion: 'Nómina calculada con la subida salarial acordada en mayo.', fecha: '30 jun 2026', fechaGrupo: 'Junio 2026', tipo: 'PDF', tamano: '120 KB', autor: 'María González' },
      { id: 'tl3', nombre: 'Certificado de estar al corriente', descripcion: 'Solicitado para la renovación de la licencia. Válido 3 meses.', fecha: '18 jun 2026', fechaGrupo: 'Junio 2026', tipo: 'PDF', tamano: '95 KB', autor: 'María González' },
      { id: 'tl4', nombre: 'Contrato de arrendamiento', descripcion: 'Contrato del nuevo local, revisado y sin observaciones legales.', fecha: '02 may 2026', fechaGrupo: 'Mayo 2026', tipo: 'PDF', tamano: '890 KB', autor: 'María González' },
      { id: 'tl5', nombre: 'Escritura de constitución', descripcion: 'Documento fundacional, siempre accesible aunque no cambie.', fecha: '18 ene 2025', fechaGrupo: 'Enero 2025', tipo: 'PDF', tamano: '1.2 MB', autor: 'María González' }
    ],
    tramites: [
      { id: 't1', nombre: 'Declaración trimestral Q2', estado: 'En proceso' },
      { id: 't2', nombre: 'Alta de nuevo empleado', estado: 'Pendiente' },
      { id: 't3', nombre: 'Renovación de licencia', estado: 'Listo' },
      { id: 't4', nombre: 'Cierre contable 2025', estado: 'Entregado' }
    ],
    mensajes: [
      { id: 'm1', autor: 'despacho', texto: 'Buenos días, ya tenemos lista tu declaración trimestral.', hora: '09:14' },
      { id: 'm2', autor: 'cliente', texto: 'Perfecto, gracias. ¿Necesitáis algo más de mi parte?', hora: '09:20' },
      { id: 'm3', autor: 'despacho', texto: 'Por ahora no, en cuanto la revises nos confirmas.', hora: '09:22' }
    ],
    facturas: [
      { id: 'f1', concepto: 'Gestión trimestral Q2 2026', fecha: '01 jul 2026', importe: '180,00 €', estado: 'Pendiente' },
      { id: 'f2', concepto: 'Gestión trimestral Q1 2026', fecha: '01 abr 2026', importe: '180,00 €', estado: 'Pagada' },
      { id: 'f3', concepto: 'Alta de empleado', fecha: '15 mar 2026', importe: '45,00 €', estado: 'Pagada' },
      { id: 'f4', concepto: 'Gestión anual 2025', fecha: '10 ene 2026', importe: '620,00 €', estado: 'Pagada' }
    ],
    solicitudes: [
      { id: 's1', nombre: 'DNI actualizado', nota: 'El que tenemos caducó el mes pasado — lo necesitamos para renovar tu alta.', fecha: '20 jul 2026', estado: 'Pendiente' },
      { id: 's2', nombre: 'Justificante de domicilio', nota: 'Para actualizar la dirección fiscal antes del cierre trimestral.', fecha: '15 jul 2026', estado: 'Recibido' }
    ],
    vencimientos: [
      { id: 'v-j1', nombre: 'Presentación IVA Q3', fechaISO: '2026-10-20', fechaLabel: '20 oct 2026', tipo: 'fiscal' },
      { id: 'v-j2', nombre: 'Renovación de licencia municipal', fechaISO: '2026-11-15', fechaLabel: '15 nov 2026', tipo: 'legal' },
      { id: 'v-j3', nombre: 'Pago Seguridad Social', fechaISO: '2026-08-31', fechaLabel: '31 ago 2026', tipo: 'laboral' }
    ],
    usuarios: [
      { id: 'u-j1', nombre: 'Juan Carrasco', email: 'juan@consultoriajc.com', rol: 'Admin', acceso: 'Completo' }
    ]
  },
  {
    id: 'laura',
    nombre: 'Laura Martín',
    empresa: 'Comercio Martín S.L.',
    iniciales: 'LM',
    timeline: [
      { id: 'tl-l1', nombre: 'Balance trimestral Q2', descripcion: 'Balance revisado, sin incidencias. Presentado en plazo.', fecha: '10 jul 2026', fechaGrupo: 'Julio 2026', tipo: 'PDF', tamano: '210 KB', autor: 'María González' },
      { id: 'tl-l2', nombre: 'Alta de local comercial', descripcion: 'Documentación completa del nuevo punto de venta en el centro.', fecha: '22 jun 2026', fechaGrupo: 'Junio 2026', tipo: 'PDF', tamano: '540 KB', autor: 'María González' }
    ],
    tramites: [
      { id: 't-l1', nombre: 'Alta de local comercial', estado: 'Listo' },
      { id: 't-l2', nombre: 'Declaración trimestral Q2', estado: 'Pendiente' }
    ],
    mensajes: [
      { id: 'm-l1', autor: 'cliente', texto: '¿Ya está lista la documentación del nuevo local?', hora: 'ayer' },
      { id: 'm-l2', autor: 'despacho', texto: 'Sí, ya está aprobada. Te la subo hoy mismo.', hora: 'ayer' }
    ],
    facturas: [
      { id: 'f-l1', concepto: 'Alta de local comercial', fecha: '22 jun 2026', importe: '95,00 €', estado: 'Pendiente' },
      { id: 'f-l2', concepto: 'Gestión trimestral Q1 2026', fecha: '01 abr 2026', importe: '210,00 €', estado: 'Pagada' }
    ],
    solicitudes: [
      { id: 's-l1', nombre: 'Contrato de alquiler del local', nota: 'Necesario para completar el alta ante Hacienda.', fecha: '18 jul 2026', estado: 'Pendiente' }
    ],
    vencimientos: [
      { id: 'v-l1', nombre: 'Declaración trimestral Q3', fechaISO: '2026-10-20', fechaLabel: '20 oct 2026', tipo: 'fiscal' },
      { id: 'v-l2', nombre: 'Licencia de apertura del local', fechaISO: '2026-08-10', fechaLabel: '10 ago 2026', tipo: 'legal' }
    ],
    usuarios: [
      { id: 'u-l1', nombre: 'Laura Martín', email: 'laura@comerciomartin.com', rol: 'Admin', acceso: 'Completo' },
      { id: 'u-l2', nombre: 'Pedro Ibáñez', email: 'pedro@comerciomartin.com', rol: 'Miembro', acceso: 'Solo lectura' }
    ]
  },
  {
    id: 'roberto',
    nombre: 'Roberto Sáez',
    empresa: 'Sáez Construcciones S.L.',
    iniciales: 'RS',
    timeline: [
      { id: 'tl-r1', nombre: 'Certificado de obra', descripcion: 'Certificado final de la obra en calle Mayor, listo para presentar.', fecha: '05 jul 2026', fechaGrupo: 'Julio 2026', tipo: 'PDF', tamano: '780 KB', autor: 'María González' },
      { id: 'tl-r2', nombre: 'Nóminas equipo — junio', descripcion: 'Nóminas de los 6 empleados del equipo, ya procesadas.', fecha: '30 jun 2026', fechaGrupo: 'Junio 2026', tipo: 'PDF', tamano: '410 KB', autor: 'María González' }
    ],
    tramites: [
      { id: 't-r1', nombre: 'Certificado de obra', estado: 'Entregado' },
      { id: 't-r2', nombre: 'Renovación seguro de responsabilidad', estado: 'En proceso' }
    ],
    mensajes: [
      { id: 'm-r1', autor: 'despacho', texto: 'El certificado de obra ya está presentado, todo en orden.', hora: 'hace 2 días' }
    ],
    facturas: [
      { id: 'f-r1', concepto: 'Gestión de nóminas — junio', fecha: '30 jun 2026', importe: '150,00 €', estado: 'Pagada' },
      { id: 'f-r2', concepto: 'Certificado de obra', fecha: '05 jul 2026', importe: '110,00 €', estado: 'Pendiente' }
    ],
    solicitudes: [],
    vencimientos: [
      { id: 'v-r1', nombre: 'Renovación seguro de responsabilidad civil', fechaISO: '2026-09-05', fechaLabel: '05 sep 2026', tipo: 'legal' },
      { id: 'v-r2', nombre: 'Nóminas equipo — julio', fechaISO: '2026-07-31', fechaLabel: '31 jul 2026', tipo: 'laboral' }
    ],
    usuarios: [
      { id: 'u-r1', nombre: 'Roberto Sáez', email: 'roberto@saezconstrucciones.com', rol: 'Admin', acceso: 'Completo' }
    ]
  }
];

const NOTIFICACIONES_INICIALES: NotificacionDemo[] = [
  { id: 'n1', para: 'cliente', tipo: 'documento', texto: 'María González subió "Declaración trimestral Q2" a tu expediente.', hora: 'hace 2 días', leida: false },
  { id: 'n2', para: 'cliente', tipo: 'tramite', texto: 'El trámite "Renovación de licencia" cambió a Listo.', hora: 'hace 3 días', leida: false },
  { id: 'n3', para: 'despacho', tipo: 'factura', texto: 'La factura de Juan Carrasco sigue pendiente de pago.', hora: 'hace 1 día', leida: false },
  { id: 'n4', para: 'despacho', tipo: 'mensaje', texto: 'Laura Martín preguntó por el local comercial.', hora: 'ayer', leida: false }
];

const ESTADOS: Tramite['estado'][] = ['Pendiente', 'En proceso', 'Listo', 'Entregado'];
const ESTADO_COLOR: Record<Tramite['estado'], string> = {
  Pendiente: 'text-white/50 ring-white/15',
  'En proceso': 'text-sky-400 ring-sky-500/30',
  Listo: 'text-emerald-400 ring-emerald-500/30',
  Entregado: 'text-emerald-400 ring-emerald-500/30 bg-emerald-500/10'
};

const NAV: { key: Section; label: string; icon: React.ReactNode; soloDespacho?: boolean }[] = [
  { key: 'cartera', label: 'Clientes', icon: <FiUsers />, soloDespacho: true },
  { key: 'resumen', label: 'Resumen', icon: <FiHome /> },
  { key: 'linea-tiempo', label: 'Documentos', icon: <FiFileText /> },
  { key: 'tramites', label: 'Trámites', icon: <FiClock /> },
  { key: 'calendario', label: 'Vencimientos', icon: <FiCalendar /> },
  { key: 'equipo', label: 'Equipo', icon: <FiUserCheck /> },
  { key: 'mensajeria', label: 'Mensajería', icon: <FiMessageSquare /> },
  { key: 'facturacion', label: 'Facturación', icon: <FiFileMinus /> }
];

const TITULO_SECCION: Record<Section, string> = {
  cartera: 'Clientes',
  resumen: 'Resumen',
  'linea-tiempo': 'Documentos',
  tramites: 'Trámites',
  calendario: 'Vencimientos',
  equipo: 'Equipo',
  mensajeria: 'Mensajería',
  facturacion: 'Facturación'
};

export default function DemoPortal() {
  const [rol, setRol] = useState<Rol>('despacho');
  const [section, setSection] = useState<Section>('cartera');
  const [clienteActivoId, setClienteActivoId] = useState<string | null>(null);
  const [clientes, setClientes] = useState<ClienteData[]>(CLIENTES_INICIALES);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [notificaciones, setNotificaciones] = useState<NotificacionDemo[]>(NOTIFICACIONES_INICIALES);

  const clienteActivo = clientes.find(c => c.id === clienteActivoId) ?? null;

  const cambiarRol = (nuevoRol: Rol) => {
    setRol(nuevoRol);
    if (nuevoRol === 'cliente') {
      setClienteActivoId('juan');
      setSection('resumen');
    } else {
      setClienteActivoId(null);
      setSection('cartera');
    }
  };

  const entrarACliente = (id: string) => {
    setClienteActivoId(id);
    setSection('resumen');
  };

  const actualizarCliente = (id: string, updater: (c: ClienteData) => ClienteData) => {
    setClientes(prev => prev.map(c => (c.id === id ? updater(c) : c)));
  };

  const notificar = (para: Rol, tipo: NotificacionDemo['tipo'], texto: string) => {
    setNotificaciones(prev => [
      { id: `n${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, para, tipo, texto, hora: 'ahora', leida: false },
      ...prev
    ]);
  };

  const avanzarEstado = (tramiteId: string) => {
    if (!clienteActivo) return;
    const tramite = clienteActivo.tramites.find(t => t.id === tramiteId);
    if (!tramite) return;
    const next = ESTADOS[(ESTADOS.indexOf(tramite.estado) + 1) % ESTADOS.length];
    actualizarCliente(clienteActivo.id, c => ({
      ...c,
      tramites: c.tramites.map(t => (t.id === tramiteId ? { ...t, estado: next } : t))
    }));
    notificar('cliente', 'tramite', `El trámite "${tramite.nombre}" cambió a ${next}.`);
  };

  const simularSubida = () => {
    if (!clienteActivo) return;
    const nombres = ['Justificante de gasto', 'Recibo de suministro', 'Contrato firmado', 'Certificado bancario'];
    const nombre = nombres[Math.floor(Math.random() * nombres.length)];
    const nuevo: TimelineDocumento = {
      id: `tl${Date.now()}`,
      nombre,
      descripcion: 'Documento subido por el equipo del despacho. Añade aquí el contexto para el cliente.',
      fecha: 'Hoy',
      fechaGrupo: 'Hoy',
      tipo: 'PDF',
      tamano: `${Math.floor(80 + Math.random() * 900)} KB`,
      autor: 'María González'
    };
    actualizarCliente(clienteActivo.id, c => ({ ...c, timeline: [nuevo, ...c.timeline] }));
    notificar('cliente', 'documento', `María González subió "${nombre}" a tu expediente.`);
  };

  const simularDescarga = (id: string) => {
    const doc = clienteActivo?.timeline.find(d => d.id === id);
    if (doc) console.log('Descargando:', doc.nombre);
  };

  const enviarMensaje = () => {
    if (!nuevoMensaje.trim() || !clienteActivo) return;
    const autor: Rol = rol;
    const destinatario: Rol = rol === 'despacho' ? 'cliente' : 'despacho';
    const nombreAutor = rol === 'despacho' ? 'María González' : clienteActivo.nombre;
    const nombreDestinatario = rol === 'despacho' ? clienteActivo.nombre : 'María González';

    actualizarCliente(clienteActivo.id, c => ({
      ...c,
      mensajes: [...c.mensajes, { id: `m${Date.now()}`, autor, texto: nuevoMensaje.trim(), hora: 'ahora' }]
    }));
    notificar(destinatario, 'mensaje', `${nombreAutor} te ha escrito un mensaje.`);
    setNuevoMensaje('');

    setTimeout(() => {
      const texto = rol === 'despacho' ? 'Recibido, muchas gracias por la actualización.' : 'Recibido, le echamos un vistazo y te contestamos en breve.';
      actualizarCliente(clienteActivo.id, c => ({
        ...c,
        mensajes: [...c.mensajes, { id: `m${Date.now() + 1}`, autor: destinatario, texto, hora: 'ahora' }]
      }));
      notificar(autor, 'mensaje', `${nombreDestinatario} te ha respondido.`);
    }, 1200);
  };

  const invitarMiembro = (nombre: string, email: string, acceso: MiembroEquipo['acceso']) => {
    if (!clienteActivo) return;
    const nuevo: MiembroEquipo = { id: `u${Date.now()}`, nombre, email, rol: 'Miembro', acceso };
    actualizarCliente(clienteActivo.id, c => ({ ...c, usuarios: [...c.usuarios, nuevo] }));
    notificar('despacho', 'mensaje', `${clienteActivo.nombre} invitó a ${nombre} a su portal.`);
  };

  const eliminarMiembro = (id: string) => {
    if (!clienteActivo) return;
    actualizarCliente(clienteActivo.id, c => ({ ...c, usuarios: c.usuarios.filter(u => u.id !== id) }));
  };

  const crearVencimiento = (nombre: string, fechaISO: string, tipo: Vencimiento['tipo']) => {
    if (!clienteActivo) return;
    const fechaLabel = new Date(fechaISO + 'T00:00:00').toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    const nuevo: Vencimiento = { id: `v${Date.now()}`, nombre, fechaISO, fechaLabel, tipo };
    actualizarCliente(clienteActivo.id, c => ({ ...c, vencimientos: [...c.vencimientos, nuevo] }));
    notificar('cliente', 'tramite', `Nuevo vencimiento añadido: "${nombre}" (${fechaLabel}).`);
  };

  const crearSolicitud = (nombre: string, nota: string) => {
    if (!clienteActivo) return;
    const nueva: SolicitudDocumento = { id: `s${Date.now()}`, nombre, nota, fecha: 'Hoy', estado: 'Pendiente' };
    actualizarCliente(clienteActivo.id, c => ({ ...c, solicitudes: [nueva, ...c.solicitudes] }));
    notificar('cliente', 'documento', `María González te ha solicitado: "${nombre}".`);
  };

  const cumplirSolicitud = (id: string) => {
    if (!clienteActivo) return;
    const solicitud = clienteActivo.solicitudes.find(s => s.id === id);
    if (!solicitud) return;

    const nuevoDoc: TimelineDocumento = {
      id: `tl${Date.now()}`,
      nombre: solicitud.nombre,
      descripcion: 'Documento subido por el cliente en respuesta a una solicitud del despacho.',
      fecha: 'Hoy',
      fechaGrupo: 'Hoy',
      tipo: 'PDF',
      tamano: `${Math.floor(80 + Math.random() * 900)} KB`,
      autor: clienteActivo.nombre
    };

    actualizarCliente(clienteActivo.id, c => ({
      ...c,
      solicitudes: c.solicitudes.map(s => (s.id === id ? { ...s, estado: 'Recibido' } : s)),
      timeline: [nuevoDoc, ...c.timeline]
    }));
    notificar('despacho', 'documento', `${clienteActivo.nombre} subió "${solicitud.nombre}" que habías solicitado.`);
  };

  const marcarNotificacionLeida = (id: string) => setNotificaciones(prev => prev.map(n => (n.id === id ? { ...n, leida: true } : n)));
  const marcarTodasLeidas = () => setNotificaciones(prev => prev.map(n => (n.para === rol ? { ...n, leida: true } : n)));

  const notificacionesDelRol = notificaciones.filter(n => n.para === rol);
  const clientesFiltrados = clientes.filter(
    c => c.nombre.toLowerCase().includes(busqueda.toLowerCase()) || c.empresa.toLowerCase().includes(busqueda.toLowerCase())
  );

  const vencimientosUrgentesGlobal =
    clienteActivo?.vencimientos.filter(v => {
      const dias = Math.round((new Date(v.fechaISO + 'T00:00:00').getTime() - new Date().setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24));
      return dias >= 0 && dias <= 30;
    }).length ?? 0;
  const pendientesGlobal = clienteActivo?.tramites.filter(t => t.estado !== 'Entregado').length ?? 0;
  const facturasPendientesGlobal = clienteActivo?.facturas.filter(f => f.estado === 'Pendiente').length ?? 0;

  return (
    <div className="h-screen flex overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
      <aside className="w-[240px] shrink-0 border-r border-white/10 flex flex-col p-5 h-full overflow-y-auto">
        <div className="flex items-center gap-2 mb-1 px-2">
          <div className="w-7 h-7 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30 flex items-center justify-center text-emerald-400 text-[13px] font-medium">
            N
          </div>
          <span className="font-medium text-[15px]">Nombre</span>
        </div>
        <span className="text-[11px] text-white/35 px-2 mb-5">Portal de cliente — demo</span>

        <div className="mb-8 px-2">
          <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 block mb-2">Estás viendo como</span>
          <div className="relative flex bg-white/[0.04] rounded-full p-1 ring-1 ring-white/10">
            <div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-emerald-500 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{ left: rol === 'despacho' ? '4px' : 'calc(50% + 0px)' }}
            />
            <button
              onClick={() => cambiarRol('despacho')}
              className={`relative z-10 flex-1 text-[12px] font-medium py-1.5 rounded-full transition-colors duration-300 ${
                rol === 'despacho' ? 'text-[#04140F]' : 'text-white/50 hover:text-white/80'
              }`}
            >
              Despacho
            </button>
            <button
              onClick={() => cambiarRol('cliente')}
              className={`relative z-10 flex-1 text-[12px] font-medium py-1.5 rounded-full transition-colors duration-300 ${
                rol === 'cliente' ? 'text-[#04140F]' : 'text-white/50 hover:text-white/80'
              }`}
            >
              Cliente final
            </button>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV.filter(item => rol === 'despacho' || !item.soloDespacho).map(item => {
            const bloqueado = rol === 'despacho' && item.key !== 'cartera' && !clienteActivo;
            return (
              <button
                key={item.key}
                onClick={() => !bloqueado && setSection(item.key)}
                disabled={bloqueado}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] transition-all duration-300 ${
                  bloqueado
                    ? 'text-white/20 cursor-not-allowed'
                    : section === item.key
                    ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20'
                    : 'text-white/55 hover:bg-white/[0.04] hover:text-white/80'
                }`}
              >
                <span className="text-[15px]">{item.icon}</span>
                {item.label}
                {item.key === 'tramites' && pendientesGlobal > 0 && (
                  <span className="ml-auto text-[10px] font-mono bg-white/10 rounded-full px-1.5 py-0.5">{pendientesGlobal}</span>
                )}
                {item.key === 'calendario' && vencimientosUrgentesGlobal > 0 && (
                  <span className="ml-auto text-[10px] font-mono bg-red-500/15 text-red-400 rounded-full px-1.5 py-0.5">
                    {vencimientosUrgentesGlobal}
                  </span>
                )}
                {item.key === 'facturacion' && facturasPendientesGlobal > 0 && (
                  <span className="ml-auto text-[10px] font-mono bg-amber-500/15 text-amber-400 rounded-full px-1.5 py-0.5">
                    {facturasPendientesGlobal}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {rol === 'despacho' && clienteActivo && (
          <div className="mt-6 mx-2 p-3 rounded-xl bg-white/[0.03] ring-1 ring-white/10">
            <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 block mb-2">Viendo expediente de</span>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[11px] font-medium shrink-0">
                {clienteActivo.iniciales}
              </div>
              <div className="min-w-0 leading-tight">
                <div className="text-[12.5px] font-medium truncate">{clienteActivo.nombre}</div>
                <div className="text-[10.5px] text-white/40 truncate">{clienteActivo.empresa}</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[13px] font-medium">
              {rol === 'despacho' ? 'MG' : clienteActivo?.iniciales ?? 'JC'}
            </div>
            <div className="leading-tight">
              <div className="text-[13px] font-medium">{rol === 'despacho' ? 'María González' : clienteActivo?.nombre}</div>
              <div className="text-[11px] text-white/40">
                {rol === 'despacho' ? 'Gestoría Ejemplo S.L. · Staff' : `Cliente de Gestoría Ejemplo S.L.`}
              </div>
            </div>
          </div>
          <a href="/" className="flex items-center gap-2 px-3 py-2 text-[13px] text-white/40 hover:text-white/70 transition-colors">
            <FiLogOut /> Salir de la demo
          </a>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full min-w-0">
        <header className="shrink-0 flex items-center justify-between px-8 md:px-12 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            {rol === 'despacho' && section !== 'cartera' && (
              <button
                onClick={() => setSection('cartera')}
                className="flex items-center gap-1.5 text-[13px] text-white/40 hover:text-white/70 transition-colors"
              >
                <FiArrowLeft size={14} /> Clientes
              </button>
            )}
            <span className="text-[13px] text-white/40">
              {rol === 'despacho' && section !== 'cartera' && clienteActivo ? `${clienteActivo.nombre} — ${TITULO_SECCION[section]}` : TITULO_SECCION[section]}
            </span>
          </div>
          <NotificationBell notificaciones={notificacionesDelRol} onMarcarLeida={marcarNotificacionLeida} onMarcarTodasLeidas={marcarTodasLeidas} />
        </header>

        <main className="flex-1 overflow-y-auto text-white p-8 md:p-12">
          {section === 'cartera' && (
            <CarteraView clientes={clientesFiltrados} busqueda={busqueda} onBuscar={setBusqueda} onSeleccionar={entrarACliente} />
          )}

          {section === 'resumen' && clienteActivo && (
            <ResumenView cliente={clienteActivo} onIrA={setSection} rol={rol} />
          )}

          {section === 'equipo' && clienteActivo && (
            <>
              <SectionHeader eyebrow="Acceso" title="Equipo" />
              <p className="text-white/45 text-[13.5px] mb-6 -mt-4 max-w-lg">
                Quién de tu empresa tiene acceso al portal, y con qué nivel de permisos.
              </p>
              <TeamAccess
                miembros={clienteActivo.usuarios}
                puedeGestionar={rol === 'cliente'}
                onInvitar={invitarMiembro}
                onEliminar={eliminarMiembro}
              />
            </>
          )}

          {section === 'linea-tiempo' && clienteActivo && (
            <>
              <SectionHeader eyebrow="Expediente" title="Documentos" />
              <p className="text-white/45 text-[13.5px] mb-8 -mt-4 max-w-lg">
                Todo lo que hemos ido subiendo al expediente, con una breve nota de contexto. Descargable en cualquier momento.
              </p>
              <DocumentRequests
                solicitudes={clienteActivo.solicitudes}
                puedeCrear={rol === 'despacho'}
                puedeCumplir={rol === 'cliente'}
                onCrear={crearSolicitud}
                onCumplir={cumplirSolicitud}
              />
              <DocumentTimeline documentos={clienteActivo.timeline} onDescargar={simularDescarga} onSubir={rol === 'despacho' ? simularSubida : undefined} />
            </>
          )}

          {section === 'tramites' && clienteActivo && (
            <TramitesView tramites={clienteActivo.tramites} onAvanzar={rol === 'despacho' ? avanzarEstado : undefined} />
          )}

          {section === 'calendario' && clienteActivo && (
            <>
              <SectionHeader eyebrow="Plazos" title="Vencimientos" />
              <p className="text-white/45 text-[13.5px] mb-6 -mt-4">
                Fechas clave del expediente, ordenadas por proximidad.
              </p>
              <DeadlinesCalendar
                vencimientos={clienteActivo.vencimientos}
                puedeCrear={rol === 'despacho'}
                onCrear={crearVencimiento}
              />
            </>
          )}

          {section === 'mensajeria' && clienteActivo && (
            <MensajeriaView mensajes={clienteActivo.mensajes} valor={nuevoMensaje} onChange={setNuevoMensaje} onEnviar={enviarMensaje} rol={rol} />
          )}

          {section === 'facturacion' && clienteActivo && <FacturacionView facturas={clienteActivo.facturas} />}
        </main>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <span className="inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 ring-1 ring-white/10 mb-3">
        {eyebrow}
      </span>
      <h1 className="text-[28px] md:text-[34px] font-medium tracking-[-0.02em]">{title}</h1>
    </div>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-1.5 rounded-[1.5rem] bg-white/[0.03] ring-1 ring-white/10 ${className}`}>
      <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-[#0F1512] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">{children}</div>
    </div>
  );
}

function CarteraView({
  clientes,
  busqueda,
  onBuscar,
  onSeleccionar
}: {
  clientes: ClienteData[];
  busqueda: string;
  onBuscar: (v: string) => void;
  onSeleccionar: (id: string) => void;
}) {
  return (
    <>
      <SectionHeader eyebrow="Cartera" title="Tus clientes" />
      <div className="relative max-w-sm mb-8 -mt-4">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={15} />
        <input
          value={busqueda}
          onChange={e => onBuscar(e.target.value)}
          placeholder="Buscar cliente o empresa..."
          className="w-full rounded-full bg-white/[0.04] ring-1 ring-white/10 pl-11 pr-4 py-2.5 text-[14px] outline-none focus:ring-emerald-500/40 transition-all"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {clientes.map(c => {
          const pendientes = c.tramites.filter(t => t.estado !== 'Entregado').length;
          const facturaPend = c.facturas.filter(f => f.estado === 'Pendiente').length;
          const solicitudPend = c.solicitudes.filter(s => s.estado === 'Pendiente').length;
          return (
            <button key={c.id} onClick={() => onSeleccionar(c.id)} className="text-left">
              <Card className="hover:ring-emerald-500/30 transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[13px] font-medium shrink-0">
                      {c.iniciales}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[15px] font-medium truncate">{c.nombre}</div>
                      <div className="text-[12.5px] text-white/40 truncate">{c.empresa}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pendientes > 0 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full ring-1 ring-sky-500/30 text-sky-400">
                        {pendientes} trámite{pendientes > 1 ? 's' : ''} activo{pendientes > 1 ? 's' : ''}
                      </span>
                    )}
                    {facturaPend > 0 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full ring-1 ring-amber-500/30 text-amber-400">
                        Factura pendiente
                      </span>
                    )}
                    {solicitudPend > 0 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full ring-1 ring-emerald-500/30 text-emerald-400">
                        Doc. solicitado
                      </span>
                    )}
                    {pendientes === 0 && facturaPend === 0 && solicitudPend === 0 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full ring-1 ring-white/10 text-white/40">Al día</span>
                    )}
                  </div>
                </div>
              </Card>
            </button>
          );
        })}
        {clientes.length === 0 && <p className="text-white/35 text-[13.5px]">No se encontró ningún cliente con ese nombre.</p>}
      </div>
    </>
  );
}

function ResumenView({ cliente, onIrA, rol }: { cliente: ClienteData; onIrA: (s: Section) => void; rol: Rol }) {
  const pendiente = cliente.facturas.find(f => f.estado === 'Pendiente');
  const titulo = rol === 'despacho' ? `Expediente de ${cliente.nombre}` : `Hola ${cliente.nombre.split(' ')[0]}, esto es lo último`;
  return (
    <>
      <SectionHeader eyebrow="Resumen" title={titulo} />
      <div className="grid md:grid-cols-3 gap-5 mb-10">
        <Card>
          <div className="p-6">
            <span className="text-[13px] text-white/50">Trámites activos</span>
            <div className="text-[32px] font-medium mt-1">{cliente.tramites.filter(t => t.estado !== 'Entregado').length}</div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <span className="text-[13px] text-white/50">Documentos totales</span>
            <div className="text-[32px] font-medium mt-1">{cliente.timeline.length}</div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <span className="text-[13px] text-white/50">Facturación pendiente</span>
            <div className="text-[32px] font-medium mt-1 text-amber-400">{pendiente?.importe ?? '0,00 €'}</div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-medium">Últimos trámites</h3>
              <button onClick={() => onIrA('tramites')} className="text-[13px] text-emerald-400 flex items-center gap-1 hover:gap-1.5 transition-all">
                Ver todos <FiChevronRight size={14} />
              </button>
            </div>
            <div className="flex flex-col divide-y divide-white/5">
              {cliente.tramites.slice(0, 3).map(t => (
                <div key={t.id} className="flex items-center justify-between py-2.5 text-[14px]">
                  <span className="text-white/75">{t.nombre}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full ring-1 ${ESTADO_COLOR[t.estado]}`}>{t.estado}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-medium">Documentos recientes</h3>
              <button onClick={() => onIrA('linea-tiempo')} className="text-[13px] text-emerald-400 flex items-center gap-1 hover:gap-1.5 transition-all">
                Ver todos <FiChevronRight size={14} />
              </button>
            </div>
            <div className="flex flex-col divide-y divide-white/5">
              {cliente.timeline.slice(0, 3).map(d => (
                <div key={d.id} className="flex items-center justify-between py-2.5 text-[14px]">
                  <span className="text-white/75 truncate">{d.nombre}</span>
                  <span className="text-[12px] text-white/35 shrink-0 ml-3">{d.fecha}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

function TramitesView({ tramites, onAvanzar }: { tramites: Tramite[]; onAvanzar?: (id: string) => void }) {
  return (
    <>
      <SectionHeader eyebrow="Seguimiento" title="Trámites" />
      <p className="text-white/45 text-[13.5px] mb-6 -mt-4">
        {onAvanzar ? 'Toca el estado de un trámite para actualizarlo.' : 'Aquí ves el estado de cada trámite en tiempo real.'}
      </p>
      <Card>
        <div className="divide-y divide-white/5">
          {tramites.map(t => (
            <div key={t.id} className="flex items-center justify-between px-6 py-5">
              <span className="text-[14.5px] text-white/85">{t.nombre}</span>
              {onAvanzar ? (
                <button
                  onClick={() => onAvanzar(t.id)}
                  className={`font-mono text-[12.5px] px-4 py-1.5 rounded-full ring-1 transition-all duration-300 ${ESTADO_COLOR[t.estado]}`}
                >
                  {t.estado}
                </button>
              ) : (
                <span className={`font-mono text-[12.5px] px-4 py-1.5 rounded-full ring-1 ${ESTADO_COLOR[t.estado]}`}>{t.estado}</span>
              )}
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function MensajeriaView({
  mensajes,
  valor,
  onChange,
  onEnviar,
  rol
}: {
  mensajes: Mensaje[];
  valor: string;
  onChange: (v: string) => void;
  onEnviar: () => void;
  rol: Rol;
}) {
  return (
    <>
      <SectionHeader eyebrow="Conversación" title="Mensajería" />
      <Card className="max-w-2xl">
        <div className="flex flex-col h-[480px]">
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
            {mensajes.map(m => {
              const esPropio = m.autor === rol;
              return (
                <div
                  key={m.id}
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
                    esPropio ? 'self-end bg-emerald-500 text-[#04140F]' : 'self-start bg-white/[0.06] text-white/85'
                  }`}
                >
                  {m.texto}
                  <div className={`text-[10px] mt-1 ${esPropio ? 'text-black/50' : 'text-white/35'}`}>{m.hora}</div>
                </div>
              );
            })}
          </div>
          <div className="p-4 border-t border-white/10 flex items-center gap-3">
            <input
              value={valor}
              onChange={e => onChange(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && onEnviar()}
              placeholder="Escribe un mensaje..."
              className="flex-1 rounded-xl bg-white/[0.04] ring-1 ring-white/10 px-4 py-2.5 text-[14px] outline-none focus:ring-emerald-500/40 transition-all"
            />
            <button
              onClick={onEnviar}
              className="w-10 h-10 rounded-full bg-emerald-500 text-[#04140F] flex items-center justify-center shrink-0 transition-transform hover:scale-105 active:scale-95"
            >
              <FiSend size={15} />
            </button>
          </div>
        </div>
      </Card>
    </>
  );
}

function FacturacionView({ facturas }: { facturas: Factura[] }) {
  return (
    <>
      <SectionHeader eyebrow="Historial" title="Facturación" />
      <Card>
        <div className="divide-y divide-white/5">
          {facturas.map(f => (
            <div key={f.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <div className="text-[14.5px] text-white/85">{f.concepto}</div>
                <div className="text-[12px] text-white/40">{f.fecha}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[14px] font-mono">{f.importe}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full ring-1 flex items-center gap-1 ${
                    f.estado === 'Pagada' ? 'text-emerald-400 ring-emerald-500/30' : 'text-amber-400 ring-amber-500/30'
                  }`}
                >
                  {f.estado === 'Pagada' && <FiCheck size={11} />}
                  {f.estado}
                </span>
                <button className="text-white/40 hover:text-emerald-400 transition-colors p-1.5">⬇</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
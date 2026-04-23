import { useState, useMemo } from "react";
import {
  Search, MapPin, Calendar, Clock, User, Phone, Mail, CreditCard,
  Users, AlertCircle, Check, X, ChevronRight, ChevronLeft, Filter,
  Download, Edit3, Eye, DollarSign, TrendingUp, Activity, Zap,
  Menu, ArrowRight, Shield, Smile, Award, MessageCircle, Plus, Settings,
  FileText, BarChart3, Bell, Home, UserCheck, Briefcase
} from "lucide-react";

// ────────────────────────────────────────────────────────────────────────────
// BRAND TOKENS — DOC In
// ────────────────────────────────────────────────────────────────────────────
const BRAND = {
  navy: "#0F3B4C",
  navyDark: "#0A2A38",
  teal: "#1A6B7A",
  tealMid: "#2D9E9E",
  tealLight: "#4DBFBF",
  cyan: "#7BD4D4",
  sand: "#F5F7F8",
  coral: "#D93E3E",
  amber: "#E8A23B",
  success: "#1F9D5C",
  gradient: "linear-gradient(135deg, #0F3B4C 0%, #1A6B7A 50%, #2D9E9E 100%)",
};

// ────────────────────────────────────────────────────────────────────────────
// DATOS SEMILLA — realistas para Córdoba
// ────────────────────────────────────────────────────────────────────────────
const OBRAS_SOCIALES = [
  "Particular", "Apross", "Federación Odontológica", "OSDE 210", "OSDE 310",
  "OSDE 410", "OSDE 450", "OSDE 510", "Swiss Medical SMG20", "Swiss Medical SMG30",
  "Galeno Azul", "Galeno Oro", "Medifé Plan A1", "Medifé Plan A2",
  "Medicus", "Omint Línea Omint", "Omint Skill Plus", "Sancor Salud 1500",
  "Jerárquicos Salud", "DASPU", "Luis Pasteur", "Prevención Salud",
  "ACA Salud", "Avalian", "Federada Salud", "Doctored",
];

const BARRIOS_CORDOBA = [
  "Nueva Córdoba", "Centro", "Cofico", "Cerro de las Rosas", "Alta Córdoba",
  "Alberdi", "General Paz", "Güemes", "Providencia", "Urca",
  "Villa Belgrano", "Parque Chacabuco", "Jardín", "Poeta Lugones",
];

const ESPECIALIDADES = [
  "Odontología General", "Odontopediatría", "Ortodoncia", "Endodoncia",
  "Periodoncia", "Implantes", "Cirugía", "Estética Dental", "Prótesis",
];

const PROFESIONALES = [
  {
    id: "p1", nombre: "Dra. Valeria Herrera", matricula: "MP 4521",
    especialidades: ["Odontología General", "Endodoncia", "Prótesis", "Implantes"],
    clinica: "Centro Cañada Odontología",
    direccion: "Marcelo T. de Alvear 341, PB",
    barrio: "Nueva Córdoba",
    obrasSociales: ["Apross", "Federación Odontológica", "OSDE 310", "OSDE 410", "Swiss Medical SMG30", "Medifé Plan A1", "Particular"],
    precios: { consulta: 43720, arreglo: 38000, extraccion: 35000, limpieza: 45000 },
    rating: 4.8, reviews: 127,
    horarios: "Lun–Vie 9:00–19:30", aceptaUrgencias: true,
    plan: "12 meses",
  },
  {
    id: "p2", nombre: "Dr. Germán Albornoz", matricula: "MP 3890",
    especialidades: ["Odontología General", "Implantes", "Cirugía"],
    clinica: "Centro Odontológico Buen Pastor",
    direccion: "Yrigoyen 398, 1º A",
    barrio: "Nueva Córdoba",
    obrasSociales: ["Federación Odontológica", "Apross", "Galeno Oro", "OSDE 450", "Medifé Plan A2", "Particular"],
    precios: { consulta: 48000, arreglo: 42000, extraccion: 40000, limpieza: 50000 },
    rating: 4.7, reviews: 98,
    horarios: "Lun–Vie 9:00–19:30", aceptaUrgencias: true,
    plan: "6 meses",
  },
  {
    id: "p3", nombre: "Dra. María Eugenia Verde", matricula: "MP 5102",
    especialidades: ["Odontología General", "Periodoncia", "Odontopediatría"],
    clinica: "Periodontics",
    direccion: "Ituzaingó 450, 5º D",
    barrio: "Nueva Córdoba",
    obrasSociales: ["Federación Odontológica", "Apross", "Jerárquicos Salud", "DASPU", "Sancor Salud 1500", "Particular"],
    precios: { consulta: 43720, arreglo: 36000, extraccion: 34000, limpieza: 42000 },
    rating: 4.9, reviews: 214,
    horarios: "Lun 15–19 / Mar-Mié-Vie 8–14", aceptaUrgencias: false,
    plan: "12 meses",
  },
  {
    id: "p4", nombre: "Dra. Verónica Ochoa", matricula: "MP 4102",
    especialidades: ["Odontología General", "Endodoncia"],
    clinica: "Consultorios del Centro",
    direccion: "Av. Olmos 112, Piso 7",
    barrio: "Centro",
    obrasSociales: ["Federación Odontológica", "Apross", "OSDE 310", "Omint Línea Omint", "Particular"],
    precios: { consulta: 43720, arreglo: 35000, extraccion: 32000, limpieza: 40000 },
    rating: 4.6, reviews: 78,
    horarios: "Lun–Vie 9:00–18:00", aceptaUrgencias: true,
    plan: "6 meses",
  },
  {
    id: "p5", nombre: "Dra. Cecilia Borda", matricula: "MP 4890",
    especialidades: ["Odontología General", "Ortodoncia", "Implantes"],
    clinica: "Clínica de Odontología Integral",
    direccion: "San Lorenzo 259, 2º B",
    barrio: "Nueva Córdoba",
    obrasSociales: ["Federación Odontológica", "Omint Skill Plus", "Sancor Salud 1500", "Swiss Medical SMG20", "Medifé Plan A1", "Particular"],
    precios: { consulta: 50000, arreglo: 45000, extraccion: 42000, limpieza: 55000 },
    rating: 4.8, reviews: 156,
    horarios: "Mar-Jue 14-20 / Sáb 9-13", aceptaUrgencias: true,
    plan: "12 meses",
  },
  {
    id: "p6", nombre: "Dr. Martín López", matricula: "MP 6201",
    especialidades: ["Odontopediatría", "Odontología General"],
    clinica: "Clínica Kids Dental",
    direccion: "Rafael Núñez 4550",
    barrio: "Cerro de las Rosas",
    obrasSociales: ["Apross", "OSDE 210", "OSDE 310", "Medifé Plan A1", "Swiss Medical SMG20", "Particular"],
    precios: { consulta: 43720, arreglo: 38000, extraccion: 35000, limpieza: 42000 },
    rating: 4.9, reviews: 203,
    horarios: "Lun–Vie 14:00–20:00", aceptaUrgencias: false,
    plan: "12 meses",
  },
];

// Turnos disponibles por profesional
const genSlots = (profId, base) => {
  const slots = [];
  const start = new Date(2026, 3, 23); // 23 abril 2026
  for (let d = 0; d < 14; d++) {
    const date = new Date(start); date.setDate(start.getDate() + d);
    if (date.getDay() === 0 || date.getDay() === 6) continue; // sin sáb/dom
    base.forEach((h) => {
      if (Math.random() > 0.35) {
        slots.push({
          id: `${profId}-${date.toISOString().slice(0, 10)}-${h}`,
          profId, fecha: date.toISOString().slice(0, 10), hora: h,
          ocupado: Math.random() < 0.25,
        });
      }
    });
  }
  return slots;
};

const TURNOS_DISPONIBLES = [
  ...genSlots("p1", ["09:00", "10:00", "11:00", "15:00", "16:30", "18:00"]),
  ...genSlots("p2", ["09:30", "10:30", "14:00", "16:00", "17:30"]),
  ...genSlots("p3", ["08:30", "09:30", "10:30", "15:00", "16:00"]),
  ...genSlots("p4", ["09:00", "10:00", "11:00", "16:00", "17:00"]),
  ...genSlots("p5", ["14:30", "15:30", "17:00", "18:30"]),
  ...genSlots("p6", ["14:30", "15:30", "16:30", "17:30", "18:30", "19:30"]),
];

// Turnos agendados (para admin y profesional)
const TURNOS_AGENDADOS = [
  { id: "PAC-0001", fechaTurno: "2026-04-21", hora: "18:00", profId: "p1", paciente: "María Sofía Roggio", dni: "38.421.950", telefono: "3515234821", obraSocial: "Apross", barrio: "Nueva Córdoba", motivo: "Control", estado: "Asistió", tipoCaso: "TurnoNormal", porcentaje: 1.0, importe: 43720, estadoCobro: "Facturado 100%", confirmado: true },
  { id: "PAC-0002", fechaTurno: "2026-04-22", hora: "10:00", profId: "p1", paciente: "Jonathan Prasnikar", dni: "40.112.003", telefono: "3518723401", obraSocial: "Particular", barrio: "Centro", motivo: "Limpieza", estado: "Asistió", tipoCaso: "ReingresoPacienteDocIn", porcentaje: 0.3, importe: 13116, estadoCobro: "Facturado 30%", confirmado: true },
  { id: "PAC-0003", fechaTurno: "2026-04-23", hora: "09:30", profId: "p2", paciente: "Amy Sharon Martínez", dni: "42.998.123", telefono: "3516001239", obraSocial: "Galeno Oro", barrio: "Cofico", motivo: "Consulta", estado: "Reprogramó", tipoCaso: "ReagendaProfesional", porcentaje: 1.0, importe: 43720, estadoCobro: "Por facturar 100%", confirmado: true },
  { id: "PAC-0004", fechaTurno: "2026-04-23", hora: "16:00", profId: "p3", paciente: "Lorena Carreras", dni: "35.872.145", telefono: "3513211098", obraSocial: "Federación Odontológica", barrio: "Nueva Córdoba", motivo: "Limpieza", estado: "Confirmado", tipoCaso: "TurnoNormal", porcentaje: null, importe: null, estadoCobro: "Pendiente", confirmado: true },
  { id: "PAC-0005", fechaTurno: "2026-04-24", hora: "14:00", profId: "p4", paciente: "Facundo Juncos", dni: "39.456.210", telefono: "3514567823", obraSocial: "Omint Línea Omint", barrio: "Centro", motivo: "Endodoncia", estado: "Entregado", tipoCaso: "TurnoNormal", porcentaje: null, importe: null, estadoCobro: "Pendiente", confirmado: false },
  { id: "PAC-0006", fechaTurno: "2026-04-24", hora: "17:00", profId: "p5", paciente: "Graciela del Valle Toledo", dni: "22.103.456", telefono: "3516789012", obraSocial: "Particular", barrio: "Güemes", motivo: "Control + Limpieza", estado: "Confirmado", tipoCaso: "TurnoNormal", porcentaje: null, importe: null, estadoCobro: "Pendiente", confirmado: true },
  { id: "PAC-0007", fechaTurno: "2026-04-25", hora: "15:30", profId: "p6", paciente: "Tomás Pérez (Menor)", dni: "—", telefono: "3512340987", obraSocial: "Apross", barrio: "Cerro de las Rosas", motivo: "Control odontopediátrico", estado: "Confirmado", tipoCaso: "TurnoNormal", porcentaje: null, importe: null, estadoCobro: "Pendiente", confirmado: true, adultoResponsable: "Carolina Pérez" },
  { id: "PAC-0008", fechaTurno: "2026-04-18", hora: "11:00", profId: "p2", paciente: "Milagros Ríos", dni: "41.223.890", telefono: "3517896543", obraSocial: "Medifé Plan A2", barrio: "Nueva Córdoba", motivo: "Extracción", estado: "No asistió", tipoCaso: "TurnoNormal", porcentaje: 0, importe: 0, estadoCobro: "No facturar (no-show)", confirmado: true },
];

// ────────────────────────────────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────────────────────────────────
const fmtFecha = (s) => {
  const [y, m, d] = s.split("-");
  const dias = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const dt = new Date(Number(y), Number(m) - 1, Number(d));
  return `${dias[dt.getDay()]} ${d} ${meses[Number(m) - 1]}`;
};
const fmtMoney = (n) => `$ ${n.toLocaleString("es-AR")}`;
const getHoraBucket = (hora) => { const h = parseInt(hora.split(":")[0]); return h < 12 ? "mañana" : h < 18 ? "tarde" : "noche"; };

// ────────────────────────────────────────────────────────────────────────────
// COMPONENTS
// ────────────────────────────────────────────────────────────────────────────
const Logo = ({ size = "md", dark = false }) => {
  const heights = { sm: 28, md: 36, lg: 48 };
  const h = heights[size];
  return (
    <div className="flex items-center" style={{ height: h }}>
      <img src="/logo_doc_in.png" alt="DOC In" style={{ height: h, width: "auto", filter: dark ? "brightness(0) invert(1)" : "none" }} />
    </div>
  );
};

const Btn = ({ children, onClick, variant = "primary", size = "md", disabled, icon: Icon, iconRight, className = "", style = {}, fullWidth }) => {
  const variants = {
    primary: { bg: BRAND.navy, text: "white", hover: BRAND.navyDark, border: "transparent" },
    teal: { bg: BRAND.tealMid, text: "white", hover: BRAND.teal, border: "transparent" },
    outline: { bg: "transparent", text: BRAND.navy, hover: "#f0f5f7", border: BRAND.navy },
    ghost: { bg: "transparent", text: BRAND.teal, hover: "#f0f5f7", border: "transparent" },
    danger: { bg: BRAND.coral, text: "white", hover: "#B73333", border: "transparent" },
    urgent: { bg: BRAND.amber, text: BRAND.navyDark, hover: "#D4902C", border: "transparent" },
  };
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-5 py-2.5 text-sm", lg: "px-6 py-3.5 text-base" };
  const v = variants[variant];
  return (
    <button
      onClick={onClick} disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-wide transition-all ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      style={{
        backgroundColor: disabled ? "#ccc" : v.bg, color: disabled ? "#888" : v.text,
        border: `1.5px solid ${disabled ? "#ccc" : v.border}`,
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.6 : 1, ...style,
      }}
      onMouseEnter={(e) => !disabled && (e.currentTarget.style.backgroundColor = v.hover)}
      onMouseLeave={(e) => !disabled && (e.currentTarget.style.backgroundColor = v.bg)}
    >
      {Icon && <Icon size={size === "sm" ? 14 : 16} />}
      {children}
      {iconRight && <ArrowRight size={size === "sm" ? 14 : 16} />}
    </button>
  );
};

const Card = ({ children, className = "", style = {} }) => (
  <div className={`bg-white rounded-xl shadow-sm border ${className}`} style={{ borderColor: "#E5EAED", ...style }}>
    {children}
  </div>
);

const Badge = ({ children, color = "teal", size = "md" }) => {
  const colors = {
    teal: { bg: "#E0F2F2", text: BRAND.teal },
    navy: { bg: "#E0E9ED", text: BRAND.navy },
    success: { bg: "#D8F0E4", text: BRAND.success },
    warn: { bg: "#FFF4E0", text: "#A86F1F" },
    danger: { bg: "#FFE4E4", text: BRAND.coral },
    gray: { bg: "#EEF1F3", text: "#556570" },
  };
  const c = colors[color];
  const sz = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-wide ${sz}`} style={{ backgroundColor: c.bg, color: c.text }}>
      {children}
    </span>
  );
};

const Input = ({ label, ...props }) => (
  <div className="flex-1">
    {label && <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: BRAND.navy }}>{label}</label>}
    <input
      {...props}
      className={`w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors ${props.className || ""}`}
      style={{ border: `1.5px solid #D5DCE0`, backgroundColor: "#FAFBFC", color: BRAND.navyDark, ...(props.style || {}) }}
      onFocus={(e) => (e.target.style.borderColor = BRAND.tealMid)}
      onBlur={(e) => (e.target.style.borderColor = "#D5DCE0")}
    />
  </div>
);

const Select = ({ label, options, value, onChange, placeholder = "Seleccioná una opción" }) => (
  <div className="flex-1">
    {label && <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: BRAND.navy }}>{label}</label>}
    <select
      value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors cursor-pointer"
      style={{ border: `1.5px solid #D5DCE0`, backgroundColor: "#FAFBFC", color: value ? BRAND.navyDark : "#888" }}
      onFocus={(e) => (e.target.style.borderColor = BRAND.tealMid)}
      onBlur={(e) => (e.target.style.borderColor = "#D5DCE0")}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

// ════════════════════════════════════════════════════════════════════════════
// PATIENT VIEW
// ════════════════════════════════════════════════════════════════════════════
const PatientView = () => {
  const [step, setStep] = useState("landing");
  const [filters, setFilters] = useState({
    barrio: "", especialidad: "", obraSocial: "", franja: "", cantidadPacientes: "1", urgencia: false,
  });
  const [turnoElegido, setTurnoElegido] = useState(null);
  const [paciente, setPaciente] = useState({ nombre: "", dni: "", telefono: "", email: "", esMenor: false, adultoResponsable: "" });
  const [confirmed, setConfirmed] = useState(false);

  const resultados = useMemo(() => {
    return PROFESIONALES.filter((p) => {
      if (filters.barrio && p.barrio !== filters.barrio) return false;
      if (filters.especialidad && !p.especialidades.includes(filters.especialidad)) return false;
      if (filters.obraSocial && !p.obrasSociales.includes(filters.obraSocial)) return false;
      if (filters.urgencia && !p.aceptaUrgencias) return false;
      return true;
    }).map((p) => {
      const slots = TURNOS_DISPONIBLES.filter((t) => t.profId === p.id && !t.ocupado);
      const filtered = filters.franja ? slots.filter((s) => getHoraBucket(s.hora) === filters.franja) : slots;
      return { ...p, slots: filtered.slice(0, 6) };
    }).filter((p) => p.slots.length > 0);
  }, [filters]);

  const isParticular = filters.obraSocial === "Particular";

  // LANDING
  if (step === "landing") {
    return (
      <div>
        {/* Hero */}
        <div style={{ background: BRAND.gradient, color: "white", padding: "48px 24px 60px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -100, right: -100, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
          <div className="max-w-4xl mx-auto relative">
            <div className="flex items-center justify-between mb-8">
              <div style={{ filter: "brightness(0) invert(1)" }}><Logo size="md" dark /></div>
              <span className="text-xs opacity-75 hidden sm:block">Córdoba · Argentina</span>
            </div>
            <div className="mt-8">
              <div className="text-xs font-bold tracking-widest uppercase opacity-80 mb-3">Buscador inteligente de turnos</div>
              <h1 className="font-black leading-none mb-4" style={{ fontSize: "clamp(32px, 6vw, 52px)", letterSpacing: "-0.02em" }}>
                ¿NECESITÁS UN<br/>ODONTÓLOGO?
              </h1>
              <p className="text-lg sm:text-xl opacity-90 mb-8 max-w-lg">Encontrá el turno perfecto según tu zona, obra social y horario. Sin vueltas.</p>
              <div className="flex flex-wrap gap-3">
                <Btn variant="teal" size="lg" onClick={() => { setFilters((f) => ({ ...f, urgencia: false })); setStep("search"); }} iconRight icon={Calendar} style={{ background: "white", color: BRAND.navy }}>
                  Pedí tu turno
                </Btn>
                <Btn variant="urgent" size="lg" onClick={() => { setFilters((f) => ({ ...f, urgencia: true, franja: "" })); setStep("search"); }} icon={Zap}>
                  URGENCIA
                </Btn>
              </div>
            </div>
          </div>
        </div>
        {/* Features strip */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Verificado", desc: "Solo odontólogos con matrícula vigente y ubicación confirmada." },
              { icon: Clock, title: "Rápido", desc: "Confirmás tu turno en menos de 2 minutos, desde el celular." },
              { icon: Smile, title: "Sin costo", desc: "Para vos, el servicio de búsqueda es 100% gratuito." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="text-center p-4">
                <div className="inline-flex p-3 rounded-full mb-3" style={{ backgroundColor: "#E0F2F2" }}>
                  <Icon size={22} color={BRAND.teal} />
                </div>
                <div className="font-bold mb-1" style={{ color: BRAND.navy }}>{title}</div>
                <div className="text-sm text-gray-600">{desc}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Trust bar */}
        <div style={{ backgroundColor: BRAND.sand }} className="py-6 px-6 border-t" >
          <div className="max-w-4xl mx-auto text-center text-xs text-gray-600 leading-relaxed">
            <p><strong>DOC In</strong> es un buscador inteligente de turnos. No es un centro odontológico y no participa en la relación comercial entre el paciente y el profesional.</p>
          </div>
        </div>
      </div>
    );
  }

  // SEARCH
  if (step === "search") {
    const canSearch = filters.barrio && filters.obraSocial;
    return (
      <div className="max-w-2xl mx-auto px-6 py-8">
        <button onClick={() => setStep("landing")} className="inline-flex items-center gap-1 text-sm font-semibold mb-6" style={{ color: BRAND.teal }}>
          <ChevronLeft size={16} /> Volver
        </button>
        <div className="mb-6">
          {filters.urgencia && (
            <div className="flex items-center gap-2 mb-3">
              <Badge color="warn"><Zap size={10} /> Modo urgencia</Badge>
            </div>
          )}
          <h2 className="text-3xl font-black mb-2" style={{ color: BRAND.navy, letterSpacing: "-0.01em" }}>Contanos qué necesitás</h2>
          <p className="text-gray-600">Con estos datos te mostramos los odontólogos que coinciden con tus filtros.</p>
        </div>
        <Card className="p-6 space-y-5">
          <Select label="1 · Zona / Barrio" options={BARRIOS_CORDOBA} value={filters.barrio} onChange={(v) => setFilters({ ...filters, barrio: v })} placeholder="Elegí tu zona" />
          <Select label="2 · Obra social" options={OBRAS_SOCIALES} value={filters.obraSocial} onChange={(v) => setFilters({ ...filters, obraSocial: v })} placeholder="Elegí tu cobertura" />
          <Select label="3 · Especialidad (opcional)" options={ESPECIALIDADES} value={filters.especialidad} onChange={(v) => setFilters({ ...filters, especialidad: v })} placeholder="Cualquier especialidad" />
          <div>
            <label className="block text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: BRAND.navy }}>4 · Franja horaria</label>
            <div className="grid grid-cols-2 gap-2">
              {[{ k: "", l: "Cualquiera" }, { k: "mañana", l: "🌅 Mañana" }, { k: "tarde", l: "☀️ Tarde" }, { k: "noche", l: "🌙 Noche" }].map((opt) => (
                <button key={opt.l} onClick={() => setFilters({ ...filters, franja: opt.k })}
                  className="py-2.5 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    border: `1.5px solid ${filters.franja === opt.k ? BRAND.tealMid : "#D5DCE0"}`,
                    backgroundColor: filters.franja === opt.k ? "#E0F2F2" : "white",
                    color: filters.franja === opt.k ? BRAND.teal : "#556570",
                  }}>
                  {opt.l}
                </button>
              ))}
            </div>
          </div>
          <Btn variant="primary" size="lg" fullWidth icon={Search} disabled={!canSearch} onClick={() => setStep("results")}>
            Buscar turnos disponibles
          </Btn>
        </Card>
      </div>
    );
  }

  // RESULTS
  if (step === "results") {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <button onClick={() => setStep("search")} className="inline-flex items-center gap-1 text-sm font-semibold mb-4" style={{ color: BRAND.teal }}>
          <ChevronLeft size={16} /> Modificar búsqueda
        </button>
        {/* Filter summary */}
        <Card className="p-4 mb-6" style={{ backgroundColor: BRAND.sand }}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide mr-1" style={{ color: BRAND.navy }}>Filtros activos:</span>
            <Badge color="navy"><MapPin size={10} />{filters.barrio}</Badge>
            <Badge color="navy">{filters.obraSocial}</Badge>
            {filters.especialidad && <Badge color="navy">{filters.especialidad}</Badge>}
            {filters.franja && <Badge color="navy">{filters.franja}</Badge>}
            {filters.urgencia && <Badge color="warn"><Zap size={10} /> urgencia</Badge>}
          </div>
        </Card>

        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-2xl font-black" style={{ color: BRAND.navy }}>
            {resultados.length} profesional{resultados.length !== 1 ? "es" : ""} disponible{resultados.length !== 1 ? "s" : ""}
          </h2>
        </div>

        {resultados.length === 0 && (
          <Card className="p-8 text-center">
            <div className="inline-flex p-3 rounded-full mb-3" style={{ backgroundColor: "#FFF4E0" }}>
              <AlertCircle size={24} color={BRAND.amber} />
            </div>
            <h3 className="text-lg font-black mb-2" style={{ color: BRAND.navy }}>No encontramos turnos con estos filtros</h3>
            <p className="text-gray-600 mb-5">¿Querés que te contactemos para buscar otra opción?</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Btn variant="teal" icon={MessageCircle}>WhatsApp</Btn>
              <Btn variant="outline" onClick={() => setStep("search")}>Cambiar filtros</Btn>
            </div>
          </Card>
        )}

        {/* Particular notice */}
        {isParticular && resultados.length > 0 && (
          <Card className="p-4 mb-4" style={{ backgroundColor: "#FFF8E8", borderColor: "#E8C978" }}>
            <div className="flex gap-3">
              <AlertCircle size={18} color={BRAND.amber} className="flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <strong style={{ color: "#8B6914" }}>Consulta particular.</strong>
                <span className="text-gray-700"> Se bonifica la primera consulta si realizás prestaciones. Los valores varían por profesional.</span>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-4">
          {resultados.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              <div className="p-5">
                <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                  <div className="flex-1 min-w-[260px]">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg font-black" style={{ color: BRAND.navy }}>{p.nombre}</h3>
                      <Badge color="gray" size="sm">{p.matricula}</Badge>
                      {p.aceptaUrgencias && <Badge color="warn" size="sm"><Zap size={10} /> urgencias</Badge>}
                    </div>
                    <div className="text-sm font-semibold mb-1" style={{ color: BRAND.teal }}>
                      {p.especialidades.slice(0, 3).join(" · ")}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-1 mb-0.5">
                      <MapPin size={13} /> {p.clinica} — {p.direccion}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={12} /> {p.horarios}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Award size={14} color={BRAND.amber} />
                      <span className="font-bold" style={{ color: BRAND.navy }}>{p.rating}</span>
                      <span className="text-xs text-gray-500">({p.reviews})</span>
                    </div>
                    {isParticular && (
                      <div className="mt-1 text-xs text-gray-600">
                        <div>Consulta: <strong style={{ color: BRAND.navy }}>{fmtMoney(p.precios.consulta)}</strong></div>
                      </div>
                    )}
                  </div>
                </div>
                {isParticular && (
                  <div className="mb-3 pb-3 border-b grid grid-cols-3 gap-2 text-xs" style={{ color: BRAND.navyDark }}>
                    <div><span className="text-gray-500">Arreglo:</span> <strong>{fmtMoney(p.precios.arreglo)}</strong></div>
                    <div><span className="text-gray-500">Extracción:</span> <strong>{fmtMoney(p.precios.extraccion)}</strong></div>
                    <div><span className="text-gray-500">Limpieza:</span> <strong>{fmtMoney(p.precios.limpieza)}</strong></div>
                  </div>
                )}
                <div>
                  <div className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">Turnos disponibles</div>
                  <div className="flex flex-wrap gap-2">
                    {p.slots.map((s) => (
                      <button key={s.id} onClick={() => { setTurnoElegido({ ...s, profesional: p }); setStep("confirm"); }}
                        className="px-3 py-2 rounded-lg text-xs font-semibold transition-all border"
                        style={{ borderColor: BRAND.tealMid, color: BRAND.teal, backgroundColor: "white" }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = BRAND.tealMid; e.currentTarget.style.color = "white"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "white"; e.currentTarget.style.color = BRAND.teal; }}
                      >
                        {fmtFecha(s.fecha)} · {s.hora}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // CONFIRM (data entry + confirmation)
  if (step === "confirm" && turnoElegido) {
    const canConfirm = paciente.nombre && paciente.dni && paciente.telefono && paciente.email && (!paciente.esMenor || paciente.adultoResponsable);
    return (
      <div className="max-w-2xl mx-auto px-6 py-8">
        {!confirmed ? (
          <>
            <button onClick={() => setStep("results")} className="inline-flex items-center gap-1 text-sm font-semibold mb-6" style={{ color: BRAND.teal }}>
              <ChevronLeft size={16} /> Elegir otro turno
            </button>
            <h2 className="text-3xl font-black mb-2" style={{ color: BRAND.navy, letterSpacing: "-0.01em" }}>Último paso</h2>
            <p className="text-gray-600 mb-6">Completá tus datos para confirmar el turno.</p>

            {/* Resumen */}
            <Card className="p-5 mb-5" style={{ background: BRAND.gradient, color: "white", border: "none" }}>
              <div className="text-xs uppercase tracking-widest opacity-80 mb-2 font-bold">Turno seleccionado</div>
              <div className="text-xl font-black mb-1">{turnoElegido.profesional.nombre}</div>
              <div className="text-sm opacity-90 mb-3">{turnoElegido.profesional.especialidades[0]} · {turnoElegido.profesional.clinica}</div>
              <div className="flex flex-wrap gap-4 pt-3 border-t border-white border-opacity-20">
                <div className="flex items-center gap-2"><Calendar size={16} /><strong>{fmtFecha(turnoElegido.fecha)}</strong></div>
                <div className="flex items-center gap-2"><Clock size={16} /><strong>{turnoElegido.hora} hs</strong></div>
                <div className="flex items-center gap-2"><MapPin size={16} /><span className="text-sm">{turnoElegido.profesional.barrio}</span></div>
              </div>
            </Card>

            <Card className="p-5 space-y-4">
              <Input label="Nombre y apellido completo" placeholder="Ej: María García" value={paciente.nombre} onChange={(e) => setPaciente({ ...paciente, nombre: e.target.value })} />
              <div className="flex gap-4">
                <Input label="DNI" placeholder="00.000.000" value={paciente.dni} onChange={(e) => setPaciente({ ...paciente, dni: e.target.value })} />
                <Input label="Teléfono / WhatsApp" placeholder="351 1234567" value={paciente.telefono} onChange={(e) => setPaciente({ ...paciente, telefono: e.target.value })} />
              </div>
              <Input label="Email" type="email" placeholder="tu@email.com" value={paciente.email} onChange={(e) => setPaciente({ ...paciente, email: e.target.value })} />
              <div className="flex items-center gap-2 pt-1">
                <input type="checkbox" id="menor" checked={paciente.esMenor} onChange={(e) => setPaciente({ ...paciente, esMenor: e.target.checked })} className="w-4 h-4" />
                <label htmlFor="menor" className="text-sm font-semibold" style={{ color: BRAND.navy }}>El paciente es menor de edad</label>
              </div>
              {paciente.esMenor && (
                <Input label="Adulto responsable" placeholder="Nombre completo" value={paciente.adultoResponsable} onChange={(e) => setPaciente({ ...paciente, adultoResponsable: e.target.value })} />
              )}
            </Card>

            <div className="mt-5 p-4 rounded-lg text-xs text-gray-600 leading-relaxed" style={{ backgroundColor: BRAND.sand }}>
              Al confirmar, recibirás el turno por email y WhatsApp. Te enviaremos recordatorios 24hs antes. DOC In limita su participación a la entrega del turno; la atención profesional corre por cuenta del odontólogo.
            </div>

            <div className="mt-5">
              <Btn variant="primary" size="lg" fullWidth disabled={!canConfirm} onClick={() => setConfirmed(true)} icon={Check}>
                Confirmar turno
              </Btn>
            </div>
          </>
        ) : (
          <div className="text-center pt-8">
            <div className="inline-flex p-5 rounded-full mb-5" style={{ background: BRAND.gradient }}>
              <Check size={44} color="white" strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-black mb-2" style={{ color: BRAND.navy }}>¡Turno confirmado!</h2>
            <p className="text-gray-600 mb-6">Hola <strong>{paciente.nombre}</strong>, te enviamos la confirmación por email y WhatsApp.</p>
            <Card className="p-6 text-left mb-6">
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-gray-500">Código de reserva</div>
                  <div className="text-lg font-black" style={{ color: BRAND.teal }}>PAC-0098</div>
                </div>
                <div className="border-t pt-3">
                  <div className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Profesional</div>
                  <div className="font-bold" style={{ color: BRAND.navy }}>{turnoElegido.profesional.nombre}</div>
                  <div className="text-sm text-gray-600">{turnoElegido.profesional.clinica} — {turnoElegido.profesional.direccion}</div>
                </div>
                <div className="flex gap-4 border-t pt-3">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Fecha</div>
                    <div className="font-bold" style={{ color: BRAND.navy }}>{fmtFecha(turnoElegido.fecha)}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Hora</div>
                    <div className="font-bold" style={{ color: BRAND.navy }}>{turnoElegido.hora} hs</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Obra social</div>
                    <div className="font-bold" style={{ color: BRAND.navy }}>{filters.obraSocial}</div>
                  </div>
                </div>
              </div>
            </Card>
            <div className="flex gap-2 justify-center flex-wrap">
              <Btn variant="outline" icon={Calendar}>Agregar al calendario</Btn>
              <Btn variant="primary" onClick={() => { setStep("landing"); setConfirmed(false); setPaciente({ nombre: "", dni: "", telefono: "", email: "", esMenor: false, adultoResponsable: "" }); setFilters({ barrio: "", especialidad: "", obraSocial: "", franja: "", cantidadPacientes: "1", urgencia: false }); }}>
                Pedí otro turno
              </Btn>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

// ════════════════════════════════════════════════════════════════════════════
// ADMIN VIEW
// ════════════════════════════════════════════════════════════════════════════
const AdminView = () => {
  const [tab, setTab] = useState("dashboard");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterProf, setFilterProf] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [turnos, setTurnos] = useState(TURNOS_AGENDADOS);

  const profMap = Object.fromEntries(PROFESIONALES.map((p) => [p.id, p]));

  // KPIs
  const totalMes = turnos.reduce((acc, t) => acc + (t.importe || 0), 0);
  const facturar100 = turnos.filter((t) => t.porcentaje === 1).length;
  const facturar30 = turnos.filter((t) => t.porcentaje === 0.3).length;
  const noShow = turnos.filter((t) => t.estado === "No asistió").length;
  const proximos = turnos.filter((t) => t.estado === "Confirmado" || t.estado === "Entregado").length;

  const filtered = turnos.filter((t) => {
    if (filterStatus && t.estado !== filterStatus) return false;
    if (filterProf && t.profId !== filterProf) return false;
    return true;
  });

  const statusColors = {
    "Entregado": "gray", "Confirmado": "teal", "Asistió": "success",
    "No asistió": "danger", "Reprogramó": "warn", "Cancelado": "danger",
  };

  const updateStatus = (id, newStatus) => {
    setTurnos((prev) => prev.map((t) => t.id === id ? { ...t, estado: newStatus } : t));
    setEditingId(null);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ background: BRAND.gradient, color: "white" }} className="px-6 py-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div style={{ filter: "brightness(0) invert(1)" }}><Logo size="sm" dark /></div>
            <div className="text-xs opacity-80">Panel Administrador</div>
          </div>
          <h1 className="text-2xl font-black">Gestión DOC In</h1>
          <p className="text-sm opacity-85">Córdoba · Abril 2026</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-0 z-10" style={{ borderColor: "#E5EAED" }}>
        <div className="max-w-6xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {[
            { k: "dashboard", l: "Dashboard", i: BarChart3 },
            { k: "turnos", l: "Turnos", i: Calendar },
            { k: "profesionales", l: "Profesionales", i: Users },
            { k: "liquidaciones", l: "Liquidaciones", i: DollarSign },
          ].map(({ k, l, i: Icon }) => (
            <button key={k} onClick={() => setTab(k)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2"
              style={{ color: tab === k ? BRAND.teal : "#667580", borderColor: tab === k ? BRAND.tealMid : "transparent" }}>
              <Icon size={16} /> {l}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {tab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Facturado mes", value: fmtMoney(totalMes), icon: DollarSign, color: BRAND.success },
                { label: "Turnos 100%", value: facturar100, icon: TrendingUp, color: BRAND.teal },
                { label: "Turnos 30%", value: facturar30, icon: Activity, color: BRAND.amber },
                { label: "Próximos", value: proximos, icon: Calendar, color: BRAND.navy },
              ].map((kpi, i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-bold uppercase tracking-wide text-gray-500">{kpi.label}</div>
                    <kpi.icon size={18} color={kpi.color} />
                  </div>
                  <div className="text-2xl font-black" style={{ color: BRAND.navy }}>{kpi.value}</div>
                </Card>
              ))}
            </div>

            <Card className="p-5">
              <h3 className="font-black mb-4" style={{ color: BRAND.navy }}>Estado operativo</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
                {[
                  { label: "Entregados", n: turnos.filter((t) => t.estado === "Entregado").length, c: "gray" },
                  { label: "Confirmados", n: turnos.filter((t) => t.estado === "Confirmado").length, c: "teal" },
                  { label: "Asistieron", n: turnos.filter((t) => t.estado === "Asistió").length, c: "success" },
                  { label: "Reprogramados", n: turnos.filter((t) => t.estado === "Reprogramó").length, c: "warn" },
                  { label: "No asistieron", n: noShow, c: "danger" },
                ].map((x, i) => (
                  <div key={i} className="p-3 rounded-lg" style={{ backgroundColor: BRAND.sand }}>
                    <div className="text-3xl font-black mb-1" style={{ color: BRAND.navy }}>{x.n}</div>
                    <div className="text-[10px] uppercase font-bold tracking-wide text-gray-600">{x.label}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-black mb-4" style={{ color: BRAND.navy }}>Actividad reciente</h3>
              <div className="space-y-2">
                {turnos.slice(0, 5).map((t) => (
                  <div key={t.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div>
                      <div className="font-semibold text-sm" style={{ color: BRAND.navy }}>{t.paciente}</div>
                      <div className="text-xs text-gray-500">{profMap[t.profId]?.nombre} · {fmtFecha(t.fechaTurno)} {t.hora}</div>
                    </div>
                    <Badge color={statusColors[t.estado]}>{t.estado}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {tab === "turnos" && (
          <div>
            <div className="flex flex-wrap gap-3 mb-4">
              <Select options={["Entregado", "Confirmado", "Asistió", "No asistió", "Reprogramó", "Cancelado"]}
                value={filterStatus} onChange={setFilterStatus} placeholder="Todos los estados" />
              <Select options={PROFESIONALES.map((p) => p.id)} value={filterProf} onChange={setFilterProf} placeholder="Todos los profesionales" />
              <Btn variant="outline" icon={Download}>Exportar CSV</Btn>
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead style={{ backgroundColor: BRAND.sand }}>
                    <tr>
                      {["ID", "Fecha", "Paciente", "Profesional", "OS", "Estado", "Cobro", ""].map((h) => (
                        <th key={h} className="text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wide" style={{ color: BRAND.navy }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((t) => (
                      <tr key={t.id} className="border-t hover:bg-gray-50" style={{ borderColor: "#E5EAED" }}>
                        <td className="px-3 py-2.5 font-mono text-xs" style={{ color: BRAND.teal }}>{t.id}</td>
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          <div className="font-semibold">{fmtFecha(t.fechaTurno)}</div>
                          <div className="text-xs text-gray-500">{t.hora} hs</div>
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="font-semibold">{t.paciente}</div>
                          <div className="text-xs text-gray-500">{t.telefono}</div>
                        </td>
                        <td className="px-3 py-2.5 text-xs">
                          <div className="font-semibold">{profMap[t.profId]?.nombre}</div>
                          <div className="text-gray-500">{profMap[t.profId]?.barrio}</div>
                        </td>
                        <td className="px-3 py-2.5 text-xs text-gray-600">{t.obraSocial}</td>
                        <td className="px-3 py-2.5">
                          {editingId === t.id ? (
                            <select autoFocus value={t.estado} onChange={(e) => updateStatus(t.id, e.target.value)}
                              onBlur={() => setEditingId(null)}
                              className="text-xs px-2 py-1 rounded border" style={{ borderColor: BRAND.tealMid }}>
                              {["Entregado", "Confirmado", "Asistió", "No asistió", "Reprogramó", "Cancelado"].map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          ) : (
                            <Badge color={statusColors[t.estado]}>{t.estado}</Badge>
                          )}
                        </td>
                        <td className="px-3 py-2.5 text-xs">
                          {t.importe !== null && t.importe > 0 ? (
                            <>
                              <div className="font-bold" style={{ color: BRAND.navy }}>{fmtMoney(t.importe)}</div>
                              <div className="text-gray-500">{t.estadoCobro}</div>
                            </>
                          ) : <span className="text-gray-400">—</span>}
                        </td>
                        <td className="px-3 py-2.5">
                          <button onClick={() => setEditingId(t.id)}
                            className="p-1.5 rounded hover:bg-gray-100" title="Editar estado">
                            <Edit3 size={14} color={BRAND.teal} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            <div className="mt-4 text-xs text-gray-500">
              💡 Tip: la regla 100%/30% y el cierre automático a las 72hs se calculan solos según el contrato.
            </div>
          </div>
        )}

        {tab === "profesionales" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black" style={{ color: BRAND.navy }}>{PROFESIONALES.length} profesionales activos</h2>
              <Btn variant="primary" icon={Plus}>Agregar profesional</Btn>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {PROFESIONALES.map((p) => (
                <Card key={p.id} className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-black" style={{ color: BRAND.navy }}>{p.nombre}</h3>
                      <div className="text-xs text-gray-500">{p.matricula} · Plan {p.plan}</div>
                    </div>
                    <Badge color="success" size="sm">Activo</Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{p.clinica} · {p.barrio}</div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.especialidades.slice(0, 3).map((e) => <Badge key={e} color="teal" size="sm">{e}</Badge>)}
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    Atiende {p.obrasSociales.length} obras sociales · ⭐ {p.rating} ({p.reviews})
                  </div>
                  <div className="flex gap-2">
                    <Btn variant="ghost" size="sm" icon={Eye}>Ver</Btn>
                    <Btn variant="ghost" size="sm" icon={Calendar}>Agenda</Btn>
                    <Btn variant="ghost" size="sm" icon={Edit3}>Editar</Btn>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {tab === "liquidaciones" && (
          <div className="space-y-4">
            <Card className="p-5" style={{ background: BRAND.gradient, color: "white", border: "none" }}>
              <div className="text-xs uppercase tracking-widest opacity-80 font-bold mb-1">Arancel ético vigente</div>
              <div className="text-4xl font-black">$ 43.720</div>
              <div className="text-sm opacity-80 mt-1">MAR-26 · configurable en panel</div>
            </Card>

            <h3 className="text-lg font-black mt-6 mb-3" style={{ color: BRAND.navy }}>Liquidaciones del mes</h3>
            <div className="space-y-3">
              {PROFESIONALES.slice(0, 4).map((p) => {
                const turnosProf = turnos.filter((t) => t.profId === p.id);
                const importe = turnosProf.reduce((acc, t) => acc + (t.importe || 0), 0);
                const feeFijo = p.plan === "12 meses" ? 18 * 43720 : p.plan === "6 meses" ? 10 * 43720 : 6 * 43720;
                return (
                  <Card key={p.id} className="p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="font-black" style={{ color: BRAND.navy }}>{p.nombre}</div>
                        <div className="text-xs text-gray-500">Plan {p.plan} · {turnosProf.length} turnos del mes</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Variable · Fee fijo</div>
                        <div className="font-black" style={{ color: BRAND.teal }}>
                          {fmtMoney(importe)} + {fmtMoney(feeFijo / 12)} mensual
                        </div>
                      </div>
                      <Btn variant="outline" size="sm" icon={FileText}>Ver detalle</Btn>
                    </div>
                  </Card>
                );
              })}
            </div>
            <div className="text-xs text-gray-500 mt-4 p-4 rounded-lg" style={{ backgroundColor: BRAND.sand }}>
              ℹ️ Vencimiento: día 10 de cada mes. Planes de 6 y 12 meses aplican diferimiento de 60 días sobre la variable.
              Interés por mora: 0,33% diario desde el día 11.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// PROFESSIONAL VIEW
// ════════════════════════════════════════════════════════════════════════════
const ProfessionalView = () => {
  const me = PROFESIONALES[0]; // Dra. Valeria Herrera
  const misTurnos = TURNOS_AGENDADOS.filter((t) => t.profId === me.id);
  const [tab, setTab] = useState("agenda");

  return (
    <div>
      <div style={{ background: BRAND.gradient, color: "white" }} className="px-6 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <div style={{ filter: "brightness(0) invert(1)" }} className="mb-2"><Logo size="sm" dark /></div>
            <div className="text-2xl font-black">Hola, {me.nombre.split(" ")[1]} 👋</div>
            <div className="text-sm opacity-85">{me.clinica}</div>
          </div>
          <div className="hidden sm:block text-right">
            <Bell size={20} />
          </div>
        </div>
      </div>

      <div className="bg-white border-b" style={{ borderColor: "#E5EAED" }}>
        <div className="max-w-4xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {[
            { k: "agenda", l: "Mi agenda", i: Calendar },
            { k: "liquidacion", l: "Liquidación", i: DollarSign },
            { k: "perfil", l: "Mi perfil", i: User },
          ].map(({ k, l, i: Icon }) => (
            <button key={k} onClick={() => setTab(k)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2"
              style={{ color: tab === k ? BRAND.teal : "#667580", borderColor: tab === k ? BRAND.tealMid : "transparent" }}>
              <Icon size={16} /> {l}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        {tab === "agenda" && (
          <>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <Card className="p-3 text-center">
                <div className="text-3xl font-black" style={{ color: BRAND.teal }}>{misTurnos.length}</div>
                <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wide">Turnos del mes</div>
              </Card>
              <Card className="p-3 text-center">
                <div className="text-3xl font-black" style={{ color: BRAND.success }}>{misTurnos.filter((t) => t.estado === "Asistió").length}</div>
                <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wide">Asistieron</div>
              </Card>
              <Card className="p-3 text-center">
                <div className="text-3xl font-black" style={{ color: BRAND.coral }}>{misTurnos.filter((t) => t.estado === "No asistió").length}</div>
                <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wide">No asistieron</div>
              </Card>
            </div>

            <div className="flex items-center justify-between mb-3">
              <h3 className="font-black" style={{ color: BRAND.navy }}>Próximos turnos</h3>
              <Btn variant="outline" size="sm" icon={Plus}>Fechas especiales</Btn>
            </div>
            <div className="space-y-3">
              {misTurnos.map((t) => (
                <Card key={t.id} className="p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className="text-center p-2 rounded-lg" style={{ backgroundColor: BRAND.sand, minWidth: 64 }}>
                        <div className="text-[10px] font-bold uppercase text-gray-500">{fmtFecha(t.fechaTurno).split(" ")[0]}</div>
                        <div className="text-xl font-black" style={{ color: BRAND.navy }}>{t.fechaTurno.split("-")[2]}</div>
                        <div className="text-[10px] font-semibold text-gray-500">{t.hora}</div>
                      </div>
                      <div>
                        <div className="font-bold" style={{ color: BRAND.navy }}>{t.paciente}</div>
                        <div className="text-xs text-gray-500">{t.obraSocial} · {t.telefono}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{t.motivo}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge color={{Entregado: "gray", Confirmado: "teal", Asistió: "success", "No asistió": "danger", Reprogramó: "warn"}[t.estado]}>{t.estado}</Badge>
                      {t.estado === "Confirmado" && (
                        <select className="text-xs px-2 py-1 rounded border bg-white" style={{ borderColor: BRAND.tealMid }} defaultValue="">
                          <option value="" disabled>Marcar...</option>
                          <option>Asistió</option>
                          <option>No asistió</option>
                          <option>Reprogramó</option>
                        </select>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg text-xs text-gray-600" style={{ backgroundColor: "#FFF8E8", border: `1px solid #E8C978` }}>
              ⚠️ <strong>Regla 72hs:</strong> si no declarás el no-show dentro de las 72hs, el turno se factura al 100%.
            </div>
          </>
        )}

        {tab === "liquidacion" && (
          <div className="space-y-4">
            <Card className="p-5" style={{ background: BRAND.gradient, color: "white", border: "none" }}>
              <div className="text-xs uppercase tracking-widest opacity-80 font-bold mb-1">Liquidación abril 2026</div>
              <div className="text-4xl font-black mb-2">$ {((18 * 43720) / 12 + misTurnos.reduce((a, t) => a + (t.importe || 0), 0)).toLocaleString("es-AR")}</div>
              <div className="text-sm opacity-85">Vencimiento: 10 de mayo</div>
            </Card>
            <Card className="p-5">
              <h3 className="font-black mb-3" style={{ color: BRAND.navy }}>Detalle</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span>Fee fijo mensual (Plan 12 meses)</span>
                  <strong>{fmtMoney((18 * 43720) / 12)}</strong>
                </div>
                {misTurnos.filter((t) => t.importe > 0).map((t) => (
                  <div key={t.id} className="flex justify-between py-2 border-b text-xs">
                    <span>{t.paciente} · {fmtFecha(t.fechaTurno)} · {t.tipoCaso}</span>
                    <strong>{fmtMoney(t.importe)}</strong>
                  </div>
                ))}
                <div className="flex justify-between pt-3 text-lg">
                  <strong>Total</strong>
                  <strong style={{ color: BRAND.teal }}>{fmtMoney((18 * 43720) / 12 + misTurnos.reduce((a, t) => a + (t.importe || 0), 0))}</strong>
                </div>
              </div>
              <Btn variant="primary" className="mt-4" icon={Download} fullWidth>Descargar factura</Btn>
            </Card>
          </div>
        )}

        {tab === "perfil" && (
          <Card className="p-5">
            <h3 className="font-black mb-4" style={{ color: BRAND.navy }}>Mis datos</h3>
            <div className="space-y-3 text-sm">
              <div><span className="text-gray-500">Matrícula:</span> <strong>{me.matricula}</strong></div>
              <div><span className="text-gray-500">Clínica:</span> <strong>{me.clinica}</strong></div>
              <div><span className="text-gray-500">Dirección:</span> <strong>{me.direccion}</strong></div>
              <div><span className="text-gray-500">Especialidades:</span> <strong>{me.especialidades.join(", ")}</strong></div>
              <div><span className="text-gray-500">Obras sociales:</span> <strong>{me.obrasSociales.length} coberturas</strong></div>
              <div><span className="text-gray-500">Plan DOC In:</span> <strong>{me.plan}</strong></div>
              <div><span className="text-gray-500">Acepta urgencias:</span> <strong>{me.aceptaUrgencias ? "Sí" : "No"}</strong></div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// APP ROOT
// ════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [view, setView] = useState("patient");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: BRAND.sand, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif" }}>
      {/* View switcher (demo only) */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm" style={{ borderColor: "#E5EAED" }}>
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mr-2 hidden sm:inline">Demo:</span>
          {[
            { k: "patient", l: "Paciente", i: Home },
            { k: "professional", l: "Profesional", i: UserCheck },
            { k: "admin", l: "Administrador", i: Briefcase },
          ].map(({ k, l, i: Icon }) => (
            <button key={k} onClick={() => setView(k)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all"
              style={{
                backgroundColor: view === k ? BRAND.navy : "transparent",
                color: view === k ? "white" : "#556570",
              }}>
              <Icon size={13} /> {l}
            </button>
          ))}
        </div>
      </div>

      {view === "patient" && <PatientView />}
      {view === "professional" && <ProfessionalView />}
      {view === "admin" && <AdminView />}
    </div>
  );
}

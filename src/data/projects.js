import { Globe, Code, Briefcase, Award, GraduationCap } from "lucide-react";

export const PROJECTS = [
  {
    id: 8,
    Word: "Mística",
    Color: "#c27a4f",
    Title: "Mística & Mundana",
    ShortTitle: "Mística Mundana",
    Tagline: "Escritura y bienestar",
    Description:
      "Sitio para Moksha Dharmanath, un espacio de escritura y acompañamiento espiritual. Reúne un oráculo semanal interactivo, una biblioteca de ebooks y la agenda de próximos encuentros, con una estética editorial y botánica.",
    Img: "/MisticaMundana.webp",
    Link: "",
    Github: ["https://github.com/MurielSalbador/Mistica-Mundana"],
    Features: [
      "Oráculo semanal con una carta animada y un cielo de estrellas que se despliega al scrollear.",
      "Nota personal por semana guardada en el dispositivo (localStorage) y aviso de «Nueva carta para vos».",
      "Ilustraciones SVG dibujadas en código: luna con rostro, corona botánica y un caracol en espiral logarítmica.",
      "Biblioteca viva de ebooks descargables y carrete infinito de experiencias.",
      "Contenido editable desde un único archivo para actualizar el oráculo cada semana sin tocar el diseño.",
    ],
    TechStack: ["HTML", "CSS", "JavaScript", "SVG", "LocalStorage"],
  },
  {
    id: 2,
    Word: "Rubio",
    Color: "#9ccc65",
    Title: "RubioHnos",
    ShortTitle: "RubioHnos",
    Tagline: "Ecommerce saludable",
    Description:
      "Tienda online de tres hermanos que venden productos alimenticios saludables para el hogar.",
    Img: "/rubiohnos.webp",
    Link: "https://rubio-hnos.vercel.app/",
    Github: ["https://github.com/MurielSalbador/RubioHnos.git"],
    Features: [
      "Seleccionamos cada producto con amor y compromiso para que vos y tu familia puedan disfrutar de una vida más sana y consciente.",
      "Desde granolas artesanales, barritas energéticas, té natural, yerbas orgánicas hasta miel pura y mucho más… todo pensado para acompañarte día a día con lo mejor de la naturaleza.",
    ],
    TechStack: ["React", "Vite", "Node.js", "MongoDB", "JavaScript", "CSS", "HTML", "SQLite"],
  },
  {
    id: 3,
    Word: "AFIP",
    Color: "#60a5fa",
    Title: "Stock AFIP - Depósitos Fiscales",
    ShortTitle: "Stock AFIP",
    Tagline: "Sistema de depósitos",
    Description:
      "Sistema full-stack moderno para gestionar el stock en depósitos fiscales con integración a los servicios de AFIP. Está estructurado como una aplicación web empaquetada para escritorio.",
    Img: "/AFIP.webp",
    Link: "",
    Github: [],
    Features: [
      "Arquitectura de tres capas (Frontend, Aplicación, Datos)",
      "Ejecución nativa en Windows con Electron",
      "Integración con servicios SOAP de AFIP",
      "Visualización de datos con Recharts",
      "Tareas programadas con Node-cron",
      "Seguridad con JWT y Bcrypt",
      "Gestión de migraciones con Prisma",
    ],
    TechStack: ["React 19", "TypeScript", "Vite", "Node.js", "Express 5", "Prisma", "PostgreSQL", "Electron"],
  },
  {
    id: 4,
    Word: "Zafiro",
    Color: "#7c8cff",
    Title: "Zafiro Beauty",
    ShortTitle: "Zafiro Beauty",
    Tagline: "Plataforma de turnos",
    Description:
      "Plataforma web full-stack para gestionar y reservar turnos en un centro de depilación láser y tratamientos estéticos. Permite a los clientes agendar sesiones y realizar señas vía MercadoPago.",
    Img: "/ZafiroBeauty.webp",
    Link: "https://zafiro-beauty-web.vercel.app/",
    Github: ["https://github.com/MurielSalbador/ZafiroBeauty"],
    Features: [
      "Reserva de turnos online con integración a MercadoPago para el pago de señas.",
      "Panel de administración para gestionar horarios, disponibilidad y bloqueos de días.",
      "Notificaciones de confirmación por WhatsApp.",
      "Múltiples categorías: paquetes láser completos, combos iniciales, zonas individuales y tratamientos faciales.",
      "Arquitectura monorepo con Turborepo y tipos TypeScript compartidos entre frontend y backend.",
    ],
    TechStack: ["React", "Vite", "TypeScript", "TailwindCSS", "NestJS", "tRPC", "PostgreSQL", "Drizzle ORM"],
  },
  {
    id: 5,
    Word: "Neura",
    Color: "#22d3ee",
    Title: "Neura Sistemas",
    ShortTitle: "Neura Sistemas",
    Tagline: "Sitio institucional",
    Description:
      "Sitio institucional para Neura Sistemas, un estudio de desarrollo de software que crea soluciones a medida para pymes y comercios: sitios web, automatización, CRM y chatbots.",
    Img: "/NeuraSistemas.webp",
    Link: "https://neurasistemas.com.ar",
    Github: ["https://github.com/Aquiles-diaz/neurasistemas"],
    Features: [
      "Sitio 100% estático generado con Next.js (output export), sin servidor ni base de datos, optimizado para velocidad y costos.",
      "Formularios de contacto gestionados con EmailJS desde el cliente, con fallback automático a mailto si faltan las variables de entorno.",
      "Secciones completas de landing: Hero, Solución, Stack tecnológico, Servicios, Casos reales, Testimonios, Packs de precios y FAQ.",
      "Animaciones de scroll con la librería motion respetando prefers-reduced-motion.",
      "Despliegue automático en Vercel en cada push a la rama main.",
    ],
    TechStack: ["Next.js 15", "React 19", "TypeScript", "TailwindCSS", "EmailJS", "Vercel"],
  },
  {
    id: 6,
    Word: "Decomar",
    Color: "#fb923c",
    Title: "Decomar Pinturas",
    ShortTitle: "Decomar Pinturas",
    Tagline: "Sitio web corporativo",
    Description:
      "Sitio web para Decomar, estudio de pintura y decoración integral. Presenta servicios, portfolio de obras y un sistema de cotización rápida vía WhatsApp.",
    Img: "/DecomarPinturas.webp",
    Link: "https://decomarpinturas-web.vercel.app",
    Github: ["https://github.com/MurielSalbador/decomarpinturas"],
    Features: [
      "Presupuesto Express integrado con WhatsApp para contacto inmediato con clientes.",
      "Secciones de Servicios, Portfolio de trabajos, Nosotros y Contacto.",
      "Arquitectura monorepo con Turborepo y componentes shadcn/ui.",
      "Diseño con gradientes y estética moderna orientada a conversión.",
    ],
    TechStack: ["React", "Vite", "TypeScript", "TailwindCSS", "shadcn/ui", "Turborepo"],
  },
  {
    id: 7,
    Word: "RDR",
    Color: "#f87171",
    Title: "RDR Seguridad Privada",
    ShortTitle: "RDR Seguridad",
    Tagline: "Landing institucional",
    Description:
      "Landing institucional para RDR Seguridad Privada, empresa de Rosario. Presenta servicios de control de acceso, monitoreo, patrullaje y custodia personal, con formulario de contacto integrado a MongoDB y notificaciones por email.",
    Img: "/RDRSegurity.webp",
    Link: "https://rdr-web.vercel.app",
    Github: ["https://github.com/MurielSalbador/RDR-SEGURITY"],
    Features: [
      "Animaciones de entrada con GSAP/ScrollTrigger y scroll suave con Lenis.",
      "Formulario de contacto con validación Zod, almacenamiento en MongoDB Atlas y notificaciones por email vía Resend.",
      "Seis servicios detallados: control de acceso, monitoreo, patrullaje, custodia personal, capacitación y supervisión.",
      "Banner promocional de análisis técnico gratuito y botón flotante de WhatsApp.",
      "Barra de estado operativo fija que muestra disponibilidad 24/7.",
    ],
    TechStack: ["Astro", "React 19", "TypeScript", "GSAP", "MongoDB Atlas", "Resend", "Zod"],
  },
];

export const CERTIFICATES = [
  {
    id: 5,
    img: "/CERTIFICADO.webp",
    title: "Curso de N8N – Creá tu Agente de Inteligencia Artificial",
    issuer: "Curso online",
    year: "2025",
    tags: ["n8n", "Agentes IA", "Automatización"],
    icon: GraduationCap,
  },
  {
    id: 4,
    img: "/bio-robotica.webp",
    title: "Diploma – Webinar de Bio-Robótica",
    issuer: "Webinar",
    year: "2024",
    tags: ["Robótica", "Tecnología"],
    icon: Award,
  },
  {
    id: 1,
    img: "",
    title: "Tecnicatura Universitaria en Programación",
    issuer: "UTN – FRRO",
    year: "2024 – 2025",
    detail: "Promedio 8.0",
    tags: ["Programación", "Bases de datos", "Sistemas"],
    icon: GraduationCap,
  },
  {
    id: 2,
    img: "",
    title: "Tecnicatura Superior en Programación",
    issuer: "Teclab",
    year: "2023",
    tags: ["Programación", "Desarrollo web"],
    icon: GraduationCap,
  },
  {
    id: 3,
    img: "",
    title: "Curso de Desarrollo Web",
    issuer: "Colegio Verbo Encarnado",
    year: "2022",
    tags: ["HTML", "CSS", "JavaScript"],
    icon: GraduationCap,
  },
];

export const EXPERIENCE = [
  {
    title: "Web Designer",
    company: "Freelance",
    period: "2022 - Presente",
    icon: Globe,
    tasks: [
      "Diseño de sitios web personalizados y responsivos.",
      "Trabajo directo con usuarios para identificar necesidades.",
      "Enfoque en experiencia de usuario (UX) y comunicación visual.",
    ],
  },
  {
    title: "Desarrolladora Freelance",
    company: "Múltiples Proyectos",
    period: "2023 - Presente",
    icon: Code,
    tasks: [
      "Creación de sitios web para emprendedores y pymes.",
      "SEO básico, configuración de dominios y hosting.",
      "Gestión completa del ciclo de vida de cada proyecto.",
    ],
  },
  {
    title: "Escuela de Enfermería M. E. Araya de Colombres",
    company: "Soporte Administrativo",
    period: "2023",
    icon: Briefcase,
    tasks: [
      "Organización de documentación física y digital.",
      "Atención al público y soporte administrativo.",
      "Planificación de eventos y elaboración de informes.",
    ],
  },
];

export const SKILL_GROUPS = [
  {
    level: "Avanzado",
    skills: ["React.js", "JavaScript", "HTML & CSS", "Comunicación y atención al usuario"],
  },
  {
    level: "Intermedio",
    skills: ["TypeScript", "Node.js / Express", "MongoDB / SQL", "UI/UX con Figma"],
  },
  {
    level: "En crecimiento",
    skills: ["n8n y automatizaciones con IA", "Python", "Power BI"],
  },
];

export const YEARS_EXPERIENCE = 4;

export const PROCESS = [
  { title: "Descubrir", text: "Entiendo tus objetivos, tu público y lo que necesitás resolver." },
  { title: "Definir", text: "Investigación, alcance y arquitectura del proyecto." },
  { title: "Diseñar", text: "Wireframes, prototipos en Figma e identidad visual." },
  { title: "Desarrollar", text: "Código limpio, responsive y con buenas prácticas." },
  { title: "Entregar", text: "Pruebas, optimización, deploy y acompañamiento." },
];


import { Globe, Code, Award, GraduationCap, Factory, Server } from "lucide-react";

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
    title: "N8N: Creá tu Agente de Inteligencia Artificial",
    issuer: "AcademiaQA",
    year: "2026",
    tags: ["n8n", "Agentes IA", "Automatización"],
    icon: GraduationCap,
  },
  {
    id: 6,
    img: "",
    title: "Data Center",
    issuer: "Elevify",
    year: "2026",
    tags: ["Infraestructura", "Servidores", "Redes"],
    icon: Server,
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
];

export const EDUCATION = [
  {
    id: "edu-ia",
    title: "Tecnicatura en Inteligencia Artificial",
    issuer: "Universidad Nacional de Rosario (UNR)",
    year: "2026 – Actualidad",
    detail: "En curso",
  },
  {
    id: "edu-utn",
    title: "Tecnicatura Universitaria en Programación",
    issuer: "Universidad Tecnológica Nacional · Rosario",
    year: "2024 – 2026",
  },
];

export const LANGUAGES = [
  { name: "Español", level: "Nativo" },
  { name: "Inglés", level: "B2" },
];

export const EXPERIENCE = [
  {
    title: "Sistemas para Producción y Soporte IT",
    company: "Amoblamientos Reno · Álvarez, Santa Fe",
    period: "Ene 2026 – Actualidad",
    icon: Factory,
    tasks: [
      "Desarrollo de tableros informativos y estadísticos conectados a la base productiva, validados con cada área.",
      "Consultas SQL para alimentar los tableros y resolución de errores de Odoo.",
      "Soporte técnico: reparación de PC, configuración de etiquetas de las máquinas y planillas Excel.",
      "Bots con IA y automatizaciones con n8n para la atención de consultas.",
    ],
    projects: [
      {
        name: "Sistema de Control de planta",
        text: "Escaneo por código de barras de cada pieza en 28 estaciones de toda la planta. Trazabilidad digital, avance y deuda de cada OP y etiquetas de despacho.",
        stack: ["Python", "Flask", "SQL Server"],
      },
      {
        name: "Vista General",
        text: "Análisis general de producción y Odoo: deuda, remisión, ventas y CRM.",
        stack: ["Flask", "pandas"],
      },
      {
        name: "Producción por hora",
        text: "Rendimiento por turno y máquina, paradas y cola de trabajo en vivo.",
        stack: ["Flask", "SQL Server"],
      },
      {
        name: "Reprocesos",
        text: "Porcentaje de reproceso por causa, máquina y material, con Pareto.",
        stack: ["Flask", "Chart.js"],
      },
      {
        name: "Tablero Comercial",
        text: "CRM de Odoo, objetivos vs. realizado y ranking de franquicias.",
        stack: ["Flask", "Odoo"],
      },
    ],
  },
  {
    title: "Desarrolladora Full-Stack",
    company: "Neura Sistemas · Software a medida para PyMEs · Remoto",
    period: "2026 – Actualidad",
    icon: Code,
    tasks: [
      "Más de 15 proyectos para PyMEs: webs, e-commerce, CRM y chatbots, con MercadoPago, Stripe y WhatsApp.",
      "Automatización con n8n y agentes de IA: hasta un 70% menos de tiempo en tareas manuales.",
    ],
  },
  {
    title: "Desarrolladora Full-Stack Freelance",
    company: "Webs y tiendas online a medida · Remoto",
    period: "2022 – Actualidad",
    icon: Globe,
    tasks: [
      "Sitios, tiendas online y sistemas a medida para emprendedores y PyMEs, de punta a punta.",
    ],
  },
];

export const SKILL_GROUPS = [
  { level: "Lenguajes", skills: ["Python", "JavaScript", "TypeScript", "SQL"] },
  {
    level: "Frameworks y librerías",
    skills: ["Flask", "React.js", "Node.js", "Express", "pandas", "Chart.js", "HTML5", "CSS3"],
  },
  { level: "Bases de datos", skills: ["SQL Server", "PostgreSQL", "MySQL", "MongoDB"] },
  {
    level: "Automatización e integraciones",
    skills: ["n8n", "Dify", "LLMs (OpenAI, Claude, Gemini)", "Odoo (XML-RPC)", "APIs REST"],
  },
  {
    level: "Procesos industriales",
    skills: ["Trazabilidad", "Indicadores (KPI)", "Mejora continua", "Causa raíz", "Costos de producción"],
  },
  { level: "Herramientas y DevOps", skills: ["Git", "Docker", "Linux", "Windows Server", "Excel"] },
];

export const YEARS_EXPERIENCE = 4;

export const PROCESS = [
  { title: "Descubrir", text: "Entiendo tus objetivos, tu público y lo que necesitás resolver." },
  { title: "Definir", text: "Investigación, alcance y arquitectura del proyecto." },
  { title: "Diseñar", text: "Wireframes, prototipos en Figma e identidad visual." },
  { title: "Desarrollar", text: "Código limpio, responsive y con buenas prácticas." },
  { title: "Entregar", text: "Pruebas, optimización, deploy y acompañamiento." },
];


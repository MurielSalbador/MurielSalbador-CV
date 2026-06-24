import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes, Briefcase, Cpu, Globe, GraduationCap } from "lucide-react";

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${
            isShowingMore
              ? "group-hover:-translate-y-0.5"
              : "group-hover:translate-y-0.5"
          }
        `}
      >
        <polyline
          points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}
        ></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div" sx={{ color: "white" }}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// techStacks tetap sama
const experienceItems = [
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
    title: "Desarrollador Freelance",
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
  }
];

const skillItems = [
  { name: "React.js", percent: 85 },
  { name: "JavaScript / TypeScript", percent: 80 },
  { name: "Node.js / Express", percent: 75 },
  { name: "MongoDB / SQL", percent: 70 },
  { name: "HTML & CSS", percent: 80 },
  { name: "UI/UX con Figma", percent: 75 },
  { name: "Comunicación y atención al usuario", percent: 95 },
];

const educationCertificates = [
  {
    id: "edu-1",
    Img: "", 
    title: "Tecnicatura Universitaria en Programación – UTN",
    date: "(2024 - 2025) — Promedio 8.0",
  },
  {
    id: "edu-2",
    Img: "",
    title: "Tecnicatura Superior en Programación – Teclabt",
    date: "(2023)",
  },
  {
    id: "edu-3",
    Img: "",
    title: "Curso de Desarrollo Web – Colegio Verbo Encarnado",
    date: "(2022)",
  },
  {
    id: "edu-4",
    Img: "/bio-robotica.png",
    title: "Diploma - Webinar de Bio-Robótica",
    date: "(2024)",
  },
];

const PROJECTS = [
  {
    id: 2,
    Title: "RubioHnos",
    Description: "Tienda online de tres hermanos que venden productos alimenticios saludables para el hogar.",
    Img: "/RubioHnos - Tienda Natural.png",
    Link: "https://rubio-hnos.vercel.app/",
    Github: ["https://github.com/MurielSalbador/RubioHnos.git"],
    Features: [
      "Seleccionamos cada producto con amor y compromiso para que vos y tu familia puedan disfrutar de una vida más sana y consciente.",
      "Desde granolas artesanales, barritas energéticas, té natural, yerbas orgánicas hasta miel pura y mucho más… todo pensado para acompañarte día a día con lo mejor de la naturaleza.",
    ],
    TechStack: ["React", "Vite", "Node", "MongoDB", "JavaScript", "CSS", "HTML", "SQLite"],
  },
  {
    id: 3,
    Title: "Stock AFIP - Depósitos Fiscales",
    Description: "Sistema full-stack moderno para gestionar el stock en depósitos fiscales con integración a los servicios de AFIP. Está estructurado como una aplicación web empaquetada para escritorio.",
    Img: "/AFIP.png",
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
    Title: "Zafiro Beauty",
    Description: "Plataforma web full-stack para gestionar y reservar turnos en un centro de depilación láser y tratamientos estéticos. Permite a los clientes agendar sesiones y realizar señas vía MercadoPago.",
    Img: "/ZafiroBeauty.png",
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
];

const CERTIFICATES = [
  { id: 4, img: "/bio-robotica.png",  title: "Diploma - Webinar de Bio-Robótica",                          date: "(2024)" },
  { id: 5, img: "/CERTIFICADO.png",   title: "Curso de N8N – Creá tu Agente de Inteligencia Artificial",   date: "(2025)" },
  { id: 1, img: "",                   title: "Tecnicatura Universitaria en Programación – UTN",             date: "(2024 - 2025) — Promedio 8.0" },
  { id: 2, img: "",                   title: "Tecnicatura Superior en Programación – Teclabt",              date: "(2023)" },
  { id: 3, img: "",                   title: "Curso de Desarrollo Web – Colegio Verbo Encarnado",           date: "(2022)" },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState(PROJECTS);
  const [certificates, setCertificates] = useState(CERTIFICATES);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({ once: false });
    localStorage.setItem("projects", JSON.stringify(PROJECTS));
    localStorage.setItem("certificates", JSON.stringify(CERTIFICATES));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = (type) => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev);
    } else {
      setShowAllCertificates((prev) => !prev);
    }
  };

  const displayedProjects = showAllProjects
    ? projects
    : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates
    ? certificates
    : certificates.slice(0, initialItems);

  // Sisa dari komponen (return statement) tidak ada perubahan
  return (
    <div
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden"
      id="Portafolio"
    >
      {/* Header section - unchanged */}
      <div
        className="text-center pb-10"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Presentación de portafolio
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explora mi trayectoria a través de proyectos, certificaciones y
          experiencia técnica. Cada sección representa un hito en mi trayectoria
          de aprendizaje continuo.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={
                <Code className="mb-2 w-5 h-5 transition-all duration-300" />
              }
              label="Proyectos"
              {...a11yProps(0)}
            />
            <Tab
              icon={
                <Award className="mb-2 w-5 h-5 transition-all duration-300" />
              }
              label="Certificados"
              {...a11yProps(1)}
            />
            <Tab
              icon={
                <Boxes className="mb-2 w-5 h-5 transition-all duration-300" />
              }
              label="Experiencia"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={
                      index % 3 === 0
                        ? "fade-up-right"
                        : index % 3 === 1
                        ? "fade-up"
                        : "fade-up-left"
                    }
                    data-aos-duration={
                      index % 3 === 0
                        ? "1000"
                        : index % 3 === 1
                        ? "1200"
                        : "1000"
                    }
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore("projects")}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={certificate.id || index}
                    data-aos={
                      index % 3 === 0
                        ? "fade-up-right"
                        : index % 3 === 1
                        ? "fade-up"
                        : "fade-up-left"
                    }
                    data-aos-duration={
                      index % 3 === 0
                        ? "1000"
                        : index % 3 === 1
                        ? "1200"
                        : "1000"
                    }
                  >
                    <Certificate
                      ImgSertif={certificate.img}
                      title={certificate.title}
                      date={certificate.date}
                    />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore("certificates")}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="max-w-6xl mx-auto px-4 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Timeline Experience */}
                <div className="space-y-10">
                  <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3" data-aos="fade-right">
                    <Briefcase className="w-6 h-6 text-[#6366f1]" />
                    Experiencia Profesional
                  </h3>
                  
                  <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    {experienceItems.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                        data-aos={idx % 2 === 0 ? "fade-right" : "fade-left"}
                      >
                        {/* Dot */}
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-[#030014] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                          <item.icon className="w-5 h-5 text-[#a855f7]" />
                        </div>
                        
                        {/* Card */}
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
                          <div className="flex items-center justify-between mb-2">
                             <div className="font-bold text-white text-lg">{item.title}</div>
                             <time className="text-xs font-medium text-slate-400 bg-white/5 py-1 px-2 rounded-full border border-white/10">{item.period}</time>
                          </div>
                          <div className="text-[#a855f7] text-sm font-medium mb-3">{item.company}</div>
                          <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside marker:text-[#6366f1]">
                            {item.tasks.map((task, tIdx) => (
                              <li key={tIdx} className="hover:text-slate-300 transition-colors uppercase tracking-tight text-[11px]">{task}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills & Education */}
                <div className="space-y-12">
                  <section>
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3" data-aos="fade-left">
                      <Boxes className="w-6 h-6 text-[#a855f7]" />
                      Habilidades Técnicas
                    </h3>
                    <div className="grid grid-cols-1 gap-4" data-aos="zoom-in-up">
                      {skillItems.map(({ name, percent }, idx) => (
                        <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                          <div className="flex justify-between mb-2 text-sm font-medium">
                            <span className="text-slate-300">{name}</span>
                            <span className="text-[#a855f7] font-bold">{percent}%</span>
                          </div>
                          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full transition-all duration-1000"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3" data-aos="fade-left">
                      <GraduationCap className="w-6 h-6 text-[#6366f1]" />
                      Educación y Trayectoria
                    </h3>
                    <div className="space-y-4">
                      {educationCertificates.map((edu, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all group"
                          data-aos="fade-up"
                        >
                          <div className="p-2 bg-[#6366f1]/10 rounded-lg group-hover:bg-[#6366f1]/20 transition-colors">
                            <Award className="w-6 h-6 text-[#6366f1]" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold text-sm">{edu.title}</h4>
                            <p className="text-slate-400 text-xs mt-1">{edu.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}

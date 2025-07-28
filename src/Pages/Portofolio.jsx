import React, { useEffect, useState, useCallback } from "react";

import { supabase } from "../supabase";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

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
    title: "Escuela de Enfermería María Elena Araya de Colombres",
    tasks: [
      "Organización de documentación física y digital.",
      "Atención al público y soporte administrativo.",
      "Planificación de eventos y elaboración de informes.",
      "Fortalecí habilidades de trabajo en equipo y comunicación.",
    ],
  },
  {
    title: "Soporte técnico y atención al cliente",
    tasks: [
      "Resolución de problemas técnicos a usuarios finales.",
      "Mejoras en procesos de soporte y documentación interna.",
      "Desarrollo de habilidades en empatía y solución ágil de incidencias.",
    ],
  },
  {
    title: "Web Designer",
    tasks: [
      "Diseño de sitios web personalizados y responsivos.",
      "Trabajo directo con usuarios para identificar necesidades.",
      "Enfoque en experiencia de usuario (UX) y comunicación visual.",
    ],
  },
  {
    title: "Desarrollador Freelance",
    tasks: [
      "Creación de sitios web para emprendedores y pymes.",
      "SEO básico, configuración de dominios y hosting.",
      "Gestión completa del ciclo de vida de cada proyecto.",
    ],
  },
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
    Img: "/img/utn.png", // o un ícono genérico
    title: "Tecnicatura Universitaria en Programación – UTN",
    date: "(2024 - 2025) — Promedio 8.0",
  },
  {
    id: "edu-2",
    Img: "/img/teclabt.png",
    title: "Tecnicatura Superior en Programación – Teclabt",
    date: "(2023)",
  },
  {
    id: "edu-3",
    Img: "/img/verbo.png",
    title: "Curso de Desarrollo Web – Colegio Verbo Encarnado",
    date: "(2022)",
  },
  {
    id: "edu-4",
    Img: "/img/biorobotica.png",
    title: "Diploma - Webinar de Bio-Robótica",
    date: "(2024)",
  },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      // Mengambil data dari Supabase secara paralel
      const [projectsResponse, certificatesResponse] = await Promise.all([
        supabase.from("projects").select("*").order("id", { ascending: true }),
        supabase
          .from("certificates")
          .select("*")
          .order("id", { ascending: true }),
      ]);

      // Error handling untuk setiap request
      if (projectsResponse.error) throw projectsResponse.error;
      if (certificatesResponse.error) throw certificatesResponse.error;

      // Supabase mengembalikan data dalam properti 'data'
      const projectData = projectsResponse.data || [];
      const certificateData = certificatesResponse.data || [];

      setProjects(projectData);
      console.log("Proyectos desde Supabase:", projectData);
      setCertificates(certificateData);

      // Store in localStorage (fungsionalitas ini tetap dipertahankan)
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  }, []);

  useEffect(() => {
    // Coba ambil dari localStorage dulu untuk laod lebih cepat
    const cachedProjects = localStorage.getItem("projects");
    const cachedCertificates = localStorage.getItem("certificates");

    if (cachedProjects && cachedCertificates) {
      setProjects(JSON.parse(cachedProjects));
      setCertificates(JSON.parse(cachedCertificates));
    }

    fetchData(); // Tetap panggil fetchData untuk sinkronisasi data terbaru
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev);
    } else {
      setShowAllCertificates((prev) => !prev);
    }
  }, []);

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
      id="Portofolio"
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
            <div className="max-w-5xl mx-auto px-4 py-6 text-white">
              <h3
                className="text-2xl font-semibold mb-6"
                data-aos="fade-down"
                data-aos-duration="800"
              >
                Experiencia
              </h3>
              <ol className="list-decimal list-inside space-y-6 mb-10">
                {experienceItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="mb-4"
                    data-aos="fade-up"
                    data-aos-duration={900 + idx * 100}
                  >
                    <h4 className="text-xl font-medium mb-2">{item.title}</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {item.tasks.map((task, tIdx) => (
                        <li key={tIdx}>{task}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>

              <section>
                <h3
                  className="text-2xl font-semibold mb-6"
                  data-aos="fade-down"
                  data-aos-duration="900"
                >
                  Mis habilidades
                </h3>
                <ul className="space-y-4">
                  {skillItems.map(({ name, percent }, idx) => (
                    <li
                      key={idx}
                      className="w-full"
                      data-aos="fade-up"
                      data-aos-duration={900 + idx * 100}
                    >
                      <div className="flex justify-between mb-1 font-medium">
                        {name} <span>{percent}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-600 rounded-full transition-all duration-700"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}

import { useState } from "react";
import Certificate from "../components/Certificate";
import ProjectShowcase from "../components/ProjectShowcase";
import { Code, Award, Boxes, Briefcase, GraduationCap } from "lucide-react";
import { CERTIFICATES, EXPERIENCE, EDUCATION, SKILL_GROUPS } from "../data/projects";

const TABS = [
  { label: "Proyectos", icon: Code },
  { label: "Certificados", icon: Award },
  { label: "Experiencia", icon: Boxes },
];

const HEADERS = [
  {
    title: "Mis Proyectos",
    subtitle:
      "Explora mi trabajo y descubre cómo convierto ideas en soluciones reales. Cada proyecto representa un desafío, un aprendizaje y un resultado.",
  },
  {
    title: "Certificados",
    subtitle: "Formación, cursos y logros que respaldan mi crecimiento profesional.",
  },
  {
    title: "Experiencia",
    subtitle: "Mi recorrido profesional, habilidades técnicas y trayectoria educativa.",
  },
];

const aosByIndex = (index) => ({
  "data-aos": index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left",
  "data-aos-duration": index % 3 === 1 ? "1200" : "1000",
});

export default function Portofolio() {
  const [activeTab, setActiveTab] = useState(0);

  // Certificados: con imagen van arriba; sin imagen completan la primera fila
  // como tarjeta destacada y el resto pasa a tarjetas anchas.
  const imageCerts = CERTIFICATES.filter((c) => c.img && c.img.trim() !== "");
  const textCerts = CERTIFICATES.filter((c) => !c.img || c.img.trim() === "");
  const highlightCerts = textCerts.slice(0, Math.max(0, 3 - imageCerts.length));
  const wideCerts = textCerts.slice(highlightCerts.length);
  const topRowCerts = [...imageCerts, ...highlightCerts];

  const header = HEADERS[activeTab];

  return (
    <div
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden"
      id="Portafolio"
    >
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <p className="text-[#a78bfa] text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-3">
          Mi Trayectoria
        </p>
        <h2 className="inline-block text-4xl md:text-6xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-white via-[#c4b5fd] to-[#a855f7]">
          {header.title}
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-4">
          {header.subtitle}
        </p>
        <div className="mt-6 flex items-center justify-center">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#a855f7]/60" />
          <span className="mx-1 w-1.5 h-1.5 rounded-full bg-[#a78bfa]" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#a855f7]/60" />
        </div>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Secciones del portafolio"
        className="relative flex max-w-4xl mx-auto border-b border-white/10"
      >
        {TABS.map((tab, index) => {
          const isActive = activeTab === index;
          return (
            <button
              key={tab.label}
              role="tab"
              id={`portfolio-tab-${index}`}
              aria-selected={isActive}
              aria-controls={`portfolio-panel-${index}`}
              onClick={() => setActiveTab(index)}
              className={`relative flex-1 flex flex-col items-center gap-2 py-5 px-2 text-sm md:text-base font-semibold transition-all duration-300 ${
                isActive ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <tab.icon
                className={`w-6 h-6 transition-all duration-300 ${
                  isActive ? "text-[#a78bfa]" : ""
                }`}
              />
              {tab.label}
              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] transition-all duration-300 ${
                  isActive ? "w-28 opacity-100" : "w-0 opacity-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Proyectos */}
      <div
        role="tabpanel"
        id="portfolio-panel-0"
        aria-labelledby="portfolio-tab-0"
        hidden={activeTab !== 0}
        className="py-10 md:py-14"
      >
        <ProjectShowcase />
      </div>

      {/* Certificados */}
      <div
        role="tabpanel"
        id="portfolio-panel-1"
        aria-labelledby="portfolio-tab-1"
        hidden={activeTab !== 1}
        className="py-6 md:py-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4 items-stretch">
            {topRowCerts.map((certificate, index) => (
              <div key={certificate.id} className="h-full" {...aosByIndex(index)}>
                <Certificate
                  ImgSertif={certificate.img}
                  title={certificate.title}
                  date={certificate.date}
                  icon={certificate.icon}
                />
              </div>
            ))}
          </div>

          {wideCerts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 gap-4 md:mt-5 mt-4 items-stretch">
              {wideCerts.map((certificate, index) => (
                <div
                  key={certificate.id}
                  className="h-full"
                  data-aos={index % 2 === 0 ? "fade-up-right" : "fade-up-left"}
                  data-aos-duration="1000"
                >
                  <Certificate
                    ImgSertif={certificate.img}
                    title={certificate.title}
                    date={certificate.date}
                    icon={certificate.icon}
                    variant="wide"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Experiencia */}
      <div
        role="tabpanel"
        id="portfolio-panel-2"
        aria-labelledby="portfolio-tab-2"
        hidden={activeTab !== 2}
        className="py-6 md:py-8"
      >
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Timeline Experience */}
            <div className="space-y-10">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3" data-aos="fade-right">
                <Briefcase className="w-6 h-6 text-[#6366f1]" />
                Experiencia Profesional
              </h3>

              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {EXPERIENCE.map((item, idx) => (
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
                          <li key={tIdx} className="hover:text-slate-300 transition-colors">{task}</li>
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
                  {SKILL_GROUPS.map(({ level, skills }) => (
                    <div key={level} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                      <p className="text-[#a78bfa] text-sm font-bold mb-3">{level}</p>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 text-xs rounded-full bg-[#6366f1]/10 text-slate-300 border border-[#6366f1]/20 hover:border-[#6366f1]/40 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
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
                  {EDUCATION.map((edu) => (
                    <div
                      key={edu.id}
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
      </div>
    </div>
  );
}

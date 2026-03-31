SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: certificates; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."certificates" ("id", "img", "title", "date") VALUES
	(1, '', 'Tecnicatura Universitaria en Programaci├│n ÔÇô UTN', '(2024 - 2025) ÔÇö Promedio 8.0'),
	(2, '', 'Tecnicatura Superior en Programaci├│n ÔÇô Teclabt', '(2023)'),
	(3, '', 'Curso de Desarrollo Web ÔÇô Colegio Verbo Encarnado', '(2022)'),
	(4, 'http://127.0.0.1:54321/storage/v1/object/public/project-images/bio-robotica.png', 'Diploma - Webinar de Bio-Rob├│tica', '(2024)'),
	(5, 'http://127.0.0.1:54321/storage/v1/object/public/project-images/bio-robotica.png', 'Curso de N8N ÔÇô Cre├í tu Agente de Inteligencia Artificial', '(2025)');


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."projects" ("id", "created_at", "Title", "Description", "Img", "Link", "Github", "Features", "TechStack") VALUES
	(2, '2025-07-28 15:38:48.385699+00', 'RubioHnos', 'Tienda online de tres hermanos que venden productos alimenticios saludables para el hogar.', 'http://127.0.0.1:54321/storage/v1/object/public/project-images/RubioHnos%20-%20Tienda%20Natural.png', 'https://rubio-hnos.vercel.app/', '["https://github.com/MurielSalbador/RubioHnos.git"]', '["Seleccionamos cada producto con amor y compromiso para que vos y tu familia puedan disfrutar de una vida m├ís sana y consciente.", "Desde granolas artesanales, barritas energ├®ticas, t├® natural, yerbas org├ínicas hasta miel pura y mucho m├ísÔÇª todo pensado para acompa├▒arte d├¡a a d├¡a con lo mejor de la naturaleza."]', '["React", "Vite", "Node", "MongoDB", "JavaScript", "CSS", "HTML", "SQLite"]'),
	(3, '2026-03-31 17:28:16.359251+00', 'Stock AFIP - Dep├│sitos Fiscales', 'Sistema full-stack moderno para gestionar el stock en dep├│sitos fiscales con integraci├│n a los servicios de AFIP. Est├í estructurado como una aplicaci├│n web empaquetada para escritorio.', 'http://127.0.0.1:54321/storage/v1/object/public/project-images/AFIP.png', '', '[]', '["Arquitectura de tres capas (Frontend, Aplicaci├│n, Datos)", "Ejecuci├│n nativa en Windows con Electron", "Integraci├│n con servicios SOAP de AFIP", "Visualizaci├│n de datos con Recharts", "Tareas programadas con Node-cron", "Seguridad con JWT y Bcrypt", "Gesti├│n de migraciones con Prisma"]', '["React 19", "TypeScript", "Vite", "Node.js", "Express 5", "Prisma", "PostgreSQL", "Electron"]');


--
-- Name: certificates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."certificates_id_seq"', 5, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."projects_id_seq"', 3, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;

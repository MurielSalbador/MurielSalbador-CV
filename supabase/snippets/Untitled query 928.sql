-- Syncing Certificates
TRUNCATE public.certificates;
INSERT INTO "public"."certificates" ("id", "img", "title", "date") VALUES
	(1, '', 'Tecnicatura Universitaria en Programación – UTN', '(2024 - 2025) — Promedio 8.0'),
	(2, '', 'Tecnicatura Superior en Programación – Teclabt', '(2023)'),
	(3, '', 'Curso de Desarrollo Web – Colegio Verbo Encarnado', '(2022)'),
	(4, 'https://nphhwxzshqjgragcmqov.supabase.co/storage/v1/object/public/project-images/bio-robotica.png', 'Diploma - Webinar de Bio-Robótica', '(2024)'),
	(5, 'https://nphhwxzshqjgragcmqov.supabase.co/storage/v1/object/public/project-images/CERTIFICADO.png', 'Curso de N8N – Creá tu Agente de Inteligencia Artificial', '(2025)');

-- Syncing Projects
TRUNCATE public.projects;
INSERT INTO "public"."projects" ("id", "created_at", "Title", "Description", "Img", "Link", "Github", "Features", "TechStack") VALUES
	(2, '2025-07-28 15:38:48.385699+00', 'RubioHnos', 'Tienda online de tres hermanos que venden productos alimenticios saludables para el hogar.', 'https://nphhwxzshqjgragcmqov.supabase.co/storage/v1/object/public/project-images/RubioHnos%20-%20Tienda%20Natural.png', 'https://rubio-hnos.vercel.app/', '["https://github.com/MurielSalbador/RubioHnos.git"]', '["Seleccionamos cada producto con amor y compromiso para que vos y tu familia puedan disfrutar de una vida más sana y consciente.", "Desde granolas artesanales, barritas energéticas, té natural, yerbas orgánicas hasta miel pura y mucho más… todo pensado para acompañarte día a día con lo mejor de la naturaleza."]', '["React", "Vite", "Node", "MongoDB", "JavaScript", "CSS", "HTML", "SQLite"]'),
	(3, '2026-03-31 17:28:16.359251+00', 'Stock AFIP - Depósitos Fiscales', 'Sistema full-stack moderno para gestionar el stock en depósitos fiscales con integración a los servicios de AFIP. Está estructurado como una aplicación web empaquetada para escritorio.', 'https://nphhwxzshqjgragcmqov.supabase.co/storage/v1/object/public/project-images/AFIP.png', '', '[]', '["Arquitectura de tres capas (Frontend, Aplicación, Datos)", "Ejecución nativa en Windows con Electron", "Integración con servicios SOAP de AFIP", "Visualización de datos con Recharts", "Tareas programadas con Node-cron", "Seguridad con JWT y Bcrypt", "Gestión de migraciones con Prisma"]', '["React 19", "TypeScript", "Vite", "Node.js", "Express 5", "Prisma", "PostgreSQL", "Electron"]');

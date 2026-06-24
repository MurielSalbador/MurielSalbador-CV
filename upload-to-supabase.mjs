import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Leer variables de entorno del .env.local
function loadEnv() {
  const envPath = join(__dirname, '.env.local');
  const content = readFileSync(envPath, 'utf-8');
  const env = {};
  for (const line of content.split('\n')) {
    const [key, ...rest] = line.split('=');
    if (key && rest.length) env[key.trim()] = rest.join('=').trim();
  }
  return env;
}

const env = loadEnv();
const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('❌ Falta SUPABASE_SERVICE_ROLE_KEY en .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const IMAGES = [
  { local: 'AFIP.png',                       remote: 'AFIP.png' },
  { local: 'bio-robotica.png',               remote: 'bio-robotica.png' },
  { local: 'CERTIFICADO.png',               remote: 'CERTIFICADO.png' },
  { local: 'RubioHnos - Tienda Natural.png', remote: 'RubioHnos - Tienda Natural.png' },
];

const IMAGES_DIR = String.raw`C:\Users\Muriel\AppData\Local\Temp\claude\c--Users-Muriel-Downloads-Portafolio\51e15314-8391-47bf-aee4-6624be7ada30\scratchpad\images`;

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some(b => b.name === 'project-images');

  if (!exists) {
    const { error } = await supabase.storage.createBucket('project-images', { public: true });
    if (error) throw new Error(`Error creando bucket: ${error.message}`);
    console.log('✅ Bucket "project-images" creado');
  } else {
    console.log('ℹ️  Bucket "project-images" ya existe');
  }
}

async function uploadImages() {
  for (const img of IMAGES) {
    const filePath = join(IMAGES_DIR, img.local);
    if (!existsSync(filePath)) {
      console.warn(`⚠️  No encontrado: ${img.local}`);
      continue;
    }

    const fileBuffer = readFileSync(filePath);
    const contentType = img.local.endsWith('.png') ? 'image/png' : 'image/jpeg';

    const { error } = await supabase.storage
      .from('project-images')
      .upload(img.remote, fileBuffer, { contentType, upsert: true });

    if (error) {
      console.error(`❌ Error subiendo ${img.local}: ${error.message}`);
    } else {
      const { data } = supabase.storage.from('project-images').getPublicUrl(img.remote);
      console.log(`✅ ${img.local} → ${data.publicUrl}`);
    }
  }
}

const BASE_URL = `${SUPABASE_URL}/storage/v1/object/public/project-images`;

async function seedData() {
  // Insertar certificados
  const { error: certError } = await supabase.from('certificates').upsert([
    { id: 1, img: '',                                              title: 'Tecnicatura Universitaria en Programación – UTN',              date: '(2024 - 2025) — Promedio 8.0' },
    { id: 2, img: '',                                              title: 'Tecnicatura Superior en Programación – Teclabt',               date: '(2023)' },
    { id: 3, img: '',                                              title: 'Curso de Desarrollo Web – Colegio Verbo Encarnado',             date: '(2022)' },
    { id: 4, img: `${BASE_URL}/bio-robotica.png`,                  title: 'Diploma - Webinar de Bio-Robótica',                            date: '(2024)' },
    { id: 5, img: `${BASE_URL}/CERTIFICADO.png`,                   title: 'Curso de N8N – Creá tu Agente de Inteligencia Artificial',     date: '(2025)' },
  ], { onConflict: 'id' });

  if (certError) console.error('❌ Error insertando certificados:', certError.message);
  else console.log('✅ Certificados insertados');

  // Insertar proyectos
  const { error: projError } = await supabase.from('projects').upsert([
    {
      id: 2,
      Title: 'RubioHnos',
      Description: 'Tienda online de tres hermanos que venden productos alimenticios saludables para el hogar.',
      Img: `${BASE_URL}/RubioHnos - Tienda Natural.png`,
      Link: 'https://rubio-hnos.vercel.app/',
      Github: '["https://github.com/MurielSalbador/RubioHnos.git"]',
      Features: '["Seleccionamos cada producto con amor y compromiso para que vos y tu familia puedan disfrutar de una vida más sana y consciente.", "Desde granolas artesanales, barritas energéticas, té natural, yerbas orgánicas hasta miel pura y mucho más… todo pensado para acompañarte día a día con lo mejor de la naturaleza."]',
      TechStack: '["React", "Vite", "Node", "MongoDB", "JavaScript", "CSS", "HTML", "SQLite"]',
    },
    {
      id: 3,
      Title: 'Stock AFIP - Depósitos Fiscales',
      Description: 'Sistema full-stack moderno para gestionar el stock en depósitos fiscales con integración a los servicios de AFIP. Está estructurado como una aplicación web empaquetada para escritorio.',
      Img: `${BASE_URL}/AFIP.png`,
      Link: '',
      Github: '[]',
      Features: '["Arquitectura de tres capas (Frontend, Aplicación, Datos)", "Ejecución nativa en Windows con Electron", "Integración con servicios SOAP de AFIP", "Visualización de datos con Recharts", "Tareas programadas con Node-cron", "Seguridad con JWT y Bcrypt", "Gestión de migraciones con Prisma"]',
      TechStack: '["React 19", "TypeScript", "Vite", "Node.js", "Express 5", "Prisma", "PostgreSQL", "Electron"]',
    },
  ], { onConflict: 'id' });

  if (projError) console.error('❌ Error insertando proyectos:', projError.message);
  else console.log('✅ Proyectos insertados');
}

async function main() {
  console.log('🚀 Iniciando upload a Supabase...\n');
  await ensureBucket();
  await uploadImages();
  await seedData();
  console.log('\n🎉 ¡Listo!');
}

main().catch(console.error);

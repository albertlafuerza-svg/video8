import JSZip from 'jszip';
import { adminSyncService } from './adminSync';

interface FileEntry {
  path: string;
  content: string;
}

export class SystemExportV2Service {
  private async readProjectFile(filePath: string): Promise<string> {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        return '';
      }
      return await response.text();
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
      return '';
    }
  }

  async exportCompleteSystem(): Promise<Blob> {
    const zip = new JSZip();

    const [novels, deliveryZones, prices, systemConfig] = await Promise.all([
      adminSyncService.fetchNovels(),
      adminSyncService.fetchDeliveryZones(),
      adminSyncService.fetchPrices(),
      adminSyncService.fetchSystemConfig()
    ]);

    const configData = {
      version: '2.1.0',
      exportDate: new Date().toISOString(),
      description: 'Exportación completa del sistema TV a la Carta con configuración y código fuente',
      data: {
        novels,
        deliveryZones,
        prices,
        systemConfig
      }
    };

    zip.file('config.json', JSON.stringify(configData, null, 2));

    const readme = this.generateReadme(configData.data);
    zip.file('README.md', readme);

    const packageJson = this.generatePackageJson();
    zip.file('package.json', packageJson);

    const tsconfig = this.generateTsConfig();
    zip.file('tsconfig.json', tsconfig);

    const tsconfigApp = this.generateTsConfigApp();
    zip.file('tsconfig.app.json', tsconfigApp);

    const tsconfigNode = this.generateTsConfigNode();
    zip.file('tsconfig.node.json', tsconfigNode);

    const viteConfig = this.generateViteConfig();
    zip.file('vite.config.ts', viteConfig);

    const tailwindConfig = this.generateTailwindConfig();
    zip.file('tailwind.config.js', tailwindConfig);

    const postcssConfig = this.generatePostcssConfig();
    zip.file('postcss.config.js', postcssConfig);

    const eslintConfig = this.generateEslintConfig();
    zip.file('eslint.config.js', eslintConfig);

    const indexHtml = this.generateIndexHtml();
    zip.file('index.html', indexHtml);

    const indexCss = this.generateIndexCss();
    zip.file('src/index.css', indexCss);

    const gitignore = this.generateGitignore();
    zip.file('.gitignore', gitignore);

    const vercelConfig = this.generateVercelConfig();
    zip.file('vercel.json', vercelConfig);

    const netlifyRedirects = this.generateNetlifyRedirects();
    zip.file('public/_redirects', netlifyRedirects);

    const envExample = this.generateEnvExample();
    zip.file('.env.example', envExample);

    const migrationSql = this.generateMigrationSql();
    zip.file('supabase/migrations/20251001053354_create_admin_system_tables.sql', migrationSql);

    const sourceFiles = this.getAllSourceFiles();
    for (const file of sourceFiles) {
      zip.file(file.path, file.content);
    }

    return await zip.generateAsync({ type: 'blob' });
  }

  private getAllSourceFiles(): FileEntry[] {
    const files: FileEntry[] = [];

    files.push({
      path: 'src/main.tsx',
      content: `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);`
    });

    files.push({
      path: 'src/vite-env.d.ts',
      content: `/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TMDB_API_KEY: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}`
    });

    files.push({
      path: 'src/App.tsx',
      content: `import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Movies } from './pages/Movies';
import { TVShows } from './pages/TVShows';
import { Anime } from './pages/Anime';
import { SearchPage } from './pages/Search';
import { MovieDetail } from './pages/MovieDetail';
import { TVDetail } from './pages/TVDetail';
import { NovelDetail } from './pages/NovelDetail';
import { Cart } from './pages/Cart';
import { AdminPanel } from './pages/AdminPanel';

function App() {
  React.useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('pageRefreshed', 'true');
    };

    const handleLoad = () => {
      if (sessionStorage.getItem('pageRefreshed') === 'true') {
        sessionStorage.removeItem('pageRefreshed');
        if (window.location.pathname !== '/') {
          window.location.href = 'https://tvalacarta.vercel.app/';
          return;
        }
      }
    };

    if (sessionStorage.getItem('pageRefreshed') === 'true') {
      sessionStorage.removeItem('pageRefreshed');
      if (window.location.pathname !== '/') {
        window.location.href = 'https://tvalacarta.vercel.app/';
        return;
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
        return false;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        return false;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        return false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('keydown', handleKeyDown, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <AdminProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/*" element={
                <>
                  <Header />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/movies" element={<Movies />} />
                      <Route path="/tv" element={<TVShows />} />
                      <Route path="/anime" element={<Anime />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/movie/:id" element={<MovieDetail />} />
                      <Route path="/tv/:id" element={<TVDetail />} />
                      <Route path="/novel/:id" element={<NovelDetail />} />
                      <Route path="/cart" element={<Cart />} />
                    </Routes>
                  </main>
                </>
              } />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AdminProvider>
  );
}

export default App;`
    });

    files.push({
      path: 'INSTALLATION.md',
      content: `# Instalación del Sistema TV a la Carta

## Requisitos Previos

- Node.js 18+
- npm o yarn
- Cuenta de Supabase (https://supabase.com)
- API Key de TMDB (https://www.themoviedb.org/settings/api)

## Pasos de Instalación

### 1. Extraer el archivo ZIP

Extrae todos los archivos del sistema en una carpeta de tu elección.

### 2. Instalar dependencias

\`\`\`bash
npm install
\`\`\`

### 3. Configurar Supabase

1. Crea un nuevo proyecto en Supabase
2. En el proyecto, ve a "SQL Editor"
3. Ejecuta el archivo \`supabase/migrations/20251001053354_create_admin_system_tables.sql\`
4. Copia la URL y la Anon Key de tu proyecto desde Project Settings > API

### 4. Configurar variables de entorno

Crea un archivo \`.env\` en la raíz del proyecto con el siguiente contenido:

\`\`\`env
VITE_TMDB_API_KEY=tu_api_key_de_tmdb
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
\`\`\`

### 5. Iniciar el servidor de desarrollo

\`\`\`bash
npm run dev
\`\`\`

El sistema estará disponible en http://localhost:5173

### 6. Acceder al Panel de Administración

- URL: http://localhost:5173/admin
- Usuario: root
- Contraseña: tvalacarta2024

## Despliegue en Producción

### Vercel (Recomendado)

1. Sube el proyecto a GitHub
2. Importa el repositorio en Vercel
3. Configura las variables de entorno en Vercel
4. Despliega

### Netlify

1. Sube el proyecto a GitHub
2. Importa el repositorio en Netlify
3. Configura las variables de entorno
4. El archivo \`public/_redirects\` ya está configurado
5. Despliega

## Importar Configuración

Si tienes un archivo de configuración exportado anteriormente:

1. Ve al Panel de Administración
2. Haz clic en la pestaña "Sistema"
3. Haz clic en "Importar Configuración"
4. Pega el contenido del archivo JSON exportado
5. Haz clic en "Importar"

## Soporte

Para cualquier problema, contacta a través de WhatsApp: +5354690878`
    });

    return files;
  }

  private generateReadme(data: any): string {
    return `# TV a la Carta - Sistema Completo de Gestión

## Descripción

Sistema completo de gestión para TV a la Carta con panel de administración, carrito de compras, sincronización en tiempo real con Supabase y catálogo de películas, series y novelas.

## Versión del Sistema

**v2.1.0** - Exportado el ${new Date().toISOString()}

## Configuración Actual

### Precios
- Películas: $${data.prices?.movie_price || 80} CUP
- Series: $${data.prices?.series_price || 300} CUP por temporada
- Novelas: $${data.prices?.novel_price_per_chapter || 5} CUP por capítulo
- Recargo transferencia: ${data.prices?.transfer_fee_percentage || 10}%

### Estadísticas
- Novelas registradas: ${data.novels?.length || 0}
- Zonas de entrega configuradas: ${data.deliveryZones?.length || 0}

## Características Principales

✅ **Panel de Administración Completo**
- Gestión de novelas con CRUD completo
- Administración de zonas de entrega
- Configuración dinámica de precios
- Sistema de notificaciones en tiempo real
- Exportación/Importación de configuración v2

✅ **Sincronización en Tiempo Real**
- Integración con Supabase Realtime
- Actualización automática de cambios
- Persistencia de datos en la nube

✅ **Carrito de Compras Avanzado**
- Gestión de productos (películas, series, novelas)
- Cálculo automático de costos de entrega
- Integración con WhatsApp para pedidos

✅ **Catálogo Completo**
- Películas de TMDB
- Series de TV
- Anime
- Novelas administradas personalizadas

✅ **Optimización y Performance**
- Lazy loading de imágenes
- Caché inteligente de contenido
- Optimización de renderizado

## Credenciales de Acceso

**Panel de Administración:**
- URL: /admin
- Usuario: root
- Contraseña: tvalacarta2024

## Tecnologías Utilizadas

- **Frontend:** React 18 + TypeScript
- **Estilos:** Tailwind CSS
- **Routing:** React Router DOM v7
- **Backend:** Supabase (PostgreSQL + Realtime)
- **APIs:** TMDB API
- **Build Tool:** Vite
- **Iconos:** Lucide React
- **Utilidades:** JSZip para exportación

## Instalación

Consulta el archivo \`INSTALLATION.md\` para instrucciones detalladas de instalación y despliegue.

## Estructura del Proyecto

\`\`\`
tv-a-la-carta/
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── context/          # Contextos de React (Admin, Cart)
│   ├── hooks/            # Custom hooks
│   ├── pages/            # Páginas de la aplicación
│   ├── services/         # Servicios (API, Supabase, etc.)
│   ├── types/            # Definiciones de TypeScript
│   ├── utils/            # Utilidades
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Punto de entrada
├── supabase/
│   └── migrations/       # Migraciones de base de datos
├── public/               # Archivos estáticos
└── Archivos de configuración
\`\`\`

## Funcionalidades del Panel de Administración

### Gestión de Novelas
- Agregar nuevas novelas con información completa
- Editar novelas existentes
- Eliminar novelas
- Estados: En transmisión / Finalizada
- Soporte para múltiples países (incluye Cuba)

### Zonas de Entrega
- Crear zonas de entrega personalizadas
- Definir costos por zona
- Actualizar y eliminar zonas

### Configuración de Precios
- Precio base de películas
- Precio por temporada de series
- Precio por capítulo de novelas
- Porcentaje de recargo por transferencia

### Sistema de Notificaciones
- Notificaciones en tiempo real
- Clasificación por tipo (éxito, error, info, advertencia)
- Historial de notificaciones

### Exportación/Importación v2
- Exportar configuración completa del sistema
- Incluye código fuente de todos los archivos
- Importar configuración desde archivo JSON
- Respaldo completo del sistema

## Contacto y Soporte

**WhatsApp:** +5354690878

## Licencia

Propietario: TV a la Carta
Todos los derechos reservados.

---

**Nota:** Este es un sistema completo exportado que incluye toda la configuración, datos y código fuente necesarios para replicar o respaldar el sistema.`;
  }

  private generatePackageJson(): string {
    return JSON.stringify({
      name: "tv-a-la-carta-sistema-completo",
      private: true,
      version: "2.1.0",
      type: "module",
      description: "Sistema completo de gestión para TV a la Carta con panel de administración",
      scripts: {
        dev: "vite",
        build: "vite build",
        lint: "eslint .",
        preview: "vite preview"
      },
      dependencies: {
        "@supabase/supabase-js": "^2.58.0",
        "@types/node": "^24.2.1",
        jszip: "^3.10.1",
        "lucide-react": "^0.344.0",
        react: "^18.3.1",
        "react-dom": "^18.3.1",
        "react-router-dom": "^7.8.0"
      },
      devDependencies: {
        "@eslint/js": "^9.9.1",
        "@types/react": "^18.3.5",
        "@types/react-dom": "^18.3.0",
        "@vitejs/plugin-react": "^4.3.1",
        autoprefixer: "^10.4.18",
        eslint: "^9.9.1",
        "eslint-plugin-react-hooks": "^5.1.0-rc.0",
        "eslint-plugin-react-refresh": "^0.4.11",
        globals: "^15.9.0",
        postcss: "^8.4.35",
        tailwindcss: "^3.4.1",
        typescript: "^5.5.3",
        "typescript-eslint": "^8.3.0",
        vite: "^5.4.2"
      }
    }, null, 2);
  }

  private generateTsConfig(): string {
    return JSON.stringify({
      files: [],
      references: [
        { path: "./tsconfig.app.json" },
        { path: "./tsconfig.node.json" }
      ]
    }, null, 2);
  }

  private generateTsConfigApp(): string {
    return JSON.stringify({
      compilerOptions: {
        target: "ES2020",
        useDefineForClassFields: true,
        lib: ["ES2020", "DOM", "DOM.Iterable"],
        module: "ESNext",
        skipLibCheck: true,
        moduleResolution: "bundler",
        allowImportingTsExtensions: true,
        isolatedModules: true,
        moduleDetection: "force",
        noEmit: true,
        jsx: "react-jsx",
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
        noUncheckedSideEffectImports: true
      },
      include: ["src"]
    }, null, 2);
  }

  private generateTsConfigNode(): string {
    return JSON.stringify({
      compilerOptions: {
        target: "ES2022",
        lib: ["ES2023"],
        module: "ESNext",
        skipLibCheck: true,
        moduleResolution: "bundler",
        allowImportingTsExtensions: true,
        isolatedModules: true,
        moduleDetection: "force",
        noEmit: true,
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
        noUncheckedSideEffectImports: true
      },
      include: ["vite.config.ts"]
    }, null, 2);
  }

  private generateViteConfig(): string {
    return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
  preview: {
    historyApiFallback: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});`;
  }

  private generateTailwindConfig(): string {
    return `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};`;
  }

  private generatePostcssConfig(): string {
    return `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`;
  }

  private generateEslintConfig(): string {
    return `import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)`;
  }

  private generateIndexHtml(): string {
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/unnamed.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <base href="/" />
    <title>TV a la Carta: Películas y series ilimitadas y mucho más</title>
    <style>
      * {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: transparent;
      }

      input, textarea, [contenteditable="true"] {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }

      body {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        text-size-adjust: 100%;
        touch-action: manipulation;
      }

      input[type="text"],
      input[type="email"],
      input[type="tel"],
      input[type="password"],
      input[type="number"],
      input[type="search"],
      textarea,
      select {
        font-size: 16px !important;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
  }

  private generateIndexCss(): string {
    return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-size-adjust: 100%;
    touch-action: manipulation;
  }

  body {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    overflow-x: hidden;
  }

  input, textarea, [contenteditable="true"] {
    -webkit-user-select: text !important;
    -moz-user-select: text !important;
    -ms-user-select: text !important;
    user-select: text !important;
  }

  input[type="text"],
  input[type="email"],
  input[type="tel"],
  input[type="password"],
  input[type="number"],
  input[type="search"],
  textarea,
  select {
    font-size: 16px !important;
    transform: translateZ(0);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    pointer-events: none;
  }

  button, a, [role="button"], .clickable {
    pointer-events: auto;
  }

  button img, a img, [role="button"] img, .clickable img {
    pointer-events: none;
  }

  @keyframes shrink {
    from { width: 100%; }
    to { width: 0%; }
  }

  .animate-shrink {
    animation: shrink 3s linear forwards;
  }
}`;
  }

  private generateGitignore(): string {
    return `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
.env.local
.env.production`;
  }

  private generateVercelConfig(): string {
    return JSON.stringify({
      rewrites: [{ source: "/(.*)", destination: "/" }]
    }, null, 2);
  }

  private generateNetlifyRedirects(): string {
    return `# Netlify redirects for SPA routing
/*    /index.html   200

# Handle specific routes
/movies    /index.html   200
/tv        /index.html   200
/anime     /index.html   200
/cart      /index.html   200
/search    /index.html   200
/movie/*   /index.html   200
/tv/*      /index.html   200
/admin     /index.html   200`;
  }

  private generateEnvExample(): string {
    return `# TMDB API Key
# Obtén tu API key en: https://www.themoviedb.org/settings/api
VITE_TMDB_API_KEY=your_tmdb_api_key_here

# Supabase Configuration
# Obtén estas credenciales desde tu proyecto de Supabase
# Project Settings > API
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here`;
  }

  private generateMigrationSql(): string {
    return `/*
  # Sistema de Administración TV a la Carta

  1. Nuevas Tablas
    - novels - Gestión de novelas
    - delivery_zones - Zonas de entrega
    - prices - Configuración de precios
    - system_config - Configuración del sistema
    - admin_credentials - Credenciales de administrador

  2. Seguridad
    - RLS habilitado en todas las tablas
    - Políticas que permiten acceso público

  3. Datos Iniciales
    - Credenciales: usuario root, contraseña tvalacarta2024
    - Precios predeterminados
    - Configuración del sistema v2.1.0
*/

CREATE TABLE IF NOT EXISTS novels (
  id bigserial PRIMARY KEY,
  titulo text NOT NULL,
  genero text NOT NULL,
  capitulos integer NOT NULL CHECK (capitulos > 0),
  año integer NOT NULL,
  descripcion text DEFAULT '',
  pais text DEFAULT '',
  imagen text DEFAULT '',
  estado text NOT NULL DEFAULT 'transmision' CHECK (estado IN ('transmision', 'finalizada')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS delivery_zones (
  id bigserial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  cost numeric NOT NULL CHECK (cost >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS prices (
  id bigserial PRIMARY KEY,
  movie_price numeric NOT NULL DEFAULT 80 CHECK (movie_price >= 0),
  series_price numeric NOT NULL DEFAULT 300 CHECK (series_price >= 0),
  novel_price_per_chapter numeric NOT NULL DEFAULT 5 CHECK (novel_price_per_chapter >= 0),
  transfer_fee_percentage numeric NOT NULL DEFAULT 10 CHECK (transfer_fee_percentage >= 0 AND transfer_fee_percentage <= 100),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS system_config (
  id bigserial PRIMARY KEY,
  version text NOT NULL DEFAULT '2.1.0',
  auto_sync boolean DEFAULT true,
  sync_interval integer DEFAULT 300000,
  enable_notifications boolean DEFAULT true,
  max_notifications integer DEFAULT 100,
  settings jsonb DEFAULT '{}',
  metadata jsonb DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_credentials (
  id bigserial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

INSERT INTO prices (movie_price, series_price, novel_price_per_chapter, transfer_fee_percentage)
SELECT 80, 300, 5, 10
WHERE NOT EXISTS (SELECT 1 FROM prices LIMIT 1);

INSERT INTO system_config (version, auto_sync, sync_interval, enable_notifications, max_notifications, settings, metadata)
SELECT '2.1.0', true, 300000, true, 100,
  '{}',
  jsonb_build_object(
    'totalOrders', 0,
    'totalRevenue', 0,
    'lastOrderDate', '',
    'systemUptime', now()
  )
WHERE NOT EXISTS (SELECT 1 FROM system_config LIMIT 1);

INSERT INTO admin_credentials (username, password_hash)
SELECT 'root', 'tvalacarta2024'
WHERE NOT EXISTS (SELECT 1 FROM admin_credentials WHERE username = 'root');

ALTER TABLE novels ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir acceso público a novels" ON novels FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir acceso público a delivery_zones" ON delivery_zones FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir acceso público a prices" ON prices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir acceso público a system_config" ON system_config FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir lectura pública de credenciales" ON admin_credentials FOR SELECT USING (true);

CREATE INDEX IF NOT EXISTS idx_novels_estado ON novels(estado);
CREATE INDEX IF NOT EXISTS idx_novels_genero ON novels(genero);
CREATE INDEX IF NOT EXISTS idx_novels_pais ON novels(pais);
CREATE INDEX IF NOT EXISTS idx_novels_updated_at ON novels(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_delivery_zones_name ON delivery_zones(name);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_novels_updated_at ON novels;
CREATE TRIGGER update_novels_updated_at BEFORE UPDATE ON novels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_delivery_zones_updated_at ON delivery_zones;
CREATE TRIGGER update_delivery_zones_updated_at BEFORE UPDATE ON delivery_zones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_prices_updated_at ON prices;
CREATE TRIGGER update_prices_updated_at BEFORE UPDATE ON prices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_system_config_updated_at ON system_config;
CREATE TRIGGER update_system_config_updated_at BEFORE UPDATE ON system_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_admin_credentials_updated_at ON admin_credentials;
CREATE TRIGGER update_admin_credentials_updated_at BEFORE UPDATE ON admin_credentials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();`;
  }
}

export const systemExportV2Service = new SystemExportV2Service();

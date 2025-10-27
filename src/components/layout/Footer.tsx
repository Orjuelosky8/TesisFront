// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear(); // Seguro en Server Components

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-4">
          {/* Brand + About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-800">
                <span className="block h-4 w-4 bg-white" />
              </span>
              <span className="text-xl font-bold text-white">SECOP AI</span>
            </div>

            <p className="text-base leading-relaxed text-gray-400">
              Análisis inteligente de contratación pública con tecnología RAG.
            </p>

            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-start gap-2">
                <span className="mt-2 block h-1.5 w-1.5 rounded-full bg-gray-500" />
                <span>
                  Las <span className="text-gray-300">red flags</span> son indicadores de riesgo; requieren
                  verificación humana.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 block h-1.5 w-1.5 rounded-full bg-gray-500" />
                <span>
                  Datos de contratación pública (SECOP I/II y otras fuentes abiertas).
                </span>
              </li>
            </ul>
          </div>

          {/* Producto */}
          <nav aria-label="Producto" className="space-y-4">
            <h3 className="text-base font-semibold text-white">Producto</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/caracteristicas" className="transition hover:text-white">
                  Características
                </Link>
              </li>
              <li>
                <Link href="/precios" className="transition hover:text-white">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="/api" className="transition hover:text-white">
                  API
                </Link>
              </li>
            </ul>
          </nav>

          {/* Soporte */}
          <nav aria-label="Soporte" className="space-y-4">
            <h3 className="text-base font-semibold text-white">Soporte</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/docs" className="transition hover:text-white">
                  Documentación
                </Link>
              </li>
              <li>
                <Link href="/tutoriales" className="transition hover:text-white">
                  Tutoriales
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="transition hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal" className="space-y-4">
            <h3 className="text-base font-semibold text-white">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacidad" className="transition hover:text-white">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="transition hover:text-white">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="transition hover:text-white">
                  Cookies
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Divider + Bottom */}
        <div className="border-t border-gray-800 py-6">
          <p className="text-center text-sm text-gray-400">
            © {year} SECOP AI. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

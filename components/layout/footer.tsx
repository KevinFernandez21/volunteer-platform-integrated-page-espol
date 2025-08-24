import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">VolunteerConnect</h4>
            <p className="text-gray-400 text-sm">Plataforma de voluntariado colaborativo ESPOL</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Para Empresas</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/empresas/voluntariado" className="hover:text-white">
                  Voluntariado Corporativo
                </Link>
              </li>
              <li>
                <Link href="/empresas/rse" className="hover:text-white">
                  Responsabilidad Social
                </Link>
              </li>
              <li>
                <Link href="/empresas/impacto" className="hover:text-white">
                  Impacto Medible
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Para Estudiantes</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/estudiantes/oportunidades" className="hover:text-white">
                  Oportunidades de Voluntariado
                </Link>
              </li>
              <li>
                <Link href="/estudiantes/competencias" className="hover:text-white">
                  Desarrollo de Competencias
                </Link>
              </li>
              <li>
                <Link href="/estudiantes/aprendizaje" className="hover:text-white">
                  Aprendizaje Práctico
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Para Comunidades</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/comunidades/necesidades" className="hover:text-white">
                  Registro de Necesidades
                </Link>
              </li>
              <li>
                <Link href="/comunidades/apoyo" className="hover:text-white">
                  Apoyo Colaborativo
                </Link>
              </li>
              <li>
                <Link href="/comunidades/desarrollo" className="hover:text-white">
                  Desarrollo Sostenible
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 ESPOL - VolunteerConnect. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

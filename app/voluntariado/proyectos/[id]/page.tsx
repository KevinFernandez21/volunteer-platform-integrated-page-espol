"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Calendar, Building2, Mail, Phone } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"

const mockProjectDetails = {
  1: {
    title: "Limpieza de Playas en Salinas",
    subtitle: "Conservación Marina y Educación Ambiental",
    description:
      "Únete a esta iniciativa que impulsa la conservación marina y la sostenibilidad costera. Por tercer año consecutivo, la Fundación Océanos Limpios presenta un proyecto orientado a proteger nuestras costas ecuatorianas y generar conciencia ambiental. Con el apoyo de estudiantes voluntarios de ESPOL, se realizarán jornadas de limpieza dirigidas a la comunidad pesquera local, con el fin de promover un enfoque colaborativo comprometido con el bienestar marino y ambiental.",
    image: "/placeholder-dbutq.png",
    status: "ACTIVO",
    dates: "Sábado 15/03/2025, 8:00 - Domingo 16/03/2025, 16:00",
    location: "Playa de Salinas, Santa Elena",
    organization: "Fundación Océanos Limpios",
    contact: "oceanos.limpios@fundacion.org",
    phone: "+593 99 123 4567",
    program: [
      { date: "Del 1 al 10 de marzo", activity: "Convocatoria y registro de voluntarios" },
      {
        date: "Del 11 al 14 de marzo",
        activity: "Capacitación en técnicas de limpieza marina y clasificación de residuos",
      },
      { date: "15 de marzo", activity: "Jornada de limpieza matutina (8:00 - 12:00)" },
      { date: "15 de marzo", activity: "Taller educativo con pescadores locales (14:00 - 17:00)" },
      { date: "16 de marzo", activity: "Actividades de sensibilización comunitaria y cierre del proyecto" },
    ],
    target:
      "Actividad dirigida a estudiantes de ESPOL de todas las carreras, especialmente de Ingeniería Ambiental y Ciencias del Mar.",
    requirements:
      "Disponibilidad de fin de semana completo, compromiso con la conservación marina, y disposición para trabajo en equipo.",
    ods: [
      "ODS 14: Vida Submarina",
      "ODS 15: Vida de Ecosistemas Terrestres",
      "ODS 17: Alianzas para lograr los objetivos",
    ],
  },
  2: {
    title: "Educación Digital para Adultos Mayores",
    subtitle: "Inclusión Digital y Tecnológica",
    description:
      "Proyecto de capacitación en tecnologías digitales básicas dirigido a adultos mayores de la comunidad del Guasmo. Esta iniciativa busca reducir la brecha digital y promover la inclusión tecnológica, proporcionando herramientas digitales esenciales para mejorar la calidad de vida y conectividad de nuestros adultos mayores.",
    image: "/elderly-digital-education-guayaquil.png",
    status: "ACTIVO",
    dates: "Viernes 22/03/2025, 14:00 - Viernes 29/03/2025, 17:00",
    location: "Centro Comunitario El Guasmo, Guayaquil",
    organization: "Centro Comunitario El Guasmo",
    contact: "educacion.digital@elguasmo.org",
    phone: "+593 98 765 4321",
    program: [
      { date: "22 de marzo", activity: "Introducción a dispositivos móviles y computadoras básicas" },
      { date: "24 de marzo", activity: "Navegación en internet y correo electrónico" },
      { date: "26 de marzo", activity: "Redes sociales y comunicación digital" },
      { date: "28 de marzo", activity: "Servicios digitales gubernamentales y bancarios" },
      { date: "29 de marzo", activity: "Práctica libre y evaluación final" },
    ],
    target: "Estudiantes de Ingeniería en Sistemas, Computación, y carreras afines de ESPOL.",
    requirements: "Paciencia para enseñar, conocimientos básicos de informática, y disponibilidad de tardes.",
    ods: [
      "ODS 4: Educación de Calidad",
      "ODS 10: Reducción de las Desigualdades",
      "ODS 11: Ciudades y Comunidades Sostenibles",
    ],
  },
  3: {
    title: "Huerto Urbano Comunitario",
    subtitle: "Agricultura Sostenible y Seguridad Alimentaria",
    description:
      "Implementación de huertos urbanos sostenibles en espacios comunitarios de Durán. Este proyecto promueve la seguridad alimentaria local, la educación en agricultura sostenible y el fortalecimiento de vínculos comunitarios a través de la producción de alimentos orgánicos.",
    image: "/duran-urban-garden.png",
    status: "EN PLANIFICACIÓN",
    dates: "Sábado 5/04/2025, 9:00 - Domingo 6/04/2025, 15:00",
    location: "Espacios Comunitarios de Durán, Guayas",
    organization: "Cooperativa Agrícola Verde",
    contact: "huertos.urbanos@cooperativaverde.org",
    phone: "+593 97 456 7890",
    program: [
      { date: "Del 25 de marzo al 2 de abril", activity: "Preparación del terreno y diseño de espacios" },
      { date: "5 de abril", activity: "Construcción de camas de cultivo y sistema de riego" },
      { date: "5 de abril", activity: "Siembra de semillas y plantones orgánicos" },
      { date: "6 de abril", activity: "Capacitación en técnicas de cultivo sostenible" },
      { date: "6 de abril", activity: "Establecimiento de cronograma de mantenimiento comunitario" },
    ],
    target: "Estudiantes de Ingeniería Agropecuaria, Ambiental, y carreras relacionadas con sostenibilidad.",
    requirements:
      "Disposición para trabajo físico al aire libre, interés en agricultura sostenible, y compromiso con seguimiento del proyecto.",
    ods: ["ODS 2: Hambre Cero", "ODS 11: Ciudades y Comunidades Sostenibles", "ODS 15: Vida de Ecosistemas Terrestres"],
  },
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = Number.parseInt(params.id as string)
  const project = mockProjectDetails[projectId as keyof typeof mockProjectDetails]

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Proyecto no encontrado</h1>
          <Button onClick={() => router.back()}>Volver</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a proyectos
          </Button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title.toUpperCase()}</h1>
            <p className="text-lg text-gray-600">{project.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Project Image */}
        <div className="relative h-80 w-full mb-8 rounded-lg overflow-hidden">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          <div className="absolute top-4 left-4">
            <Badge variant={project.status === "ACTIVO" ? "default" : "secondary"} className="text-sm px-3 py-1">
              {project.status}
            </Badge>
          </div>
        </div>

        {/* Project Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Fecha(s)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{project.dates}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Dónde (presencial)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{project.location}</p>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">{project.description}</p>
          </CardContent>
        </Card>

        {/* Program */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Programa</CardTitle>
            <CardDescription>Cronograma de actividades del proyecto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  {project.program.map((item, index) => (
                    <tr key={index} className="border-b border-gray-300">
                      <td className="border-r border-gray-300 p-3 bg-gray-50 font-medium text-sm">{item.date}</td>
                      <td className="p-3 text-sm">{item.activity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Target and Requirements */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Público e inscripción</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{project.target}</p>
              <p className="text-sm text-gray-600">
                <strong>Requisitos:</strong> {project.requirements}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organiza</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">{project.organization}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                  <a href={`mailto:${project.contact}`} className="text-blue-600 hover:underline">
                    {project.contact}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">{project.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ODS */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Objetivos de Desarrollo Sostenible (ODS)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.ods.map((ods, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {ods}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="text-center">
          <Button size="lg" className="px-8">
            Inscribirse al Proyecto
          </Button>
        </div>
      </div>
    </div>
  )
}

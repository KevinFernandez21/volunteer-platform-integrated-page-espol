"use client"

import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { MapPin, Calendar, Users, Building2, Phone, Mail, Target, Heart, Share2, MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

interface ProjectDetail {
  id: number
  title: string
  description: string
  organization: string
  location: string
  address: string
  startDate: string
  endDate: string
  volunteers: number
  maxVolunteers: number
  ods: string[]
  status: string
  type: string
  requirements: string[]
  benefits: string[]
  contactEmail: string
  contactPhone: string
  isRemote: boolean
  urgency: string
  coordinator: {
    name: string
    avatar: string
    role: string
  }
  updates: Array<{
    id: number
    date: string
    title: string
    content: string
    author: string
  }>
  volunteers_list: Array<{
    id: number
    name: string
    avatar: string
    joinDate: string
    role: string
  }>
}

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<ProjectDetail | null>(null)
  const [isApplied, setIsApplied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Simulate loading project data
    const mockProject: ProjectDetail = {
      id: Number.parseInt(params.id as string),
      title: "Limpieza de Playas en Salinas",
      description:
        "Proyecto de limpieza y conservación marina en colaboración con la comunidad pesquera local. Trabajaremos en la recolección de residuos, clasificación de materiales reciclables y educación ambiental para visitantes y residentes.",
      organization: "Fundación Océanos Limpios",
      location: "Salinas, Santa Elena",
      address: "Malecón de Salinas, frente al muelle pesquero",
      startDate: "2024-03-15",
      endDate: "2024-03-17",
      volunteers: 25,
      maxVolunteers: 50,
      ods: ["14", "15", "17"],
      status: "Activo",
      type: "Ambiental",
      requirements: [
        "Mayor de 16 años",
        "Disponibilidad de fin de semana completo",
        "Ropa cómoda y protector solar",
        "Compromiso con el medio ambiente",
      ],
      benefits: [
        "Certificado de participación",
        "Almuerzo incluido",
        "Transporte desde Guayaquil",
        "Experiencia de conservación marina",
        "Networking con profesionales ambientales",
      ],
      contactEmail: "voluntarios@oceanoslimpios.org",
      contactPhone: "+593 99 876 5432",
      isRemote: false,
      urgency: "alta",
      coordinator: {
        name: "María González",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Coordinadora de Proyectos",
      },
      updates: [
        {
          id: 1,
          date: "2024-03-10",
          title: "Confirmación de transporte",
          content: "Se ha confirmado el transporte desde Guayaquil. Salida a las 6:00 AM desde ESPOL.",
          author: "María González",
        },
        {
          id: 2,
          date: "2024-03-08",
          title: "Materiales necesarios",
          content: "Por favor traer guantes de trabajo, gorra y botella de agua reutilizable.",
          author: "María González",
        },
      ],
      volunteers_list: [
        {
          id: 1,
          name: "Carlos Mendoza",
          avatar: "/placeholder.svg?height=32&width=32",
          joinDate: "2024-03-01",
          role: "Estudiante ESPOL",
        },
        {
          id: 2,
          name: "Ana Rodríguez",
          avatar: "/placeholder.svg?height=32&width=32",
          joinDate: "2024-03-02",
          role: "Voluntario Corporativo",
        },
        {
          id: 3,
          name: "Luis Pérez",
          avatar: "/placeholder.svg?height=32&width=32",
          joinDate: "2024-03-03",
          role: "Estudiante ESPOL",
        },
      ],
    }

    setProject(mockProject)
  }, [params.id])

  const handleApply = async () => {
    setIsLoading(true)
    console.log("[v0] Applying to project:", project?.id)

    // Simulate API call
    setTimeout(() => {
      setIsApplied(true)
      setIsLoading(false)
      if (project) {
        setProject({
          ...project,
          volunteers: project.volunteers + 1,
        })
      }
    }, 1000)
  }

  const handleShare = () => {
    console.log("[v0] Sharing project")
    if (navigator.share) {
      navigator.share({
        title: project?.title,
        text: project?.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Enlace copiado al portapapeles")
    }
  }

  if (!project) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Cargando...</div>
  }

  const progressPercentage = (project.volunteers / project.maxVolunteers) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title={project.title} description={`Organizado por ${project.organization}`}>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Compartir
          </Button>
          {!isApplied ? (
            <Button onClick={handleApply} disabled={isLoading || project.volunteers >= project.maxVolunteers}>
              {isLoading ? (
                "Aplicando..."
              ) : (
                <>
                  <Heart className="w-4 h-4 mr-2" />
                  {project.volunteers >= project.maxVolunteers ? "Completo" : "Unirme"}
                </>
              )}
            </Button>
          ) : (
            <Button variant="secondary" disabled>
              <Heart className="w-4 h-4 mr-2 fill-current" />
              Ya aplicado
            </Button>
          )}
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={project.status === "Activo" ? "default" : "secondary"}>{project.status}</Badge>
                    <Badge variant="outline">{project.type}</Badge>
                    <Badge variant={project.urgency === "alta" ? "destructive" : "secondary"}>
                      Urgencia: {project.urgency}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-2xl">{project.title}</CardTitle>
                <CardDescription className="text-base">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Building2 className="w-4 h-4 mr-2" />
                    {project.organization}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {project.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(project.startDate).toLocaleDateString()} -{" "}
                    {new Date(project.endDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {project.volunteers}/{project.maxVolunteers} voluntarios
                  </div>
                </div>

                {project.address && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Dirección específica:</h4>
                    <p className="text-sm text-gray-600">{project.address}</p>
                  </div>
                )}

                <div className="mb-4">
                  <h4 className="font-medium mb-2">ODS relacionados:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.ods.map((ods) => (
                      <Badge key={ods} variant="outline" className="text-xs">
                        ODS {ods}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="details" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Detalles</TabsTrigger>
                <TabsTrigger value="updates">Actualizaciones</TabsTrigger>
                <TabsTrigger value="volunteers">Voluntarios</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Requisitos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {project.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Target className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Beneficios</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {project.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Heart className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="updates">
                <Card>
                  <CardHeader>
                    <CardTitle>Actualizaciones del Proyecto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.updates.map((update) => (
                        <div key={update.id} className="border-l-2 border-blue-200 pl-4 pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{update.title}</h4>
                            <span className="text-xs text-gray-500">{new Date(update.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{update.content}</p>
                          <p className="text-xs text-gray-500">Por: {update.author}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="volunteers">
                <Card>
                  <CardHeader>
                    <CardTitle>Voluntarios Registrados</CardTitle>
                    <CardDescription>
                      {project.volunteers} de {project.maxVolunteers} voluntarios
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project.volunteers_list.map((volunteer) => (
                        <div key={volunteer.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={volunteer.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {volunteer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{volunteer.name}</p>
                            <p className="text-xs text-gray-600">{volunteer.role}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">
                              Se unió: {new Date(volunteer.joinDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progreso de Inscripciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Progress value={progressPercentage} className="w-full" />
                  <div className="flex justify-between text-sm">
                    <span>{project.volunteers} voluntarios</span>
                    <span>{project.maxVolunteers} máximo</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {project.maxVolunteers - project.volunteers} cupos disponibles
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Coordinator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Coordinador</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={project.coordinator.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {project.coordinator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{project.coordinator.name}</p>
                    <p className="text-sm text-gray-600">{project.coordinator.role}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${project.contactEmail}`} className="text-blue-600 hover:underline">
                    {project.contactEmail}
                  </a>
                </div>
                {project.contactPhone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${project.contactPhone}`} className="text-blue-600 hover:underline">
                      {project.contactPhone}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

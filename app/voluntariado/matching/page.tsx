"use client"

import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import {
  Users,
  MapPin,
  Clock,
  Target,
  Heart,
  MessageCircle,
  Star,
  Search,
  Zap,
  TrendingUp,
  Award,
  Building2,
  CheckCircle,
} from "lucide-react"
import { useState, useEffect, useCallback, useMemo, memo } from "react"

interface MatchingProfile {
  id: string
  name: string
  type: "volunteer" | "project" | "organization"
  avatar?: string
  location: string
  skills: string[]
  interests: string[]
  availability: string
  experience: string
  rating: number
  completedProjects: number
  description: string
  matchScore: number
  organization?: string
  role?: string
}

interface MatchingFilters {
  location: string
  skills: string[]
  availability: string
  experience: string
  type: string
}

export default function MatchingPage() {
  const [activeTab, setActiveTab] = useState("recommendations")
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProfile, setSelectedProfile] = useState<null | MatchingProfile>(null)
  const [connectionData, setConnectionData] = useState({
    motivation: "",
    experience: "",
    interests: "",
    skills: [] as string[],
    collaboration: "",
    commitment: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [connectionSuccess, setConnectionSuccess] = useState(false)
  const [filters, setFilters] = useState<MatchingFilters>({
    location: "all",
    skills: [],
    availability: "all",
    experience: "all",
    type: "all",
  })

  const mockRecommendations: MatchingProfile[] = [
    {
      id: "1",
      name: "Carlos Mendoza",
      type: "volunteer",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Guayaquil, Guayas",
      skills: ["Programación", "Diseño Web", "Educación"],
      interests: ["Tecnología", "Educación", "Juventud"],
      availability: "Fines de semana",
      experience: "2 años",
      rating: 4.8,
      completedProjects: 12,
      description: "Estudiante de Ingeniería en Sistemas con pasión por la educación tecnológica",
      matchScore: 95,
      organization: "ESPOL",
      role: "Estudiante",
    },
    {
      id: "2",
      name: "Ana Rodríguez",
      type: "volunteer",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Samborondón, Guayas",
      skills: ["Marketing", "Comunicación", "Gestión de Proyectos"],
      interests: ["Medio Ambiente", "Sostenibilidad", "Comunidad"],
      availability: "Tardes entre semana",
      experience: "5 años",
      rating: 4.9,
      completedProjects: 25,
      description: "Profesional en marketing con experiencia en campañas de impacto social",
      matchScore: 88,
      organization: "EcoMarketing S.A.",
      role: "Gerente de Marketing",
    },
    {
      id: "3",
      name: "Proyecto Alfabetización Digital",
      type: "project",
      location: "Durán, Guayas",
      skills: ["Informática", "Paciencia", "Comunicación"],
      interests: ["Educación", "Tecnología", "Adultos Mayores"],
      availability: "Sábados por la mañana",
      experience: "Principiante",
      rating: 4.7,
      completedProjects: 0,
      description: "Enseñanza de herramientas digitales básicas a adultos mayores de la comunidad",
      matchScore: 92,
      organization: "Centro Comunitario Durán",
    },
  ]

  const [recommendations, setRecommendations] = useState<MatchingProfile[]>(mockRecommendations)

  const filteredRecommendations = useMemo(() => {
    return recommendations.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesLocation = filters.location === "all" || item.location.includes(filters.location)
      const matchesType = filters.type === "all" || item.type === filters.type
      const matchesAvailability = filters.availability === "all" || item.availability.includes(filters.availability)

      return matchesSearch && matchesLocation && matchesType && matchesAvailability
    })
  }, [searchTerm, filters, recommendations])

  const handleConnect = useCallback((profile: MatchingProfile) => {
    setSelectedProfile(profile)
    setConnectionData({
      motivation: "",
      experience: "",
      interests: "",
      skills: [],
      collaboration: "",
      commitment: false,
    })
    setConnectionSuccess(false)
  }, [])

  const handleSkillChange = useCallback((skill: string, checked: boolean) => {
    if (checked) {
      setConnectionData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }))
    } else {
      setConnectionData(prev => ({
        ...prev,
        skills: prev.skills.filter(s => s !== skill)
      }))
    }
  }, [])

  const validateConnection = useCallback(() => {
    if (!connectionData.motivation.trim()) {
      alert("Por favor, describe tu motivación para conectar")
      return false
    }
    if (!connectionData.interests.trim()) {
      alert("Por favor, indica tus intereses en común")
      return false
    }
    if (!connectionData.commitment) {
      alert("Debes confirmar tu compromiso con la colaboración")
      return false
    }
    return true
  }, [connectionData])

  const handleSubmitConnection = useCallback(async () => {
    if (!validateConnection()) return

    setIsSubmitting(true)
    console.log(`[v0] Submitting connection request for profile: ${selectedProfile?.id}`, connectionData)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setConnectionSuccess(true)
    } catch (error) {
      console.error("[v0] Connection failed:", error)
      alert("Error al enviar la solicitud de conexión. Por favor intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }, [validateConnection, selectedProfile?.id, connectionData])

  const closeConnectionDialog = useCallback(() => {
    setSelectedProfile(null)
    setConnectionSuccess(false)
  }, [])

  const handleMessage = useCallback((profileId: string) => {
    console.log(`[v0] Opening message with: ${profileId}`)
    alert("Función de mensajería próximamente disponible")
  }, [])

  const handleFilterChange = useCallback((key: keyof MatchingFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const getTypeIcon = useCallback((type: string) => {
    switch (type) {
      case "volunteer":
        return <Users className="w-4 h-4" />
      case "project":
        return <Target className="w-4 h-4" />
      case "organization":
        return <Building2 className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
  }, [])

  const getMatchScoreColor = useCallback((score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100"
    if (score >= 80) return "text-blue-600 bg-blue-100"
    if (score >= 70) return "text-yellow-600 bg-yellow-100"
    return "text-gray-600 bg-gray-100"
  }, [])

  return (
    <div>
      <PageHeader
        title="Sistema de Matching Inteligente"
        description="Conecta con voluntarios, proyectos y organizaciones compatibles"
      >
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            IA Activada
          </Badge>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Búsqueda y Filtros Inteligentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nombre, habilidades, intereses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Ubicación</Label>
                  <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las ubicaciones" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las ubicaciones</SelectItem>
                      <SelectItem value="Guayaquil">Guayaquil</SelectItem>
                      <SelectItem value="Samborondón">Samborondón</SelectItem>
                      <SelectItem value="Durán">Durán</SelectItem>
                      <SelectItem value="Salinas">Salinas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos los tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los tipos</SelectItem>
                      <SelectItem value="volunteer">Voluntarios</SelectItem>
                      <SelectItem value="project">Proyectos</SelectItem>
                      <SelectItem value="organization">Organizaciones</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Disponibilidad</Label>
                  <Select
                    value={filters.availability}
                    onValueChange={(value) => handleFilterChange("availability", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Cualquier horario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Cualquier horario</SelectItem>
                      <SelectItem value="Fines de semana">Fines de semana</SelectItem>
                      <SelectItem value="Entre semana">Entre semana</SelectItem>
                      <SelectItem value="Tardes">Tardes</SelectItem>
                      <SelectItem value="Mañanas">Mañanas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Experiencia</Label>
                  <Select value={filters.experience} onValueChange={(value) => handleFilterChange("experience", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Cualquier nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Cualquier nivel</SelectItem>
                      <SelectItem value="Principiante">Principiante</SelectItem>
                      <SelectItem value="1-2 años">1-2 años</SelectItem>
                      <SelectItem value="3-5 años">3-5 años</SelectItem>
                      <SelectItem value="5+ años">5+ años</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Desktop Navigation */}
          <TabsList className="hidden sm:grid w-full grid-cols-3">
            <TabsTrigger value="recommendations">Recomendaciones IA</TabsTrigger>
            <TabsTrigger value="connections">Mis Conexiones</TabsTrigger>
            <TabsTrigger value="messages">Mensajes</TabsTrigger>
          </TabsList>

          {/* Mobile Navigation */}
          <div className="sm:hidden">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-full">
                <SelectValue>
                  {activeTab === "recommendations" && "🤖 Recomendaciones IA"}
                  {activeTab === "connections" && "👥 Mis Conexiones"} 
                  {activeTab === "messages" && "💬 Mensajes"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommendations">
                  <div className="flex items-center gap-2">
                    <span>🤖</span>
                    <span>Recomendaciones IA</span>
                  </div>
                </SelectItem>
                <SelectItem value="connections">
                  <div className="flex items-center gap-2">
                    <span>👥</span>
                    <span>Mis Conexiones</span>
                  </div>
                </SelectItem>
                <SelectItem value="messages">
                  <div className="flex items-center gap-2">
                    <span>💬</span>
                    <span>Mensajes</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Recomendaciones Personalizadas</h2>
                <p className="text-sm sm:text-base text-gray-600">Basadas en tu perfil, habilidades e intereses</p>
              </div>
              <Badge variant="outline" className="flex items-center gap-1 w-fit">
                <TrendingUp className="w-3 h-3" />
                {filteredRecommendations.length} coincidencias
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {filteredRecommendations.map((profile) => (
                <Card key={profile.id} className="hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                          <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {profile.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base sm:text-lg">{profile.name}</CardTitle>
                            {getTypeIcon(profile.type)}
                          </div>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{profile.location}</span>
                          </div>
                          {profile.organization && (
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                              <Building2 className="w-3 h-3" />
                              <span className="truncate">{profile.organization}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-center sm:text-right">
                        <Badge className={`${getMatchScoreColor(profile.matchScore)} font-bold text-xs`}>
                          {profile.matchScore}% Match
                        </Badge>
                        <div className="flex items-center gap-1 mt-1 justify-center sm:justify-end">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600">{profile.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-700">{profile.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{profile.availability}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{profile.completedProjects} proyectos</span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs text-gray-600 mb-2 block">Habilidades</Label>
                      <div className="flex flex-wrap gap-1">
                        {profile.skills.slice(0, 4).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {profile.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{profile.skills.length - 4} más
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs text-gray-600 mb-2 block">Intereses</Label>
                      <div className="flex flex-wrap gap-1">
                        {profile.interests.slice(0, 3).map((interest) => (
                          <Badge key={interest} variant="outline" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            onClick={() => handleConnect(profile)} 
                            className="flex-1 bg-[#2B4C8C] hover:bg-[#1e3a6f]"
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            Conectar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          {connectionSuccess ? (
                            <div className="text-center py-6">
                              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                              <DialogTitle className="text-2xl text-green-600 mb-4">¡Solicitud de Conexión Enviada!</DialogTitle>
                              <DialogDescription className="text-base mb-6">
                                Tu solicitud de conexión con "{selectedProfile?.name}" ha sido enviada exitosamente. 
                                Te notificaremos cuando {selectedProfile?.type === 'volunteer' ? 'el voluntario' : selectedProfile?.type === 'project' ? 'el proyecto' : 'la organización'} responda a tu solicitud.
                              </DialogDescription>
                              <Button onClick={closeConnectionDialog} className="w-full">
                                Cerrar
                              </Button>
                            </div>
                          ) : (
                            <>
                              <DialogHeader>
                                <DialogTitle>Conectar con: {selectedProfile?.name}</DialogTitle>
                                <DialogDescription>
                                  Completa la información para enviar tu solicitud de conexión
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-6">
                                <div>
                                  <Label htmlFor="motivation" className="text-sm font-medium">
                                    ¿Por qué te interesa conectar con {selectedProfile?.name}? *
                                  </Label>
                                  <Textarea
                                    id="motivation"
                                    value={connectionData.motivation}
                                    onChange={(e) => setConnectionData(prev => ({ ...prev, motivation: e.target.value }))}
                                    placeholder="Describe tu motivación para conectar y cómo pueden colaborar juntos..."
                                    rows={4}
                                    className="mt-1"
                                  />
                                </div>

                                <div>
                                  <Label htmlFor="experience" className="text-sm font-medium">
                                    Experiencia relevante (opcional)
                                  </Label>
                                  <Textarea
                                    id="experience"
                                    value={connectionData.experience}
                                    onChange={(e) => setConnectionData(prev => ({ ...prev, experience: e.target.value }))}
                                    placeholder="Describe tu experiencia en áreas relacionadas con este perfil..."
                                    rows={3}
                                    className="mt-1"
                                  />
                                </div>

                                <div>
                                  <Label htmlFor="interests" className="text-sm font-medium">
                                    Intereses en común *
                                  </Label>
                                  <Textarea
                                    id="interests"
                                    value={connectionData.interests}
                                    onChange={(e) => setConnectionData(prev => ({ ...prev, interests: e.target.value }))}
                                    placeholder="Menciona qué intereses o objetivos comparten..."
                                    rows={3}
                                    className="mt-1"
                                  />
                                </div>

                                <div>
                                  <Label className="text-sm font-medium">
                                    Habilidades que puedes aportar
                                  </Label>
                                  <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
                                    {[
                                      "Comunicación", "Liderazgo", "Organización", "Creatividad",
                                      "Trabajo en equipo", "Paciencia", "Empatía", "Inglés",
                                      "Tecnología", "Redes sociales", "Fotografía", "Primeros auxilios",
                                      "Educación", "Cocina", "Manualidades", "Deportes"
                                    ].map((skill) => (
                                      <div key={skill} className="flex items-center space-x-2">
                                        <Checkbox
                                          id={skill}
                                          checked={connectionData.skills.includes(skill)}
                                          onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean)}
                                        />
                                        <Label htmlFor={skill} className="text-sm">
                                          {skill}
                                        </Label>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <Label htmlFor="collaboration" className="text-sm font-medium">
                                    ¿Cómo te gustaría colaborar?
                                  </Label>
                                  <Textarea
                                    id="collaboration"
                                    value={connectionData.collaboration}
                                    onChange={(e) => setConnectionData(prev => ({ ...prev, collaboration: e.target.value }))}
                                    placeholder="Describe qué tipo de colaboración tienes en mente..."
                                    rows={3}
                                    className="mt-1"
                                  />
                                </div>

                                <div className="flex items-start space-x-2">
                                  <Checkbox
                                    id="commitment"
                                    checked={connectionData.commitment}
                                    onCheckedChange={(checked) => setConnectionData(prev => ({ ...prev, commitment: checked as boolean }))}
                                  />
                                  <Label htmlFor="commitment" className="text-sm text-gray-700">
                                    Confirmo que estoy comprometido(a) a establecer una colaboración constructiva y 
                                    mantener una comunicación respetuosa. *
                                  </Label>
                                </div>
                              </div>

                              <DialogFooter className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  onClick={closeConnectionDialog}
                                  disabled={isSubmitting}
                                >
                                  Cancelar
                                </Button>
                                <Button 
                                  onClick={handleSubmitConnection}
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                                </Button>
                              </DialogFooter>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="outline" 
                        onClick={() => handleMessage(profile.id)} 
                        className="sm:w-auto w-full"
                      >
                        <MessageCircle className="w-4 h-4 sm:mr-0" />
                        <span className="ml-2 sm:hidden">Mensaje</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredRecommendations.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">No se encontraron coincidencias con los filtros actuales</p>
                <p className="text-gray-400 text-sm">Intenta ajustar los criterios de búsqueda</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="connections" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Mis Conexiones</h2>
              <Badge variant="outline">12 conexiones activas</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "María González",
                  role: "Coordinadora de Proyectos",
                  status: "Activa",
                  avatar: "/placeholder.svg",
                },
                { name: "Pedro Ramírez", role: "Voluntario Senior", status: "Activa", avatar: "/placeholder.svg" },
                { name: "Fundación Verde", role: "Organización", status: "Pendiente", avatar: "/placeholder.svg" },
                { name: "Ana Torres", role: "Estudiante ESPOL", status: "Activa", avatar: "/placeholder.svg" },
              ].map((connection, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={connection.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {connection.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{connection.name}</p>
                        <p className="text-xs text-gray-600">{connection.role}</p>
                        <Badge
                          variant={connection.status === "Activa" ? "default" : "secondary"}
                          className="text-xs mt-1"
                        >
                          {connection.status}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Centro de Mensajes</h2>
              <Badge variant="outline">3 mensajes sin leer</Badge>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-1 order-1 lg:order-1">
                <Card className="h-auto lg:h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base sm:text-lg flex items-center justify-between">
                      <span>Conversaciones</span>
                      <Badge variant="secondary" className="text-xs">4</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-64 lg:max-h-96 overflow-y-auto">
                      {[
                        {
                          name: "María González",
                          lastMessage: "¿Podemos coordinar para el sábado?",
                          time: "10:30 AM",
                          unread: true,
                        },
                        {
                          name: "Proyecto Limpieza",
                          lastMessage: "Gracias por tu interés en participar",
                          time: "Ayer",
                          unread: false,
                        },
                        {
                          name: "Pedro Ramírez",
                          lastMessage: "Te envío los documentos solicitados",
                          time: "Ayer",
                          unread: true,
                        },
                        { name: "Fundación Verde", lastMessage: "Bienvenido al equipo", time: "2 días", unread: false },
                      ].map((chat, index) => (
                        <div
                          key={index}
                          className={`p-3 hover:bg-gray-50 cursor-pointer border-l-2 transition-colors ${
                            chat.unread 
                              ? "border-l-blue-500 bg-blue-50 hover:bg-blue-100" 
                              : "border-l-transparent hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                              <AvatarFallback className="text-xs">
                                {chat.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className={`text-sm ${chat.unread ? "font-semibold" : "font-medium"} truncate`}>
                                  {chat.name}
                                </p>
                                <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{chat.time}</span>
                              </div>
                              <p className="text-xs text-gray-600 truncate mt-0.5">{chat.lastMessage}</p>
                              {chat.unread && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2 order-2 lg:order-2">
                <Card className="flex flex-col h-80 sm:h-96 lg:h-full">
                  <CardHeader className="border-b p-4 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                        <AvatarFallback className="text-sm font-medium">MG</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-base sm:text-lg">María González</CardTitle>
                        <div className="flex items-center gap-2">
                          <CardDescription className="text-xs sm:text-sm">Coordinadora de Proyectos</CardDescription>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-600">En línea</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 p-4 flex flex-col min-h-0">
                    <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                      <div className="flex justify-start">
                        <div className="flex flex-col max-w-[75%] sm:max-w-sm">
                          <div className="bg-gray-100 rounded-2xl rounded-bl-md p-3">
                            <p className="text-sm text-gray-800">
                              Hola! Vi tu perfil y creo que serías perfecto para nuestro proyecto de educación digital.
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1 ml-3">María • 10:15 AM</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <div className="flex flex-col max-w-[75%] sm:max-w-sm">
                          <div className="bg-[#2B4C8C] text-white rounded-2xl rounded-br-md p-3">
                            <p className="text-sm">
                              ¡Hola María! Me interesa mucho. ¿Podrías contarme más detalles?
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1 mr-3 text-right">Tú • 10:20 AM</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-start">
                        <div className="flex flex-col max-w-[75%] sm:max-w-sm">
                          <div className="bg-gray-100 rounded-2xl rounded-bl-md p-3">
                            <p className="text-sm text-gray-800">
                              ¿Podemos coordinar una videollamada para el sábado? Te explico todo el proyecto.
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1 ml-3">María • 10:30 AM</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-start">
                        <div className="flex items-center gap-1 text-xs text-gray-500 ml-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{"animationDelay": "0.1s"}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{"animationDelay": "0.2s"}}></div>
                          </div>
                          <span className="ml-2">María está escribiendo...</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 border-t pt-4">
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <Input 
                            placeholder="Escribe tu mensaje..." 
                            className="w-full resize-none border-2 border-gray-200 focus:border-[#2B4C8C] rounded-full px-4 py-2"
                          />
                        </div>
                        <Button className="bg-[#2B4C8C] hover:bg-[#1e3a6f] rounded-full px-4 py-2 flex-shrink-0">
                          <span className="hidden sm:inline mr-1">Enviar</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

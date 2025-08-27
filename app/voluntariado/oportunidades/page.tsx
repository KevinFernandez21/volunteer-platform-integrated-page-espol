"use client"

import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, MapPin, Users, Building2, Search, Filter, Heart, CheckCircle } from "lucide-react"
import { useState, useCallback, useMemo, memo } from "react"

const mockOpportunities = [
  {
    id: 1,
    title: "Tutor de Matemáticas",
    description: "Apoyo académico en matemáticas para estudiantes de secundaria en zonas vulnerables",
    organization: "Fundación Educación Para Todos",
    location: "Guayaquil, Guayas",
    duration: "2 horas/semana",
    commitment: "3 meses",
    skills: ["Matemáticas", "Paciencia", "Comunicación"],
    ods: ["ODS 4"],
    type: "Educativo",
    remote: false,
  },
  {
    id: 2,
    title: "Diseñador Gráfico Voluntario",
    description: "Creación de material gráfico para campañas de concientización ambiental",
    organization: "EcoVerde Ecuador",
    location: "Remoto",
    duration: "5 horas/semana",
    commitment: "2 meses",
    skills: ["Diseño Gráfico", "Adobe Creative Suite", "Creatividad"],
    ods: ["ODS 13", "ODS 15"],
    type: "Creativo",
    remote: true,
  },
  {
    id: 3,
    title: "Asistente de Salud Comunitaria",
    description: "Apoyo en jornadas de salud preventiva y educación sanitaria",
    organization: "Centro de Salud Comunitario",
    location: "Durán, Guayas",
    duration: "4 horas/fin de semana",
    commitment: "6 meses",
    skills: ["Primeros Auxilios", "Comunicación", "Empatía"],
    ods: ["ODS 3"],
    type: "Salud",
    remote: false,
  },
]

export default function OportunidadesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterRemote, setFilterRemote] = useState("all")
  const [selectedOpportunity, setSelectedOpportunity] = useState<null | typeof mockOpportunities[0]>(null)
  const [applicationData, setApplicationData] = useState({
    motivation: "",
    experience: "",
    availability: "",
    skills: [] as string[],
    expectations: "",
    commitment: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [applicationSuccess, setApplicationSuccess] = useState(false)

  const filteredOpportunities = useMemo(() => {
    return mockOpportunities.filter((opportunity) => {
      const matchesSearch =
        opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opportunity.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === "all" || opportunity.type === filterType
      const matchesRemote =
        filterRemote === "all" ||
        (filterRemote === "remote" && opportunity.remote) ||
        (filterRemote === "presencial" && !opportunity.remote)

      return matchesSearch && matchesType && matchesRemote
    })
  }, [searchTerm, filterType, filterRemote])

  const handleApply = useCallback((opportunity: typeof mockOpportunities[0]) => {
    setSelectedOpportunity(opportunity)
    setApplicationData({
      motivation: "",
      experience: "",
      availability: "",
      skills: [],
      expectations: "",
      commitment: false,
    })
    setApplicationSuccess(false)
  }, [])

  const handleSkillChange = useCallback((skill: string, checked: boolean) => {
    if (checked) {
      setApplicationData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }))
    } else {
      setApplicationData(prev => ({
        ...prev,
        skills: prev.skills.filter(s => s !== skill)
      }))
    }
  }, [])

  const validateApplication = useCallback(() => {
    if (!applicationData.motivation.trim()) {
      alert("Por favor, describe tu motivación para participar")
      return false
    }
    if (!applicationData.availability.trim()) {
      alert("Por favor, indica tu disponibilidad")
      return false
    }
    if (!applicationData.commitment) {
      alert("Debes confirmar tu compromiso con el proyecto")
      return false
    }
    return true
  }, [applicationData])

  const handleSubmitApplication = useCallback(async () => {
    if (!validateApplication()) return

    setIsSubmitting(true)
    console.log(`[v0] Submitting application for opportunity: ${selectedOpportunity?.id}`, applicationData)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setApplicationSuccess(true)
    } catch (error) {
      console.error("[v0] Application failed:", error)
      alert("Error al enviar la solicitud. Por favor intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }, [validateApplication, selectedOpportunity?.id, applicationData])

  const closeApplicationDialog = useCallback(() => {
    setSelectedOpportunity(null)
    setApplicationSuccess(false)
  }, [])

  return (
    <div>
      <PageHeader
        title="Oportunidades de Voluntariado"
        description="Encuentra oportunidades que se ajusten a tus habilidades e intereses"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar oportunidades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="Educativo">Educativo</SelectItem>
                  <SelectItem value="Creativo">Creativo</SelectItem>
                  <SelectItem value="Salud">Salud</SelectItem>
                  <SelectItem value="Ambiental">Ambiental</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterRemote} onValueChange={setFilterRemote}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Modalidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="remote">Remoto</SelectItem>
                  <SelectItem value="presencial">Presencial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Opportunities List */}
        <div className="space-y-6">
          {filteredOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="space-y-4">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <CardTitle className="text-lg sm:text-xl mb-2">{opportunity.title}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant={opportunity.remote ? "secondary" : "default"}>
                            {opportunity.remote ? "Remoto" : "Presencial"}
                          </Badge>
                          <Badge variant="outline">{opportunity.type}</Badge>
                        </div>
                      </div>
                      <div className="sm:flex-shrink-0">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              onClick={() => handleApply(opportunity)} 
                              className="w-full sm:w-auto min-w-[140px] bg-[#2B4C8C] hover:bg-[#1e3a6f] text-white font-medium"
                            >
                              <Heart className="w-4 h-4 mr-2" />
                              Postularme
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      {applicationSuccess ? (
                        <div className="text-center py-6">
                          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                          <DialogTitle className="text-2xl text-green-600 mb-4">¡Solicitud Enviada!</DialogTitle>
                          <DialogDescription className="text-base mb-6">
                            Tu solicitud para "{selectedOpportunity?.title}" ha sido enviada exitosamente. 
                            La organización revisará tu postulación y te contactará pronto.
                          </DialogDescription>
                          <Button onClick={closeApplicationDialog} className="w-full">
                            Cerrar
                          </Button>
                        </div>
                      ) : (
                        <>
                          <DialogHeader>
                            <DialogTitle>Postularse a: {selectedOpportunity?.title}</DialogTitle>
                            <DialogDescription>
                              Completa la información para enviar tu solicitud de voluntariado
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-6">
                            <div>
                              <Label htmlFor="motivation" className="text-sm font-medium">
                                ¿Por qué te interesa participar en este proyecto? *
                              </Label>
                              <Textarea
                                id="motivation"
                                value={applicationData.motivation}
                                onChange={(e) => setApplicationData(prev => ({ ...prev, motivation: e.target.value }))}
                                placeholder="Describe tu motivación, qué te inspira de esta oportunidad y cómo se alinea con tus valores..."
                                rows={4}
                                className="mt-1"
                              />
                            </div>

                            <div>
                              <Label htmlFor="experience" className="text-sm font-medium">
                                Experiencia previa relacionada (opcional)
                              </Label>
                              <Textarea
                                id="experience"
                                value={applicationData.experience}
                                onChange={(e) => setApplicationData(prev => ({ ...prev, experience: e.target.value }))}
                                placeholder="Describe cualquier experiencia previa en voluntariado, trabajo social, o áreas relacionadas..."
                                rows={3}
                                className="mt-1"
                              />
                            </div>

                            <div>
                              <Label htmlFor="availability" className="text-sm font-medium">
                                Disponibilidad de tiempo *
                              </Label>
                              <Textarea
                                id="availability"
                                value={applicationData.availability}
                                onChange={(e) => setApplicationData(prev => ({ ...prev, availability: e.target.value }))}
                                placeholder="Indica tu disponibilidad semanal, horarios preferenciales y periodo de participación..."
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
                                      checked={applicationData.skills.includes(skill)}
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
                              <Label htmlFor="expectations" className="text-sm font-medium">
                                ¿Qué esperas obtener de esta experiencia?
                              </Label>
                              <Textarea
                                id="expectations"
                                value={applicationData.expectations}
                                onChange={(e) => setApplicationData(prev => ({ ...prev, expectations: e.target.value }))}
                                placeholder="Describe qué esperas aprender, experimentar o lograr con esta oportunidad de voluntariado..."
                                rows={3}
                                className="mt-1"
                              />
                            </div>

                            <div className="flex items-start space-x-2">
                              <Checkbox
                                id="commitment"
                                checked={applicationData.commitment}
                                onCheckedChange={(checked) => setApplicationData(prev => ({ ...prev, commitment: checked as boolean }))}
                              />
                              <Label htmlFor="commitment" className="text-sm text-gray-700">
                                Confirmo que entiendo el compromiso requerido ({selectedOpportunity?.commitment}) y 
                                me comprometo a participar activamente en el proyecto. *
                              </Label>
                            </div>
                          </div>

                          <DialogFooter className="flex gap-2">
                            <Button 
                              variant="outline" 
                              onClick={closeApplicationDialog}
                              disabled={isSubmitting}
                            >
                              Cancelar
                            </Button>
                            <Button 
                              onClick={handleSubmitApplication}
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                            </Button>
                          </DialogFooter>
                        </>
                      )}
                      </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <CardDescription className="text-sm sm:text-base mt-3">{opportunity.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Building2 className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{opportunity.organization}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{opportunity.location}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{opportunity.duration}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{opportunity.commitment}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Habilidades requeridas:</h4>
                    <div className="flex flex-wrap gap-1">
                      {opportunity.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">ODS relacionados:</h4>
                    <div className="flex flex-wrap gap-1">
                      {opportunity.ods.map((ods) => (
                        <Badge key={ods} variant="outline" className="text-xs">
                          {ods}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron oportunidades que coincidan con los filtros seleccionados.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

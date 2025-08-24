"use client"

import type React from "react"

import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { MapPin, Users, Target, Plus, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const odsOptions = [
  { id: "1", name: "Fin de la Pobreza", color: "bg-red-500" },
  { id: "2", name: "Hambre Cero", color: "bg-yellow-500" },
  { id: "3", name: "Salud y Bienestar", color: "bg-green-500" },
  { id: "4", name: "Educación de Calidad", color: "bg-red-600" },
  { id: "5", name: "Igualdad de Género", color: "bg-orange-500" },
  { id: "6", name: "Agua Limpia y Saneamiento", color: "bg-blue-400" },
  { id: "7", name: "Energía Asequible y No Contaminante", color: "bg-yellow-400" },
  { id: "8", name: "Trabajo Decente y Crecimiento Económico", color: "bg-red-700" },
  { id: "9", name: "Industria, Innovación e Infraestructura", color: "bg-orange-600" },
  { id: "10", name: "Reducción de las Desigualdades", color: "bg-pink-500" },
  { id: "11", name: "Ciudades y Comunidades Sostenibles", color: "bg-yellow-600" },
  { id: "12", name: "Producción y Consumo Responsables", color: "bg-yellow-700" },
  { id: "13", name: "Acción por el Clima", color: "bg-green-600" },
  { id: "14", name: "Vida Submarina", color: "bg-blue-500" },
  { id: "15", name: "Vida de Ecosistemas Terrestres", color: "bg-green-700" },
  { id: "16", name: "Paz, Justicia e Instituciones Sólidas", color: "bg-blue-600" },
  { id: "17", name: "Alianzas para lograr los Objetivos", color: "bg-blue-700" },
]

interface ProjectForm {
  title: string
  description: string
  organization: string
  location: string
  address: string
  startDate: string
  endDate: string
  maxVolunteers: number
  type: string
  ods: string[]
  requirements: string[]
  benefits: string[]
  contactEmail: string
  contactPhone: string
  isRemote: boolean
  urgency: string
}

export default function CreateProjectPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [newRequirement, setNewRequirement] = useState("")
  const [newBenefit, setNewBenefit] = useState("")

  const [form, setForm] = useState<ProjectForm>({
    title: "",
    description: "",
    organization: "",
    location: "",
    address: "",
    startDate: "",
    endDate: "",
    maxVolunteers: 10,
    type: "",
    ods: [],
    requirements: [],
    benefits: [],
    contactEmail: "",
    contactPhone: "",
    isRemote: false,
    urgency: "media",
  })

  const handleInputChange = (field: keyof ProjectForm, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleOdsToggle = (odsId: string) => {
    setForm((prev) => ({
      ...prev,
      ods: prev.ods.includes(odsId) ? prev.ods.filter((id) => id !== odsId) : [...prev.ods, odsId],
    }))
  }

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setForm((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()],
      }))
      setNewRequirement("")
    }
  }

  const removeRequirement = (index: number) => {
    setForm((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }))
  }

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setForm((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()],
      }))
      setNewBenefit("")
    }
  }

  const removeBenefit = (index: number) => {
    setForm((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    console.log("[v0] Creating project:", form)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("¡Proyecto creado exitosamente!")
      router.push("/projects")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Crear Nuevo Proyecto" description="Registra una nueva oportunidad de voluntariado" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información Básica */}
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
              <CardDescription>Detalles principales del proyecto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título del Proyecto *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Ej: Limpieza de Playas en Salinas"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe el proyecto, objetivos y actividades principales..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organization">Organización *</Label>
                  <Input
                    id="organization"
                    value={form.organization}
                    onChange={(e) => handleInputChange("organization", e.target.value)}
                    placeholder="Nombre de la organización"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Proyecto *</Label>
                  <Select value={form.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ambiental">Ambiental</SelectItem>
                      <SelectItem value="educativo">Educativo</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="salud">Salud</SelectItem>
                      <SelectItem value="tecnologico">Tecnológico</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ubicación y Fechas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Ubicación y Fechas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isRemote"
                  checked={form.isRemote}
                  onCheckedChange={(checked) => handleInputChange("isRemote", checked)}
                />
                <Label htmlFor="isRemote">Proyecto remoto</Label>
              </div>

              {!form.isRemote && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Ciudad/Provincia *</Label>
                    <Input
                      id="location"
                      value={form.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Ej: Guayaquil, Guayas"
                      required={!form.isRemote}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección específica</Label>
                    <Input
                      id="address"
                      value={form.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Dirección del lugar de encuentro"
                    />
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Fecha de Inicio *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Fecha de Fin</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={form.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgencia</Label>
                  <Select value={form.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baja">Baja</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="critica">Crítica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Voluntarios y ODS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Voluntarios y ODS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxVolunteers">Número máximo de voluntarios *</Label>
                <Input
                  id="maxVolunteers"
                  type="number"
                  min="1"
                  max="1000"
                  value={form.maxVolunteers}
                  onChange={(e) => handleInputChange("maxVolunteers", Number.parseInt(e.target.value))}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label>Objetivos de Desarrollo Sostenible (ODS) relacionados *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto border rounded-lg p-4">
                  {odsOptions.map((ods) => (
                    <div key={ods.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`ods-${ods.id}`}
                        checked={form.ods.includes(ods.id)}
                        onCheckedChange={() => handleOdsToggle(ods.id)}
                      />
                      <Label htmlFor={`ods-${ods.id}`} className="text-sm">
                        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${ods.color}`}></span>
                        ODS {ods.id}: {ods.name}
                      </Label>
                    </div>
                  ))}
                </div>
                {form.ods.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {form.ods.map((odsId) => {
                      const ods = odsOptions.find((o) => o.id === odsId)
                      return (
                        <Badge key={odsId} variant="secondary">
                          ODS {ods?.id}: {ods?.name}
                        </Badge>
                      )
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Requisitos y Beneficios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Requisitos y Beneficios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Requisitos para voluntarios</Label>
                <div className="flex gap-2">
                  <Input
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    placeholder="Ej: Mayor de 18 años"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
                  />
                  <Button type="button" onClick={addRequirement} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {form.requirements.length > 0 && (
                  <div className="space-y-2">
                    {form.requirements.map((req, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{req}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeRequirement(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label>Beneficios para voluntarios</Label>
                <div className="flex gap-2">
                  <Input
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    placeholder="Ej: Certificado de participación"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
                  />
                  <Button type="button" onClick={addBenefit} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {form.benefits.length > 0 && (
                  <div className="space-y-2">
                    {form.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{benefit}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeBenefit(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Información de Contacto */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email de contacto *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    placeholder="contacto@organizacion.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Teléfono de contacto</Label>
                  <Input
                    id="contactPhone"
                    value={form.contactPhone}
                    onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                    placeholder="+593 99 123 4567"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Creando...
                </>
              ) : (
                "Crear Proyecto"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

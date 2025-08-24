"use client"

import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { User, MapPin, Calendar, Settings, Shield, Camera, Save, Edit } from "lucide-react"
import { useState } from "react"

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Carlos Mendoza",
    email: "carlos.mendoza@espol.edu.ec",
    phone: "+593 99 123 4567",
    location: "Guayaquil, Guayas",
    birthDate: "1998-05-15",
    university: "ESPOL",
    career: "Ingeniería en Sistemas",
    semester: "8vo Semestre",
    bio: "Estudiante apasionado por la tecnología y el impacto social. Me interesa participar en proyectos que combinen innovación con responsabilidad social.",
    skills: ["Programación", "Diseño Web", "Educación", "Liderazgo"],
    interests: ["Tecnología", "Educación", "Medio Ambiente", "Juventud"],
    availability: ["Fines de semana", "Tardes entre semana"],
    languages: ["Español (Nativo)", "Inglés (Intermedio)", "Francés (Básico)"],
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    projectRecommendations: true,
    weeklyReports: true,
    eventReminders: true,
  })

  const handleSave = () => {
    console.log("[v0] Saving profile data:", profileData)
    setIsEditing(false)
    alert("Perfil actualizado exitosamente")
  }

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const addSkill = (skill: string) => {
    if (skill && !profileData.skills.includes(skill)) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  return (
    <div>
      <PageHeader
        title="Mi Perfil de Voluntario"
        description="Gestiona tu información personal y preferencias de voluntariado"
      >
        <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "outline" : "default"}>
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </>
          ) : (
            <>
              <Edit className="w-4 h-4 mr-2" />
              Editar Perfil
            </>
          )}
        </Button>
      </PageHeader>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="skills">Habilidades</TabsTrigger>
            <TabsTrigger value="preferences">Preferencias</TabsTrigger>
            <TabsTrigger value="privacy">Privacidad</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>Actualiza tu información básica y de contacto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" />
                      <AvatarFallback className="text-lg">CM</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{profileData.name}</h3>
                    <p className="text-gray-600">
                      {profileData.career} - {profileData.university}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {profileData.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {profileData.semester}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Ubicación</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="university">Universidad</Label>
                    <Input
                      id="university"
                      value={profileData.university}
                      onChange={(e) => handleInputChange("university", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="career">Carrera</Label>
                    <Input
                      id="career"
                      value={profileData.career}
                      onChange={(e) => handleInputChange("career", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografía</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Cuéntanos sobre ti, tus intereses y motivaciones para el voluntariado..."
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Cambios
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Habilidades y Competencias</CardTitle>
                <CardDescription>
                  Gestiona tus habilidades para mejorar las recomendaciones de proyectos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Habilidades Técnicas</Label>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {profileData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        {isEditing && (
                          <button onClick={() => removeSkill(skill)} className="ml-1 text-gray-500 hover:text-red-500">
                            ×
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex gap-2 mt-3">
                      <Input placeholder="Agregar nueva habilidad..." className="flex-1" />
                      <Button onClick={() => addSkill("Nueva Habilidad")}>Agregar</Button>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-base font-medium">Áreas de Interés</Label>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {profileData.interests.map((interest) => (
                      <Badge key={interest} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Disponibilidad</Label>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {profileData.availability.map((time) => (
                      <Badge key={time} variant="default">
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Idiomas</Label>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {profileData.languages.map((language) => (
                      <Badge key={language} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Experiencia en Voluntariado</CardTitle>
                <CardDescription>Historial de participación y logros</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">156</div>
                    <p className="text-sm text-gray-600">Horas Totales</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">8</div>
                    <p className="text-sm text-gray-600">Proyectos Completados</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">92</div>
                    <p className="text-sm text-gray-600">Puntuación de Impacto</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Notificaciones por Email</Label>
                      <p className="text-sm text-gray-600">Recibe actualizaciones importantes por correo</p>
                    </div>
                    <Checkbox
                      checked={preferences.emailNotifications}
                      onCheckedChange={(checked) =>
                        setPreferences((prev) => ({ ...prev, emailNotifications: checked as boolean }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Notificaciones SMS</Label>
                      <p className="text-sm text-gray-600">Recibe recordatorios urgentes por mensaje</p>
                    </div>
                    <Checkbox
                      checked={preferences.smsNotifications}
                      onCheckedChange={(checked) =>
                        setPreferences((prev) => ({ ...prev, smsNotifications: checked as boolean }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Recomendaciones de Proyectos</Label>
                      <p className="text-sm text-gray-600">Recibe sugerencias personalizadas</p>
                    </div>
                    <Checkbox
                      checked={preferences.projectRecommendations}
                      onCheckedChange={(checked) =>
                        setPreferences((prev) => ({ ...prev, projectRecommendations: checked as boolean }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Reportes Semanales</Label>
                      <p className="text-sm text-gray-600">Resumen semanal de tu actividad</p>
                    </div>
                    <Checkbox
                      checked={preferences.weeklyReports}
                      onCheckedChange={(checked) =>
                        setPreferences((prev) => ({ ...prev, weeklyReports: checked as boolean }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Recordatorios de Eventos</Label>
                      <p className="text-sm text-gray-600">Avisos antes de actividades programadas</p>
                    </div>
                    <Checkbox
                      checked={preferences.eventReminders}
                      onCheckedChange={(checked) =>
                        setPreferences((prev) => ({ ...prev, eventReminders: checked as boolean }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferencias de Matching</CardTitle>
                <CardDescription>Personaliza cómo el sistema te recomienda proyectos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Distancia Máxima</Label>
                    <Select defaultValue="25km">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5km">5 km</SelectItem>
                        <SelectItem value="10km">10 km</SelectItem>
                        <SelectItem value="25km">25 km</SelectItem>
                        <SelectItem value="50km">50 km</SelectItem>
                        <SelectItem value="unlimited">Sin límite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Compromiso de Tiempo</Label>
                    <Select defaultValue="flexible">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Bajo (1-5 horas/semana)</SelectItem>
                        <SelectItem value="medium">Medio (5-15 horas/semana)</SelectItem>
                        <SelectItem value="high">Alto (15+ horas/semana)</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Privacidad</CardTitle>
                <CardDescription>Controla qué información es visible para otros usuarios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Perfil Público</Label>
                      <p className="text-sm text-gray-600">Permite que otros voluntarios vean tu perfil</p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Mostrar Estadísticas</Label>
                      <p className="text-sm text-gray-600">Comparte tus horas y proyectos completados</p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Contacto Directo</Label>
                      <p className="text-sm text-gray-600">Permite que organizaciones te contacten directamente</p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Ubicación Aproximada</Label>
                      <p className="text-sm text-gray-600">Muestra solo la ciudad, no la dirección exacta</p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gestión de Datos</CardTitle>
                <CardDescription>Controla tus datos personales y su uso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Shield className="w-4 h-4 mr-2" />
                    Descargar mis datos
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurar cookies
                  </Button>
                  <Button variant="destructive" className="justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Eliminar cuenta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

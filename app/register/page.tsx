"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Building2, Heart, Users, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const [userType, setUserType] = useState<string>(searchParams?.get("type") || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    position: "",
    description: "",
    interests: [] as string[],
    location: "",
    studentId: "",
    career: "",
    semester: "",
    skills: [] as string[],
    volunteerType: "", // "student", "administrative", "external"
    faculty: "", // for administrative users
    company: "", // for external users (optional)
    employeeId: "", // for administrative users
  })

  const validateForm = () => {
    const requiredFields = ["name", "email", "phone", "location"]

    if (userType === "estudiante") {
      requiredFields.push("volunteerType")
      if (formData.volunteerType === "student") {
        requiredFields.push("studentId", "career", "semester")
      } else if (formData.volunteerType === "administrative") {
        requiredFields.push("employeeId", "faculty")
      }
      // external type has no additional required fields beyond name, email, phone, location
    } else if (userType === "empresa") {
      requiredFields.push("position")
    } else if (userType === "comunidad") {
      requiredFields.push("description")
    }

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        alert(`Por favor completa el campo: ${field}`)
        return false
      }
    }

    if (formData.interests.length === 0) {
      alert("Por favor selecciona al menos un ODS de interés")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    console.log("[v0] Submitting registration:", { userType, ...formData })

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSuccess(true)
      console.log("[v0] Registration successful")
    } catch (error) {
      console.error("[v0] Registration failed:", error)
      alert("Error en el registro. Por favor intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInterestChange = (interest: string, checked: boolean) => {
    console.log(`[v0] Interest ${interest} ${checked ? "selected" : "deselected"}`)
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, interest],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        interests: prev.interests.filter((i) => i !== interest),
      }))
    }
  }

  const handleUserTypeSelect = (type: string) => {
    console.log(`[v0] User type selected: ${type}`)
    setUserType(type)
  }

  const handleBackToSelection = () => {
    console.log("[v0] Going back to user type selection")
    setUserType("")
    setIsSuccess(false)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen relative py-12 px-4 flex items-center justify-center overflow-hidden">
        {/* Background Image - Bottom Half */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/ubicacion-eoc.jpg')`,
            filter: 'blur(3px)',
          }}
        />
        <div className="absolute inset-0 bg-[#154d8c]/80" />
        
        <Card className="max-w-md w-full relative z-10">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl text-green-600">¡Registro Exitoso!</CardTitle>
            <CardDescription>
              Tu cuenta ha sido creada correctamente. Te enviaremos un correo de confirmación.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/dashboard">
              <Button className="w-full">Ir al Dashboard</Button>
            </Link>
            <Link href="/voluntariado">
              <Button variant="outline" className="w-full bg-transparent">
                Volver al Inicio
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const odsOptions = [
    "1. Fin de la Pobreza",
    "2. Hambre Cero",
    "3. Salud y Bienestar",
    "4. Educación de Calidad",
    "5. Igualdad de Género",
    "6. Agua Limpia y Saneamiento",
    "7. Energía Asequible y No Contaminante",
    "8. Trabajo Decente y Crecimiento Económico",
    "9. Industria, Innovación e Infraestructura",
    "10. Reducción de las Desigualdades",
    "11. Ciudades y Comunidades Sostenibles",
    "12. Producción y Consumo Responsables",
    "13. Acción por el Clima",
    "14. Vida Submarina",
    "15. Vida de Ecosistemas Terrestres",
    "16. Paz, Justicia e Instituciones Sólidas",
    "17. Alianzas para lograr los Objetivos",
  ]

  if (!userType) {
    return (
      <div className="min-h-screen relative py-12 px-4 overflow-hidden">
        {/* Background Image - Bottom Half */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/ubicacion-eoc.jpg')`,
            filter: 'blur(3px)',
          }}
        />
        <div className="absolute inset-0 bg-[#154d8c]/80" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <Link href="/voluntariado" className="inline-flex items-center text-white hover:text-gray-200 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Voluntariado
            </Link>
            <h1 className="text-5xl font-black text-white mb-4">Únete a VolunteerConnect</h1>
            <p className="text-gray-200">Selecciona tu tipo de perfil para comenzar</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-500"
              onClick={() => handleUserTypeSelect("empresa")}
            >
              <CardHeader className="text-center">
                <Building2 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <CardTitle>Empresa</CardTitle>
                <CardDescription className="text-gray-700">
                  Gestiona programas de voluntariado corporativo y RSE
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Panel de gestión empresarial</li>
                  <li>• Coordinación de colaboradores</li>
                  <li>• Métricas de impacto social</li>
                  <li>• Alineación con objetivos RSE</li>
                </ul>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-500"
              onClick={() => handleUserTypeSelect("estudiante")}
            >
              <CardHeader className="text-center">
                <Heart className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <CardTitle>Voluntario</CardTitle>
                <CardDescription className="text-gray-700">
                  Participa en actividades de voluntariado y desarrollo social
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Oportunidades de voluntariado</li>
                  <li>• Desarrollo de competencias</li>
                  <li>• Aprendizaje práctico</li>
                  <li>• Certificaciones de participación</li>
                </ul>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-purple-500"
              onClick={() => handleUserTypeSelect("comunidad")}
            >
              <CardHeader className="text-center">
                <Users className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <CardTitle>Comunidad</CardTitle>
                <CardDescription className="text-gray-700">
                  Registra necesidades y recibe apoyo colaborativo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Registro de necesidades</li>
                  <li>• Geolocalización de proyectos</li>
                  <li>• Seguimiento de resultados</li>
                  <li>• Conexión con voluntarios</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative py-12 px-4 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/ubicacion-eoc.jpg')`,
          filter: 'blur(3px)',
        }}
      />
      <div className="absolute inset-0 bg-[#154d8c]/80" />
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <Button variant="ghost" onClick={handleBackToSelection} className="mb-4 text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Cambiar tipo de usuario
          </Button>
          <h1 className="text-5xl font-black text-white mb-4">
            {userType === "empresa" ? "Registro - Empresa" : 
             userType === "estudiante" ? "Registro - Voluntario" : 
             "Registro - Comunidad"}
          </h1>
        </div>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Información de Registro</CardTitle>
            <CardDescription className="text-gray-600">
              Completa los datos para crear tu perfil en la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campos comunes */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700">
                    {userType === "empresa"
                      ? "Nombre de la Empresa"
                      : userType === "estudiante"
                        ? "Nombre Completo"
                        : "Nombre de la Organización"}
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700">
                    Correo Electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-gray-700">
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-gray-700">
                    Ubicación
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Ciudad, Provincia"
                    required
                  />
                </div>
              </div>

              {/* Campos específicos por tipo de usuario */}
              {userType === "empresa" && (
                <>
                  <div>
                    <Label htmlFor="position" className="text-gray-700">
                      Cargo/Posición
                    </Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
                      placeholder="Ej: Gerente de RSE, Coordinador de Voluntariado"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-gray-700">
                      Descripción de la Empresa
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe brevemente tu empresa y sus objetivos de RSE"
                      rows={3}
                    />
                  </div>
                </>
              )}

              {userType === "estudiante" && (
                <>
                  {/* Volunteer Type Selection */}
                  <div>
                    <Label className="text-gray-700 text-base font-medium">
                      Tipo de Voluntario
                    </Label>
                    <div className="grid md:grid-cols-3 gap-4 mt-2">
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.volunteerType === "student"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setFormData((prev) => ({ ...prev, volunteerType: "student" }))}
                      >
                        <div className="text-center">
                          <Heart className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                          <h4 className="font-medium text-gray-900">Estudiante ESPOL</h4>
                          <p className="text-sm text-gray-600">Estudiante regular de ESPOL</p>
                        </div>
                      </div>
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.volunteerType === "administrative"
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setFormData((prev) => ({ ...prev, volunteerType: "administrative" }))}
                      >
                        <div className="text-center">
                          <Building2 className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                          <h4 className="font-medium text-gray-900">Administrativo ESPOL</h4>
                          <p className="text-sm text-gray-600">Empleado administrativo de ESPOL</p>
                        </div>
                      </div>
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.volunteerType === "external"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setFormData((prev) => ({ ...prev, volunteerType: "external" }))}
                      >
                        <div className="text-center">
                          <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
                          <h4 className="font-medium text-gray-900">Externo a ESPOL</h4>
                          <p className="text-sm text-gray-600">Persona externa a ESPOL</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Student-specific fields */}
                  {formData.volunteerType === "student" && (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="studentId" className="text-gray-700">
                            Matrícula ESPOL
                          </Label>
                          <Input
                            id="studentId"
                            value={formData.studentId}
                            onChange={(e) => setFormData((prev) => ({ ...prev, studentId: e.target.value }))}
                            placeholder="Ej: 202012345"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="semester" className="text-gray-700">
                            Semestre
                          </Label>
                          <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, semester: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona tu semestre" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sem) => (
                                <SelectItem key={sem} value={sem.toString()}>
                                  {sem}° Semestre
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="career" className="text-gray-700">
                          Carrera
                        </Label>
                        <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, career: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tu carrera" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ingenieria-sistemas">Ingeniería en Sistemas</SelectItem>
                            <SelectItem value="ingenieria-industrial">Ingeniería Industrial</SelectItem>
                            <SelectItem value="ingenieria-civil">Ingeniería Civil</SelectItem>
                            <SelectItem value="ingenieria-electronica">Ingeniería Electrónica</SelectItem>
                            <SelectItem value="economia">Economía</SelectItem>
                            <SelectItem value="administracion">Administración de Empresas</SelectItem>
                            <SelectItem value="otras">Otras</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {/* Administrative-specific fields */}
                  {formData.volunteerType === "administrative" && (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="employeeId" className="text-gray-700">
                            Código de Empleado
                          </Label>
                          <Input
                            id="employeeId"
                            value={formData.employeeId}
                            onChange={(e) => setFormData((prev) => ({ ...prev, employeeId: e.target.value }))}
                            placeholder="Ej: EMP001"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="faculty" className="text-gray-700">
                            Facultad/Área
                          </Label>
                          <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, faculty: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona tu facultad/área" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fiec">FIEC - Facultad de Ingeniería Eléctrica y Computación</SelectItem>
                              <SelectItem value="fimcbor">FIMCBOR - Facultad de Ingeniería Mecánica y Ciencias de la Producción</SelectItem>
                              <SelectItem value="fcnm">FCNM - Facultad de Ciencias Naturales y Matemáticas</SelectItem>
                              <SelectItem value="fimcp">FIMCP - Facultad de Ingeniería Marítima y Ciencias del Mar</SelectItem>
                              <SelectItem value="fcsh">FCSH - Facultad de Ciencias Sociales y Humanísticas</SelectItem>
                              <SelectItem value="edcom">EDCOM - Escuela de Diseño y Comunicación Visual</SelectItem>
                              <SelectItem value="administracion">Administración</SelectItem>
                              <SelectItem value="rectorado">Rectorado</SelectItem>
                              <SelectItem value="otros">Otros</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </>
                  )}

                  {/* External user fields */}
                  {formData.volunteerType === "external" && (
                    <div>
                      <Label htmlFor="company" className="text-gray-700">
                        Empresa/Organización (Opcional)
                      </Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                        placeholder="Nombre de tu empresa u organización (opcional)"
                      />
                    </div>
                  )}
                </>
              )}

              {userType === "comunidad" && (
                <div>
                  <Label htmlFor="description" className="text-gray-700">
                    Descripción de la Comunidad/Organización
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe tu comunidad, sus necesidades principales y el tipo de apoyo que buscas"
                    rows={4}
                    required
                  />
                </div>
              )}

              {/* Intereses en ODS */}
              <div>
                <Label className="text-base font-medium text-gray-700">
                  Objetivos de Desarrollo Sostenible (ODS) de Interés
                </Label>
                <p className="text-sm text-gray-600 mb-3">
                  Selecciona los ODS que más se alinean con tus{" "}
                  {userType === "empresa"
                    ? "objetivos empresariales"
                    : userType === "estudiante"
                      ? "intereses de voluntariado"
                      : "necesidades comunitarias"}
                </p>
                <div className="grid md:grid-cols-2 gap-2 max-h-60 overflow-y-auto border rounded-md p-3">
                  {odsOptions.map((ods) => (
                    <div key={ods} className="flex items-center space-x-2">
                      <Checkbox
                        id={ods}
                        checked={formData.interests.includes(ods)}
                        onCheckedChange={(checked) => handleInterestChange(ods, checked as boolean)}
                      />
                      <Label htmlFor={ods} className="text-sm text-gray-700">
                        {ods}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#154d8c] hover:bg-[#123d73] text-white"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creando Cuenta..." : "Crear Cuenta"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

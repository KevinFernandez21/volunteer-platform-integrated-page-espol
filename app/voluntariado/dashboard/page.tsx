"use client"

import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Target,
  Award,
  Calendar,
  Clock,
  Download,
  Share2,
  BookOpen,
  Building,
  Heart,
  Leaf,
  Globe,
  Droplets,
  Fish,
  Zap,
  Users,
  Apple,
  Shield,
  Handshake,
  Factory,
  Equal,
  Trees,
  Scale,
  Sun,
  Wind,
} from "lucide-react"
import { useState } from "react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const userStats = {
    totalHours: 156,
    projectsCompleted: 8,
    impactScore: 92,
    ranking: 15,
    totalVolunteers: 1247,
    carbonFootprintReduced: 2.4,
    peopleImpacted: 123,
    communitiesServed: 5,
  }

  const odsProgress = [
    {
      ods: "ODS 1 - Fin de la Pobreza",
      progress: 42,
      projects: 2,
      hours: 28,
      color: "#E5243B",
      bgColor: "#FEF7F0",
      icon: Target,
      description: "Poner fin a la pobreza en todas sus formas y en todo el mundo",
    },
    {
      ods: "ODS 2 - Hambre Cero",
      progress: 38,
      projects: 1,
      hours: 22,
      color: "#DDA63A",
      bgColor: "#FFFACD",
      icon: Apple,
      description: "Poner fin al hambre, lograr la seguridad alimentaria y la mejora de la nutrición",
    },
    {
      ods: "ODS 3 - Salud y Bienestar",
      progress: 65,
      projects: 3,
      hours: 45,
      color: "#4C9F38",
      bgColor: "#F0FDF4",
      icon: Heart,
      description: "Garantizar una vida sana y promover el bienestar para todos",
    },
    {
      ods: "ODS 4 - Educación de Calidad",
      progress: 85,
      projects: 5,
      hours: 78,
      color: "#C5192D",
      bgColor: "#FFF1F2",
      icon: BookOpen,
      description: "Garantizar una educación inclusiva, equitativa y de calidad",
    },
    {
      ods: "ODS 5 - Igualdad de Género",
      progress: 52,
      projects: 2,
      hours: 34,
      color: "#FF3A21",
      bgColor: "#FFF5F5",
      icon: Equal,
      description: "Lograr la igualdad entre los géneros y empoderar a todas las mujeres y niñas",
    },
    {
      ods: "ODS 6 - Agua Limpia y Saneamiento",
      progress: 48,
      projects: 2,
      hours: 32,
      color: "#26BDE2",
      bgColor: "#F0FDFF",
      icon: Droplets,
      description: "Garantizar la disponibilidad de agua y su gestión sostenible",
    },
    {
      ods: "ODS 7 - Energía Asequible y No Contaminante",
      progress: 35,
      projects: 1,
      hours: 18,
      color: "#FCC30B",
      bgColor: "#FFFBEB",
      icon: Zap,
      description: "Garantizar el acceso a una energía asequible, segura, sostenible y moderna",
    },
    {
      ods: "ODS 8 - Trabajo Decente y Crecimiento Económico",
      progress: 41,
      projects: 2,
      hours: 29,
      color: "#A21942",
      bgColor: "#FDF2F8",
      icon: TrendingUp,
      description: "Promover el crecimiento económico sostenido, inclusivo y sostenible",
    },
    {
      ods: "ODS 9 - Industria, Innovación e Infraestructura",
      progress: 33,
      projects: 1,
      hours: 16,
      color: "#FD6925",
      bgColor: "#FFF7ED",
      icon: Factory,
      description: "Construir infraestructuras resilientes, promover la industrialización inclusiva",
    },
    {
      ods: "ODS 10 - Reducción de las Desigualdades",
      progress: 46,
      projects: 2,
      hours: 31,
      color: "#DD1367",
      bgColor: "#FDF2F8",
      icon: Users,
      description: "Reducir la desigualdad en y entre los países",
    },
    {
      ods: "ODS 11 - Ciudades y Comunidades Sostenibles",
      progress: 60,
      projects: 3,
      hours: 42,
      color: "#FD9D24",
      bgColor: "#FFFBEB",
      icon: Building,
      description: "Lograr que las ciudades sean inclusivas, seguras, resilientes y sostenibles",
    },
    {
      ods: "ODS 12 - Producción y Consumo Responsables",
      progress: 39,
      projects: 1,
      hours: 24,
      color: "#BF8B2E",
      bgColor: "#FFFBEB",
      icon: Globe,
      description: "Garantizar modalidades de consumo y producción sostenibles",
    },
    {
      ods: "ODS 13 - Acción por el Clima",
      progress: 55,
      projects: 2,
      hours: 38,
      color: "#3F7E44",
      bgColor: "#F0FDF4",
      icon: Leaf,
      description: "Adoptar medidas urgentes para combatir el cambio climático",
    },
    {
      ods: "ODS 14 - Vida Submarina",
      progress: 70,
      projects: 3,
      hours: 48,
      color: "#0A97D9",
      bgColor: "#F0F9FF",
      icon: Fish,
      description: "Conservar y utilizar sosteniblemente los océanos, mares y recursos marinos",
    },
    {
      ods: "ODS 15 - Vida de Ecosistemas Terrestres",
      progress: 44,
      projects: 2,
      hours: 28,
      color: "#56C02B",
      bgColor: "#F0FDF4",
      icon: Trees,
      description: "Proteger, restablecer y promover el uso sostenible de los ecosistemas terrestres",
    },
    {
      ods: "ODS 16 - Paz, Justicia e Instituciones Sólidas",
      progress: 37,
      projects: 1,
      hours: 21,
      color: "#00689D",
      bgColor: "#F0F9FF",
      icon: Scale,
      description: "Promover sociedades justas, pacíficas e inclusivas",
    },
    {
      ods: "ODS 17 - Alianzas para Lograr los Objetivos",
      progress: 68,
      projects: 4,
      hours: 52,
      color: "#19486A",
      bgColor: "#F8FAFC",
      icon: Handshake,
      description: "Revitalizar la Alianza Mundial para el Desarrollo Sostenible",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      title: "Limpieza de Playa Salinas",
      date: "15 Mar 2024",
      hours: 6,
      status: "Completado",
      impact: "Recolectados 45kg de residuos",
    },
    {
      id: 2,
      title: "Tutoría Matemáticas",
      date: "12 Mar 2024",
      hours: 3,
      status: "Completado",
      impact: "5 estudiantes beneficiados",
    },
    {
      id: 3,
      title: "Huerto Comunitario",
      date: "8 Mar 2024",
      hours: 4,
      status: "En progreso",
      impact: "Plantadas 20 especies nativas",
    },
  ]

  const achievements = [
    { title: "Primer Voluntario", description: "Completaste tu primer proyecto", date: "Feb 2024", icon: "🏆" },
    { title: "Eco Warrior", description: "10 horas en proyectos ambientales", date: "Mar 2024", icon: "🌱" },
    { title: "Mentor", description: "Ayudaste a 20+ estudiantes", date: "Mar 2024", icon: "👨‍🏫" },
    { title: "Colaborador", description: "Trabajaste con 5+ organizaciones", date: "Mar 2024", icon: "🤝" },
  ]

  return (
    <div>
      <PageHeader
        title="Dashboard de Impacto"
        description="Monitorea tu progreso y el impacto de tus actividades de voluntariado alineadas con los ODS"
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Compartir
          </Button>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Horas Totales</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{userStats.totalHours}</div>
              <p className="text-xs text-muted-foreground">+12 horas este mes</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proyectos Completados</CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{userStats.projectsCompleted}</div>
              <p className="text-xs text-muted-foreground">+2 este mes</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Puntuación de Impacto</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{userStats.impactScore}/100</div>
              <p className="text-xs text-muted-foreground">+8 puntos este mes</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ranking</CardTitle>
              <Award className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">#{userStats.ranking}</div>
              <p className="text-xs text-muted-foreground">de {userStats.totalVolunteers} voluntarios</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="ods">Métricas ODS</TabsTrigger>
            <TabsTrigger value="impact">Impacto</TabsTrigger>
            <TabsTrigger value="achievements">Logros</TabsTrigger>
          </TabsList>

          {/* ... existing overview tab ... */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Progreso Mensual</CardTitle>
                  <CardDescription>Horas de voluntariado por mes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Enero</span>
                      <span className="text-sm font-medium">32h</span>
                    </div>
                    <Progress value={65} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Febrero</span>
                      <span className="text-sm font-medium">28h</span>
                    </div>
                    <Progress value={56} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Marzo</span>
                      <span className="text-sm font-medium">45h</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Tipo</CardTitle>
                  <CardDescription>Horas por categoría de proyecto</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Educación</span>
                      </div>
                      <span className="text-sm font-medium">45h (29%)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Medio Ambiente</span>
                      </div>
                      <span className="text-sm font-medium">60h (38%)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">Salud</span>
                      </div>
                      <span className="text-sm font-medium">32h (21%)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Social</span>
                      </div>
                      <span className="text-sm font-medium">19h (12%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ... existing projects tab ... */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Proyectos Activos</CardTitle>
                  <CardDescription>Proyectos en los que estás participando actualmente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div>
                          <h4 className="font-medium">Limpieza Costera Salinas</h4>
                          <p className="text-sm text-gray-600">ODS 14 - Vida Submarina</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-500">6 horas contribuidas</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">En progreso</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                          <h4 className="font-medium">Tutoría Matemáticas ESPOL</h4>
                          <p className="text-sm text-gray-600">ODS 4 - Educación de Calidad</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-500">12 horas contribuidas</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Activo</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg bg-orange-50">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <div>
                          <h4 className="font-medium">Huerto Comunitario Guayaquil</h4>
                          <p className="text-sm text-gray-600">ODS 11 - Ciudades Sostenibles</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-500">8 horas contribuidas</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-orange-100 text-orange-700">Planificando</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Proyectos Completados</CardTitle>
                  <CardDescription>Historial de proyectos finalizados exitosamente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <div>
                          <h4 className="font-medium">Campaña Reciclaje ESPOL</h4>
                          <p className="text-sm text-gray-600">ODS 13 - Acción por el Clima</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-500">Completado en Feb 2024</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">Completado</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <div>
                          <h4 className="font-medium">Donación de Libros</h4>
                          <p className="text-sm text-gray-600">ODS 4 - Educación de Calidad</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-500">Completado en Ene 2024</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">Completado</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <div>
                          <h4 className="font-medium">Jornada Salud Comunitaria</h4>
                          <p className="text-sm text-gray-600">ODS 3 - Salud y Bienestar</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-500">Completado en Dic 2023</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">Completado</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Estadísticas de Proyectos</CardTitle>
                <CardDescription>Resumen de tu participación en proyectos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Target className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-blue-600">11</div>
                    <p className="text-sm text-gray-600">Total Proyectos</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Award className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-green-600">8</div>
                    <p className="text-sm text-gray-600">Completados</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <div className="text-2xl font-bold text-orange-600">3</div>
                    <p className="text-sm text-gray-600">En Progreso</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold text-purple-600">73%</div>
                    <p className="text-sm text-gray-600">Tasa de Éxito</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ... existing ods tab ... */}
          <TabsContent value="ods" className="space-y-6">
            <div className="grid gap-6">
              {/* ODS Impact Overview */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <Card style={{ backgroundColor: "#FFF1F2", borderColor: "#C5192D" }} className="border-2">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold" style={{ color: "#C5192D" }}>
                      17
                    </div>
                    <p className="text-sm text-gray-600">ODS Impactados</p>
                  </CardContent>
                </Card>
                <Card style={{ backgroundColor: "#F0FDF4", borderColor: "#4C9F38" }} className="border-2">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold" style={{ color: "#4C9F38" }}>
                      {userStats.peopleImpacted}
                    </div>
                    <p className="text-sm text-gray-600">Personas Beneficiadas</p>
                  </CardContent>
                </Card>
                <Card style={{ backgroundColor: "#F0F9FF", borderColor: "#0A97D9" }} className="border-2">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold" style={{ color: "#0A97D9" }}>
                      67kg
                    </div>
                    <p className="text-sm text-gray-600">Residuos Recolectados</p>
                  </CardContent>
                </Card>
                <Card style={{ backgroundColor: "#FFFBEB", borderColor: "#FD9D24" }} className="border-2">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold" style={{ color: "#FD9D24" }}>
                      {userStats.carbonFootprintReduced}t
                    </div>
                    <p className="text-sm text-gray-600">CO₂ Reducido</p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed ODS Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    Contribución a los Objetivos de Desarrollo Sostenible
                  </CardTitle>
                  <CardDescription>Tu impacto alineado con los ODS de la ONU - Agenda 2030</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {odsProgress.map((ods, index) => {
                      const IconComponent = ods.icon
                      return (
                        <Card
                          key={index}
                          className="border-l-4"
                          style={{ borderLeftColor: ods.color, backgroundColor: ods.bgColor }}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="p-3 rounded-full" style={{ backgroundColor: ods.color + "20" }}>
                                <IconComponent className="w-6 h-6" style={{ color: ods.color }} />
                              </div>
                              <div className="flex-1 space-y-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold text-lg" style={{ color: ods.color }}>
                                    {ods.ods}
                                  </h4>
                                  <Badge variant="outline" style={{ borderColor: ods.color, color: ods.color }}>
                                    {ods.progress}% completado
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600">{ods.description}</p>
                                <div className="space-y-2">
                                  <Progress
                                    value={ods.progress}
                                    className="h-3"
                                    style={{
                                      backgroundColor: ods.color + "20",
                                    }}
                                  />
                                  <div className="flex justify-between text-sm">
                                    <span className="flex items-center gap-1">
                                      <Target className="w-3 h-3" />
                                      {ods.projects} proyectos activos
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {ods.hours} horas contribuidas
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* ODS Impact Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Métricas de Impacto Detalladas</CardTitle>
                  <CardDescription>Resultados cuantificables de tu contribución a los ODS</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#FEF7F0" }}>
                      <Target className="w-8 h-8 mx-auto mb-2" style={{ color: "#E5243B" }} />
                      <div className="text-2xl font-bold" style={{ color: "#E5243B" }}>
                        85
                      </div>
                      <p className="text-sm text-gray-600">Familias Beneficiadas</p>
                      <p className="text-xs text-gray-500">ODS 1</p>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#FFFACD" }}>
                      <Apple className="w-8 h-8 mx-auto mb-2" style={{ color: "#DDA63A" }} />
                      <div className="text-2xl font-bold" style={{ color: "#DDA63A" }}>
                        342kg
                      </div>
                      <p className="text-sm text-gray-600">Alimentos Distribuidos</p>
                      <p className="text-xs text-gray-500">ODS 2</p>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#F0FDF4" }}>
                      <Heart className="w-8 h-8 mx-auto mb-2" style={{ color: "#4C9F38" }} />
                      <div className="text-2xl font-bold" style={{ color: "#4C9F38" }}>
                        156
                      </div>
                      <p className="text-sm text-gray-600">Personas Atendidas</p>
                      <p className="text-xs text-gray-500">ODS 3</p>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#FFF1F2" }}>
                      <BookOpen className="w-8 h-8 mx-auto mb-2" style={{ color: "#C5192D" }} />
                      <div className="text-2xl font-bold" style={{ color: "#C5192D" }}>
                        234
                      </div>
                      <p className="text-sm text-gray-600">Estudiantes Tutoreados</p>
                      <p className="text-xs text-gray-500">ODS 4</p>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#FFF5F5" }}>
                      <Equal className="w-8 h-8 mx-auto mb-2" style={{ color: "#FF3A21" }} />
                      <div className="text-2xl font-bold" style={{ color: "#FF3A21" }}>
                        67
                      </div>
                      <p className="text-sm text-gray-600">Mujeres Empoderadas</p>
                      <p className="text-xs text-gray-500">ODS 5</p>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#F0FDFF" }}>
                      <Droplets className="w-8 h-8 mx-auto mb-2" style={{ color: "#26BDE2" }} />
                      <div className="text-2xl font-bold" style={{ color: "#26BDE2" }}>
                        1,200L
                      </div>
                      <p className="text-sm text-gray-600">Agua Potable</p>
                      <p className="text-xs text-gray-500">ODS 6</p>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#FFFBEB" }}>
                      <Zap className="w-8 h-8 mx-auto mb-2" style={{ color: "#FCC30B" }} />
                      <div className="text-2xl font-bold" style={{ color: "#FCC30B" }}>
                        45kWh
                      </div>
                      <p className="text-sm text-gray-600">Energía Limpia</p>
                      <p className="text-xs text-gray-500">ODS 7</p>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#FDF2F8" }}>
                      <TrendingUp className="w-8 h-8 mx-auto mb-2" style={{ color: "#A21942" }} />
                      <div className="text-2xl font-bold" style={{ color: "#A21942" }}>
                        89
                      </div>
                      <p className="text-sm text-gray-600">Empleos Dignos</p>
                      <p className="text-xs text-gray-500">ODS 8</p>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#FFF7ED" }}>
                      <Factory className="w-8 h-8 mx-auto mb-2" style={{ color: "#FD6925" }} />
                      <div className="text-2xl font-bold" style={{ color: "#FD6925" }}>
                        12
                      </div>
                      <p className="text-sm text-gray-600">Proyectos Innovadores</p>
                      <p className="text-xs text-gray-500">ODS 9</p>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#FDF2F8" }}>
                      <Users className="w-8 h-8 mx-auto mb-2" style={{ color: "#DD1367" }} />
                      <div className="text-2xl font-bold" style={{ color: "#DD1367" }}>
                        78%
                      </div>
                      <p className="text-sm text-gray-600">Reducción Desigualdad</p>
                      <p className="text-xs text-gray-500">ODS 10</p>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#FFFBEB" }}>
                      <Building className="w-8 h-8 mx-auto mb-2" style={{ color: "#FD9D24" }} />
                      <div className="text-2xl font-bold" style={{ color: "#FD9D24" }}>
                        8
                      </div>
                      <p className="text-sm text-gray-600">Comunidades Mejoradas</p>
                      <p className="text-xs text-gray-500">ODS 11</p>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#FFFBEB" }}>
                      <Globe className="w-8 h-8 mx-auto mb-2" style={{ color: "#BF8B2E" }} />
                      <div className="text-2xl font-bold" style={{ color: "#BF8B2E" }}>
                        456kg
                      </div>
                      <p className="text-sm text-gray-600">Residuos Reciclados</p>
                      <p className="text-xs text-gray-500">ODS 12</p>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#F0FDF4" }}>
                      <Leaf className="w-8 h-8 mx-auto mb-2" style={{ color: "#3F7E44" }} />
                      <div className="text-2xl font-bold" style={{ color: "#3F7E44" }}>
                        2.8t
                      </div>
                      <p className="text-sm text-gray-600">CO₂ Reducido</p>
                      <p className="text-xs text-gray-500">ODS 13</p>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#F0F9FF" }}>
                      <Fish className="w-8 h-8 mx-auto mb-2" style={{ color: "#0A97D9" }} />
                      <div className="text-2xl font-bold" style={{ color: "#0A97D9" }}>
                        3.2km
                      </div>
                      <p className="text-sm text-gray-600">Costa Limpiada</p>
                      <p className="text-xs text-gray-500">ODS 14</p>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#F0FDF4" }}>
                      <Trees className="w-8 h-8 mx-auto mb-2" style={{ color: "#56C02B" }} />
                      <div className="text-2xl font-bold" style={{ color: "#56C02B" }}>
                        289
                      </div>
                      <p className="text-sm text-gray-600">Árboles Plantados</p>
                      <p className="text-xs text-gray-500">ODS 15</p>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#F0F9FF" }}>
                      <Scale className="w-8 h-8 mx-auto mb-2" style={{ color: "#00689D" }} />
                      <div className="text-2xl font-bold" style={{ color: "#00689D" }}>
                        34
                      </div>
                      <p className="text-sm text-gray-600">Procesos Justos</p>
                      <p className="text-xs text-gray-500">ODS 16</p>
                    </div>
                    <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#F8FAFC" }}>
                      <Handshake className="w-8 h-8 mx-auto mb-2" style={{ color: "#19486A" }} />
                      <div className="text-2xl font-bold" style={{ color: "#19486A" }}>
                        23
                      </div>
                      <p className="text-sm text-gray-600">Alianzas Formadas</p>
                      <p className="text-xs text-gray-500">ODS 17</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ... existing activities tab ... */}
          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Actividades Recientes</CardTitle>
                <CardDescription>Historial de tus participaciones en proyectos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <h4 className="font-medium">{activity.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {activity.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {activity.hours}h
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{activity.impact}</p>
                        </div>
                      </div>
                      <Badge variant={activity.status === "Completado" ? "default" : "secondary"}>
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ... existing impact tab ... */}
          <TabsContent value="impact" className="space-y-6">
            {/* Main Impact Metrics */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="border-l-4 border-l-blue-500 bg-blue-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Proyectos Totales</CardTitle>
                  <Target className="h-5 w-5 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">47</div>
                  <p className="text-xs text-muted-foreground">+23% este mes</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500 bg-green-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Beneficiarios</CardTitle>
                  <Heart className="h-5 w-5 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">9,990</div>
                  <p className="text-xs text-muted-foreground">Personas impactadas</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500 bg-purple-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Horas Voluntariado</CardTitle>
                  <Clock className="h-5 w-5 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">1,590</div>
                  <p className="text-xs text-muted-foreground">Tiempo invertido</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500 bg-orange-50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Impacto ODS</CardTitle>
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">75%</div>
                  <p className="text-xs text-muted-foreground">9 objetivos</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Progreso ODS Destacados */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    Progreso ODS Destacados
                  </CardTitle>
                  <CardDescription>Objetivos con mayor impacto</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">17</span>
                      </div>
                      <div>
                        <p className="font-medium">Alianzas</p>
                        <p className="text-sm text-gray-600">12 proyectos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">95%</p>
                      <p className="text-xs text-gray-500">3500 beneficiarios</p>
                    </div>
                  </div>
                  <Progress value={95} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold text-sm">4</span>
                      </div>
                      <div>
                        <p className="font-medium">Educación</p>
                        <p className="text-sm text-gray-600">8 proyectos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">90%</p>
                      <p className="text-xs text-gray-500">1200 beneficiarios</p>
                    </div>
                  </div>
                  <Progress value={90} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Hambre Cero</p>
                        <p className="text-sm text-gray-600">4 proyectos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-orange-600">85%</p>
                      <p className="text-xs text-gray-500">320 beneficiarios</p>
                    </div>
                  </div>
                  <Progress value={85} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">14</span>
                      </div>
                      <div>
                        <p className="font-medium">Vida Marina</p>
                        <p className="text-sm text-gray-600">3 proyectos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">80%</p>
                      <p className="text-xs text-gray-500">150 beneficiarios</p>
                    </div>
                  </div>
                  <Progress value={80} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Sin Pobreza</p>
                        <p className="text-sm text-gray-600">3 proyectos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">75%</p>
                      <p className="text-xs text-gray-500">450 beneficiarios</p>
                    </div>
                  </div>
                  <Progress value={75} className="h-2" />
                </CardContent>
              </Card>

              {/* Actividad Reciente */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    Actividad Reciente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Proyecto completado</p>
                      <p className="text-sm text-gray-600">Limpieza de Playas - Salinas</p>
                      <p className="text-xs text-gray-500">Hace 2 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Nuevo voluntario</p>
                      <p className="text-sm text-gray-600">Carlos Mendoza se unió a Educación Digital</p>
                      <p className="text-xs text-gray-500">Hace 5 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Meta alcanzada</p>
                      <p className="text-sm text-gray-600">1000 beneficiarios en programas educativos</p>
                      <p className="text-xs text-gray-500">Hace 1 día</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Progreso ODS</p>
                      <p className="text-sm text-gray-600">ODS 4 alcanzó 90% de cumplimiento</p>
                      <p className="text-xs text-gray-500">Hace 1 día</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Métricas de Impacto Cuantificables */}
            <Card>
              <CardHeader>
                <CardTitle>Impacto Cuantificable</CardTitle>
                <CardDescription>Resultados medibles de las actividades de voluntariado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Droplets className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-blue-600">2,500L</div>
                    <p className="text-sm text-gray-600">Agua limpia distribuida</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Leaf className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-green-600">450</div>
                    <p className="text-sm text-gray-600">Árboles plantados</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-red-600" />
                    <div className="text-2xl font-bold text-red-600">1,200</div>
                    <p className="text-sm text-gray-600">Estudiantes beneficiados</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Heart className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <div className="text-2xl font-bold text-orange-600">85kg</div>
                    <p className="text-sm text-gray-600">Alimentos distribuidos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ... existing achievements tab ... */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <p className="text-xs text-gray-500 mt-1">Obtenido en {achievement.date}</p>
                      </div>
                      <Badge variant="outline">Desbloqueado</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Próximos Logros</CardTitle>
                <CardDescription>Objetivos que puedes alcanzar pronto</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg opacity-60">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">🌟</div>
                      <div>
                        <h4 className="font-medium">Super Voluntario</h4>
                        <p className="text-sm text-gray-600">Completa 200 horas de voluntariado</p>
                        <Progress value={78} className="w-32 h-2 mt-2" />
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">156/200 horas</span>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg opacity-60">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">🏅</div>
                      <div>
                        <h4 className="font-medium">Líder Comunitario</h4>
                        <p className="text-sm text-gray-600">Lidera tu primer proyecto</p>
                        <Progress value={25} className="w-32 h-2 mt-2" />
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">En progreso</span>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg opacity-60">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">🎯</div>
                      <div>
                        <h4 className="font-medium">Especialista ODS</h4>
                        <p className="text-sm text-gray-600">Contribuye a 5 ODS diferentes</p>
                        <Progress value={60} className="w-32 h-2 mt-2" />
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">3/5 ODS</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Insignias Obtenidas</CardTitle>
                <CardDescription>Reconocimientos por tu dedicación al voluntariado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                    <div className="text-3xl mb-2">🏆</div>
                    <p className="text-sm font-medium">Voluntario Oro</p>
                    <p className="text-xs text-gray-500">100+ horas</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <div className="text-3xl mb-2">🌊</div>
                    <p className="text-sm font-medium">Guardián Marino</p>
                    <p className="text-xs text-gray-500">Vida Submarina</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="text-3xl mb-2">📚</div>
                    <p className="text-sm font-medium">Educador</p>
                    <p className="text-xs text-gray-500">Educación de Calidad</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
                    <div className="text-3xl mb-2">❤️</div>
                    <p className="text-sm font-medium">Corazón Solidario</p>
                    <p className="text-xs text-gray-500">Salud y Bienestar</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

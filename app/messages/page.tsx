"use client"

import type React from "react"

import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Search, Phone, Video, MoreVertical, Send, Paperclip, Smile } from "lucide-react"
import { useState } from "react"

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  isRead: boolean
}

interface Conversation {
  id: string
  participantName: string
  participantAvatar?: string
  participantRole: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
  messages: Message[]
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1")
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const mockConversations: Conversation[] = [
    {
      id: "1",
      participantName: "María González",
      participantAvatar: "/placeholder.svg?height=40&width=40",
      participantRole: "Coordinadora de Proyectos",
      lastMessage: "¿Podemos coordinar para el sábado?",
      lastMessageTime: "10:30 AM",
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: "1",
          senderId: "maria",
          senderName: "María González",
          content: "Hola! Vi tu perfil y creo que serías perfecto para nuestro proyecto de educación digital.",
          timestamp: "10:15 AM",
          isRead: true,
        },
        {
          id: "2",
          senderId: "me",
          senderName: "Yo",
          content: "¡Hola María! Me interesa mucho. ¿Podrías contarme más detalles?",
          timestamp: "10:20 AM",
          isRead: true,
        },
        {
          id: "3",
          senderId: "maria",
          senderName: "María González",
          content: "¿Podemos coordinar una videollamada para el sábado? Te explico todo el proyecto.",
          timestamp: "10:30 AM",
          isRead: false,
        },
      ],
    },
    {
      id: "2",
      participantName: "Pedro Ramírez",
      participantAvatar: "/placeholder.svg?height=40&width=40",
      participantRole: "Voluntario Senior",
      lastMessage: "Te envío los documentos solicitados",
      lastMessageTime: "Ayer",
      unreadCount: 1,
      isOnline: false,
      messages: [
        {
          id: "1",
          senderId: "pedro",
          senderName: "Pedro Ramírez",
          content: "Hola! Aquí tienes los documentos que necesitas para el proyecto.",
          timestamp: "Ayer 3:45 PM",
          isRead: true,
        },
        {
          id: "2",
          senderId: "pedro",
          senderName: "Pedro Ramírez",
          content: "Te envío los documentos solicitados",
          timestamp: "Ayer 4:20 PM",
          isRead: false,
        },
      ],
    },
    {
      id: "3",
      participantName: "Fundación Verde",
      participantAvatar: "/placeholder.svg?height=40&width=40",
      participantRole: "Organización",
      lastMessage: "Bienvenido al equipo",
      lastMessageTime: "2 días",
      unreadCount: 0,
      isOnline: true,
      messages: [
        {
          id: "1",
          senderId: "fundacion",
          senderName: "Fundación Verde",
          content: "¡Bienvenido al equipo! Estamos emocionados de trabajar contigo.",
          timestamp: "Hace 2 días",
          isRead: true,
        },
      ],
    },
  ]

  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)

  const selectedConv = conversations.find((conv) => conv.id === selectedConversation)

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.participantRole.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === selectedConversation) {
        const newMsg: Message = {
          id: Date.now().toString(),
          senderId: "me",
          senderName: "Yo",
          content: newMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isRead: true,
        }
        return {
          ...conv,
          messages: [...conv.messages, newMsg],
          lastMessage: newMessage,
          lastMessageTime: "Ahora",
        }
      }
      return conv
    })

    setConversations(updatedConversations)
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Centro de Mensajes" description="Comunícate con voluntarios, organizaciones y coordinadores">
        <Badge variant="outline" className="flex items-center gap-1">
          <MessageCircle className="w-3 h-3" />
          {totalUnread} sin leer
        </Badge>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Conversaciones</CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar conversaciones..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-y-auto">
                <div className="space-y-1">
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`p-3 hover:bg-gray-50 cursor-pointer border-l-2 transition-colors ${
                        selectedConversation === conv.id
                          ? "border-l-blue-500 bg-blue-50"
                          : conv.unreadCount > 0
                            ? "border-l-green-500 bg-green-50"
                            : "border-l-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={conv.participantAvatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {conv.participantName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {conv.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm ${conv.unreadCount > 0 ? "font-semibold" : "font-medium"} truncate`}>
                              {conv.participantName}
                            </p>
                            {conv.unreadCount > 0 && (
                              <Badge variant="destructive" className="text-xs px-1.5 py-0.5 min-w-[20px] h-5">
                                {conv.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mb-1">{conv.participantRole}</p>
                          <p className="text-xs text-gray-600 truncate">{conv.lastMessage}</p>
                          <p className="text-xs text-gray-500 mt-1">{conv.lastMessageTime}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            {selectedConv ? (
              <Card className="h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="border-b pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={selectedConv.participantAvatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {selectedConv.participantName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {selectedConv.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{selectedConv.participantName}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          {selectedConv.participantRole}
                          {selectedConv.isOnline && <span className="text-green-600 text-xs">• En línea</span>}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {selectedConv.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderId === "me" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${message.senderId === "me" ? "text-blue-100" : "text-gray-500"}`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Input
                      placeholder="Escribe tu mensaje..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button variant="ghost" size="sm">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">Selecciona una conversación</p>
                  <p className="text-gray-400 text-sm">Elige una conversación para comenzar a chatear</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

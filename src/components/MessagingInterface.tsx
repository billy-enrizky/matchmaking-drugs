import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Paperclip,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

interface Conversation {
  id: string;
  hospitalName: string;
  hospitalAvatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  drugName: string;
  messages: Message[];
}

interface MessagingInterfaceProps {
  conversations?: Conversation[];
  currentUserId?: string;
}

const MessagingInterface = ({
  conversations = [
    {
      id: "1",
      hospitalName: "Memorial Hospital",
      hospitalAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=memorial",
      lastMessage: "We can provide 50 units of the requested medication.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 15),
      unreadCount: 2,
      drugName: "Amoxicillin 500mg",
      messages: [
        {
          id: "m1",
          senderId: "other1",
          senderName: "Dr. Sarah Johnson",
          content:
            "Hello, we noticed you are looking for Amoxicillin 500mg. We have some excess inventory that will expire in 3 months.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          status: "read",
        },
        {
          id: "m2",
          senderId: "user1",
          senderName: "Dr. Michael Chen",
          content: "That would be great! How many units do you have available?",
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          status: "read",
        },
        {
          id: "m3",
          senderId: "other1",
          senderName: "Dr. Sarah Johnson",
          content: "We can provide 50 units of the requested medication.",
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
          status: "delivered",
        },
      ],
    },
    {
      id: "2",
      hospitalName: "City General Hospital",
      hospitalAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=city",
      lastMessage:
        "Can you provide more details about the dosage requirements?",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3),
      unreadCount: 0,
      drugName: "Lisinopril 10mg",
      messages: [
        {
          id: "m4",
          senderId: "user1",
          senderName: "Dr. Michael Chen",
          content:
            "We are looking for Lisinopril 10mg tablets. Do you have any available?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
          status: "read",
        },
        {
          id: "m5",
          senderId: "other2",
          senderName: "Dr. Robert Williams",
          content:
            "Can you provide more details about the dosage requirements?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
          status: "read",
        },
      ],
    },
    {
      id: "3",
      hospitalName: "Riverside Medical Center",
      hospitalAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=riverside",
      lastMessage: "We have 100 vials of Insulin available for exchange.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
      unreadCount: 0,
      drugName: "Insulin",
      messages: [
        {
          id: "m6",
          senderId: "other3",
          senderName: "Dr. Emily Rodriguez",
          content: "We have 100 vials of Insulin available for exchange.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
          status: "read",
        },
      ],
    },
  ],
  currentUserId = "user1",
}: MessagingInterfaceProps) => {
  const [activeTab, setActiveTab] = useState("1");
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(conversations[0] || null);
  const [messageInput, setMessageInput] = useState("");

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    // In a real app, you would send this to your backend
    console.log("Sending message:", messageInput);

    // Clear the input field
    setMessageInput("");
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div className="bg-background h-full w-full flex flex-col rounded-lg overflow-hidden border">
      <div className="p-4 border-b bg-card">
        <h1 className="text-2xl font-bold">Messaging Center</h1>
        <p className="text-muted-foreground">
          Coordinate drug exchanges with other hospitals
        </p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Conversation List */}
        <div className="w-1/3 border-r overflow-hidden flex flex-col">
          <div className="p-3 border-b">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2 space-y-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${selectedConversation?.id === conversation.id ? "bg-accent" : "hover:bg-accent/50"}`}
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={conversation.hospitalAvatar} />
                      <AvatarFallback>
                        {conversation.hospitalName.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate">
                          {conversation.hospitalName}
                        </h3>
                        {conversation.lastMessageTime && (
                          <span className="text-xs text-muted-foreground">
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <Badge
                            variant="default"
                            className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                          >
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-1">
                        <Badge variant="outline" className="text-xs">
                          {conversation.drugName}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Message Thread */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedConversation ? (
            <>
              <div className="p-3 border-b flex justify-between items-center bg-card">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={selectedConversation.hospitalAvatar} />
                    <AvatarFallback>
                      {selectedConversation.hospitalName.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {selectedConversation.hospitalName}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {selectedConversation.drugName}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    View Exchange Details
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedConversation.messages.map((message) => {
                    const isCurrentUser = message.senderId === currentUserId;
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] ${isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"} rounded-lg p-3`}
                        >
                          {!isCurrentUser && (
                            <p className="text-xs font-medium mb-1">
                              {message.senderName}
                            </p>
                          )}
                          <p>{message.content}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-xs opacity-70">
                              {formatTime(message.timestamp)}
                            </span>
                            {isCurrentUser && (
                              <span>
                                {message.status === "sent" && (
                                  <Clock className="h-3 w-3 opacity-70" />
                                )}
                                {message.status === "delivered" && (
                                  <CheckCircle2 className="h-3 w-3 opacity-70" />
                                )}
                                {message.status === "read" && (
                                  <CheckCircle2 className="h-3 w-3 text-blue-500" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              <div className="p-3 border-t">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" type="button">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  <p>Suggested responses:</p>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setMessageInput(
                          "Yes, we're interested in this exchange.",
                        )
                      }
                    >
                      Yes, interested
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setMessageInput("Can you provide shipping details?")
                      }
                    >
                      Request shipping details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setMessageInput("What's the expiration date?")
                      }
                    >
                      Check expiration
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  No conversation selected
                </h3>
                <p className="text-muted-foreground">
                  Select a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingInterface;

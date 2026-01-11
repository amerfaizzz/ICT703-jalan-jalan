"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChatSidebar,
  ChatHeader,
  ChatInput,
  AssistantMessage,
  UserMessage,
  QuickActions
} from "@/components/chat";
import type { ChatMessageProps } from "@/components/chat";
import { Navigation } from "@/components/shared/navigation";
import { GroupLabel } from "@/components/shared/group-label";
import { PlayerAvatar } from "@/components/shared/player-avatar";
import { FlowGuide } from "@/components/shared/flow-guide";

// Initial welcome messages for different contexts
const welcomeMessages: Record<string, ChatMessageProps[]> = {
  default: [
    {
      role: "assistant",
      content: `I'll help you plan your perfect trip! Are you looking to:

1. Check crowd levels at popular destinations
2. Plan your itinerary
3. Check weather & best travel times
4. Manage your trip budget
5. Get local recommendations
6. Find emergency assistance

Which would you prefer?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ],
  "crowd-check": [
    {
      role: "assistant",
      content: "I can help you check crowd levels at popular destinations! Which location in Malaysia would you like to check?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ],
  "budget-expenses": [
    {
      role: "assistant",
      content: `I'll help you manage your travel budget! Are you looking to:

1. Set up a new trip budget
2. Log an expense
3. Track your current spending

Which would you prefer?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ],
  "plan-itinerary": [
    {
      role: "assistant",
      content: `I'll help you plan your itinerary! Are you looking to:

1. Where are you planning to go
2. How many days will you be staying
3. Do you want a relaxed trip or a packed schedule

Which would you prefer?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ],
  "weather-travel": [
    {
      role: "assistant",
      content: `I'll help you check the weather and best travel timing! Are you looking to:

1. Check the weather for your travel dates
2. Find the best season to visit your destination
3. Get the best time of day for specific activities

Which would you prefer?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ],
  "local-recommendations": [
    {
      role: "assistant",
      content: `Are you looking for something nearby?

1. What type of place do you want to explore: food, shopping, or attractions?
2. Craving local flavors? Should I suggest street food, cafés, or fine dining?
3. Do you want recommendations based on your current location or your itinerary?

Which would you prefer?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ],
  "emergency-helper": [
    {
      role: "assistant",
      content: `Do you need urgent help?

1. Would you like me to share safety tips for your area?
2. Are you looking for the nearest hospital or clinic?
3. Do you need directions to the nearest police station?

Which would you prefer?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ],
};

export default function ChatPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessageProps[]>(welcomeMessages.default);
  const [activeChat, setActiveChat] = useState<string>("1");
  const [showLanding, setShowLanding] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (message: string) => {
    if (showLanding) {
      setShowLanding(false);
    }

    const newUserMessage: ChatMessageProps = {
      role: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newUserMessage]);

    // Simulate assistant response
    setTimeout(() => {
      const assistantResponse: ChatMessageProps = {
        role: "assistant",
        content: `I received your message: "${message}". This is a demo response. In a real implementation, this would connect to an AI service to provide context-aware travel assistance.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, assistantResponse]);
    }, 1000);
  };

  const handleQuickAction = (actionId: string) => {
    setShowLanding(false);
    setMessages(welcomeMessages[actionId] || welcomeMessages.default);
  };

  const handleNewChat = () => {
    setMessages(welcomeMessages.default);
    setShowLanding(true);
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChat(chatId);
    setShowLanding(false);
    // In a real app, this would load the chat history
    setMessages(welcomeMessages.default);
  };

  // Landing view
  if (showLanding) {
    return (
      <div className="relative flex flex-col min-h-screen overflow-hidden bg-white">
        <Navigation />
        <GroupLabel group={1} />
        {/* Gradient Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-[2805px] h-[1080px] opacity-80"
            style={{
              background: `
                radial-gradient(circle at 114% 61%, rgba(130, 29, 53, 0.4) 0%, rgba(241, 40, 68, 0) 100%),
                radial-gradient(circle at 100% 100%, rgba(31, 92, 140, 0.4) 0%, rgba(77, 163, 236, 0) 100%),
                radial-gradient(circle at 105% 13%, rgba(165, 32, 232, 0.5) 0%, rgba(189, 107, 231, 0.3) 50%, rgba(237, 104, 255, 0) 100%),
                radial-gradient(circle at 83% -5%, rgba(9, 250, 142, 0.3) 0%, rgba(9, 250, 238, 0) 100%),
                radial-gradient(circle at 99% 112%, rgba(77, 163, 236, 0.4) 0%, rgba(77, 163, 236, 0) 100%),
                #FFFFFF
              `,
              filter: "blur(400px)",
              left: "-723px",
              top: "-28px",
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-12">
          <div className="flex flex-col items-center gap-10 w-full max-w-[832px]">
            {/* Header */}
            <div className="flex flex-col items-center gap-3">
              {/* Animated Player Avatar */}
              <PlayerAvatar autoAnimate size={80} />
              <h1 className="text-3xl font-semibold text-neutral-600 text-center tracking-tight">
                Trevllo.ai — Smarter Planning. Smoother Journeys.
              </h1>
            </div>

            {/* Chat Input Card */}
            <div className="w-full bg-white/80 backdrop-blur-sm rounded-[14px] border border-black/10 shadow-xl p-6">
              <div className="flex flex-col gap-4">
                <ChatInput onSend={handleSend} />
              </div>
            </div>

            {/* Quick Actions */}
            <QuickActions onSelect={handleQuickAction} />

            {/* Flow Guide */}
            <div className="mt-8">
              <FlowGuide variant="inline" title="Or explore:" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Chat view
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <Navigation />
      <GroupLabel group={1} />
      <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar
        activeChat={activeChat}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        isCollapsed={!sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-[2805px] h-[1080px] opacity-80"
            style={{
              background: `
                radial-gradient(circle at 114% 61%, rgba(130, 29, 53, 0.4) 0%, rgba(241, 40, 68, 0) 100%),
                radial-gradient(circle at 100% 100%, rgba(31, 92, 140, 0.4) 0%, rgba(77, 163, 236, 0) 100%),
                radial-gradient(circle at 105% 13%, rgba(165, 32, 232, 0.5) 0%, rgba(189, 107, 231, 0.3) 50%, rgba(237, 104, 255, 0) 100%),
                radial-gradient(circle at 83% -5%, rgba(9, 250, 142, 0.3) 0%, rgba(9, 250, 238, 0) 100%),
                radial-gradient(circle at 99% 112%, rgba(77, 163, 236, 0.4) 0%, rgba(77, 163, 236, 0) 100%),
                #FFFFFF
              `,
              filter: "blur(400px)",
              left: "-723px",
              top: "-28px",
            }}
          />
        </div>

        {/* Header */}
        <ChatHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto relative z-10">
          <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">
            {messages.map((message, index) =>
              message.role === "user" ? (
                <UserMessage
                  key={index}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ) : (
                <AssistantMessage
                  key={index}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              )
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <ChatInput onSend={handleSend} />
      </div>
      </div>
    </div>
  );
}

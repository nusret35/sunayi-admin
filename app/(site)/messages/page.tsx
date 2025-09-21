import { MessagesTable } from "@/components/MessagesTable";
import { PostsTable } from "@/components/PostsTable";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mesajlar - Solid SaaS Boilerplate",
  description: "Mesaj kutunuz - tüm sohbetlerinizi görüntüleyin ve yönetin",
};

// Mock data - replace with your actual data fetching
const conversations = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    lastMessage: "Merhaba, proje hakkında konuşabilir miyiz?",
    timestamp: "2 dk önce",
    unread: 2,
    avatar: "AY",
    online: true,
  },
  {
    id: 2,
    name: "Zeynep Kaya",
    lastMessage: "Teşekkürler, yarın görüşürüz.",
    timestamp: "1 saat önce",
    unread: 0,
    avatar: "ZK",
    online: false,
  },
  {
    id: 3,
    name: "Mehmet Demir",
    lastMessage: "Dosyaları gönderiyorum.",
    timestamp: "3 saat önce",
    unread: 1,
    avatar: "MD",
    online: true,
  },
  {
    id: 4,
    name: "Ayşe Öztürk",
    lastMessage: "Toplantı saatini değiştirebilir miyiz?",
    timestamp: "1 gün önce",
    unread: 0,
    avatar: "AÖ",
    online: false,
  },
];

const messages = [
  {
    id: 1,
    sender: "Ahmet Yılmaz",
    content: "Merhaba! Yeni proje hakkında konuşmak istiyorum.",
    timestamp: "14:30",
    isOwn: false,
  },
  {
    id: 2,
    sender: "Sen",
    content: "Merhaba Ahmet! Tabii ki, hangi konularda detay vermek istersin?",
    timestamp: "14:32",
    isOwn: true,
  },
  {
    id: 3,
    sender: "Ahmet Yılmaz",
    content:
      "Proje timeline'ı ve bütçe konularında bilgi almak istiyorum. Ayrıca ekip yapısı nasıl olacak?",
    timestamp: "14:35",
    isOwn: false,
  },
  {
    id: 4,
    sender: "Ahmet Yılmaz",
    content:
      "Proje timeline'ı ve bütçe konularında bilgi almak istiyorum. Ayrıca ekip yapısı nasıl olacak?",
    timestamp: "14:35",
    isOwn: false,
  },
];

const MessagesPage = async () => {
  return (
    <>
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="max-w-c-1315 mx-auto mt-15 px-4 md:px-8 xl:mt-20 xl:px-0">
          <h1 className="mb-8 text-3xl font-semibold text-black dark:text-white">
            Mesajlar
          </h1>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Conversations Sidebar */}
            <div className="lg:col-span-4">
              <div className="dark:border-strokedark dark:bg-blacksection rounded-lg border border-white bg-white shadow-lg">
                <div className="border-stroke dark:border-strokedark border-b p-6">
                  <h2 className="text-xl font-semibold text-black dark:text-white">
                    Sohbetler
                  </h2>
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Sohbet ara..."
                      className="border-stroke placeholder-body-color focus:border-primary dark:border-strokedark w-full rounded-md border bg-transparent px-3 py-2 text-black transition outline-none dark:text-white"
                    />
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className="border-stroke hover:bg-gray-1 dark:border-strokedark dark:hover:bg-blackho cursor-pointer border-b p-4 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-white">
                              {conversation.avatar}
                            </div>
                            {conversation.online && (
                              <div className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium text-black dark:text-white">
                              {conversation.name}
                            </p>
                            <p className="text-body-color truncate text-sm">
                              {conversation.lastMessage}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <span className="text-body-color text-xs">
                            {conversation.timestamp}
                          </span>
                          {conversation.unread > 0 && (
                            <span className="bg-primary flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-8">
              <div className="dark:border-strokedark dark:bg-blacksection flex h-[600px] flex-col rounded-lg border border-white bg-white shadow-lg">
                {/* Chat Header */}
                <div className="border-stroke dark:border-strokedark flex items-center justify-between border-b p-6">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-white">
                        AY
                      </div>
                      <div className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-black dark:text-white">
                        Ahmet Yılmaz
                      </h3>
                      <p className="text-sm text-green-500">Çevrimiçi</p>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                            message.isOwn
                              ? "bg-primary text-white"
                              : "bg-gray-1 dark:bg-blackho text-black dark:text-white"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`mt-1 text-xs ${
                              message.isOwn
                                ? "text-blue-100"
                                : "text-body-color"
                            }`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="border-stroke dark:border-strokedark border-t p-6">
                  <div className="flex items-center space-x-3">
                    <button className="text-body-color hover:bg-gray-1 dark:hover:bg-blackho rounded-full p-2 transition hover:text-black dark:hover:text-white">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Mesajınızı yazın..."
                        className="border-stroke placeholder-body-color focus:border-primary dark:border-strokedark w-full rounded-full border bg-transparent px-4 py-2 text-black transition outline-none dark:text-white"
                      />
                    </div>
                    <button className="bg-primary hover:bg-primary/90 rounded-full p-2 text-white transition">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MessagesPage;

'use client';

import FooterBar from "@/components/FooterBar";
import HeaderBar from "@/components/HeaderBar";
import MyChat from "@/components/MyChat";
import YourChat from "@/components/YourChat";
import { getChats } from "@/firebaseConfig";
import { Chat } from "@/types/Chat";
import { useEffect, useState } from "react";

export default function Home() {
  const [chats, setChats] = useState<Chat[]>();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const ME = 'Juno'; // Proove who's me

  const handleChangeChat = async () => {
    const chats = await getChats();
    setChats(chats);
  }

  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  }

  useEffect(() => {
    handleChangeChat();
  }, []);
  
  return (
    <div className="flex flex-col items-center h-full">
      <div className={`flex flex-col justify-center w-full ${(isFullScreen) ? 'max-w-full' : 'max-w-96'} smooth-width h-full rounded-md`}>
        <HeaderBar onToggleFullScreen={handleToggleFullScreen} />
        <main className={`flex flex-col border-x border-neutral-400 p-1 smooth-height h-full ${(isFullScreen) ? 'max-h-full' : 'max-h-[32rem]'} smooth-height overflow-y-scroll`}>
          {
            (chats)
            ? chats.map((chat, index) =>
              (chat.name === ME)
                ? <MyChat key={index} chat={chat} />
                : <YourChat key={index} chat={chat} />
            )
            : null
          }
        </main>
        <FooterBar onChangeChat={handleChangeChat} />
      </div>
    </div>
  );
}

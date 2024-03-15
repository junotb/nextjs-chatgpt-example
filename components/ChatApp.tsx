'use client';

import FooterBar from "@/components/FooterBar";
import HeaderBar from "@/components/HeaderBar";
import MyChat from "@/components/MyChat";
import YourChat from "@/components/YourChat";
import { getChats } from "@/firebaseConfig";
import { Chat } from "@/types/Chat";
import { useEffect, useState } from "react";
import { clsx } from "clsx";

interface ChatAppProps {
  
}

export default function ChatApp () {
  const [chats, setChats] = useState<Chat[]>();
  const [isHideScreen, setIsHideScreen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const ME = 'Juno'; // Proove who's me

  const handleChangeChat = async () => {
    const chats = await getChats();
    setChats(chats);
  }

  const handleToggleHideScreen = () => {
    setIsHideScreen(!isHideScreen);
  }

  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  }

  useEffect(() => {
    handleChangeChat();
  }, []);

  return (
    <div
      className={clsx(
        'flex flex-col border border-neutral-400 w-full smooth-transition rounded-md',
        (isFullScreen) ? 'max-w-full max-h-full' : 'max-w-96 max-h-[32rem]',
        (isHideScreen) ? 'absolute bottom-0 overflow-y-hidden max-h-0' : ''
      )}
    >
      <HeaderBar
        onToggleHideScreen={handleToggleHideScreen}
        onToggleFullScreen={handleToggleFullScreen}
      />
      <main className="flex flex-col p-1 smooth-transition h-full overflow-y-scroll">
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
  );
}

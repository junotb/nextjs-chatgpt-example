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
    <div className="relative flex flex-col items-center h-full">
      <div
        className={`
          ${(isHideScreen) ? 'opacity-0' : 'opacity-100'}
          ${(isFullScreen) ? 'max-w-full' : 'max-w-96'}
          flex flex-col justify-center w-full smooth-transition h-full rounded-md
        `}
      >
        <HeaderBar
          onToggleHideScreen={handleToggleHideScreen}
          onToggleFullScreen={handleToggleFullScreen}
        />
        <main className={`
          ${(isFullScreen) ? 'max-h-full' : 'max-h-[32rem]'}
          flex flex-col border-x border-neutral-400 p-1 smooth-transition h-full overflow-y-scroll`}
        >
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
      <div
        className={`
          ${(!isFullScreen || isHideScreen) ? 'max-h-16' : 'max-h-0 overflow-y-hidden'}
          absolute bottom-0 flex justify-center items-center border border-neutral-500 max-w-96 w-full h-full smooth-transition rounded-t-xl
        `}
      >
        <button
          type="button"
          onClick={handleToggleHideScreen}
          className="m-2 w-14 h-14 bg-yellow-300 text-black font-bold rounded-xl"
        >Chat</button>
      </div>
    </div>
  );
}

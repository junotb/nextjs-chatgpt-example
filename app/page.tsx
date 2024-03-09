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
  const ME = 'Juno'; // Proove who's me

  const handleChangeChat = async () => {
    const chats = await getChats();
    setChats(chats);
  }

  useEffect(() => {
    handleChangeChat();
  }, []);
  
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex flex-col w-full max-w-96 max-h-[32rem] h-full rounded-md">
        <HeaderBar />
        <main className="flex flex-col border-x border-neutral-400 p-1 overflow-y-scroll">
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

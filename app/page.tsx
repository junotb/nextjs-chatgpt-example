'use client';

import ChatApp from "@/components/ChatApp";
import Image from "next/image";

export default function Home() {
  
  return (
    <div className="relative flex flex-col items-center h-full">
      <div className="flex justify-center items-center pb-12 w-full h-full">
        <ChatApp />
      </div>
      <div className="max-h-12 absolute bottom-0 flex justify-center items-center border border-neutral-500 max-w-96 w-full h-full smooth-transition rounded-t-xl">
        <div className="flex justify-center items-center m-2 w-10 h-10 bg-yellow-300 rounded-xl">
          <Image
            src="/chat-bubble-oval-left.svg"
            alt={"chat bubble oval left"}
            width={32}
            height={32}
          />
        </div>
      </div>
    </div>
  );
}

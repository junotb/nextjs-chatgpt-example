'use client';

import { addChat } from "@/firebaseConfig";
import { Chat } from "@/types/Chat";
import { Timestamp } from "firebase/firestore";
import { useRef, useState } from "react";

export default function FooterBar ({ onChangeChat }: FooterProps) {
  const [isWriting, setIsWriting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleKeyUp = () => {
    const value = textareaRef.current!.value;
    setIsWriting((value) ? true : false);
  }

  const handleAddChat = (name: string, content: string) => {
    const newChat: Chat = {
      name: name,
      content: content,
      register_timestamp: Timestamp.fromDate(new Date())
    };
    addChat(newChat)
      .then(() => onChangeChat());
  }

  const handleClick = async () => {
    if (!isWriting) return false;

    setIsProcessing(true);

    const message = textareaRef.current!.value;
    textareaRef.current!.value = '';
    setIsWriting(false);

    handleAddChat('Juno', message);
    
    const content = await fetch('/api/openai', {
      method: 'POST',
      body: JSON.stringify({
        message: message
      })
    })
      .then(response => response.json())
      .then(data => data.content)
      .catch((reason) => console.log(reason));
    if (content) handleAddChat('GPT-3.5-Turbo', content);
    
    setIsProcessing(false);
  }

  return (
    <footer className="flex flex-col border-b border-x border-neutral-400 h-28 bg-neutral-800 rounded-b-lg">
      <div className="w-full h-full px-4 py-2">
        <textarea
          ref={textareaRef}
          onKeyUp={handleKeyUp}
          className="border-none w-full h-full bg-transparent text-xs outline-none resize-none overflow-y-scroll"
        ></textarea>
      </div>
      <div className="flex justify-between p-1">
        <div></div>
        <button
          onClick={handleClick}
          className={`px-4 py-1 text-xs rounded-md ${(isWriting) ? 'bg-yellow-300 text-neutral-900' : 'bg-neutral-700 text-neutral-400'}`}
        >전송</button>
      </div>
    </footer>
  );
}

'use client';

import { useRef, useState } from "react";

export default function FooterBar () {
  const [isWriting, setIsWriting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleKeyUp = () => {
    const value = textareaRef.current!.value;
    setIsWriting((value) ? true : false);
  }

  const handleClick = async () => {
    if (!isWriting) return false;

    const choice = await fetch('/api/openai', {
      method: 'POST',
      body: JSON.stringify({
        content: textareaRef.current!.value
      })
    })
      .then(response => response.json())
      .then(data => data.choice);
    console.log(choice);
  }

  return (
    <footer className="flex flex-col border-b border-x border-neutral-400 p-1 h-28 bg-neutral-800 rounded-b-lg">
      <div className="w-full h-full px-4 py-2">
        <textarea
          ref={textareaRef}
          onKeyUp={handleKeyUp}
          className="border-none w-full h-full bg-transparent text-xs outline-none resize-none"
        ></textarea>
      </div>
      <div className="flex justify-between">
        <div></div>
        <button
          onClick={handleClick}
          className={`px-4 py-1 text-xs rounded-md ${(isWriting) ? 'bg-yellow-300 text-neutral-900' : 'bg-neutral-700 text-neutral-400'}`}
        >전송</button>
      </div>
    </footer>
  );
}

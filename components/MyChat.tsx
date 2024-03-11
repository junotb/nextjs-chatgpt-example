'use client';

import { useRef, useState } from "react";

export default function MyChat ({ chat }: ChatProps) {
  const { name, content, register_timestamp } = chat;
  const regTime = new Date(register_timestamp.seconds * 1000).toTimeString().split(' ')[0];
  const regHour = parseInt(regTime.split(':')[0]); // number
  const regMinute = regTime.split(':')[1]; // string

  return (
    <div className="flex flex-row-reverse items-end">
      <div className="flex p-1 text-right">
        <div className="px-2 py-1 max-w-48 bg-yellow-300 rounded-md">
          <p className="text-xs text-neutral-900">{content}</p>
        </div>
      </div>
      <p className="text-xs text-neutral-500">
        {(regHour < 12) ? '오전' : '오후'} {(regHour > 12) ? regHour - 12 : regHour}:{regMinute}
      </p>
    </div>
  );
}

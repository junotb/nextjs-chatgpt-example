'use client';

import { useRef, useState } from "react";

export default function Chat () {
  return (
    <>
      <div className="flex flex-row">
        <div className="p-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="p-1 text-left">
          <h1 className="py-1 text-sm">Name</h1>
          <div className="px-2 py-1 bg-neutral-700 rounded-md">
            <p className="text-sm">Content</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-row-reverse">
        <div className="p-1 text-right">
          <div className="px-2 py-1 bg-yellow-300 rounded-md">
            <p className="text-sm text-neutral-900">Content</p>
          </div>
        </div>
      </div>
    </>
  );
}

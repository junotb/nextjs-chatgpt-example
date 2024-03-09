import FooterBar from "@/components/FooterBar";
import HeaderBar from "@/components/HeaderBar";
import Chat from "@/components/Chat";
import { getChats } from "@/firebaseConfig";

export default async function Home() {
  const ME = 'juno'; // Proove who's me
  const chats = await getChats();
  
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="flex flex-col w-full max-w-96 rounded-md">
        <HeaderBar />
        <main className="flex- flex-col border-x border-neutral-400 p-1 h-screen max-h-96">
          { chats.map((chat, index) => <Chat />) }
        </main>
        <FooterBar />
      </div>
    </div>
  );
}

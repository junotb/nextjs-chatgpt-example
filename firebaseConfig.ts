import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOlf4kg2Yq5mplM_XPVD8uiz-XqS1cQUg",
  authDomain: "nextjs-chatgpt-example.firebaseapp.com",
  projectId: "nextjs-chatgpt-example",
  storageBucket: "nextjs-chatgpt-example.appspot.com",
  messagingSenderId: "574734469160",
  appId: "1:574734469160:web:096be32ae0225a759e4d1d",
  measurementId: "G-ZH9Q974J47"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

export const addChat = async (chat: Chat): Promise<string> => {
  const docRef = await addDoc(collection(database, 'CHATS'), {
    NAME: chat.NAME,
    CONTENT: chat.CONTENT
  });
  return docRef.id;
}

export const deleteChat = async (id: string): Promise<void> => {
  const chatRef = await deleteDoc(doc(database, 'CHATS', id));
}

export const getChats = async (): Promise<Chat[]> => {
  const querySnapshot = await getDocs(collection(database, 'CHATS'));

  let arrayChats: Chat[] = [];
  querySnapshot.forEach((element) => {
    const data = element.data();
    const chat: Chat = {
      NAME: data.NAME,
      CONTENT: data.CONTENT
    }
    arrayChats.push(chat);
  });

  return arrayChats;
}
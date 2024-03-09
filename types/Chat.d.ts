import { Timestamp } from "firebase/firestore";

interface Chat {
  name: string,
  content: string,
  register_timestamp: Timestamp
}
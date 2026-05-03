import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface ChatMessage {
  id: string;
  uid: string;
  displayName: string;
  photoURL?: string;
  text: string;
  createdAt: Timestamp | null;
}

const MESSAGES_COLLECTION = "messages";
const MAX_MESSAGES = 50;

export async function sendMessage(
  uid: string,
  displayName: string,
  photoURL: string | null,
  text: string
): Promise<void> {
  const trimmed = text.trim();
  if (!trimmed) return;
  await addDoc(collection(db, MESSAGES_COLLECTION), {
    uid,
    displayName,
    photoURL: photoURL ?? "",
    text: trimmed,
    createdAt: serverTimestamp(),
  });
}

export function subscribeToMessages(
  callback: (messages: ChatMessage[]) => void
): () => void {
  const q = query(
    collection(db, MESSAGES_COLLECTION),
    orderBy("createdAt", "asc"),
    limit(MAX_MESSAGES)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages: ChatMessage[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ChatMessage, "id">),
    }));
    callback(messages);
  });

  return unsubscribe;
}

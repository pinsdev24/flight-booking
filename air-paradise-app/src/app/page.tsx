import { Metadata } from 'next';
import ChatPage from '../components/chat/ChatPage';

export const metadata: Metadata = {
  title: 'AIR PARADISE Chatbot',
  description: 'AIR PARADISE flight booking chatbot for searching and booking flights',
};

export default function Home() {
  return <ChatPage />;
}

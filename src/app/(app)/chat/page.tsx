import Sidebar from "@/components/layout/Sidebar";
import ChatPanel from "@/features/rag/components/ChatPanel";

export default function ChatPage(){
  return (
    <div className="grid md:grid-cols-[16rem,1fr] gap-6">
      <Sidebar />
      <ChatPanel />
    </div>
  );
}

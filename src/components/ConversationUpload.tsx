
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageSquare, Upload, QrCode } from "lucide-react";

interface ConversationUploadProps {
  onUpload: (text: string) => void;
}

export const ConversationUpload = ({ onUpload }: ConversationUploadProps) => {
  const [conversationText, setConversationText] = useState("");
  const [isLinkingWhatsapp, setIsLinkingWhatsapp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (conversationText.trim()) {
      onUpload(conversationText);
    }
  };

  const handleDemoConversation = () => {
    const demoText = `Alice: Hey, I've been waiting for you to call me back for two days now. Why do you always do this?
Bob: What? I've been super busy at work. You know we have that big project.
Alice: You're always "busy at work". It's like I'm not a priority to you at all.
Bob: That's not fair. I'm working so hard for our future and you're making me feel bad about it.
Alice: Our future? You can't even make time for our present! I feel like I'm the only one trying in this relationship.
Bob: That's ridiculous. I do so much for us that you don't even notice.
Alice: Like what? Name one thing you've done for us this week.
Bob: I don't need to prove myself to you. Why are you always attacking me?
Alice: See? You can't even answer a simple question without getting defensive.
Bob: I'm not getting defensive! You're the one who's always criticizing everything I do!`;
    
    setConversationText(demoText);
  };

  return (
    <div className="p-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">Analyze Your Conversation</h2>
        <p className="text-gray-600">
          Upload a conversation to identify communication patterns and get help drafting a response
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="conversation">Paste your conversation below</Label>
          <Textarea
            id="conversation"
            placeholder="Copy and paste your conversation here... Format should be Name: Message"
            className="min-h-[200px]"
            value={conversationText}
            onChange={(e) => setConversationText(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleDemoConversation}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Use Demo Conversation
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" onClick={() => setIsLinkingWhatsapp(true)}>
                  <QrCode className="mr-2 h-4 w-4" />
                  Link WhatsApp
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Link WhatsApp Account</DialogTitle>
                  <DialogDescription>
                    This feature would allow you to link your WhatsApp account to directly import conversations.
                    Not implemented in this MVP.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <QrCode className="mx-auto h-32 w-32 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      QR Code would appear here in the full version
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Button 
            type="submit" 
            disabled={!conversationText.trim()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Analyze Conversation
          </Button>
        </div>
      </form>
    </div>
  );
};

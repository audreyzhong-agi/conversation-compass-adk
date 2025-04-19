
import { MessageCircle } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
        <MessageCircle className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Conversation Compass
      </h1>
      <p className="text-lg text-gray-600 italic">
        "Behind every message is a feeling. Let's decode it together."
      </p>
    </div>
  );
};

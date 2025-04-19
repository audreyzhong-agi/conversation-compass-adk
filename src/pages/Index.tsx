
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConversationUpload } from "@/components/ConversationUpload";
import { ConversationAnalysis } from "@/components/ConversationAnalysis";
import { ResponseDrafter } from "@/components/ResponseDrafter";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [step, setStep] = useState<"upload" | "analysis" | "draft">("upload");
  const [conversation, setConversation] = useState<string>("");
  const [analysis, setAnalysis] = useState<any>(null);
  const { toast } = useToast();

  const handleConversationUploaded = (text: string) => {
    setConversation(text);
    toast({
      title: "Conversation uploaded",
      description: "Your conversation is now ready for analysis",
    });
    setStep("analysis");
  };

  const handleAnalysisComplete = (analysisData: any) => {
    setAnalysis(analysisData);
    toast({
      title: "Analysis complete",
      description: "Review the patterns identified and proceed to draft a response",
    });
    setStep("draft");
  };

  const handleReset = () => {
    setConversation("");
    setAnalysis(null);
    setStep("upload");
    toast({
      title: "Process reset",
      description: "You can now upload a new conversation",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Conversation Compass</h1>
          {step !== "upload" && (
            <Button variant="outline" onClick={handleReset}>
              Start New Analysis
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {step === "upload" && (
            <ConversationUpload onUpload={handleConversationUploaded} />
          )}
          {step === "analysis" && conversation && (
            <ConversationAnalysis 
              conversation={conversation} 
              onAnalysisComplete={handleAnalysisComplete} 
            />
          )}
          {step === "draft" && conversation && analysis && (
            <ResponseDrafter 
              conversation={conversation} 
              analysis={analysis} 
            />
          )}
        </div>
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Conversation Compass • Powered by Google ADK (Agent Development Kit)
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConversationUpload } from "@/components/ConversationUpload";
import { ConversationAnalysis } from "@/components/ConversationAnalysis";
import { ResponseDrafter } from "@/components/ResponseDrafter";
import { useToast } from "@/hooks/use-toast";
import { ProgressSteps } from "@/components/ui/progress-steps";
import { HeroSection } from "@/components/ui/hero-section";

const Index = () => {
  const [step, setStep] = useState<"upload" | "analysis" | "draft">("upload");
  const [conversation, setConversation] = useState<string>("");
  const [analysis, setAnalysis] = useState<any>(null);
  const { toast } = useToast();

  const handleConversationUploaded = (text: string) => {
    setConversation(text);
    toast({
      title: "Conversation ready for analysis",
      description: "Share your perspective and we'll help you understand the dynamics",
    });
    setStep("analysis");
  };

  const handleAnalysisComplete = (analysisData: any) => {
    setAnalysis(analysisData);
    toast({
      title: "Analysis complete",
      description: "Let's work on crafting a thoughtful response together",
    });
    setStep("draft");
  };

  const handleReset = () => {
    setConversation("");
    setAnalysis(null);
    setStep("upload");
    toast({
      title: "Starting fresh",
      description: "You can now analyze a new conversation",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="bg-white/50 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Conversation Compass
            </h1>
            <p className="text-sm text-gray-600">Navigate difficult conversations with clarity</p>
          </div>
          {step !== "upload" && (
            <Button variant="outline" onClick={handleReset} className="transition-all duration-300 hover:scale-105">
              Start New Analysis
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ProgressSteps currentStep={step} />
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-md">
            {step === "upload" && (
              <>
                <HeroSection />
                <ConversationUpload onUpload={handleConversationUploaded} />
              </>
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
        </div>
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Conversation Compass • A mindful approach to communication
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

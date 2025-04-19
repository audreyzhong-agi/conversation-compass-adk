
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConversationUpload } from "@/components/ConversationUpload";
import { ConversationAnalysis } from "@/components/ConversationAnalysis";
import { ResponseDrafter } from "@/components/ResponseDrafter";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [step, setStep] = useState<"upload" | "analysis" | "draft">("upload");
  const [conversation, setConversation] = useState<string>("");
  const [analysis, setAnalysis] = useState<any>(null);
  const { toast } = useToast();

  const handleConversationUploaded = (text: string) => {
    setConversation(text);
    toast({
      title: "📂 Conversation ready for analysis",
      description: "Share your perspective and we'll help you understand the dynamics",
    });
    setStep("analysis");
  };

  const handleAnalysisComplete = (analysisData: any) => {
    setAnalysis(analysisData);
    toast({
      title: "🔍 Analysis complete",
      description: "Let's work on crafting a thoughtful response 💌",
    });
    setStep("draft");
  };

  const handleReset = () => {
    setConversation("");
    setAnalysis(null);
    setStep("upload");
    toast({
      title: "🔄 Starting fresh",
      description: "You can now analyze a new conversation",
    });
  };

  const renderStepContent = () => {
    switch (step) {
      case "upload":
        return (
          <motion.div 
            key="upload"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">
              "Behind every message is a feeling. Let's decode it together."
            </h2>
            <div className="p-6 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
              <ConversationUpload onUpload={handleConversationUploaded} />
            </div>
          </motion.div>
        );
      case "analysis":
        return (
          <motion.div 
            key="analysis"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
              <ConversationAnalysis
                conversation={conversation}
                onAnalysisComplete={handleAnalysisComplete}
              />
            </div>
          </motion.div>
        );
      case "draft":
        return (
          <motion.div 
            key="draft"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
              <ResponseDrafter conversation={conversation} analysis={analysis} />
              <div className="text-center text-green-600 italic mt-4 animate-pulse">
                You're taking a brave step toward better connection 💛
              </div>
            </div>
          </motion.div>
        );
    }
  };

  const getProgressLabel = () => {
    switch (step) {
      case "upload":
        return "Step 1 of 3: Upload Conversation";
      case "analysis":
        return "Step 2 of 3: Understanding Communication";
      case "draft":
        return "Step 3 of 3: Drafting Thoughtful Response";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-100 flex flex-col">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Conversation Compass
            </h1>
            <p className="text-sm text-gray-600">Navigate difficult conversations with empathy</p>
          </div>
          {step !== "upload" && (
            <Button variant="outline" onClick={handleReset} className="hover:scale-105 transition-transform">
              Start New Analysis
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
        <div className="mb-6 text-center text-sm text-gray-500 font-medium">
          {getProgressLabel()}
        </div>
        <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
      </main>

      <footer className="bg-white/80 backdrop-blur-sm border-t">
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


import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check, Search } from "lucide-react";

interface ConversationAnalysisProps {
  conversation: string;
  onAnalysisComplete: (analysis: any) => void;
}

export const ConversationAnalysis = ({ 
  conversation, 
  onAnalysisComplete 
}: ConversationAnalysisProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userPerspective, setUserPerspective] = useState("");
  const { toast } = useToast();

  // Simulate ADK analysis with a mock response
  const analyzeConversation = () => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockAnalysis = {
        participants: extractParticipants(conversation),
        patterns: [
          {
            type: "Criticism",
            description: "Direct attacks on character rather than behavior",
            examples: ["You always do this", "You're always busy at work"],
            severity: "High"
          },
          {
            type: "Defensiveness",
            description: "Responding to perceived criticism with counter-criticism",
            examples: ["That's not fair", "I don't need to prove myself to you"],
            severity: "Medium"
          },
          {
            type: "Stonewalling",
            description: "Withdrawing from the conversation",
            examples: ["I do so much for us that you don't even notice"],
            severity: "Low"
          }
        ],
        summary: "This conversation shows signs of criticism and defensiveness from both parties. There's frustration about prioritization and communication expectations.",
        userPerspective: userPerspective
      };
      
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete",
        description: "Review the patterns identified in your conversation",
      });
      
      onAnalysisComplete(mockAnalysis);
    }, 3000);
  };

  const extractParticipants = (text: string) => {
    const lines = text.split('\n');
    const participants = new Set<string>();
    
    lines.forEach(line => {
      const match = line.match(/^([^:]+):/);
      if (match && match[1]) {
        participants.add(match[1].trim());
      }
    });
    
    return Array.from(participants);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Conversation Analysis</h2>
        <p className="text-gray-600 mb-4">
          Before we analyze, help us understand your perspective on this conversation
        </p>
        
        <div className="space-y-3">
          <Label htmlFor="perspective">
            What do you think is happening in this conversation? What are you hoping to achieve?
          </Label>
          <Textarea
            id="perspective"
            placeholder="For example: I feel like my partner doesn't understand how important this is to me. I want to explain my feelings without starting another argument."
            className="min-h-[120px]"
            value={userPerspective}
            onChange={(e) => setUserPerspective(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <h3 className="font-medium mb-2">Conversation Preview</h3>
        <div className="whitespace-pre-wrap text-sm text-gray-700 max-h-[200px] overflow-y-auto p-2 bg-white rounded border">
          {conversation}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={analyzeConversation} disabled={isAnalyzing}>
          {isAnalyzing ? (
            <>
              <Search className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Complete Analysis
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

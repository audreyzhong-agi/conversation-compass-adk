
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

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

  // Simulate ADK analysis
  const analyzeConversation = () => {
    if (!userPerspective.trim()) {
      toast({
        title: "Perspective needed",
        description: "Please share your thoughts on the situation first",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockAnalysis = {
        participants: extractParticipants(conversation),
        userPerspective: userPerspective,
        patterns: [
          {
            type: "Criticism",
            description: "Direct attacks on character rather than behavior",
            examples: ["You always do this", "You're never there when I need you"],
            severity: "High",
            context: "This pattern might stem from feeling unheard or undervalued"
          },
          {
            type: "Defensiveness",
            description: "Responding to perceived criticism with counter-criticism",
            examples: ["That's not fair", "I don't need to prove myself to you"],
            severity: "Medium",
            context: "This could indicate a need to feel validated and understood"
          }
        ],
        summary: "Both participants seem to be expressing underlying needs for acknowledgment and understanding. The conversation shows signs of escalating tension due to unmet emotional needs.",
      };
      
      setIsAnalyzing(false);
      onAnalysisComplete(mockAnalysis);
    }, 2000);
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
        <h2 className="text-xl font-semibold mb-2">Understanding Your Perspective</h2>
        <p className="text-gray-600 mb-4">
          Before we analyze the conversation, help us understand your point of view
        </p>
        
        <div className="space-y-4">
          <Label htmlFor="perspective">
            What do you think is happening in this conversation? What would you like to achieve?
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
        <Button 
          onClick={analyzeConversation} 
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Search className="mr-2 h-4 w-4 animate-spin" />
              Analyzing conversation...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Analyze Patterns
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

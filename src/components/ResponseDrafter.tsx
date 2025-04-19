
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Edit, Send, RefreshCw } from "lucide-react";

interface ResponseDrafterProps {
  conversation: string;
  analysis: any;
}

export const ResponseDrafter = ({ 
  conversation, 
  analysis 
}: ResponseDrafterProps) => {
  const [userDraft, setUserDraft] = useState("");
  const [aiDraft, setAiDraft] = useState("");
  const [isDrafting, setIsDrafting] = useState(false);
  const [showAiDraft, setShowAiDraft] = useState(false);
  const { toast } = useToast();

  // Simulate ADK draft generation
  const generateAiDraft = () => {
    if (!analysis.userPerspective) {
      toast({
        title: "More context needed",
        description: "We need to understand your goals better before suggesting a response",
      });
      return;
    }

    setIsDrafting(true);
    
    setTimeout(() => {
      const mockAiDraft = "I understand you've been feeling frustrated about our communication. When you say I'm not making you a priority, it makes me feel defensive because I really am trying my best with work right now. I care about our relationship and want to find a better balance. Could we set up a regular time to check in with each other that works around my current project deadline?";
      
      setAiDraft(mockAiDraft);
      setIsDrafting(false);
      setShowAiDraft(true);
      
      toast({
        title: "Response suggested",
        description: "Review and customize the draft to match your voice",
      });
    }, 2000);
  };

  const useAiDraft = () => {
    setUserDraft(aiDraft);
    toast({
      title: "Draft applied",
      description: "You can now edit the suggested response",
    });
  };

  const handleSendResponse = () => {
    toast({
      title: "Response ready",
      description: "Copy your response to continue the conversation",
    });
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium">Communication Insights</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="mb-4">
              <p className="text-sm mb-3">{analysis.summary}</p>
              <h4 className="font-medium mb-2">Key Patterns:</h4>
              <ul className="list-disc pl-5 space-y-2">
                {analysis.patterns.map((pattern: any, index: number) => (
                  <li key={index} className="text-sm">
                    <span className="font-medium">{pattern.type}</span>
                    <div className="text-gray-600">{pattern.context}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={generateAiDraft}
            disabled={isDrafting}
            className="w-full"
          >
            {isDrafting ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Drafting...
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Suggest Response
              </>
            )}
          </Button>

          {showAiDraft && (
            <div>
              <h4 className="font-medium mb-2">Suggested Response:</h4>
              <div className="bg-primary/5 p-4 rounded-md border border-primary/20 text-sm mb-2">
                {aiDraft}
              </div>
              <Button 
                size="sm"
                variant="secondary"
                onClick={useAiDraft}
                className="w-full"
              >
                Use This Draft
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Your Response</h3>
          <Textarea
            placeholder="Write your response here, or click 'Suggest Response' for help..."
            className="min-h-[200px]"
            value={userDraft}
            onChange={(e) => setUserDraft(e.target.value)}
          />

          <Button
            onClick={handleSendResponse}
            disabled={!userDraft.trim()}
            className="w-full"
          >
            <Send className="mr-2 h-4 w-4" />
            Prepare to Send
          </Button>
        </div>
      </div>
    </div>
  );
};

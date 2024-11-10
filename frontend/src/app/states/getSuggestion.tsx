"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface GetSuggestionsProps {
  region: string;
  startYear: string;
  wasteType: string;
  companyName: string;
}

export default function GetSuggestions({
  region,
  startYear,
  wasteType,
  companyName,
}: GetSuggestionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isExpanded]);

  const fetchSuggestions = async () => {
    setLoading(true);

    const genAI = new GoogleGenerativeAI(
      "AIzaSyDST7741cvRGCLGGEx618E4CLCvsxSmhfA"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are an expert in energy efficiency. Provide two short suggestions on how to save electricity for a company in the ${region} region, focusing on ${wasteType}. Also, give a rating from 1 to 10 on how well the company is doing in terms of sustainability. Consider the company name: ${companyName}. Provide the response in the following format:

    1. Suggestion 1
    2. Suggestion 2
    Rating: X/10`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      console.log("AI Response:", text);

      const lines = text.split("\n").map((line) => line.trim());
      console.log("Parsed Lines:", lines);

      const parsedSuggestions = lines
        .filter((line) => /^\d\.\s/.test(line)) 
        .map((line) => line.replace(/^\d\.\s*/, ""));
      console.log("Parsed Suggestions:", parsedSuggestions);

      const ratingLine = lines.find((line) => line.startsWith("Rating:"));
      const messageLine = lines.find((line) => line.startsWith("Message:"));

      const ratingValue = ratingLine
        ? parseInt(ratingLine.split(":")[1].trim())
        : null;
      const parsedMessage = messageLine ? messageLine.split(":")[1].trim() : "";

      setSuggestions(parsedSuggestions);
      setRating(ratingValue);
      setMessage(parsedMessage);
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Card className="w-80">
        <div className="p-4 bg-card">
          <Button
            variant="ghost"
            onClick={() => {
              setIsExpanded(!isExpanded);
              fetchSuggestions();
            }}
            className="p-0 h-auto font-semibold text-lg w-full flex justify-between items-center"
          >
            <span>Get Suggestions</span>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>
        <div
          className={`transition-all duration-300 ease-in-out overflow-y-auto ${
            isExpanded ? "max-h-screen" : "max-h-0"
          }`}
        >
          <CardContent ref={contentRef}>
            <CardDescription className="text-sm mb-4 mt-2">
              Here are some suggestions based on your recent activity for{" "}
              <strong>{companyName}</strong>:
            </CardDescription>
            {loading ? (
              <div className="text-sm">Loading suggestions...</div>
            ) : (
              <>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))
                  ) : (
                    <li>No suggestions found.</li>
                  )}
                </ul>
                {rating !== null && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold mb-2">
                      Overall Sustainability Rating:
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>Rating: {rating}/10</li>
                      <li>{message}</li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

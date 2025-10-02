// src/pages/AIQuestionAnswer.jsx
import { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { getAIResponse, getApiStatus, testApiConnection } from "../services/aiService";

// API status for display
const getApiStatusDisplay = () => {
    const status = getApiStatus();
    return status;
};

// Current space weather status (simulated data)
const getCurrentSpaceWeather = () => {
    const now = new Date();
    const hour = now.getHours();

    // Simulate different conditions based on time
    const conditions = [
        { level: "Quiet", color: "green", emoji: "😌", description: "Space weather is calm and peaceful" },
        { level: "Minor", color: "yellow", emoji: "😊", description: "Slight space weather activity detected" },
        { level: "Moderate", color: "orange", emoji: "🤔", description: "Moderate space weather activity" },
        { level: "Strong", color: "red", emoji: "😮", description: "Strong space weather activity" }
    ];

    // Simulate based on time of day
    const conditionIndex = Math.floor(hour / 6) % 4;
    return conditions[conditionIndex];
};

// Sample questions for children
const SAMPLE_QUESTIONS = [
    "What are auroras?",
    "Why does the Sun have storms?",
    "How does Earth protect us from space?",
    "What is space weather?",
    "Why do auroras have different colors?",
    "How do scientists study the Sun?",
    "What happens during a solar storm?",
    "Why is the Sun important for life on Earth?",
    "How do satellites stay safe in space?",
    "What do astronauts see in space?",

];

export default function AIQuestionAnswer() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: "ai",
            content: "Hi there, space explorer! 👋 I'm your Space Weather Assistant! I love helping kids learn about auroras, solar storms, and how the Sun affects Earth. What space weather topic would you like to explore today? 🌌",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesContainerRef = useRef(null);
    const inputRef = useRef(null);

    // Fixed scroll function - only scrolls within the chat container
    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Refresh API status when component mounts
        setApiStatus(getApiStatusDisplay());
    }, []);

    // State for API status
    const [apiStatus, setApiStatus] = useState(getApiStatusDisplay());
    const [isTestingConnection, setIsTestingConnection] = useState(false);

    // Custom AI response function with progress updates
    const getAIResponseWithProgress = async (userMessage, updateProgress) => {
        const apiKey = import.meta.env.VITE_GROQ_API_KEY;

        if (!apiKey || !apiKey.startsWith('gsk_')) {
            throw new Error('API_KEY_MISSING');
        }

        const maxRetries = 3;

        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                if (attempt > 0) {
                    updateProgress(`🔄 Retry ${attempt}/${maxRetries} - AI is working hard to get you an answer...`);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }

                updateProgress(`🤖 AI is processing your question... `);

                // Call the actual AI service
                const response = await getAIResponse(userMessage, attempt, maxRetries);
                return response;
            } catch (error) {

                if (attempt === maxRetries) {
                    throw error; // Final attempt failed
                }

                updateProgress(`⚠️ Attempt ${attempt + 1} failed, trying again...`);
            }
        }
    };

    // Test API connection
    const handleTestConnection = async () => {
        setIsTestingConnection(true);

        // Add diagnostic info to chat
        const diagnosticMessage = {
            id: Date.now(),
            type: "ai",
            content: `🔍 Running connection test... Check your browser console (F12) for detailed logs! 🛠️`,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, diagnosticMessage]);

        try {
            const result = await testApiConnection();
            if (result.success) {
                const testMessage = {
                    id: Date.now() + 1,
                    type: "ai",
                    content: `🎉 Great news! Your AI connection is working perfectly! The API responded successfully. Now you can ask me any questions about space weather and I'll give you real AI-powered answers! 🚀✨`,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, testMessage]);
            } else {
                const errorMessage = {
                    id: Date.now() + 1,
                    type: "ai",
                    content: `⚠️ Connection test failed: ${result.message}. 

📋 **Quick fixes to try:**
1. Check browser console (F12) for detailed error logs
2. Verify your .env file has: VITE_GROQ_API_KEY=gsk_your_key
3. Make sure API key starts with 'gsk_'
4. Restart the dev server (Ctrl+C then npm run dev)
5. Check the TROUBLESHOOTING.md file for detailed help

Don't worry though - I'm still here to help with backup responses! 🤖`,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, errorMessage]);
            }
        } catch (error) {
            const errorMessage = {
                id: Date.now() + 1,
                type: "ai",
                content: `❌ Couldn't test the connection right now. Check the browser console (F12) for error details. But I'm still working with backup responses! Try asking me a question! 🌟`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTestingConnection(false);
        }
    };

    const handleSendMessage = async (e) => {
        // Prevent default form submission behavior
        if (e) {
            e.preventDefault();
        }

        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: "user",
            content: inputValue.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        // Add thinking indicator message
        const thinkingMessageId = Date.now() + 1;
        const thinkingMessage = {
            id: thinkingMessageId,
            type: "ai",
            content: "🤖 AI is thinking and processing your question...",
            timestamp: new Date(),
            isThinking: true
        };
        setMessages(prev => [...prev, thinkingMessage]);

        // Function to update thinking message
        const updateThinkingMessage = (newContent) => {
            setMessages(prev => prev.map(msg =>
                msg.id === thinkingMessageId
                    ? { ...msg, content: newContent }
                    : msg
            ));
        };

        try {
            // Get AI response with retry progress updates
            const aiResponseContent = await getAIResponseWithProgress(userMessage.content, updateThinkingMessage);

            // Remove thinking message and add real response
            setMessages(prev => {
                const filtered = prev.filter(msg => msg.id !== thinkingMessageId);
                return [...filtered, {
                    id: Date.now() + 2,
                    type: "ai",
                    content: aiResponseContent,
                    timestamp: new Date()
                }];
            });
        } catch (error) {

            // Remove thinking message and show error
            setMessages(prev => {
                const filtered = prev.filter(msg => msg.id !== thinkingMessageId);
                let errorContent = "I'm having trouble connecting to my AI brain right now! 🤖";

                if (error.message === 'API_KEY_MISSING') {
                    errorContent = "⚠️ My AI connection isn't set up yet! I need an API key to give you real AI answers. For now, I can still chat with you using my backup knowledge! 🤖";
                } else {
                    errorContent = "I tried really hard to get you an answer, but I'm having connection issues! 🤖 Let me try again in a moment, or you can ask me another question! ✨";
                }

                return [...filtered, {
                    id: Date.now() + 2,
                    type: "ai",
                    content: errorContent,
                    timestamp: new Date()
                }];
            });
        } finally {
            setIsTyping(false);
        }
    };

    const handleSampleQuestion = (question) => {
        setInputValue(question);
        inputRef.current?.focus();
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const currentWeather = getCurrentSpaceWeather();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white pt-20">
            {/* Animated background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/50 to-pink-900/50" />
                <div className="absolute inset-0 opacity-30">
                    {[...Array(50)].map((_, i) => {
                        const left = Math.random() * 100;
                        const top = Math.random() * 100;
                        const size = Math.random() * 3 + 1;
                        const duration = 3 + Math.random() * 4;
                        const delay = Math.random() * 2;
                        return (
                            <div
                                key={i}
                                className="absolute rounded-full bg-white/20 animate-pulse"
                                style={{
                                    left: `${left}%`,
                                    top: `${top}%`,
                                    width: size,
                                    height: size,
                                    animationDuration: `${duration}s`,
                                    animationDelay: `${delay}s`
                                }}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">

                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-fuchsia-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                            AI Space Weather Assistant
                        </h1>
                    </div>
                    <p className="text-lg text-white/80 mb-6">
                        Ask me anything about space weather, auroras, solar storms, and more!
                    </p>

                    {/* Current Space Weather Status */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                            <span className="text-2xl">{currentWeather.emoji}</span>
                            <div className="text-left">
                                <div className="font-semibold">Current Space Weather: {currentWeather.level}</div>
                                <div className="text-sm text-white/70">{currentWeather.description}</div>
                            </div>
                        </div>


                    </div>
                </div>

                {/* Chat Container */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                    {/* Messages - Added ref to container for controlled scrolling */}
                    <div
                        ref={messagesContainerRef}
                        className="h-96 overflow-y-auto p-6 space-y-4"
                    >
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${message.type === "user"
                                        ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white"
                                        : message.isThinking
                                            ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-white border border-blue-400/30 animate-pulse"
                                            : "bg-white/10 text-white border border-white/20"
                                        }`}
                                >
                                    <div className="text-sm leading-relaxed">
                                        {message.isThinking ? (
                                            <div className="flex items-center gap-2">
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                                </div>
                                                <span>{message.content}</span>
                                            </div>
                                        ) : (
                                            message.content
                                        )}
                                    </div>
                                    <div className="text-xs opacity-70 mt-2">
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white/10 text-white border border-white/20 px-4 py-3 rounded-2xl">
                                    <div className="flex items-center gap-1">
                                        <span>AI is thinking</span>
                                        <div className="flex gap-1">
                                            <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )} */}
                    </div>

                    {/* Input Area - Added form to prevent default submission */}
                    <div className="border-t border-white/10 p-4">
                        <form onSubmit={handleSendMessage} className="flex gap-3">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me about space weather, auroras, solar storms..."
                                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                            />
                            <Button
                                type="submit"
                                disabled={!inputValue.trim() || isTyping}
                                className="bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Send
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Sample Questions */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-center">Try asking these questions:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {SAMPLE_QUESTIONS.map((question, index) => (
                            <button
                                key={index}
                                onClick={() => handleSampleQuestion(question)}
                                className="text-left p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 hover:scale-105"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">💭</span>
                                    <span className="text-white/90">{question}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Fun Facts */}
                <div className="mt-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-400/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <span>🌟</span>
                        Fun Space Weather Facts
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/80">
                        <div>
                            <strong>Did you know?</strong> Auroras can be seen from space! Astronauts on the International Space Station get an amazing view of these dancing lights.
                        </div>
                        <div>
                            <strong>Amazing fact:</strong> Solar storms can create auroras so bright that people have been able to read newspapers by their light!
                        </div>
                        <div>
                            <strong>Cool science:</strong> The Sun's magnetic field is so strong that it extends far beyond Pluto, creating a bubble called the heliosphere!
                        </div>
                        <div>
                            <strong>Space magic:</strong> Earth's magnetic field acts like a giant shield, protecting us from harmful solar radiation while still allowing beautiful auroras to form!
                        </div>
                        <div>
                            <strong>Incredible:</strong> Jupiter's auroras are 100 times brighter than Earth's and are powered by the planet's own magnetic field!
                        </div>
                        <div>
                            <strong>Fascinating:</strong> The solar wind travels at speeds of up to 500 miles per second - that's faster than a speeding bullet!
                        </div>
                        <div>
                            <strong>Wow:</strong> Sunspots can be so big that you could fit several Earths inside them! They're like the Sun's freckles!
                        </div>
                        <div>
                            <strong>Amazing:</strong> Space weather affects not just Earth, but all the planets in our solar system in different ways!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
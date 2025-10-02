// src/pages/AIQuestionAnswer.jsx
import { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/Button";

// AI responses for different space weather topics
const AI_RESPONSES = {
    aurora: {
        keywords: ["aurora", "northern lights", "southern lights", "aurora borealis", "aurora australis", "lights", "dancing lights", "polar lights", "sky lights", "colorful sky", "green lights", "pink lights", "purple lights"],
        responses: [
            "Auroras are beautiful lights in the sky that happen when particles from the Sun hit Earth's atmosphere! They look like colorful curtains dancing in the night sky. The best time to see them is when there's a lot of solar activity! 🌌✨",
            "The Northern Lights (Aurora Borealis) and Southern Lights (Aurora Australis) are like nature's light show! They happen when the Sun sends charged particles toward Earth, and our magnetic field guides them to the poles where they create amazing colors! 🌈",
            "Auroras come in many colors - green, pink, purple, and even red! The color depends on what type of gas in our atmosphere the solar particles hit. It's like a cosmic paintbrush painting the sky! 🎨",
            "Did you know auroras can make sounds? Some people report hearing crackling or hissing sounds when auroras are very strong! It's like the sky is whispering to us! 👂✨",
            "Auroras happen on other planets too! Jupiter and Saturn have auroras that are even bigger and more powerful than Earth's! Imagine seeing those from space! 🪐🌟"
        ]
    },
    solar_storm: {
        keywords: ["solar storm", "sun storm", "space storm", "solar flare", "coronal mass ejection", "cme", "storm", "solar wind", "solar particles", "sun explosion", "solar activity", "space weather storm", "geomagnetic storm"],
        responses: [
            "Solar storms are like the Sun having a temper tantrum! It sends out huge bursts of energy and particles that can travel all the way to Earth. Don't worry though - our planet has a magnetic shield that protects us! 🛡️☀️",
            "When the Sun gets really active, it can send billions of tons of particles toward Earth at super high speeds! This can cause beautiful auroras but might also affect satellites and power grids. Scientists watch the Sun 24/7 to keep us safe! 🔬",
            "Solar storms are actually pretty common! The Sun goes through cycles of being more or less active. During the active times, we see more sunspots, solar flares, and auroras. It's like the Sun's way of showing off! 😄",
            "The biggest solar storm ever recorded happened in 1859! It was so strong that people could read newspapers by the light of the auroras, and telegraph machines worked without being plugged in! 📰⚡",
            "Solar storms can create beautiful auroras, but they can also cause problems for our technology. That's why scientists work hard to predict them and help us prepare! 🛰️🔧"
        ]
    },
    space_weather: {
        keywords: ["space weather", "space environment", "magnetic field", "solar wind", "radiation", "space conditions", "space climate", "interplanetary space", "heliosphere", "magnetosphere", "ionosphere", "space monitoring"],
        responses: [
            "Space weather is like regular weather, but in space! Instead of rain and clouds, we have solar wind, magnetic fields, and radiation. Scientists study it to keep astronauts and satellites safe! 🚀",
            "Just like we check the weather before going outside, astronauts and satellite operators check space weather before missions! They need to know if there are any solar storms coming that might affect their equipment! 📡",
            "Space weather affects everything from GPS signals to power grids on Earth! That's why scientists around the world work together to monitor the Sun and predict when space weather might impact us! 🌍",
            "Space weather can affect radio signals, airplane flights, and even power lines on Earth! It's amazing how something happening 93 million miles away can affect our daily lives! 📻✈️",
            "Scientists use special satellites and ground-based instruments to monitor space weather 24/7. It's like having weather stations, but for space! 🛰️🌤️"
        ]
    },
    sun: {
        keywords: ["sun", "solar", "star", "sunspot", "solar cycle", "solar activity", "solar maximum", "solar minimum", "solar corona", "solar surface", "solar energy", "solar radiation", "our star", "day star"],
        responses: [
            "The Sun is our closest star and it's absolutely amazing! It's like a giant nuclear reactor that's been burning for billions of years, giving us light and heat. Without it, there would be no life on Earth! ☀️",
            "The Sun has an 11-year cycle where it gets more and less active. During the active phase, we see more sunspots and solar flares. It's like the Sun's way of breathing in and out! 🌬️",
            "Even though the Sun looks calm from Earth, it's actually a very active place! There are constant explosions, magnetic storms, and streams of particles flowing outward. It's like a cosmic fireworks show! 🎆",
            "The Sun is so big that you could fit 1.3 million Earths inside it! And it's so hot that its surface temperature is about 10,000 degrees Fahrenheit! 🔥🌡️",
            "Sunspots are dark spots on the Sun that are actually cooler than the rest of the surface. They're like the Sun's freckles, and they can be bigger than Earth! 🌞🔍"
        ]
    },
    earth: {
        keywords: ["earth", "planet", "magnetic field", "atmosphere", "protection", "shield", "our planet", "blue planet", "earth's field", "geomagnetic", "atmospheric", "ozone layer", "earth protection"],
        responses: [
            "Earth is like a spaceship with a magnetic shield! Our magnetic field protects us from harmful solar radiation and particles. It's like having an invisible force field around our planet! 🛡️🌍",
            "Earth's atmosphere is like a protective blanket that keeps us safe and warm. It also helps create the beautiful auroras when solar particles interact with it! It's our planet's way of taking care of us! 🤗",
            "Our planet is perfectly positioned in the 'Goldilocks zone' - not too hot, not too cold, just right for life! And our magnetic field and atmosphere work together to keep us safe from space weather! 🌟",
            "Earth's magnetic field is like a giant invisible shield that extends far into space! It deflects harmful solar particles and creates the beautiful auroras at the poles! 🧲✨",
            "The atmosphere has different layers, and each one helps protect us in different ways. The ozone layer, for example, blocks harmful ultraviolet radiation from the Sun! 🌫️🛡️"
        ]
    },
    planets: {
        keywords: ["planets", "solar system", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto", "dwarf planet", "other planets", "planetary", "space exploration"],
        responses: [
            "Our solar system has 8 amazing planets, each with its own unique features! Mercury is the closest to the Sun, while Neptune is the farthest. Each planet has its own weather and magnetic field! 🪐🌟",
            "Jupiter is like a giant vacuum cleaner in space! Its strong magnetic field helps protect the inner planets from dangerous space weather. It's like our solar system's bodyguard! 🛡️🪐",
            "Mars doesn't have a strong magnetic field like Earth, so it gets hit by more solar radiation. That's one reason why it's harder for life to survive there! 🔴🌪️",
            "Saturn has beautiful rings made of ice and rock! It also has auroras, just like Earth, but they're created by different processes. Space is full of surprises! 💍✨",
            "Venus is the hottest planet in our solar system, even hotter than Mercury! It has a thick atmosphere that traps heat, making it like a giant greenhouse! 🌡️🌺"
        ]
    },
    satellites: {
        keywords: ["satellites", "spacecraft", "space station", "iss", "international space station", "space missions", "orbital", "space technology", "spacecraft protection", "satellite weather"],
        responses: [
            "Satellites are like robots that orbit Earth and help us study space weather! They can see the Sun and space in ways we can't from the ground. They're our eyes in space! 👁️🛰️",
            "The International Space Station (ISS) is like a giant laboratory floating in space! Astronauts live there and study space weather up close. It travels around Earth 16 times a day! 🚀🏠",
            "Satellites need special protection from space weather! They have shields and backup systems to keep them safe from solar storms and radiation. It's like giving them space armor! ⚔️🛡️",
            "Some satellites are designed specifically to watch the Sun and predict space weather! They help us know when solar storms are coming so we can prepare! 🔍☀️",
            "Space weather can affect satellites by causing electrical problems or changing their orbits. That's why scientists work hard to predict and protect against it! ⚡🛰️"
        ]
    },
    astronauts: {
        keywords: ["astronauts", "space travelers", "space explorers", "cosmonauts", "space missions", "space suits", "space radiation", "space safety", "human spaceflight"],
        responses: [
            "Astronauts are brave explorers who travel to space! They need special protection from space weather, including radiation and solar storms. Their space suits are like personal spaceships! 👨‍🚀🛡️",
            "When astronauts are in space, they're outside Earth's protective atmosphere and magnetic field! That's why they need special training and equipment to stay safe from space weather! 🌌👩‍🚀",
            "Astronauts on the International Space Station can see auroras from above! They get an amazing view of the dancing lights that we see from Earth. It must be incredible! 🌟👀",
            "Space radiation is one of the biggest challenges for astronauts! They need special shielding and monitoring to make sure they don't get too much exposure during their missions! ☢️🛡️",
            "Astronauts study space weather to help scientists understand how it affects Earth and other planets. They're like space weather detectives! 🔍🕵️‍♂️"
        ]
    },
    technology: {
        keywords: ["technology", "gps", "radio", "power grid", "electricity", "communication", "internet", "space technology", "satellite communication", "power systems"],
        responses: [
            "Space weather can affect our technology here on Earth! It can disrupt GPS signals, radio communications, and even power grids. That's why scientists study it so carefully! 📡⚡",
            "GPS satellites help us navigate, but space weather can mess up their signals! That's why we need backup systems and ways to predict when space weather might cause problems! 🗺️🛰️",
            "Power companies watch space weather because solar storms can affect power lines and transformers! They need to be ready to protect the electrical grid! ⚡🏭",
            "Radio signals can be affected by space weather too! That's why radio operators and emergency services need to know about space weather conditions! 📻📡",
            "The internet and phone systems rely on satellites, so space weather can affect our daily communications! It's amazing how connected everything is! 🌐📱"
        ]
    },
    science: {
        keywords: ["science", "scientists", "research", "study", "experiments", "discovery", "space science", "physics", "astronomy", "space research", "scientific method"],
        responses: [
            "Scientists study space weather to understand how the Sun affects Earth and our technology! They use special instruments and computer models to predict what might happen! 🔬🧪",
            "Space weather research helps us understand not just Earth, but other planets too! By studying how space weather works, we learn more about the universe! 🌌🔍",
            "Scientists use telescopes, satellites, and ground-based instruments to study space weather! It's like being a detective, but for space! 🕵️‍♀️🔭",
            "Research in space weather helps us protect astronauts, satellites, and our technology! It's science that directly helps people and makes life better! 👨‍🔬💡",
            "Every day, scientists around the world work together to monitor space weather and share their findings! It's a global effort to understand our space environment! 🌍🤝"
        ]
    },
    general: {
        responses: [
            "That's a great question about space! Space is full of amazing mysteries and wonders. The Sun, our solar system, and the space around Earth are all connected in fascinating ways! 🌌",
            "I love your curiosity about space! There's so much to learn about how the Sun affects Earth and creates beautiful phenomena like auroras. Keep asking questions - that's how we discover new things! 🚀",
            "Space weather is such an exciting topic! It's all about how the Sun and Earth interact, creating everything from beautiful auroras to challenges for our technology. What would you like to know more about? ✨",
            "That's an interesting question! Space is full of surprises and there's always something new to learn. The more we study space weather, the more we understand about our amazing universe! 🌟",
            "Great thinking! Space weather affects so many things in our daily lives, from the beautiful auroras we see to the technology we use. What other space topics interest you? 🚀💫"
        ]
    }
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
            content: "Hi there, space explorer! 👋 I'm your AI space weather assistant! I can help you learn about auroras, solar storms, space weather, and anything else about space! What would you like to know? 🌌✨",
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

    // AI response logic
    const getAIResponse = (userMessage) => {
        const message = userMessage.toLowerCase();

        // Check for specific topics
        for (const [topic, data] of Object.entries(AI_RESPONSES)) {
            if (topic === 'general') continue;

            const hasKeyword = data.keywords.some(keyword =>
                message.includes(keyword.toLowerCase())
            );

            if (hasKeyword) {
                const randomResponse = data.responses[Math.floor(Math.random() * data.responses.length)];
                return randomResponse;
            }
        }

        // Default response
        const randomGeneral = AI_RESPONSES.general.responses[Math.floor(Math.random() * AI_RESPONSES.general.responses.length)];
        return randomGeneral;
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

        // Simulate AI thinking time
        setTimeout(() => {
            const aiResponse = getAIResponse(userMessage.content);
            const aiMessage = {
                id: Date.now() + 1,
                type: "ai",
                content: aiResponse,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1000 + Math.random() * 2000); // 1-3 seconds delay
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
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                        <span className="text-2xl">{currentWeather.emoji}</span>
                        <div className="text-left">
                            <div className="font-semibold">Current Space Weather: {currentWeather.level}</div>
                            <div className="text-sm text-white/70">{currentWeather.description}</div>
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
                                        : "bg-white/10 text-white border border-white/20"
                                        }`}
                                >
                                    <div className="text-sm leading-relaxed">{message.content}</div>
                                    <div className="text-xs opacity-70 mt-2">
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
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
                        )}
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
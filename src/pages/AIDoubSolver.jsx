import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import {
  sampleChatMessages,
  quickSuggestions,
  userProgress,
  completedTopics,
  aiHintModeExamples,
} from '../data/mockAIData';

/**
 * AI Doubt Solver Chatbot
 * ChatGPT-like interface for solving DSA doubts
 */
function AIDoubSolver() {
  const [messages, setMessages] = useState(sampleChatMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hintMode, setHintMode] = useState('intermediate');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const mockAIResponses = {
    default:
      "That's a great question! Let me break it down for you step by step. First, let's understand what we're trying to solve. The key insight is to think about this from a different perspective. Would you like me to explain the intuition behind this approach?",
    easy:
      'Think about this like a real-world problem. Imagine you have a list of items and you want to find something specific. The approach is similar!',
    hard: 'This is a complex problem that combines multiple concepts. Consider the time and space complexity trade-offs. The optimal solution uses a technique called...',
  };

  const handleSendMessage = async (text = inputValue) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: text,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate AI response delay
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate AI response based on hint mode
    let responseText = mockAIResponses.default;
    if (text.toLowerCase().includes('how') || text.toLowerCase().includes('what')) {
      if (hintMode === 'beginner') {
        responseText = `${aiHintModeExamples.beginner}\n\n${mockAIResponses.easy}`;
      } else if (hintMode === 'hard') {
        responseText = `${mockAIResponses.hard}\n\nFor this problem, you need to understand the underlying patterns and think about edge cases.`;
      }
    }

    const aiMessage = {
      id: messages.length + 2,
      type: 'ai',
      text: responseText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const handleQuickSuggestion = (suggestion) => {
    const query = suggestion.split(' ').slice(1).join(' ');
    handleSendMessage(query);
  };

  return (
    <div className="flex h-full bg-slate-100 dark:bg-dark-bg">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col overflow-hidden transition-all duration-300`}
      >
       

        {/* User Progress */}
        {sidebarOpen && (
          <div className="flex-1 overflow-y-auto p-3 space-y-4 text-sm">
            {/* Profile Card with Close Button */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-xs text-white">📊 Progress</h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 hover:bg-slate-700 transition-colors rounded flex-shrink-0"
                title="Close sidebar"
              >
                ✕
              </button>
            </div>
            
            {/* Profile Card */}
            <div className="bg-slate-700/50 rounded-lg p-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Level</span>
                  <span className="font-semibold text-blue-400">{userProgress.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Streak 🔥</span>
                  <span className="font-semibold text-orange-400">{userProgress.currentStreak}d</span>
                </div>
                <div className="flex justify-between">
                  <span>Points</span>
                  <span className="font-semibold text-green-400">
                    {userProgress.totalPoints}/{userProgress.nextMilestone}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-2 bg-slate-600 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-1.5 rounded-full"
                    style={{
                      width: `${(userProgress.totalPoints / userProgress.nextMilestone) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Topics */}
            <div>
              <h3 className="font-bold mb-2 text-xs">✅ Topics</h3>
              <div className="space-y-1">
                {completedTopics
                  .filter((t) => t.completed)
                  .map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => handleSendMessage(`Explain ${topic.name}`)}
                      className="w-full text-left px-2 py-1 bg-slate-700/30 hover:bg-slate-700/50 rounded text-xs font-medium transition-colors truncate"
                    >
                      {topic.name} ✓
                    </button>
                  ))}
              </div>
            </div>

            {/* Quick Suggestions */}
            <div>
              <h3 className="font-bold mb-2 text-xs">💡 Ideas</h3>
              <div className="space-y-1">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSuggestion(suggestion)}
                    className="w-full text-left px-2 py-1 bg-slate-700/30 hover:bg-slate-700/50 rounded text-xs transition-colors truncate"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Top Bar */}
        <motion.div className="bg-white dark:bg-dark-card border-b border-slate-200 dark:border-dark-border p-3 sm:p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-dark-border rounded transition-colors"
                title="Open sidebar"
              >
                ☰
              </button>
            )}
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                🤖 AI Doubt Solver
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ask DSA questions
              </p>
            </div>
          </div>

          {/* Hint Mode Toggle */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300 hidden sm:inline">
              Hint:
            </label>
            <select
              value={hintMode}
              onChange={(e) => setHintMode(e.target.value)}
              className="px-2 sm:px-3 py-1 bg-slate-100 dark:bg-dark-border text-slate-900 dark:text-white rounded text-xs font-medium"
            >
              <option value="beginner">🟢 Beginner</option>
              <option value="intermediate">🟡 Intermediate</option>
              <option value="hard">🔴 Advanced</option>
            </select>
          </div>
        </motion.div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 bg-slate-50 dark:bg-dark-bg">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-5xl mb-3">🤖</p>
                <p className="text-slate-600 dark:text-slate-400">
                  Start asking questions about DSA concepts!
                </p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-2xl rounded-lg p-4 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-dark-card text-slate-900 dark:text-white border border-slate-200 dark:border-dark-border'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </motion.div>
            ))
          )}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white dark:bg-dark-card text-slate-900 dark:text-white border border-slate-200 dark:border-dark-border rounded-lg p-4">
                <div className="flex gap-2 items-center">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <motion.div className="bg-white dark:bg-dark-card border-t border-slate-200 dark:border-dark-border p-3 sm:p-4">
          {/* Buttons */}
          <div className="mb-2 flex gap-2 flex-wrap text-xs sm:text-sm">
            <button
              onClick={() => setHintMode(hintMode === 'beginner' ? 'intermediate' : 'beginner')}
              className="px-2 sm:px-3 py-1 bg-slate-100 dark:bg-dark-border text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium hover:bg-slate-200 dark:hover:bg-dark-border/80 transition-colors"
            >
              {hintMode === 'beginner' ? '🧒' : '👨‍💻'} {hintMode === 'beginner' ? 'Advanced' : 'Beginner'}
            </button>
            <button
              onClick={() =>
                handleSendMessage('Can you give me a hint on how to approach this?')
              }
              disabled={isLoading}
              className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              💡 Hint
            </button>
          </div>

          {/* Input Field */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask about DSA... (Shift+Enter for new line)"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-slate-100 dark:bg-dark-border text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 rounded-lg border border-slate-200 dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              disabled={isLoading}
            />
            <motion.button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className="px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? '...' : '→'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AIDoubSolver;

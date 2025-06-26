"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, User, Code, Send, Trophy, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Link } from "react-router"

const sampleQuestion = {
  title: "Two Sum",
  difficulty: "Easy",
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  constraints: [
    "2 ≤ nums.length ≤ 10⁴",
    "-10⁹ ≤ nums[i] ≤ 10⁹",
    "-10⁹ ≤ target ≤ 10⁹",
    "Only one valid answer exists.",
  ],
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
  ],
}

export default function BattlePage() {
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes
  const [language, setLanguage] = useState("javascript")
  const [code, setCode] = useState(`function twoSum(nums, target) {
    // Your solution here
    
}`)
  const [opponentStatus, setOpponentStatus] = useState("Thinking...")
  const [battleResult, setBattleResult] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Simulate opponent status changes
    const statusTimer = setInterval(() => {
      const statuses = ["Thinking...", "Typing...", "Testing...", "Debugging..."]
      setOpponentStatus(statuses[Math.floor(Math.random() * statuses.length)])
    }, 3000)

    return () => {
      clearInterval(timer)
      clearInterval(statusTimer)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setBattleResult("You Won!")
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-600"
      case "medium":
        return "bg-yellow-600"
      case "hard":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header - Fixed height */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm flex-shrink-0">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/dashboard">
              <Code className="h-8 w-8 text-purple-400" />
            </Link>
            <span className="text-2xl font-bold text-white font-mono">Battle Arena</span>
          </div>
          <div className="flex items-center space-x-6">
            {/* Timer */}
            <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-lg">
              <Clock className="h-5 w-5 text-purple-400" />
              <span className="text-white font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
            {/* Opponent Status */}
            <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-lg">
              <User className="h-5 w-5 text-blue-400" />
              <span className="text-white">AlgoMaster</span>
              <Badge variant="secondary" className="bg-blue-600 text-white">
                {opponentStatus}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Flex grow to fill remaining space */}
      <div className="flex-1 container mx-auto px-4 py-6 min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Left Panel - Question */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg flex flex-col min-h-0">
            {/* Question Header - Fixed */}
            <div className="border-b border-slate-700 p-6 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white flex items-center space-x-3">
                  <span>{sampleQuestion.title}</span>
                  <Badge className={`${getDifficultyColor(sampleQuestion.difficulty)} text-white`}>
                    {sampleQuestion.difficulty}
                  </Badge>
                </h1>
              </div>
            </div>

            {/* Question Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 min-h-0">
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line">{sampleQuestion.description}</p>
                </div>

                <Separator className="bg-slate-600" />

                {/* Examples */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Examples</h3>
                  <div className="space-y-4">
                    {sampleQuestion.examples.map((example, index) => (
                      <div key={index} className="bg-slate-700/30 p-4 rounded-lg">
                        <div className="space-y-2">
                          <div>
                            <span className="text-slate-400 font-mono text-sm">Input: </span>
                            <span className="text-white font-mono">{example.input}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-mono text-sm">Output: </span>
                            <span className="text-white font-mono">{example.output}</span>
                          </div>
                          {example.explanation && (
                            <div>
                              <span className="text-slate-400 font-mono text-sm">Explanation: </span>
                              <span className="text-slate-300">{example.explanation}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-slate-600" />

                {/* Constraints */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Constraints</h3>
                  <ul className="space-y-1">
                    {sampleQuestion.constraints.map((constraint, index) => (
                      <li key={index} className="text-slate-300 font-mono text-sm">
                        • {constraint}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg flex flex-col min-h-0">
            {/* Editor Header - Fixed */}
            <div className="border-b border-slate-700 p-6 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Code Editor</h2>
                <div className="flex items-center space-x-2">
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Code Editor - Flexible */}
            <div className="flex-1 p-6 flex flex-col min-h-0">
              <div className="flex-1 mb-4 min-h-0">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full bg-slate-900 border border-slate-600 rounded-lg p-4 text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-0"
                  placeholder="Write your solution here..."
                />
              </div>

              {/* Editor Footer - Fixed */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700 flex-shrink-0">
                <div className="flex items-center space-x-2">
                  {battleResult && (
                    <div className="flex items-center space-x-2">
                      {battleResult === "You Won!" ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-400" />
                      )}
                      <span
                        className={`font-semibold ${battleResult === "You Won!" ? "text-green-400" : "text-red-400"}`}
                      >
                        {battleResult}
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || timeLeft === 0}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Solution
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Battle Result Modal/Notification */}
      {battleResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-slate-800 border-slate-700 max-w-md w-full mx-4">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {battleResult === "You Won!" ? (
                  <Trophy className="h-16 w-16 text-yellow-400" />
                ) : (
                  <AlertCircle className="h-16 w-16 text-red-400" />
                )}
              </div>
              <CardTitle className={`text-2xl ${battleResult === "You Won!" ? "text-green-400" : "text-red-400"}`}>
                {battleResult}
              </CardTitle>
              <CardDescription className="text-slate-300">
                {battleResult === "You Won!"
                  ? "Congratulations! You solved the problem faster than your opponent."
                  : "Better luck next time! Keep practicing to improve your skills."}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-slate-700/30 p-3 rounded-lg">
                  <div className="text-slate-400">Your Time</div>
                  <div className="text-white font-mono">3:42</div>
                </div>
                <div className="bg-slate-700/30 p-3 rounded-lg">
                  <div className="text-slate-400">Rating Change</div>
                  <div className={`font-mono ${battleResult === "You Won!" ? "text-green-400" : "text-red-400"}`}>
                    {battleResult === "You Won!" ? "+25" : "-15"}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link to="/dashboard" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-slate-600 text-slate-300 hover:bg-slate-600"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link to="/battle/create" className="flex-1">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">New Battle</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

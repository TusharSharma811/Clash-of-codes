"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import Editor from "@monaco-editor/react"
import {
  Code,
  Play,
  RotateCcw,
  Settings,
  Maximize2,
  Terminal,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Bot,
  Zap,
  Trophy,
  Eye,
  EyeOff,
  Copy,
} from "lucide-react"
import { useState , useRef } from "react"
import { useBattleStore } from "@/Store/usebattlestore"

export default function Playgroundpage() {
  const { roomId, opponent, question, player } = useBattleStore();
  const [isRunning, setIsRunning] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(``);
  const editorRef = useRef(null);

const handleEditorDidMount = (editor: any) => {
  editorRef.current = editor;
  setTimeout(() => editor.focus(), 100); // Ensure it's mounted
};

    
  const handleRun = async () => {
  setIsRunning(true);
  try {
    const res = await fetch("/server/api/code/execute", {
      method: "POST",
      body: JSON.stringify({ code, question, language, roomId, playerId: player?.userId }),
    });
    const output = await res.json();
  } catch (err) {
    console.error(err);
  } finally {
    setIsRunning(false);
  }
};

const handleSubmit = async () => {
  setIsRunning(true);
  try {
    const res = await fetch("/server/api/code/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomId,
        playerId: player?.userId,
        code,
        language,
        question
      }),
    });

    const result = await res.json();
    console.log("Judge Output", result);
    // socket.emit('codeSubmitted', { roomId, userId, ...result });
  } catch (err) {
    console.error("Submission error", err);
  } finally {
    setIsRunning(false);
  }
};

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(8,145,178,0.06),transparent_50%)]" />

      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Bento Grid Layout */}
      <div className="h-full p-4 grid grid-cols-12 grid-rows-12 gap-4 relative z-10">
        {/* Header Bar - Full Width */}
        <Card className="col-span-12 row-span-1 bg-white/5 backdrop-blur-sm border-cyan-500/20 border">
          <CardContent className="p-4 h-full flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-semibold">{question?.title}</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">{question?.difficulty}</Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>00:00</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>vs {opponent?.username}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 bg-transparent"
                onClick={() => setShowHints(!showHints)}
              >
                {showHints ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-slate-600 text-gray-300 hover:bg-slate-700/50 bg-transparent"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-slate-600 text-gray-300 hover:bg-slate-700/50 bg-transparent"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Problem Description - Left Column */}
        <Card className="col-span-3 row-span-7 bg-white/5 backdrop-blur-sm border-cyan-500/20 border">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center">
              <FileText className="w-5 h-5 mr-2 text-cyan-400" />
              Problem
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-4rem)]">
            <ScrollArea className="h-full px-6">
              <div className="space-y-4 pb-6">
                <div>
                  <h3 className="text-white font-semibold mb-2">Description</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {question?.description || "No description available."}
                  </p>
                </div>
                {
                  question?.inputFormat && (
                    <div>
                      <h3 className="text-white font-semibold mb-2">Input Format</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {question.inputFormat}
                      </p>
                    </div>
                  )
                }
                {
                  question?.outputFormat && (
                    <div>
                      <h3 className="text-white font-semibold mb-2">Output Format</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {question.outputFormat}
                      </p>
                    </div>
                  )
                }
                {
                  question?.sampleInput && (
                    <div>
                      <h3 className="text-white font-semibold mb-2">Sample Input</h3>
                      <pre className="bg-slate-800/50 p-3 rounded text-sm text-gray-200">
                        {question.sampleInput}
                      </pre>
                    </div>
                  )
                }
                {
                  question?.sampleOutput && (
                    <div>
                      <h3 className="text-white font-semibold mb-2">Sample Output</h3>
                      <pre className="bg-slate-800/50 p-3 rounded text-sm text-gray-200">
                        {question.sampleOutput}
                      </pre>
                    </div>
                  )
                }

                <div>
                  <h3 className="text-white font-semibold mb-2">Constraints</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                   {
                    question?.constraints?.split("\n").map((constraint, index) => (
                      <li key={index} className="list-disc pl-4">
                        {constraint.trim()}
                      </li>
                    ))
                   }
                  </ul>
                </div>

                
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Code Editor - Main Area */}
        <Card className="col-span-6 row-span-11 bg-white/5 backdrop-blur-sm border-cyan-500/20 border">
          <CardHeader className="h-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-lg flex items-center">
                <Code className="w-5 h-5 mr-2 text-cyan-400" />
                Code Editor
              </CardTitle>
              <div className="flex items-center space-x-2">
                <select onChange={(e) => setLanguage(e.target.value)} className="bg-slate-800 border border-slate-600 text-white text-sm rounded px-2 py-1">
                  <option>Python</option>
                  <option>JavaScript</option>
                  <option>Java</option>
                  <option>C++</option>
                </select>
                <Button size="sm" variant="outline" className="border-slate-600 text-gray-300 bg-transparent">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-2 h-[calc(100%-2rem)]">
  <div className="h-full bg-slate-900/70 font-mono text-sm relative">
    <div className="h-[calc(100%-2rem)]">
      <Editor
        height="100%"
        defaultLanguage= {language.toLowerCase()}
        defaultValue={`def twoSum(self, nums, target):\n    """\n    Find two numbers that add up to target\n    """\n    hash_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in hash_map:\n            return [hash_map[complement], i]\n        hash_map[num] = i\n    return []`}
        theme="vs-dark"
         value={code}
        onChange={(val) => setCode(val || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          wordWrap: "on",
          scrollBeyondLastLine: false,
         
        }}
       onMount={handleEditorDidMount} 
      />
    </div>

    {/* Editor Footer */}
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-slate-800/80 border-t border-slate-700 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={handleRun}
          disabled={isRunning}
        >
          {isRunning ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          <span className="ml-2">{isRunning ? "Running..." : "Run"}</span>
        </Button>
        <Button
          size="sm"
          className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white"
          onClick={handleSubmit}
        >
          <Trophy className="w-4 h-4 mr-2" />
          Submit
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="border-slate-600 text-gray-300 hover:bg-slate-700/50 bg-transparent"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
      <div className="text-xs text-gray-400">Line 12, Col 5 • Python • UTF-8</div>
    </div>
  </div>
</CardContent>
        </Card>

        {/* Test Cases & Output - Right Column Top */}
        <Card className="col-span-3 row-span-6 bg-white/5 backdrop-blur-sm border-cyan-500/20 border">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg">Test Results</CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-4rem)]">
            <Tabs defaultValue="tests" className="h-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border-b border-slate-700">
                <TabsTrigger
                  value="tests"
                  className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-gray-300"
                >
                  Tests
                </TabsTrigger>
                <TabsTrigger
                  value="output"
                  className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-gray-300"
                >
                  Output
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tests" className="h-[calc(100%-2.5rem)] m-0">
                <ScrollArea className="h-full px-4">
                  <div className="space-y-3 py-4">
                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-white text-sm">Test Case 1</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Passed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-white text-sm">Test Case 2</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Passed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span className="text-white text-sm">Test Case 3</span>
                      </div>
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">Failed</Badge>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="output" className="h-[calc(100%-2.5rem)] m-0">
                <ScrollArea className="h-full">
                  <div className="p-4 font-mono text-sm">
                    <div className="text-green-400 mb-2">✓ Test Case 1: [0, 1]</div>
                    <div className="text-green-400 mb-2">✓ Test Case 2: [1, 2]</div>
                    <div className="text-red-400 mb-2">✗ Test Case 3: Expected [0, 3], got [0, 1]</div>
                    <div className="text-gray-400 mt-4">
                      Runtime: 52ms (beats 85.2%)
                      <br />
                      Memory: 15.1MB (beats 42.8%)
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Console/Terminal - Right Column Bottom */}
        <Card className="col-span-3 row-span-5 bg-white/5 backdrop-blur-sm border-cyan-500/20 border">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center">
              <Terminal className="w-5 h-5 mr-2 text-cyan-400" />
              Console
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-4rem)]">
            <div className="h-full bg-slate-900/70 font-mono text-sm">
              <ScrollArea className="h-full p-4">
                <div className="space-y-2">
                  <div className="text-gray-400">$ python solution.py</div>
                  <div className="text-cyan-300">Running test cases...</div>
                  <div className="text-green-400">Test 1: PASSED ✓</div>
                  <div className="text-green-400">Test 2: PASSED ✓</div>
                  <div className="text-red-400">Test 3: FAILED ✗</div>
                  <div className="text-yellow-400">Expected: [0, 3]</div>
                  <div className="text-yellow-400">Actual: [0, 1]</div>
                  <div className="text-gray-400">$</div>
                  <div className="w-2 h-4 bg-cyan-400 animate-pulse inline-block"></div>
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        {/* Battle Status - Bottom */}
        <Card className="col-span-3 row-span-4 bg-white/5 backdrop-blur-sm border-cyan-500/20 border">
          <CardHeader className="pb-2 h-3">
            <CardTitle className="text-white text-lg flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              Battle Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{player?.username.charAt(0)}</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{player?.username}</div>
                  <div className="text-gray-400 text-xs">You</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-cyan-400 font-bold">2/3</div>
                <div className="text-gray-400 text-xs">Tests Passed</div>
              </div>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-cyan-600 to-teal-600 h-2 rounded-full w-2/3"></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{opponent?.username}</div>
                  <div className="text-gray-400 text-xs">Opponent</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-purple-400 font-bold">1/3</div>
                <div className="text-gray-400 text-xs">Tests Passed</div>
              </div>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full w-1/3"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

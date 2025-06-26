
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Code,
  Plus,
  Trash2,
  Sparkles,
  Save,
  Eye,
  AlertCircle,
  CheckCircle,
  FileText,
  Settings,
  TestTube,
  Lightbulb,
} from "lucide-react"
import {Link}from "react-router"

export default function AddQuestionPage() {
  const [question, setQuestion] = useState({
    title: "",
    description: "",
    difficulty: "",
    inputFormat: "",
    outputFormat: "",
    constraints: [""],
    examples: [{ input: "", output: "", explanation: "" }],
    hiddenTestCases: [{ input: "", output: "" }],
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  const addConstraint = () => {
    setQuestion((prev) => ({
      ...prev,
      constraints: [...prev.constraints, ""],
    }))
  }

  const removeConstraint = (index: number) => {
    setQuestion((prev) => ({
      ...prev,
      constraints: prev.constraints.filter((_, i) => i !== index),
    }))
  }

  const updateConstraint = (index: number, value: string) => {
    setQuestion((prev) => ({
      ...prev,
      constraints: prev.constraints.map((constraint, i) => (i === index ? value : constraint)),
    }))
  }

  const addExample = () => {
    setQuestion((prev) => ({
      ...prev,
      examples: [...prev.examples, { input: "", output: "", explanation: "" }],
    }))
  }

  const removeExample = (index: number) => {
    setQuestion((prev) => ({
      ...prev,
      examples: prev.examples.filter((_, i) => i !== index),
    }))
  }

  const updateExample = (index: number, field: string, value: string) => {
    setQuestion((prev) => ({
      ...prev,
      examples: prev.examples.map((example, i) => (i === index ? { ...example, [field]: value } : example)),
    }))
  }

  const addTestCase = () => {
    setQuestion((prev) => ({
      ...prev,
      hiddenTestCases: [...prev.hiddenTestCases, { input: "", output: "" }],
    }))
  }

  const removeTestCase = (index: number) => {
    setQuestion((prev) => ({
      ...prev,
      hiddenTestCases: prev.hiddenTestCases.filter((_, i) => i !== index),
    }))
  }

  const updateTestCase = (index: number, field: string, value: string) => {
    setQuestion((prev) => ({
      ...prev,
      hiddenTestCases: prev.hiddenTestCases.map((testCase, i) =>
        i === index ? { ...testCase, [field]: value } : testCase,
      ),
    }))
  }

  const generateWithAI = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setQuestion({
      title: "Valid Parentheses",
      description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
      difficulty: "easy",
      inputFormat: "A string s consisting of parentheses only.",
      outputFormat: "Return true if the string is valid, false otherwise.",
      constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'."],
      examples: [
        {
          input: 's = "()"',
          output: "true",
          explanation: "The string contains valid parentheses pairs.",
        },
        {
          input: 's = "()[]{}"',
          output: "true",
          explanation: "All brackets are properly matched and nested.",
        },
        {
          input: 's = "(]"',
          output: "false",
          explanation: "Brackets are not properly matched.",
        },
      ],
      hiddenTestCases: [
        { input: '"((()))"', output: "true" },
        { input: '"([)]"', output: "false" },
        { input: '""', output: "true" },
      ],
    })
    setIsGenerating(false)
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

  const isFormValid = () => {
    return question.title && question.description && question.difficulty
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/dashboard">
              <Code className="h-8 w-8 text-purple-400" />
            </Link>
            <span className="text-2xl font-bold text-white font-mono">Add Question</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowPreview(!showPreview)}
              variant="outline"
              className="bg-transparent border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
            >
              <Eye className="mr-2 h-4 w-4" />
              {showPreview ? "Hide Preview" : "Preview"}
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" disabled={!isFormValid()}>
              <Save className="mr-2 h-4 w-4" />
              Save Question
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* AI Generator */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-purple-400" />
                  AI Question Generator
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Generate a coding question automatically using AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Input
                    placeholder="Enter topic (e.g., arrays, trees, dynamic programming)"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                  <Select>
                    <SelectTrigger className="w-32 bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={generateWithAI}
                    disabled={isGenerating}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabbed Form */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Question Details</CardTitle>
                <CardDescription className="text-slate-400">
                  Fill in the question information using the tabs below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-slate-700">
                    <TabsTrigger value="basic" className="data-[state=active]:bg-purple-600">
                      <FileText className="mr-2 h-4 w-4" />
                      Basic
                    </TabsTrigger>
                    <TabsTrigger value="format" className="data-[state=active]:bg-purple-600">
                      <Settings className="mr-2 h-4 w-4" />
                      Format
                    </TabsTrigger>
                    <TabsTrigger value="examples" className="data-[state=active]:bg-purple-600">
                      <Lightbulb className="mr-2 h-4 w-4" />
                      Examples
                    </TabsTrigger>
                    <TabsTrigger value="tests" className="data-[state=active]:bg-purple-600">
                      <TestTube className="mr-2 h-4 w-4" />
                      Tests
                    </TabsTrigger>
                  </TabsList>

                  {/* Basic Information Tab */}
                  <TabsContent value="basic" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-slate-300">
                          Question Title *
                        </Label>
                        <Input
                          id="title"
                          value={question.title}
                          onChange={(e) => setQuestion((prev) => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g., Two Sum"
                          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="difficulty" className="text-slate-300">
                          Difficulty *
                        </Label>
                        <Select
                          value={question.difficulty}
                          onValueChange={(value) => setQuestion((prev) => ({ ...prev, difficulty: value }))}
                        >
                          <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-slate-300">
                          Description *
                        </Label>
                        <Textarea
                          id="description"
                          value={question.description}
                          onChange={(e) => setQuestion((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe the problem in detail..."
                          rows={8}
                          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Format Tab */}
                  <TabsContent value="format" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="input-format" className="text-slate-300">
                          Input Format
                        </Label>
                        <Textarea
                          id="input-format"
                          value={question.inputFormat}
                          onChange={(e) => setQuestion((prev) => ({ ...prev, inputFormat: e.target.value }))}
                          placeholder="Describe the input format..."
                          rows={4}
                          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="output-format" className="text-slate-300">
                          Output Format
                        </Label>
                        <Textarea
                          id="output-format"
                          value={question.outputFormat}
                          onChange={(e) => setQuestion((prev) => ({ ...prev, outputFormat: e.target.value }))}
                          placeholder="Describe the expected output format..."
                          rows={4}
                          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>

                      {/* Constraints */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-slate-300">Constraints</Label>
                          <Button onClick={addConstraint} size="sm" className="bg-purple-600 hover:bg-purple-700">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        {question.constraints.map((constraint, index) => (
                          <div key={index} className="flex space-x-2">
                            <Input
                              value={constraint}
                              onChange={(e) => updateConstraint(index, e.target.value)}
                              placeholder="e.g., 1 ≤ n ≤ 10⁴"
                              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 font-mono"
                            />
                            {question.constraints.length > 1 && (
                              <Button
                                onClick={() => removeConstraint(index)}
                                size="sm"
                                variant="outline"
                                className="bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Examples Tab */}
                  <TabsContent value="examples" className="space-y-6 mt-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">Sample Examples</h3>
                          <p className="text-slate-400 text-sm">Add examples to help users understand the problem</p>
                        </div>
                        <Button onClick={addExample} size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {question.examples.map((example, index) => (
                        <div key={index} className="space-y-3 p-4 bg-slate-700/30 rounded-lg">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-medium">Example {index + 1}</h4>
                            {question.examples.length > 1 && (
                              <Button
                                onClick={() => removeExample(index)}
                                size="sm"
                                variant="outline"
                                className="bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <Label className="text-slate-300">Input</Label>
                              <Input
                                value={example.input}
                                onChange={(e) => updateExample(index, "input", e.target.value)}
                                placeholder="e.g., nums = [2,7,11,15], target = 9"
                                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 font-mono"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-slate-300">Output</Label>
                              <Input
                                value={example.output}
                                onChange={(e) => updateExample(index, "output", e.target.value)}
                                placeholder="e.g., [0,1]"
                                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 font-mono"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-slate-300">Explanation (Optional)</Label>
                              <Textarea
                                value={example.explanation}
                                onChange={(e) => updateExample(index, "explanation", e.target.value)}
                                placeholder="Explain why this output is correct..."
                                rows={2}
                                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Test Cases Tab */}
                  <TabsContent value="tests" className="space-y-6 mt-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">Hidden Test Cases</h3>
                          <p className="text-slate-400 text-sm">
                            These test cases will validate solutions but won't be visible to users
                          </p>
                        </div>
                        <Button onClick={addTestCase} size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {question.hiddenTestCases.map((testCase, index) => (
                        <div key={index} className="space-y-3 p-4 bg-slate-700/30 rounded-lg">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-medium">Test Case {index + 1}</h4>
                            {question.hiddenTestCases.length > 1 && (
                              <Button
                                onClick={() => removeTestCase(index)}
                                size="sm"
                                variant="outline"
                                className="bg-transparent border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label className="text-slate-300">Input</Label>
                              <Textarea
                                value={testCase.input}
                                onChange={(e) => updateTestCase(index, "input", e.target.value)}
                                placeholder="Test input..."
                                rows={4}
                                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 font-mono"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-slate-300">Expected Output</Label>
                              <Textarea
                                value={testCase.output}
                                onChange={(e) => updateTestCase(index, "output", e.target.value)}
                                placeholder="Expected output..."
                                rows={4}
                                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Form Validation Status */}
                <div className="mt-6 p-3 rounded-lg bg-slate-700/30">
                  <div className="flex items-center space-x-2">
                    {isFormValid() ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span className="text-green-400 font-medium">Question is ready to save</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5 text-yellow-400" />
                        <span className="text-yellow-400 font-medium">
                          Please fill in required fields (marked with *)
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700 sticky top-4">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Eye className="mr-2 h-5 w-5 text-purple-400" />
                    Question Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Title and Difficulty */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">{question.title || "Question Title"}</h2>
                    {question.difficulty && (
                      <Badge className={`${getDifficultyColor(question.difficulty)} text-white`}>
                        {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                      </Badge>
                    )}
                  </div>

                  {/* Description */}
                  {question.description && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                      <p className="text-slate-300 whitespace-pre-line">{question.description}</p>
                    </div>
                  )}

                  {/* Input/Output Format */}
                  {(question.inputFormat || question.outputFormat) && (
                    <>
                      <Separator className="bg-slate-600" />
                      <div className="space-y-3">
                        {question.inputFormat && (
                          <div>
                            <h4 className="text-white font-medium mb-1">Input Format</h4>
                            <p className="text-slate-300 text-sm">{question.inputFormat}</p>
                          </div>
                        )}
                        {question.outputFormat && (
                          <div>
                            <h4 className="text-white font-medium mb-1">Output Format</h4>
                            <p className="text-slate-300 text-sm">{question.outputFormat}</p>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Examples */}
                  {question.examples.some((ex) => ex.input || ex.output) && (
                    <>
                      <Separator className="bg-slate-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Examples</h3>
                        <div className="space-y-4">
                          {question.examples.map(
                            (example, index) =>
                              (example.input || example.output) && (
                                <div key={index} className="bg-slate-700/30 p-3 rounded-lg">
                                  {example.input && (
                                    <div className="mb-2">
                                      <span className="text-slate-400 font-mono text-sm">Input: </span>
                                      <span className="text-white font-mono">{example.input}</span>
                                    </div>
                                  )}
                                  {example.output && (
                                    <div className="mb-2">
                                      <span className="text-slate-400 font-mono text-sm">Output: </span>
                                      <span className="text-white font-mono">{example.output}</span>
                                    </div>
                                  )}
                                  {example.explanation && (
                                    <div>
                                      <span className="text-slate-400 font-mono text-sm">Explanation: </span>
                                      <span className="text-slate-300">{example.explanation}</span>
                                    </div>
                                  )}
                                </div>
                              ),
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Constraints */}
                  {question.constraints.some((c) => c.trim()) && (
                    <>
                      <Separator className="bg-slate-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Constraints</h3>
                        <ul className="space-y-1">
                          {question.constraints.map(
                            (constraint, index) =>
                              constraint.trim() && (
                                <li key={index} className="text-slate-300 font-mono text-sm">
                                  • {constraint}
                                </li>
                              ),
                          )}
                        </ul>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
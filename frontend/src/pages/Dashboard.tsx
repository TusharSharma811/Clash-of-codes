"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, Clock, TrendingUp, Zap, Code, Users, Play, BarChart3, Calendar } from "lucide-react"
import { Link } from "react-router"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const winLossData = [
  { date: "Mon", wins: 3, losses: 1 },
  { date: "Tue", wins: 2, losses: 2 },
  { date: "Wed", wins: 4, losses: 0 },
  { date: "Thu", wins: 1, losses: 3 },
  { date: "Fri", wins: 5, losses: 1 },
  { date: "Sat", wins: 3, losses: 2 },
  { date: "Sun", wins: 2, losses: 1 },
]

const performanceData = [
  { battle: "B1", time: 45, accuracy: 95 },
  { battle: "B2", time: 32, accuracy: 88 },
  { battle: "B3", time: 28, accuracy: 92 },
  { battle: "B4", time: 51, accuracy: 85 },
  { battle: "B5", time: 38, accuracy: 98 },
  { battle: "B6", time: 42, accuracy: 90 },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white font-mono">CodeBattle</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/battle/create">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Play className="mr-2 h-4 w-4" />
                New Battle
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button
                variant="outline"
                className="bg-transparent border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
              >
                <Trophy className="mr-2 h-4 w-4" />
                Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* User Profile Section */}
        <div className="mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="bg-purple-600 text-white text-xl">CW</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h1 className="text-2xl font-bold text-white font-mono">CodeWarrior</h1>
                    <Badge className="bg-purple-600 text-white">
                      <Trophy className="mr-1 h-3 w-3" />
                      Rank #47
                    </Badge>
                  </div>
                  <p className="text-slate-300 mb-4">Full Stack Developer • Member since Jan 2024</p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-slate-300">
                      <span className="text-white font-semibold">2,456</span> Rating
                    </div>
                    <div className="text-slate-300">
                      <span className="text-white font-semibold">89</span> Battles Played
                    </div>
                    <div className="text-slate-300">
                      <span className="text-white font-semibold">67%</span> Win Rate
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-400 mb-1">2,456</div>
                  <div className="text-slate-300 text-sm">Current Rating</div>
                  <Progress value={75} className="w-32 mt-2" />
                  <div className="text-xs text-slate-400 mt-1">Next rank: 2,500</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Battles Played</CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">89</div>
              <p className="text-xs text-slate-400">
                <span className="text-green-400">+12</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Battles Won</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">60</div>
              <p className="text-xs text-slate-400">
                <span className="text-green-400">67%</span> win rate
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Accuracy</CardTitle>
              <Target className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">92%</div>
              <p className="text-xs text-slate-400">
                <span className="text-green-400">+3%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Avg Solve Time</CardTitle>
              <Clock className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">3:42</div>
              <p className="text-xs text-slate-400">
                <span className="text-green-400">-15s</span> improvement
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-purple-400" />
                Win/Loss Trend
              </CardTitle>
              <CardDescription className="text-slate-400">Your performance over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={winLossData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                  />
                  <Line type="monotone" dataKey="wins" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="losses" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-purple-400" />
                Battle Performance
              </CardTitle>
              <CardDescription className="text-slate-400">Time vs Accuracy in recent battles</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="battle" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                  />
                  <Bar dataKey="time" fill="#8B5CF6" />
                  <Bar dataKey="accuracy" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-purple-400" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-slate-700/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Won battle against AlgoMaster</p>
                    <p className="text-slate-400 text-sm">Solved "Two Sum" in 2:34 • 2 hours ago</p>
                  </div>
                  <Badge className="bg-green-600 text-white">+25 pts</Badge>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-slate-700/30">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Lost battle against CodeNinja</p>
                    <p className="text-slate-400 text-sm">Timeout on "Binary Tree" • 5 hours ago</p>
                  </div>
                  <Badge variant="secondary" className="bg-red-600 text-white">
                    -15 pts
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-slate-700/30">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Completed daily challenge</p>
                    <p className="text-slate-400 text-sm">"Array Rotation" solved • Yesterday</p>
                  </div>
                  <Badge className="bg-blue-600 text-white">+10 pts</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="mr-2 h-5 w-5 text-purple-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/battle/create">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Play className="mr-2 h-4 w-4" />
                  Start New Battle
                </Button>
              </Link>
              <Link to="/battle/join">
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Join Random Battle
                </Button>
              </Link>
              <Link to="/add-question">
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-slate-600 text-slate-300 hover:bg-slate-600"
                >
                  <Code className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </Link>
              <Link to="/leaderboard">
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-slate-600 text-slate-300 hover:bg-slate-600"
                >
                  <Trophy className="mr-2 h-4 w-4" />
                  View Leaderboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

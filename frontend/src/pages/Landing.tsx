"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, Eye, Users, Zap, Trophy, Clock, Swords, Terminal } from "lucide-react"
import {Link} from "react-router"

export default function ClashOfCodesHero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(8,145,178,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(14,165,233,0.08),transparent_50%)]" />

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `
            linear-gradient(rgba(6,182,212,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.15) 1px, transparent 1px)
          `,
            backgroundSize: "60px 60px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      {/* Floating Code Battle Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-cyan-400/20 font-mono text-sm animate-float">
          {'function battle() {'}
        </div>
        <div className="absolute top-32 left-16 text-cyan-400/15 font-mono text-xs animate-float-delayed">
          {'  return victory;'}
        </div>
        <div className="absolute top-44 left-12 text-cyan-400/20 font-mono text-sm animate-float">
          {'}'}
        </div>
        
        <div className="absolute top-40 right-20 text-teal-400/20 font-mono text-sm animate-float-delayed">
          {'while(competing) {'}
        </div>
        <div className="absolute top-52 right-24 text-teal-400/15 font-mono text-xs animate-float">
          {'  solve(problem);'}
        </div>
        <div className="absolute top-64 right-20 text-teal-400/20 font-mono text-sm animate-float-delayed">
          {'}'}
        </div>

        <div className="absolute bottom-40 left-20 text-cyan-400/20 font-mono text-sm animate-float">
          {'if (speed > opponent)'}
        </div>
        <div className="absolute bottom-28 left-24 text-cyan-400/15 font-mono text-xs animate-float-delayed">
          {'  rank++;'}
        </div>
        
        <div className="absolute bottom-20 right-10 text-teal-400/20 font-mono text-sm animate-float-delayed">
          {'console.log("Victory!");'}
        </div>
      </div>

      {/* Battle Particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400 rounded-full opacity-60 animate-ping" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-teal-400 rounded-full opacity-40 animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-cyan-300 rounded-full opacity-50 animate-ping delay-500" />
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-teal-300 rounded-full opacity-30 animate-pulse delay-700" />
        <div className="absolute bottom-1/3 right-1/2 w-3 h-3 bg-cyan-500 rounded-full opacity-20 animate-ping delay-300" />
        <div className="absolute top-3/4 left-1/2 w-2 h-2 bg-teal-500 rounded-full opacity-40 animate-pulse delay-900" />
        
        {/* VS Battle Elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-6xl font-bold text-cyan-400/10 animate-pulse">VS</div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 lg:px-6 h-16 flex items-center justify-between backdrop-blur-sm">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="relative">
              <Swords className="h-6 w-6 text-cyan-400" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            </div>
            <span className="text-xl font-bold text-white">Clash of Codes</span>
          </div>
        </Link>
        <nav className="flex items-center space-x-6">
          
          <Link
            to="/signin"
            className="text-gray-300 hover:text-cyan-300 transition-all duration-200 text-sm font-medium relative group cursor-pointer"
          >
            Sign In
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-200 group-hover:w-full cursor-pointer" />
          </Link>
          <Link to="/register">
            <Button className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 cursor-pointer text-white px-4 py-2 text-sm shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:shadow-cyan-500/40">
              Join Battle
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 ">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Live Status Badge */}
              <div className="flex items-center space-x-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1 text-sm font-medium">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
                  24 Live Battles
                </Badge>
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 px-3 py-1 text-sm font-medium">
                  <Users className="w-3 h-3 mr-1" />
                  1,247 Online
                </Badge>
              </div>

              {/* Main Headlines */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                  <span className="relative">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 animate-gradient">
                      Battle Coders.
                    </span>
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400/50 via-teal-400/50 to-cyan-300/50 blur-sm" />
                  </span>
                  <br />
                  <span className="text-white">Solve Fast.</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                    Climb the Leaderboard.
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                  Join live <span className="text-cyan-400 font-semibold">1v1 coding battles</span> and solve real DSA challenges. 
                  <span className="text-teal-400 font-semibold"> Compete. Improve. Win.</span>
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <Button className=" w-full h-12 group bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white px-10 py-4 text-xl font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 relative overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 cursor-pointer" />
                  <Swords className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                  Start a Match
                </Button>
              
              </div>

            </div>

            {/* Right Column - Battle Interface Preview */}
            <div className="relative">
              {/* Battle Interface Mockup */}
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 shadow-2xl">
                {/* Battle Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-full flex items-center justify-center">
                      <Code className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">CodeMaster</div>
                      <div className="text-xs text-gray-400">Rank #23</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">VS</div>
                    <div className="flex items-center justify-center space-x-2">
                      <Clock className="w-4 h-4 text-teal-400" />
                      <span className="text-teal-400 font-mono">02:45</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-white font-semibold">AlgoNinja</div>
                      <div className="text-xs text-gray-400">Rank #31</div>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center">
                      <Terminal className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Problem Preview */}
                <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold">Two Sum Problem</h3>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Easy</Badge>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Given an array of integers nums and an integer target, return indices of the two numbers...
                  </p>
                </div>

                {/* Code Editor Split View */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Player 1 Code */}
                  <div className="bg-slate-900/70 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-cyan-400 font-mono">CodeMaster</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-green-400">Coding...</span>
                      </div>
                    </div>
                    <div className="font-mono text-xs space-y-1">
                      <div className="text-purple-400">def</div>
                      <div className="text-cyan-400 ml-2">twoSum(nums, target):</div>
                      <div className="text-gray-400 ml-4">hash_map = {}</div>
                      <div className="text-gray-400 ml-4">for i, num in enumerate(nums):</div>
                      <div className="w-2 h-4 bg-cyan-400 animate-pulse ml-8" />
                    </div>
                  </div>

                  {/* Player 2 Code */}
                  <div className="bg-slate-900/70 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-teal-400 font-mono">AlgoNinja</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                        <span className="text-xs text-yellow-400">Thinking...</span>
                      </div>
                    </div>
                    <div className="font-mono text-xs space-y-1">
                      <div className="text-blue-400">function</div>
                      <div className="text-teal-400 ml-2\">twoSum(nums, target) 
                      <div className="text-gray-400 ml-4">const map = new Map();</div>
                      <div className="text-gray-400 ml-4\">for (let i = 0; i &lt; nums.length; i++){`{`} </div>
                      <div className="w-2 h-4 bg-teal-400 animate-pulse ml-8" />
                    </div>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-cyan-400">Progress</span>
                      <span className="text-cyan-400">75%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-2 rounded-full w-3/4 animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-teal-400">Progress</span>
                      <span className="text-teal-400">45%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-teal-600 to-teal-400 h-2 rounded-full w-2/5 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Battle Stats */}
              <div className="absolute -top-4 -right-4 bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span className="text-white text-sm font-semibold">+25 XP</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white/5 backdrop-blur-sm border border-teal-500/20 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-teal-400" />
                  <span className="text-white text-sm font-semibold">Speed Bonus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>

   
    </div>
  )
}

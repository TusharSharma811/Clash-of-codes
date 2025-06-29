import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Swords,
  Plus,
  Play,
  Settings,
  Bell,
  Trophy,
  Target,
  Zap,
  ChevronRight,
  Star,
  Users,
  BookOpen,
  Calendar,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";

import { useSocketStore } from "@/Store/socketstore";

import { useUserStore } from "@/Store/userstore";
import { useBattleStore } from "@/Store/usebattlestore";
export default function Home() {
  const { userId, username } = useUserStore();
  const { socket } = useSocketStore.getState();
  const navigate = useNavigate();
  useEffect(() => {
    const { socket } = useSocketStore.getState();
    
    if (!socket) return;
    console.log("Socket in Home:", socket);
    socket.on("startBattle", async ({ roomId, question, players, yourId }) => {
      console.log(
        `Battle started in room ${roomId} with question: ${question.title}`
      );

      const player = players.find((p: any) => p.userId === yourId);
      const opponent = players.find((p: any) => p.userId !== yourId);
       useBattleStore
        .getState()
        .setBattleData({ roomId, question, opponent, player }); // Store in Zustand or context
         navigate(`/playground/${roomId}`); // Redirect to coding page
    });

    return () => {
      socket.off("startBattle");
    };
  }, [socket , navigate]);
  const handleJoinBattle = () => {
    const difficulty = "Medium";

    if (socket && userId && username) {
      console.log(
        `Joining matchmaking for user ${username} with ID ${userId} and difficulty ${difficulty}`
      );
      socket.emit("joinMatchmaking", {
        userId,
        username,
        difficulty,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(8,145,178,0.03),transparent_50%)]" />

      {/* Header */}
      <header className="relative z-10 px-6 py-4 border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Swords className="h-7 w-7 text-cyan-400" />
            <span className="text-xl font-bold text-white">Clash of Codes</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Avatar className="w-9 h-9 border-2 border-cyan-400/30">
              <AvatarFallback className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white text-sm font-semibold">
                CW
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-8 max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, CodeWarrior
          </h1>
          <p className="text-gray-400">Ready to code and compete?</p>
        </div>

        {/* Primary Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Button
            onClick={handleJoinBattle}
            asChild
            className="block w-full text-left p-0 bg-transparent border-none"
          >
            <Card className="bg-gradient-to-br h-full from-cyan-600 to-cyan-700 border-0 cursor-pointer hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Swords className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Quick Battle
                    </h3>
                    <p className="text-cyan-100">Jump into a match instantly</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/60 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Button>
          <Button
            asChild
            className="block w-full text-left p-0 bg-transparent border-none"
          >
            <Card className="bg-white/5 h-full border-slate-700/50 cursor-pointer hover:bg-white/10 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Plus className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Create Room
                    </h3>
                    <p className="text-gray-400">Host a custom battle</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Button>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Practice */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-cyan-400" />
                  Quick Practice
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  View all
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Array Challenges",
                    problems: 12,
                    difficulty: "Easy",
                    color: "green",
                  },
                  {
                    title: "Tree Algorithms",
                    problems: 8,
                    difficulty: "Medium",
                    color: "yellow",
                  },
                  {
                    title: "Dynamic Programming",
                    problems: 6,
                    difficulty: "Hard",
                    color: "red",
                  },
                  {
                    title: "Graph Theory",
                    problems: 10,
                    difficulty: "Medium",
                    color: "yellow",
                  },
                ].map((category, index) => (
                  <Card
                    key={index}
                    className="bg-white/5 border-slate-700/50 hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          className={`text-xs ${
                            category.color === "green"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : category.color === "yellow"
                              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                          }`}
                        >
                          {category.difficulty}
                        </Badge>
                        <BookOpen className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                      </div>
                      <h3 className="font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        {category.problems} problems
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-slate-600 text-gray-300 hover:bg-slate-700/50 bg-transparent"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Matches */}
            <div>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                Recent Matches
              </h2>

              <div className="space-y-3">
                {[
                  {
                    opponent: "AlgoMaster",
                    result: "Won",
                    time: "2h ago",
                    points: "+25",
                  },
                  {
                    opponent: "CodeNinja",
                    result: "Lost",
                    time: "5h ago",
                    points: "-12",
                  },
                  {
                    opponent: "ByteHunter",
                    result: "Won",
                    time: "1d ago",
                    points: "+18",
                  },
                ].map((match, index) => (
                  <Card key={index} className="bg-white/5 border-slate-700/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              match.result === "Won"
                                ? "bg-green-400"
                                : "bg-red-400"
                            }`}
                          />
                          <div>
                            <p className="text-white font-medium">
                              vs {match.opponent}
                            </p>
                            <p className="text-sm text-gray-400">
                              {match.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold ${
                              match.result === "Won"
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {match.result}
                          </p>
                          <p
                            className={`text-sm ${
                              match.points.startsWith("+")
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {match.points}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="bg-white/5 border-slate-700/50">
              <CardContent className="p-6 text-center">
                <Avatar className="w-16 h-16 mx-auto mb-4 border-2 border-cyan-400/50">
                  <AvatarFallback className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white text-lg font-bold">
                    CW
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold text-white mb-1">
                  CodeWarrior
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Level 12 • Rank #47
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-cyan-400">23</div>
                    <div className="text-xs text-gray-400">Wins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-teal-400">67%</div>
                    <div className="text-xs text-gray-400">Win Rate</div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-slate-600 text-gray-300 hover:bg-slate-700/50 bg-transparent"
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>

            {/* Daily Challenge */}
            <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-orange-400" />
                    Daily Challenge
                  </h3>
                  <Star className="w-5 h-5 text-orange-400" />
                </div>
                <p className="text-sm text-orange-200 mb-4">
                  Solve today's challenge to earn bonus XP!
                </p>
                <Button
                  size="sm"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Start Challenge
                </Button>
              </CardContent>
            </Card>

            {/* Active Players */}
            <Card className="bg-white/5 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white">Active Now</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-400">24 online</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {["AlgoMaster", "CodeNinja", "ByteHunter"].map(
                    (player, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-slate-600 text-white text-xs">
                              {player.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-300">
                            {player}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-cyan-400 hover:text-cyan-300 text-xs"
                        >
                          Challenge
                        </Button>
                      </div>
                    )
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 border-slate-600 text-gray-300 hover:bg-slate-700/50 bg-transparent"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Find Players
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

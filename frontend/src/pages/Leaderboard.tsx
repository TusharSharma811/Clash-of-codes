"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Award, Search, Code, Users, TrendingUp, Crown, Star } from "lucide-react"
import {Link} from "react-router"

const globalLeaderboard = [
  {
    rank: 1,
    username: "CodeMaster",
    rating: 2847,
    wins: 156,
    streak: 12,
    country: "US",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 2,
    username: "AlgoNinja",
    rating: 2734,
    wins: 142,
    streak: 8,
    country: "JP",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 3,
    username: "ByteWarrior",
    rating: 2689,
    wins: 138,
    streak: 15,
    country: "DE",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 4,
    username: "DevGuru",
    rating: 2621,
    wins: 129,
    streak: 5,
    country: "IN",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 5,
    username: "ScriptSage",
    rating: 2598,
    wins: 124,
    streak: 9,
    country: "CA",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 6,
    username: "CodeCrusher",
    rating: 2567,
    wins: 118,
    streak: 3,
    country: "UK",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 7,
    username: "AlgoAce",
    rating: 2534,
    wins: 115,
    streak: 7,
    country: "FR",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 8,
    username: "BinaryBeast",
    rating: 2512,
    wins: 112,
    streak: 4,
    country: "AU",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 9,
    username: "LogicLord",
    rating: 2489,
    wins: 108,
    streak: 6,
    country: "BR",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 10,
    username: "DataDragon",
    rating: 2467,
    wins: 105,
    streak: 2,
    country: "KR",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const friendsLeaderboard = [
  {
    rank: 1,
    username: "AlgoFriend",
    rating: 2234,
    wins: 89,
    streak: 4,
    country: "US",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 2,
    username: "CodeBuddy",
    rating: 2156,
    wins: 76,
    streak: 2,
    country: "CA",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 3,
    username: "DevPal",
    rating: 2089,
    wins: 68,
    streak: 7,
    country: "UK",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 4,
    username: "ScriptMate",
    rating: 1987,
    wins: 62,
    streak: 1,
    country: "DE",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 5,
    username: "ByteBro",
    rating: 1923,
    wins: 58,
    streak: 3,
    country: "FR",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [timeFilter, setTimeFilter] = useState("all-time")
  const [activeTab, setActiveTab] = useState("global")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-400" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-slate-400 font-mono">#{rank}</span>
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600"
      case 2:
        return "bg-gradient-to-r from-gray-400 to-gray-600"
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600"
      default:
        return "bg-slate-600"
    }
  }

  const filteredGlobalLeaderboard = globalLeaderboard.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredFriendsLeaderboard = friendsLeaderboard.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/dashboard">
              <Code className="h-8 w-8 text-purple-400" />
            </Link>
            <span className="text-2xl font-bold text-white font-mono">Leaderboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/battle/create">
              <Button className="bg-purple-600 hover:bg-purple-700">Start Battle</Button>
            </Link>
            <Link to="/dashboard">
              <Button
                variant="outline"
                className="bg-transparent border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
              >
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Players</CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12,847</div>
              <p className="text-xs text-slate-400">
                <span className="text-green-400">+234</span> new this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Battles Today</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1,429</div>
              <p className="text-xs text-slate-400">
                <span className="text-green-400">+12%</span> from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Your Rank</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">#47</div>
              <p className="text-xs text-slate-400">
                <span className="text-green-400">+3</span> positions this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search by username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-40 bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="all-time">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 mb-6">
            <TabsTrigger value="global" className="data-[state=active]:bg-purple-600">
              <Trophy className="mr-2 h-4 w-4" />
              Global
            </TabsTrigger>
            <TabsTrigger value="friends" className="data-[state=active]:bg-purple-600">
              <Users className="mr-2 h-4 w-4" />
              Friends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="global">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-yellow-400" />
                  Global Leaderboard
                </CardTitle>
                <CardDescription className="text-slate-400">Top coders from around the world</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredGlobalLeaderboard.map((user, index) => (
                    <div
                      key={user.username}
                      className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                        user.rank <= 3
                          ? "bg-gradient-to-r from-slate-700/50 to-slate-600/50 border border-slate-600"
                          : "bg-slate-700/30 hover:bg-slate-700/50"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12">
                          {user.rank <= 3 ? (
                            <div
                              className={`w-8 h-8 rounded-full ${getRankBadgeColor(user.rank)} flex items-center justify-center`}
                            >
                              {getRankIcon(user.rank)}
                            </div>
                          ) : (
                            <Badge variant="secondary" className="bg-slate-600 text-white">
                              #{user.rank}
                            </Badge>
                          )}
                        </div>
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-purple-600 text-white">
                            {user.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-semibold font-mono">{user.username}</span>
                            <span className="text-xs text-slate-400">{user.country}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-slate-400">
                            <span>{user.wins} wins</span>
                            {user.streak > 0 && (
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 text-yellow-400" />
                                <span>{user.streak} streak</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-purple-400">{user.rating}</div>
                        <div className="text-xs text-slate-400">rating</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="friends">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="mr-2 h-5 w-5 text-blue-400" />
                  Friends Leaderboard
                </CardTitle>
                <CardDescription className="text-slate-400">Compete with your friends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredFriendsLeaderboard.map((user, index) => (
                    <div
                      key={user.username}
                      className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                        user.rank <= 3
                          ? "bg-gradient-to-r from-slate-700/50 to-slate-600/50 border border-slate-600"
                          : "bg-slate-700/30 hover:bg-slate-700/50"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12">
                          {user.rank <= 3 ? (
                            <div
                              className={`w-8 h-8 rounded-full ${getRankBadgeColor(user.rank)} flex items-center justify-center`}
                            >
                              {getRankIcon(user.rank)}
                            </div>
                          ) : (
                            <Badge variant="secondary" className="bg-slate-600 text-white">
                              #{user.rank}
                            </Badge>
                          )}
                        </div>
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-blue-600 text-white">
                            {user.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-semibold font-mono">{user.username}</span>
                            <span className="text-xs text-slate-400">{user.country}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-slate-400">
                            <span>{user.wins} wins</span>
                            {user.streak > 0 && (
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 text-yellow-400" />
                                <span>{user.streak} streak</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-400">{user.rating}</div>
                        <div className="text-xs text-slate-400">rating</div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredFriendsLeaderboard.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-400 mb-2">No friends found</h3>
                    <p className="text-slate-500 mb-4">
                      {searchQuery ? "No friends match your search." : "Add friends to see them on the leaderboard!"}
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700">Find Friends</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

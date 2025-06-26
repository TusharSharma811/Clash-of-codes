import { Button } from "@/components/ui/button"

import { Code, Users,Play } from "lucide-react"
import {Link} from "react-router"


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm ">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white font-mono">CodeBattle</span>
          </div>
          <div className="hidden md:flex items-center space-x-4 ">
            <Link to="/leaderboard">
              <Button variant="ghost" className="text-slate-300 cursor-pointer">
                Leaderboard
              </Button>
            </Link>
            <Link to="/auth">
              <Button
                variant="outline"
                className="bg-transparent border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white cursor-pointer"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-purple-600 hover:bg-purple-700 cursor-pointer">Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 lg:transform lg:translate-y-[20%] ">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold text-white mb-6 font-mono">
              Code. Compete. <span className="text-purple-400">Climb the Ranks.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Challenge developers worldwide in real-time coding battles. Solve problems faster, climb the leaderboard,
              and become the ultimate code warrior.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/battle/create">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-4 cursor-pointer">
                  <Play className="mr-2 h-5 w-5" />
                  Start a Battle
                </Button>
              </Link>
              <Link to="/battle/join">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white text-lg px-8 py-4 cursor-pointer"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Join a Battle
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials */}
     
    </div>
  )
}

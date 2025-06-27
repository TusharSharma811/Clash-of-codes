
import { Link } from "react-router"
import { Code } from "lucide-react"
import { Button } from "@/components/ui/button"



const Navbar = () => {
  return (
    <div>
        <header className="relative z-10 px-4 lg:px-6 h-16 flex items-center justify-between backdrop-blur-sm">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="relative">
              <Code className="h-6 w-6 text-cyan-400" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            </div>
            <span className="text-xl font-bold text-white">CodeBattle</span>
          </div>
        </Link>
        <nav className="flex items-center space-x-6">
        
          <Link
            to="/signin"
            className="text-gray-300 hover:text-cyan-300 transition-all duration-200 text-sm font-medium relative group"
          >
            Sign In
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-200 group-hover:w-full" />
          </Link>
          <Link to="/register">
            <Button className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white px-4 py-2 text-sm shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:shadow-cyan-500/40">
              Register
            </Button>
          </Link>
        </nav>
      </header>

    </div>
  )
}

export default Navbar
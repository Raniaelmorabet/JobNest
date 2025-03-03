import { Link } from "react-router-dom"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">JobNest</h2>
            <p className="text-gray-400 max-w-md">
              Find your dream job or the perfect candidate with our advanced job board platform
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Connect with us</h3>
            <div className="flex space-x-5">
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" strokeWidth={1.5} />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" strokeWidth={1.5} />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" strokeWidth={1.5} />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center pt-8 border-t-[0.5px] border-white/20 ">
          <p className="text-gray-400 text-sm">© 2025 JobNest. All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}


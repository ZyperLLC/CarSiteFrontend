import { Facebook, MessageCircle, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white py-8 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Social Media Icons - Add/remove social links here */}
          <div className="flex space-x-6">
            <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-green-600 hover:text-green-700 transition-colors">
              <MessageCircle className="w-6 h-6" />
            </a>
            <a href="#" className="text-pink-600 hover:text-pink-700 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
          </div>

          {/* Copyright Text - Edit copyright information here */}
          <p className="text-gray-600 text-sm">© 2025 TTRidz. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

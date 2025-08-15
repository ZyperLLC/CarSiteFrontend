import Image from "next/image"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white py-8 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <a href="#" className="transition-transform hover:scale-110">
              <Image
                src="/facebook.png"
                alt="Facebook"
                width={48}
                height={48}
              />
            </a>
            <a href="#" className="transition-transform hover:scale-110">
              <Image
                src="/whatsapp.png"
                alt="WhatsApp"
                width={48}
                height={48}
              />
            </a>
            <a href="#" className="transition-transform hover:scale-110">
              <Image
                src="/instagram.png"
                alt="Instagram"
                width={48}
                height={48}
              />
            </a>
          </div>

          {/* Copyright Text */}
          <p className="text-gray-600 text-sm">
            © {currentYear} TTRidz. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
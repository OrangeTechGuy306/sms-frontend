import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* School Info */}
          <div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="ml-3 text-xl font-bold">Brightfuture Academy</span>
            </div>
            <p className="mt-4 text-sm text-gray-300 max-w-xs">
              A leading educational institution dedicated to nurturing young minds and building future leaders.
            </p>
            <div className="mt-6 flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-gray-400 hover:text-white text-sm">
                  Classes
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="text-gray-400 hover:text-white text-sm">
                  Faculty
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white text-sm">
                  News & Events
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-gray-400 hover:text-white text-sm">
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contact Us</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400 text-sm">123 Education Street, Learning City, 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-400 text-sm">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-400 text-sm">info@brightfuture.edu</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-400 lg:px-8">
          <p>© {new Date().getFullYear()} Brightfuture Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

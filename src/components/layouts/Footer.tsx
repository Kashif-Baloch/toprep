import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";

const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://web.facebook.com/profile.php?id=61585709657675",
    icon: Facebook,
  },
  {
    name: "Twitter",
    href: "https://x.com/HamzaSa19863212",
    icon: Twitter,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/hamza9797/",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/hamza-sarwar-648a48394/",
    icon: Linkedin,
  },

  {
    name: "Email",
    href: "mailto:hamza9797.hs@gmail.com",
    icon: Mail,
  },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-emerald-700  py-12 ">
      <div className="mx-auto container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">TopRep</h3>
            <p className="text-white text-base w-9/12 leading-relaxed">
              Building exceptional experiences with cutting-edge technology and
              innovative solutions.
            </p>
          </div>

          {/* Navigation Links */}
          {/* <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-white hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div> */}

          {/* Social Media Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              Connect With Us
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={index}
                    target="_blank"
                    href={social.href}
                    className="group bg-emerald-600 hover:bg-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5 text-white group-hover:text-emerald-500 transition-colors duration-300" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-white text-sm">
              © {new Date().getFullYear()} TopRep. All rights reserved.
            </span>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-white hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-white hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

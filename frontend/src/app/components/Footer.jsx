import React from 'react';
import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Heart,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    women: [
      { name: 'Sarees', href: '/women/sarees' },
      { name: 'Salwar Suits', href: '/women/salwar-suits' },
      { name: 'Lehengas', href: '/women/lehengas' },
    ],
    men: [
      { name: 'Sherwanis', href: '/men/sherwanis' },
      { name: 'Kurtas', href: '/men/kurtas' },
      { name: 'Suits', href: '/men/suits' },
    ],
    kids: [
      { name: 'Girls Dresses', href: '/kids/girls' },
      { name: 'Boys Wear', href: '/kids/boys' },
      { name: 'Party Wear', href: '/kids/party-wear' },
    ],
    customer: [
      { name: 'My Account', href: '/account' },
      { name: 'Track Order', href: '/track-order' },
      { name: 'Returns', href: '/return-policy' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy', href: '/privacy' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Main Footer Content - Single Row */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          
          {/* Brand Column */}
          <div className="lg:w-1/4">
            <Link href="/" className="inline-block mb-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Khalid Dress
              </div>
              <div className="text-gray-400 text-sm mt-1">Premium Ethnic Wear</div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              Your destination for exquisite ethnic fashion for the entire family.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 bg-gray-800 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* All Sections in One Line */}
          <div className="lg:w-3/4 grid grid-cols-2 md:grid-cols-5 gap-8">
            
            {/* Women's Collection */}
            <div>
              <h3 className="font-bold text-white mb-4 text-sm">Women's</h3>
              <ul className="space-y-2">
                {footerLinks.women.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Men's Collection */}
            <div>
              <h3 className="font-bold text-white mb-4 text-sm">Men's</h3>
              <ul className="space-y-2">
                {footerLinks.men.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kids Collection */}
            <div>
              <h3 className="font-bold text-white mb-4 text-sm">Kids</h3>
              <ul className="space-y-2">
                {footerLinks.kids.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h3 className="font-bold text-white mb-4 text-sm">Support</h3>
              <ul className="space-y-2">
                {footerLinks.customer.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold text-white mb-4 text-sm">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-xs">
              © {currentYear} Khalid Dress. All rights reserved.
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-blue-400 transition-colors">
                Terms
              </Link>
              <Link href="/shipping" className="hover:text-blue-400 transition-colors">
                Shipping
              </Link>
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-xs">
              Made with <Heart className="w-3 h-3 text-rose-500 fill-current" /> in India
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
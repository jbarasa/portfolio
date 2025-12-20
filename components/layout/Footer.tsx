"use client";

import React from "react";
import Link from "next/link";
import { HiMail, HiLocationMarker, HiPhone, HiHeart } from "react-icons/hi";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaReact,
  FaGolang,
  FaWhatsapp,
} from "react-icons/fa6";

// Contact information
const CONTACT_INFO = {
  email: "jbarasa.ke@gmail.com",
  whatsapp: "+254745536182",
  whatsappLink: "https://wa.me/254745536182",
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Bug Fixes", href: "#services" },
    { name: "Feature Development", href: "#services" },
    { name: "Code Reviews", href: "#services" },
    { name: "Documentation", href: "#services" },
  ];

  const quickLinks = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/jbarasa",
      icon: FaGithub,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/jbarasa",
      icon: FaLinkedin,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/jbarasa",
      icon: FaTwitter,
    },
    {
      name: "WhatsApp",
      href: `${CONTACT_INFO.whatsappLink}?text=Hi%20Jbarasa,%20I%20need%20help%20with%20my%20project...`,
      icon: FaWhatsapp,
    },
  ];

  return (
    <footer className="relative bg-linear-to-b from-gray-900 via-gray-900 to-black text-gray-300 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section with CTA */}
        <div className="py-12 border-b border-gray-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2">
                Ready to ship your project?
              </h3>
              <p className="text-gray-400 max-w-md">
                Let&apos;s turn your ideas into reality. Available for freelance
                projects.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                Start a Project
              </a>
              <a
                href={`${CONTACT_INFO.whatsappLink}?text=Hi%20Jbarasa,%20I%20need%20help%20with%20my%20project...`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all duration-300"
              >
                <FaWhatsapp className="mr-2" size={18} />
                WhatsApp Me
              </a>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Jbarasa
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Freelance developer specializing in React and Golang. Building
              fast, scalable solutions for startups and enterprises.
            </p>
            <div className="flex items-center gap-2">
              <FaReact className="text-cyan-400" size={20} />
              <FaGolang className="text-cyan-500" size={24} />
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  <HiMail size={16} className="text-blue-400" />
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`${CONTACT_INFO.whatsappLink}?text=Hi%20Jbarasa,%20I%20need%20help%20with%20my%20project...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  <FaWhatsapp size={16} className="text-green-400" />
                  {CONTACT_INFO.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <HiLocationMarker size={16} className="text-blue-400" />
                Remote / Worldwide
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <HiPhone size={16} className="text-blue-400" />
                Available 9AM - 6PM EAT
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                  aria-label={item.name}
                >
                  <item.icon
                    size={18}
                    className="text-gray-400 group-hover:text-white transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              © {currentYear} Jbarasa. Made with{" "}
              <HiHeart className="text-red-500 animate-pulse" size={14} /> in
              Kenya
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

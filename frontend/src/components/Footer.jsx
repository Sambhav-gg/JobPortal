import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-100 border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row justify-between items-center text-gray-700 min-h-[180px]">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-2xl font-bold text-blue-700">JobHunt</h1>
          <p className="text-sm text-gray-500 mt-2">Empowering your career journey</p>
        </div>

        

        <div className="flex space-x-6">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <Linkedin size={24} />
          </a>
          <a href="mailto:support@jobhunt.com" className="hover:text-blue-600">
            <Mail size={24} />
          </a>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm py-5 bg-blue-100">
        © {new Date().getFullYear()} JobHunt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

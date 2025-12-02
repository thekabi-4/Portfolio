import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Copy,
  Check,
  ArrowUpRight,
  Terminal,
} from "lucide-react";
import { PERSONAL_INFO } from "../constants";

const ModularFooter = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <footer id="contact" className="relative pt-20 pb-10 px-4 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-500 mb-2">
              <Terminal className="w-5 h-5" />
              <span className="font-mono text-sm tracking-wider">
                END_OF_LINE
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Initialize <span className="text-slate-500">Handshake</span>
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-xs font-mono text-slate-500 mb-1">
              SYSTEM_STATUS
            </div>
            <div className="flex items-center gap-2 text-emerald-500 font-mono text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ONLINE_AND_READY
            </div>
          </div>
        </div>

        {/* Modular Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12">
          {/* Transmission Module (Email) */}
          <div className="md:col-span-5 group relative bg-black/40 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 rounded-2xl p-6 overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-5 h-5 text-cyan-500" />
            </div>
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-cyan-500">
                  TRANSMISSION_UPLINK
                </span>
              </div>
              <div>
                <div className="text-slate-400 text-sm mb-1">Email Address</div>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.email, "email")}
                  className="text-xl md:text-2xl font-bold text-white hover:text-cyan-400 transition-colors text-left w-full flex items-center gap-3 group/btn"
                >
                  {PERSONAL_INFO.email}
                  {copied === "email" ? (
                    <Check className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-slate-600 opacity-0 group-hover/btn:opacity-100 transition-all" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Comms Module (Phone) */}
          <div className="md:col-span-4 group relative bg-black/40 border border-white/10 hover:border-violet-500/50 transition-all duration-300 rounded-2xl p-6 overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-5 h-5 text-violet-500" />
            </div>
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-violet-500">
                  SECURE_LINE
                </span>
              </div>
              <div>
                <div className="text-slate-400 text-sm mb-1">Phone Number</div>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.phone, "phone")}
                  className="text-xl md:text-2xl font-bold text-white hover:text-violet-400 transition-colors text-left w-full flex items-center gap-3 group/btn"
                >
                  {PERSONAL_INFO.phone}
                  {copied === "phone" ? (
                    <Check className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-slate-600 opacity-0 group-hover/btn:opacity-100 transition-all" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Socials Module */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <a
              href="https://github.com/thekabi-4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-black/40 border border-white/10 hover:border-white/50 hover:bg-white/5 transition-all rounded-2xl p-4 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Github className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                <span className="font-bold text-slate-400 group-hover:text-white transition-colors">
                  GitHub
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
            </a>
            <a
              href="https://linkedin.com/in/kabilesh-naveenkumar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-black/40 border border-white/10 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all rounded-2xl p-4 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Linkedin className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
                <span className="font-bold text-slate-400 group-hover:text-blue-400 transition-colors">
                  LinkedIn
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
            </a>
          </div>

          {/* Location Module */}
          <div className="md:col-span-12 group relative bg-black/40 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 rounded-2xl p-6 overflow-hidden h-32 flex items-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-6 relative z-10">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <div className="font-mono text-xs text-emerald-500 mb-1">
                  CURRENT_COORDINATES
                </div>
                <div className="text-xl font-bold text-white">
                  {PERSONAL_INFO.address}
                </div>
              </div>
            </div>
            {/* Decorative Map Lines */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <path
                  d="M10,50 Q30,20 50,50 T90,50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M10,30 Q40,60 70,30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800 text-slate-500 text-sm font-mono">
          <p>
            &copy; {new Date().getFullYear()} Kabilesh Naveenkumar. All systems
            nominal.
          </p>
          <p className="flex items-center gap-2 mt-2 md:mt-0">
            <span>DESIGNED_WITH</span>
            <span className="text-red-500">♥</span>
            <span>&_AI_ASSISTANCE</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ModularFooter;

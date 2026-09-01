import React, { useState, useEffect } from 'react';
import { X, Mail, Sparkles, Copy, Check, Send, ArrowRight, User } from 'lucide-react';
import { Student } from '../types';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  person: {
    name: string;
    title: string;
    email: string;
    type: 'Professor' | 'Student';
    context: string;
  } | null;
  currentStudent: Student;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({
  isOpen,
  onClose,
  person,
  currentStudent,
}) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (person) {
      const studentSkills = currentStudent.skills || [];
      if (person.type === 'Professor') {
        setSubject(`Undergraduate Research Inquiry — ${currentStudent.name} (Year ${currentStudent.year}, ${(currentStudent.branch || 'Engineering').split(' ')[0]})`);
        setBody(`Dear ${person.name},

I hope this email finds you well.

My name is ${currentStudent.name}, a Year ${currentStudent.year} undergraduate student in ${currentStudent.branch} (CGPA ${currentStudent.cgpa}). I have been following the cutting-edge work at ${person.title} with immense interest.

${person.context}

Given my hands-on background in ${studentSkills.slice(0, 3).join(', ') || 'Computer Science & AI'}, I would love the opportunity to contribute to your ongoing lab investigations as an undergraduate research assistant. I have dedicated ${currentStudent.availability_hours_per_week || 8} hours per week for research.

I have attached my academic resume and GitHub portfolio for your reference. Would you have 10 minutes available this week or next for a brief meeting during your office hours?

Thank you for your time and mentorship.

Warm regards,
${currentStudent.name}
${currentStudent.email}
LinkedIn: linkedin.com/in/${currentStudent.name.toLowerCase().replace(/\s+/g, '')}`);
      } else {
        setSubject(`Hackathon / Project Collaboration Invitation — ${currentStudent.name}`);
        setBody(`Hi ${person.name},

I came across your profile and outstanding work in ${person.title}. 

${person.context}

I am building a high-synergy team for the upcoming hackathon. My focus is on ${studentSkills.slice(0, 2).join(' & ') || 'Full Stack & AI'}, and your complementary skills would make a championship-caliber team.

Would you be open to connecting over campus coffee or a quick Google Meet this week to discuss project ideas?

Best regards,
${currentStudent.name}
${currentStudent.email}`);
      }
      setIsSent(false);
      setIsCopied(false);
    }
  }, [person, currentStudent]);

  if (!isOpen || !person) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSend = () => {
    setIsSent(true);
    setTimeout(() => {
      onClose();
      setIsSent(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111] border-2 border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080808]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F27D26] flex items-center justify-center shadow-lg">
              <Mail className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-base font-black text-white uppercase tracking-tight">
                GENIE OUTREACH COMPOSER
              </h2>
              <p className="text-[11px] text-white/50 font-medium">
                To: <strong className="text-white">{person.name}</strong> ({person.email})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Composer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs font-bold bg-[#080808]">
          
          <div className="bg-[#111] p-4 rounded-2xl border border-white/10 text-xs space-y-1">
            <div className="font-black uppercase tracking-wider text-[#F27D26] flex items-center gap-1.5 text-[10px]">
              <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
              <span>Personalized Pitch Strategy:</span>
            </div>
            <p className="text-white/80 font-medium text-[11px] leading-relaxed">
              Databricks Genie crafted this draft highlighting your verified {(currentStudent.skills || []).slice(0, 2).join(' & ') || 'technical'} proficiency aligned with {person.name}'s research focus.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-white/60 font-black uppercase text-[10px] tracking-wider">Subject Line:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 bg-[#111] border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#F27D26] font-bold text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-white/60 font-black uppercase text-[10px] tracking-wider">Message Body:</label>
            <textarea
              rows={11}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-3.5 bg-[#111] border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#F27D26] font-mono text-[11px] leading-relaxed shadow-inner"
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#080808] flex items-center justify-between">
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border border-white/10 transition flex items-center gap-2"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white/40" />}
            <span>{isCopied ? 'Copied' : 'Copy Draft'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider text-white/40 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={isSent}
              className="px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider bg-[#F27D26] hover:bg-[#FF3621] text-black shadow-xl transition flex items-center gap-2"
            >
              {isSent ? <Check className="w-3.5 h-3.5 text-black" /> : <Send className="w-3.5 h-3.5 text-black" />}
              <span>{isSent ? 'Message Sent!' : 'Send Message'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

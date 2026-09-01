import React, { useState } from 'react';
import { MapPin, Sparkles, Navigation, Calendar, Building, ExternalLink, Users, ArrowUpRight, Bus, Clock } from 'lucide-react';
import { CampusEvent, Opportunity } from '../types';

interface CityIntelligenceViewProps {
  events: CampusEvent[];
  opportunities: Opportunity[];
  onOpenGenie: (prompt?: string) => void;
}

export const CityIntelligenceView: React.FC<CityIntelligenceViewProps> = ({
  events,
  opportunities,
  onOpenGenie,
}) => {
  const [selectedHub, setSelectedHub] = useState<string>('All');

  const hubs = [
    { name: 'All', count: 8 },
    { name: 'Koramangala & HSR', count: 3, desc: 'Startup capital, early-stage AI incubators & co-working cafes' },
    { name: 'Indiranagar & CBD', count: 2, desc: 'Tech talks, designer meetups & Microsoft Reactor' },
    { name: 'Bellandur & ORR', count: 2, desc: 'Enterprise data giants, Databricks, Cisco, Goldman Sachs' },
    { name: 'Whitefield', count: 1, desc: 'Hardware, IoT labs, International Tech Park Bengaluru' }
  ];

  const cityEvents = [
    {
      id: 'city-1',
      title: 'Bengaluru AI Builders Meetup: Agentic Workflows with Databricks Genie',
      hub: 'Koramangala & HSR',
      venue: 'NASSCOM 10k Startups Hub, Koramangala',
      date: 'March 14, 2025 • 5:00 PM',
      organizer: 'Databricks User Group Bengaluru',
      type: 'Tech Talk & Workshop',
      travelTime: '28 mins from Campus (Purple Line + Auto)',
      studentDiscount: 'Free Student Pass Available (15 seats remaining)'
    },
    {
      id: 'city-2',
      title: 'Bengaluru AI Health Innovators Hackathon 2025',
      hub: 'Koramangala & HSR',
      venue: 'Bangalore Bioinnovation Centre (BBC), Electronic City',
      date: 'April 4-6, 2025 (48 hrs)',
      organizer: 'Karnataka Innovation Tech Society & AI Health Consortium',
      type: 'Major Hackathon',
      travelTime: '35 mins from Campus',
      studentDiscount: 'INR 1,50,000 Grand Prize + Mentorship'
    },
    {
      id: 'city-3',
      title: 'Generative AI & LLM Systems Symposium',
      hub: 'Indiranagar & CBD',
      venue: 'Microsoft Reactor Bengaluru, Lavelle Road',
      date: 'March 22, 2025 • 2:00 PM',
      organizer: 'Bengaluru Open Tech Forum',
      type: 'Conference',
      travelTime: '20 mins via Metro',
      studentDiscount: 'Free RSVP with College ID'
    },
    {
      id: 'city-4',
      title: 'Bengaluru Distributed Data Systems & Lakehouse Summit',
      hub: 'Bellandur & ORR',
      venue: 'Cisco Campus, Outer Ring Road, Bellandur',
      date: 'April 18, 2025 • 9:30 AM',
      organizer: 'Apache Spark & Delta Lake Community',
      type: 'Summit & Hack',
      travelTime: '40 mins via BMTC 500D Bus',
      studentDiscount: 'Free Student Delegate Badge'
    }
  ];

  const filteredEvents = cityEvents.filter(e => {
    if (selectedHub !== 'All' && e.hub !== selectedHub) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-[#111] border-2 border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-[#F27D26] tracking-widest italic mb-1">
              Bengaluru Silicon Valley Map
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase">
              CITY INTELLIGENCE &amp; TECH HUBS
            </h1>
            <p className="text-xs sm:text-sm text-white/60 max-w-2xl font-medium">
              Don't stay locked inside the campus bubble. Discover high-leverage tech meetups, hackathons, and accelerator demo days across India's Silicon Valley.
            </p>
          </div>

          <button
            onClick={() => onOpenGenie("What tech meetups or hackathons are happening in Koramangala or Indiranagar this month?")}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider bg-[#F27D26] hover:bg-[#FF3621] text-black shadow-xl transition flex-shrink-0"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Ask Genie About Events</span>
          </button>
        </div>
      </div>

      {/* Tech Hub Area Filter Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {hubs.map((h) => {
          const isSelected = selectedHub === h.name;
          return (
            <button
              key={h.name}
              onClick={() => setSelectedHub(h.name)}
              className={`p-4 rounded-2xl text-left border-2 transition ${
                isSelected
                  ? 'bg-white/10 text-white border-[#F27D26] shadow-xl'
                  : 'bg-[#111] text-white/50 border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              <div className="text-xs font-black uppercase tracking-wider truncate">{h.name}</div>
              <div className="text-[10px] text-white/40 mt-1 font-bold">{h.count} Events / Hubs</div>
            </button>
          );
        })}
      </div>

      {/* City Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="bg-white/5 hover:bg-white/[0.07] border border-white/10 hover:border-[#F27D26]/50 rounded-3xl p-6 space-y-4 transition shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-3.5">
              
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-[#FF3621]/20 text-[#F27D26] border border-[#FF3621]/40 uppercase tracking-wider">
                  {evt.hub}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/40">
                  {evt.type}
                </span>
              </div>

              <h3 className="text-xl font-black text-white leading-tight tracking-tight">
                {evt.title}
              </h3>

              <div className="space-y-1.5 text-xs text-white/80 font-bold">
                <div className="flex items-center gap-2 text-[#F27D26]">
                  <Calendar className="w-4 h-4 text-[#F27D26]" />
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center gap-2 text-white/60 font-medium">
                  <Building className="w-4 h-4 text-white/40" />
                  <span>{evt.venue}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 font-medium">
                  <Bus className="w-4 h-4 text-[#F27D26]" />
                  <span>Transit: {evt.travelTime}</span>
                </div>
              </div>

              {/* Student benefit */}
              <div className="bg-[#080808] p-3.5 rounded-2xl border border-white/10 text-[11px] text-white/80 font-medium">
                <strong className="text-emerald-400 font-black uppercase text-[10px] tracking-wider block mb-0.5">Student Access: </strong>
                {evt.studentDiscount}
              </div>

            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Host: {evt.organizer}</span>
              <button
                onClick={() => onOpenGenie(`Tell me more about "${evt.title}" and how I can prepare to pitch projects or network with recruiters there.`)}
                className="text-xs font-black uppercase tracking-wider text-[#F27D26] hover:text-[#FF3621] flex items-center gap-1"
              >
                <span>Genie Prep Guide</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

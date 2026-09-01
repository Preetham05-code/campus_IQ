import React from 'react';
import { Play, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { DEMO_BENCHMARK_PROMPTS } from '../data/mockLakehouse';

interface DemoFlowBarProps {
  onRunDemoPrompt: (prompt: string, stepId?: string) => void;
  onOpenTeamBuilderTab?: () => void;
  onOpenWhatIfTab?: () => void;
}

export const DemoFlowBar: React.FC<DemoFlowBarProps> = ({
  onRunDemoPrompt,
  onOpenTeamBuilderTab,
  onOpenWhatIfTab,
}) => {
  return (
    <div className="bg-[#111] border-b border-white/10 py-2.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        
        {/* Banner Label */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#FF3621] to-[#F27D26] flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-black fill-black" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-white">
              Judges Demo Flow
            </span>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest hidden sm:inline ml-2">
              1-Click Genie Prompts:
            </span>
          </div>
        </div>

        {/* Demo Action Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
          {DEMO_BENCHMARK_PROMPTS.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => {
                if (step.id === 'demo-step-6' && onOpenTeamBuilderTab) {
                  onOpenTeamBuilderTab();
                } else if (step.id === 'demo-step-5' && onOpenWhatIfTab) {
                  onOpenWhatIfTab();
                } else {
                  onRunDemoPrompt(step.prompt, step.id);
                }
              }}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/5 hover:bg-[#F27D26] text-white hover:text-black border border-white/10 hover:border-[#F27D26] transition whitespace-nowrap shadow-sm"
              title={step.prompt}
            >
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/10 group-hover:bg-black/20 text-[9px] font-black text-[#F27D26] group-hover:text-black">
                {idx + 1}
              </span>
              <span>{step.badge}</span>
              <Play className="w-2.5 h-2.5 text-[#F27D26] group-hover:text-black opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};


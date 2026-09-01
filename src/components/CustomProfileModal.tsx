import React, { useState } from 'react';
import { X, User, Sparkles, Check, Plus, Trash2 } from 'lucide-react';
import { Student } from '../types';

interface CustomProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStudent: Student;
  onSaveProfile: (newStudent: Student) => void;
}

export const CustomProfileModal: React.FC<CustomProfileModalProps> = ({
  isOpen,
  onClose,
  currentStudent,
  onSaveProfile,
}) => {
  const [name, setName] = useState(currentStudent.name);
  const [branch, setBranch] = useState(currentStudent.branch);
  const [year, setYear] = useState(currentStudent.year);
  const [cgpa, setCgpa] = useState(currentStudent.cgpa);
  const [careerGoal, setCareerGoal] = useState(currentStudent.career_goal);
  const [hours, setHours] = useState(currentStudent.availability_hours_per_week);
  const [skills, setSkills] = useState<string[]>(currentStudent.skills);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [bio, setBio] = useState(currentStudent.bio);

  if (!isOpen) return null;

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Student = {
      ...currentStudent,
      name,
      branch,
      year: Number(year),
      cgpa: Number(cgpa),
      career_goal: careerGoal,
      availability_hours_per_week: Number(hours),
      skills,
      bio,
    };
    onSaveProfile(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111] border-2 border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080808]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F27D26] flex items-center justify-center shadow-lg">
              <User className="w-5 h-5 text-black" />
            </div>
            <h2 className="text-base font-black text-white uppercase tracking-tight">
              CUSTOMIZE STUDENT PROFILE
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-5 text-xs font-bold bg-[#080808]">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-white/60 font-black uppercase text-[10px] tracking-wider">Student Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-[#111] border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#F27D26] font-bold text-xs"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/60 font-black uppercase text-[10px] tracking-wider">Department / Major:</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full p-3 bg-[#111] border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#F27D26] font-bold text-xs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-white/60 font-black uppercase text-[10px] tracking-wider">Academic Year:</label>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full p-3 bg-[#111] border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#F27D26] font-bold text-xs"
              >
                <option value={1} className="bg-[#111] text-white">Year 1</option>
                <option value={2} className="bg-[#111] text-white">Year 2</option>
                <option value={3} className="bg-[#111] text-white">Year 3</option>
                <option value={4} className="bg-[#111] text-white">Year 4</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-white/60 font-black uppercase text-[10px] tracking-wider">CGPA:</label>
              <input
                type="number"
                step="0.01"
                min="5"
                max="10"
                value={cgpa}
                onChange={(e) => setCgpa(Number(e.target.value))}
                className="w-full p-3 bg-[#111] border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#F27D26] font-bold text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/60 font-black uppercase text-[10px] tracking-wider">Weekly Hours:</label>
              <input
                type="number"
                min="1"
                max="40"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full p-3 bg-[#111] border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#F27D26] font-bold text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-white/60 font-black uppercase text-[10px] tracking-wider">Target Career Goal:</label>
            <input
              type="text"
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              className="w-full p-3 bg-[#111] border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#F27D26] font-bold text-xs"
            />
          </div>

          {/* Skills Management */}
          <div className="space-y-2 pt-3 border-t border-white/10">
            <label className="text-white/60 font-black uppercase text-[10px] tracking-wider">Verified Skills:</label>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-white/10 text-white border border-[#F27D26] text-xs font-black uppercase tracking-wider flex items-center gap-2"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-[#F27D26] hover:text-[#FF3621]"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                placeholder="Add skill (e.g., PyTorch, ROS, React, Docker)..."
                className="flex-1 p-3 bg-[#111] border border-white/10 rounded-2xl text-white text-xs font-bold focus:outline-none focus:border-[#F27D26]"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-wider text-xs flex items-center gap-1.5 border border-white/10"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-white/10">
            <label className="text-white/60 font-black uppercase text-[10px] tracking-wider">Student Bio / Context:</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 bg-[#111] border border-white/10 rounded-2xl text-white focus:outline-none focus:border-[#F27D26] font-medium text-xs"
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider text-white/40 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider bg-[#F27D26] hover:bg-[#FF3621] text-black shadow-xl transition flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Save &amp; Re-run Lakehouse Matching</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

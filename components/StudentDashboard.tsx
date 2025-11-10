'use client';

import React from 'react';

interface Skill {
  name: string;
  value: number;
}

interface PersonalityTrait {
  name: string;
  value: number;
}

interface StudentDashboardProps {
  student: {
    id: string;
    name: string;
    actualCareer: string;
    gpa: number;
    personality: {
      mbti: string;
      traits: {
        analytical: number;
        creative: number;
        teamwork: number;
        leadership: number;
        technical: number;
      };
    };
    skills: {
      programming: number;
      problemSolving: number;
      communication: number;
      systemDesign: number;
      dataAnalysis: number;
    };
    interests: string[];
  };
  hotCareers: Array<{
    id: string;
    title: string;
    description: string;
    overview: {
      salary_range: string;
      job_growth: string;
      difficulty: string;
      time_to_proficiency: string;
    };
  }>;
  currentRoadmap?: {
    title: string;
    description: string;
    roadmap: {
      beginner?: { title: string; duration: string; goals: string[] };
      intermediate?: { title: string; duration: string; goals: string[] };
      advanced?: { title: string; duration: string; goals: string[] };
      expert?: { title: string; duration: string; goals: string[] };
    };
  };
}

// biểu đồ kỹ năng 
function SkillsChart({ skills }: { skills: Record<string, number> }) {
  const skillsArray = Object.entries(skills).map(([name, value]) => ({
    name: name.replace(/([A-Z])/g, ' $1').trim(),
    value,
  }));

  return (
    <div className="space-y-4">
      {skillsArray.map((skill) => (
        <div key={skill.name}>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700 capitalize">
              {skill.name}
            </span>
            <span className="text-sm text-gray-600">{skill.value}/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(skill.value / 10) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// biểu đồ tính cách 
function PersonalityRadar({ traits }: { traits: Record<string, number> }) {
  const traitsArray = Object.entries(traits).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const size = 200;
  const center = size / 2;
  const maxRadius = 80;
  const levels = 5;

  // Tính toán điểm cho polygon
  const angleStep = (2 * Math.PI) / traitsArray.length;
  const points = traitsArray.map((trait, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const radius = (trait.value / 10) * maxRadius;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Tính toán điểm cho các đường lưới
  const gridPoints = Array.from({ length: levels }, (_, levelIndex) => {
    const radius = ((levelIndex + 1) / levels) * maxRadius;
    return traitsArray.map((_, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  });

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="mb-4">
        {/* Grid levels */}
        {gridPoints.map((gridPoint, index) => (
          <polygon
            key={index}
            points={gridPoint}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        {traitsArray.map((_, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const x = center + maxRadius * Math.cos(angle);
          const y = center + maxRadius * Math.sin(angle);
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          points={points}
          fill="rgba(59, 130, 246, 0.2)"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        {/* Data points */}
        {traitsArray.map((trait, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const radius = (trait.value / 10) * maxRadius;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill="#3b82f6"
            />
          );
        })}
      </svg>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        {traitsArray.map((trait) => (
          <div key={trait.name} className="flex justify-between items-center">
            <span className="text-gray-700">{trait.name}:</span>
            <span className="font-semibold text-blue-600 ml-2">{trait.value}/10</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StudentDashboard({ student, hotCareers, currentRoadmap }: StudentDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{student.name}</h2>
            <p className="text-gray-600 mt-1">ID: {student.id}</p>
            <div className="flex gap-3 mt-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {student.personality.mbti}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {student.actualCareer}
              </span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">GPA</div>
            <div className="text-5xl font-bold text-blue-600">{student.gpa.toFixed(1)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Biểu đồ kỹ năng */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2"></span>
            Kỹ Năng
          </h3>
          <SkillsChart skills={student.skills} />
        </div>

        {/* Biểu đồ tính cách */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2"></span>
            Tính Cách ({student.personality.mbti})
          </h3>
          <PersonalityRadar traits={student.personality.traits} />
        </div>
      </div>

      {/* Sở thích */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2"></span>
          Sở Thích
        </h3>
        <div className="flex flex-wrap gap-2">
          {student.interests.map((interest) => (
            <span
              key={interest}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Nghề nghiệp hot và Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Danh sách nghề nghiệp hot */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2"></span>
            Nghề Nghiệp Hot
          </h3>
          <div className="space-y-4">
            {hotCareers.slice(0, 5).map((career) => (
              <div key={career.id} className="border-l-4 border-orange-500 pl-3 py-2">
                <h4 className="font-semibold text-gray-900">{career.title}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {career.overview.salary_range}
                </p>
                <p className="text-sm text-gray-600">
                  {career.overview.job_growth}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap đang theo đuổi */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2"></span>
            Roadmap Đang Theo Đuổi
          </h3>
          {currentRoadmap ? (
            <div>
              <h4 className="text-lg font-semibold text-blue-600 mb-2">
                {currentRoadmap.title}
              </h4>
              <p className="text-gray-600 mb-4">{currentRoadmap.description}</p>
              
              <div className="space-y-4">
                {Object.entries(currentRoadmap.roadmap).map(([level, phase]: [string, any]) => (
                  <div key={level} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-gray-900 capitalize">
                        {phase.title}
                      </h5>
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {phase.duration}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {phase.goals.slice(0, 3).map((goal: string, idx: number) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                          <span className="mr-2">•</span>
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Chưa có roadmap cho nghề nghiệp này.</p>
          )}
        </div>
      </div>
    </div>
  );
}

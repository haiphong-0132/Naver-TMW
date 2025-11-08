interface StudentProfile {
  id: string;
  name: string;
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
  actualCareer?: string; 
}

const mbtiTypes = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP', 
  'INFJ', 'INFP', 'ENFJ', 'ENFP', 
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 
  'ISTP', 'ISFP', 'ESTP', 'ESFP'   
];

const interests = [
  'coding', 'design', 'data-science', 'automation', 
  'hardware', 'mobile-apps', 'web-development', 'cloud',
  'ai-ml', 'security', 'iot', 'robotics'
];

const firstNames = [
  'Minh', 'Linh', 'Anh', 'Huy', 'Tuan', 'Duc', 'Long', 'Nam',
  'Phuong', 'Thao', 'Nhi', 'Trang', 'Quynh', 'Huong', 'Mai', 'Lan'
];

const lastNames = [
  'Nguyen', 'Tran', 'Le', 'Pham', 'Hoang', 'Phan', 'Vu', 'Dang', 'Bui', 'Do'
];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals: number = 1): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomSample<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateCareerProfile(career: string): Partial<StudentProfile> {
  const profiles: Record<string, Partial<StudentProfile>> = {
    'Backend Developer': {
      gpa: randomFloat(2.8, 3.8),
      personality: {
        mbti: randomChoice(['INTJ', 'INTP', 'ISTJ', 'ENTJ']),
        traits: {
          analytical: randomInt(7, 10),
          creative: randomInt(4, 7),
          teamwork: randomInt(5, 8),
          leadership: randomInt(4, 7),
          technical: randomInt(7, 10),
        },
      },
      skills: {
        programming: randomInt(7, 10),
        problemSolving: randomInt(7, 10),
        communication: randomInt(5, 8),
        systemDesign: randomInt(6, 9),
        dataAnalysis: randomInt(5, 8),
      },
      interests: randomSample(['coding', 'data-science', 'automation', 'cloud', 'web-development'], randomInt(2, 4)),
    },
    'Frontend Developer': {
      gpa: randomFloat(2.7, 3.7),
      personality: {
        mbti: randomChoice(['ENFP', 'INFP', 'ENTP', 'INTP']),
        traits: {
          analytical: randomInt(5, 8),
          creative: randomInt(7, 10),
          teamwork: randomInt(6, 9),
          leadership: randomInt(5, 8),
          technical: randomInt(6, 9),
        },
      },
      skills: {
        programming: randomInt(6, 9),
        problemSolving: randomInt(6, 9),
        communication: randomInt(6, 9),
        systemDesign: randomInt(5, 8),
        dataAnalysis: randomInt(4, 7),
      },
      interests: randomSample(['design', 'web-development', 'mobile-apps', 'coding'], randomInt(2, 4)),
    },
    'DevOps Engineer': {
      gpa: randomFloat(2.9, 3.8),
      personality: {
        mbti: randomChoice(['ISTJ', 'INTJ', 'ESTJ', 'ENTJ']),
        traits: {
          analytical: randomInt(7, 10),
          creative: randomInt(5, 7),
          teamwork: randomInt(7, 9),
          leadership: randomInt(6, 9),
          technical: randomInt(8, 10),
        },
      },
      skills: {
        programming: randomInt(6, 9),
        problemSolving: randomInt(7, 10),
        communication: randomInt(6, 9),
        systemDesign: randomInt(7, 10),
        dataAnalysis: randomInt(6, 8),
      },
      interests: randomSample(['automation', 'cloud', 'coding', 'security'], randomInt(2, 4)),
    },
    'AI Engineer': {
      gpa: randomFloat(3.2, 4.0),
      personality: {
        mbti: randomChoice(['INTJ', 'INTP', 'ENTJ', 'ENTP']),
        traits: {
          analytical: randomInt(8, 10),
          creative: randomInt(7, 10),
          teamwork: randomInt(5, 8),
          leadership: randomInt(5, 8),
          technical: randomInt(8, 10),
        },
      },
      skills: {
        programming: randomInt(7, 10),
        problemSolving: randomInt(8, 10),
        communication: randomInt(5, 8),
        systemDesign: randomInt(6, 9),
        dataAnalysis: randomInt(8, 10),
      },
      interests: randomSample(['ai-ml', 'data-science', 'coding', 'automation'], randomInt(2, 4)),
    },
    'IoT Engineer': {
      gpa: randomFloat(2.9, 3.7),
      personality: {
        mbti: randomChoice(['ISTP', 'INTP', 'ESTP', 'ENTP']),
        traits: {
          analytical: randomInt(7, 9),
          creative: randomInt(6, 9),
          teamwork: randomInt(6, 8),
          leadership: randomInt(5, 7),
          technical: randomInt(8, 10),
        },
      },
      skills: {
        programming: randomInt(7, 9),
        problemSolving: randomInt(7, 10),
        communication: randomInt(5, 8),
        systemDesign: randomInt(7, 9),
        dataAnalysis: randomInt(6, 8),
      },
      interests: randomSample(['iot', 'hardware', 'robotics', 'coding', 'automation'], randomInt(2, 4)),
    },
  };

  return profiles[career] || {};
}

function generateStudents(count: number): StudentProfile[] {
  const careers = [
    'Backend Developer',
    'Frontend Developer',
    'DevOps Engineer',
    'AI Engineer',
    'IoT Engineer',
  ];

  const students: StudentProfile[] = [];

  for (let i = 0; i < count; i++) {
    const career = careers[i % careers.length]; 
    const profile = generateCareerProfile(career);

    const student: StudentProfile = {
      id: `STU${String(i + 1).padStart(3, '0')}`,
      name: `${randomChoice(lastNames)} ${randomChoice(firstNames)}`,
      actualCareer: career,
      ...profile,
    } as StudentProfile;

    students.push(student);
  }

  return students;
}

const students = generateStudents(100);

console.log(JSON.stringify(students, null, 2));
console.log(`\nGenerated ${students.length} student profiles`);

const careerCounts = students.reduce((acc, s) => {
  acc[s.actualCareer!] = (acc[s.actualCareer!] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

console.log('\nDistribution:');
Object.entries(careerCounts).forEach(([career, count]) => {
  console.log(`  ${career}: ${count} students`);
});

import * as fs from 'fs';
import * as path from 'path';

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const outputPath = path.join(dataDir, 'students.json');
fs.writeFileSync(outputPath, JSON.stringify(students, null, 2));
console.log(`\nSaved to: ${outputPath}`);

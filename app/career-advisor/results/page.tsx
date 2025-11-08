"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateCareerAdvice } from "./actions";


interface CareerMatch {
  career: string;
  matchScore: number;
  reasons: string[];
  challenges: string[];
}

export default function ResultsPage() {
  const router = useRouter();
  const [profileData, setProfileData] = useState<any>(null);
  const [predictions, setPredictions] = useState<CareerMatch[]>([]);
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const storedProfile = sessionStorage.getItem('profileData');
    const storedPredictions = sessionStorage.getItem('predictions');

    if (!storedProfile || !storedPredictions) {
      router.push('/career-advisor');
      return;
    }

    const profile = JSON.parse(storedProfile);
    const preds = JSON.parse(storedPredictions);

    setProfileData(profile);
    setPredictions(preds);

    generateCareerAdvice(profile, preds).then(result => {
      if (result.success && result.advice) {
        setAiAdvice(result.advice);
      } else {
        setError(result.error || 'Không thể tạo lời khuyên');
      }
      setIsLoading(false);
    });
  }, [router]);

  const handleSelectCareer = (career: string) => {
    sessionStorage.setItem('selectedCareer', career);
    router.push(`/career-advisor/roadmap?career=${encodeURIComponent(career)}`);
  };

  if (!profileData) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Kết Quả Phân Tích Nghề Nghiệp
          </h1>
          <p className="text-gray-600">
            Xin chào <span className="font-semibold">{profileData.name}</span>! 
            Đây là các nghề nghiệp phù hợp nhất với bạn.
          </p>
        </div>

        {/* Predictions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {predictions.slice(0, 3).map((prediction, idx) => (
            <div
              key={prediction.career}
              className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow cursor-pointer border-2 ${
                idx === 0 ? 'border-yellow-400 ring-2 ring-yellow-200' : 'border-transparent'
              }`}
              onClick={() => handleSelectCareer(prediction.career)}
            >
              {idx === 0 && (
                <div className="text-yellow-500 text-sm font-semibold mb-2">
                  PHÙ HỢP NHẤT
                </div>
              )}
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {prediction.career}
              </h3>

              {/* Match Score */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Độ phù hợp</span>
                  <span className="font-semibold text-indigo-600">
                    {(prediction.matchScore * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all"
                    style={{ width: `${prediction.matchScore * 100}%` }}
                  />
                </div>
              </div>

              {/* Reasons */}
              <div className="mb-3">
                <p className="text-sm font-semibold text-green-700 mb-1">Lý do phù hợp:</p>
                <ul className="text-xs text-gray-700 space-y-1">
                  {prediction.reasons.slice(0, 2).map((reason, i) => (
                    <li key={i}>• {reason}</li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              {prediction.challenges.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-orange-700 mb-1">Lưu ý:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    {prediction.challenges.slice(0, 1).map((challenge, i) => (
                      <li key={i}>• {challenge}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold">
                Xem Roadmap Chi Tiết →
              </button>
            </div>
          ))}
        </div>

        {/* AI Advice from ClovaX */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl"></span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Tư Vấn Từ AI Advisor
              </h2>
              <p className="text-sm text-gray-500">Powered by Naver ClovaX</p>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <span className="ml-4 text-gray-600">Đang phân tích với ClovaX AI...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{error}</p>
              <p className="text-sm text-red-600 mt-2">
                Bạn vẫn có thể xem dự đoán và roadmap bên trên.
              </p>
            </div>
          ) : (
            <div className="prose max-w-none whitespace-pre-wrap text-gray-700 leading-relaxed">
              {aiAdvice}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => router.push('/career-advisor')}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            ← Quay lại
          </button>
          <button
            onClick={() => handleSelectCareer(predictions[0].career)}
            className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Xem Roadmap cho {predictions[0].career} →
          </button>
        </div>
      </div>
    </div>
  );
}

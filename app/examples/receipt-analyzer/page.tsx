"use client";

import { useState } from "react";
import { analyzeReceipt } from "./actions";
import Link from "next/link";
import Image from "next/image";

export default function ReceiptAnalyzerPage() {
  const [selectedImage, setSelectedImage] = useState<string>("/receipt.jpg");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setAnalysis(""); // Clear previous analysis
    }
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let imageData: string;

      if (imageFile) {
        // Convert file to base64
        const reader = new FileReader();
        imageData = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(imageFile);
        });
      } else {
        // Use default receipt.jpg - convert to base64
        const response = await fetch("/receipt.jpg");
        const blob = await response.blob();
        const reader = new FileReader();
        imageData = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      }

      const result = await analyzeReceipt(imageData);

      if (result.error) {
        setError(result.error);
      } else {
        setAnalysis(result.analysis);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Examples
            </Link>
            <h1 className="text-2xl font-bold text-black">Receipt Analyzer</h1>
          </div>
        </div>
      </header>

      {/* Description */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h2 className="text-lg font-semibold mb-2 text-black">
            ClovaX Vision with Image Analysis
          </h2>
          <p className="text-black mb-4">
            This example demonstrates ClovaX's vision capabilities (HCX-005
            model) to analyze receipt images. Upload your own receipt or use
            the default example to extract information like items, prices, and
            totals.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              Try it:
            </p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use the default receipt image to see the analysis</li>
              <li>• Upload your own receipt image (PNG, JPG, WEBP)</li>
              <li>• Click "Analyze Receipt" to extract information</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-xl font-semibold mb-4 text-black">Receipt Image</h3>

              {/* Image Preview */}
              <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4">
                {selectedImage && (
                  <Image
                    src={selectedImage}
                    alt="Receipt"
                    fill
                    className="object-contain"
                  />
                )}
              </div>

              {/* Upload Button */}
              <div className="space-y-3">
                <label className="block">
                  <span className="sr-only">Choose receipt image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-black
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-medium
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100
                      cursor-pointer"
                  />
                </label>

                <button
                  onClick={handleAnalyze}
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isLoading ? "Analyzing..." : "Analyze Receipt"}
                </button>
              </div>
            </div>
          </div>

          {/* Analysis Results Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-xl font-semibold mb-4 text-black">Analysis Results</h3>

              {!analysis && !error && !isLoading && (
                <p className="text-gray-600 italic">
                  Click "Analyze Receipt" to see the results here.
                </p>
              )}

              {isLoading && (
                <div className="flex items-center space-x-2 text-black">
                  <div className="animate-pulse">Analyzing receipt...</div>
                </div>
              )}

              {error && (
                <div className="bg-red-100 text-red-700 rounded-lg p-4">
                  <div className="text-xs font-semibold mb-1">Error</div>
                  <div className="text-sm">{error}</div>
                </div>
              )}

              {analysis && (
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-black">{analysis}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

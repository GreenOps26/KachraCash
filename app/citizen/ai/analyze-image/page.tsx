'use client';

import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Upload, Search, Loader2, Image as ImageIcon } from 'lucide-react';
import * as motion from 'motion/react-client';
import Markdown from 'react-markdown';

export default function AnalyzeImagePage() {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        setMimeType(file.type);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image || !mimeType) return;

    setLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      const base64Data = image.split(',')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: 'Analyze this image of scrap. What materials do you see? Estimate the rough weight or quantity. Is it recyclable? What category does it belong to (Plastic, Paper, Metal, E-Waste, Mixed)? Please provide a concise summary.',
            },
          ],
        },
      });

      if (response.text) {
        setAnalysis(response.text);
      } else {
        setError('Failed to analyze image. Please try again.');
      }
    } catch (err: any) {
      console.error('Error analyzing image:', err);
      setError(err.message || 'An error occurred while analyzing the image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#1F2937] mb-2 flex items-center gap-3">
          <ImageIcon className="w-8 h-8 text-orange-500" />
          AI Scrap Analyzer
        </h1>
        <p className="text-[#1F2937]/70">Upload a photo of your scrap to get an instant AI analysis of its contents and category.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
            <h2 className="text-xl font-bold text-[#1F2937] mb-4">1. Upload Photo</h2>
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 text-gray-400 mb-3" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG or WEBP</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
          </div>

          {image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm"
            >
              <h2 className="text-xl font-bold text-[#1F2937] mb-4">2. Analyze</h2>
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold btn-hover-effect flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Analyze Scrap
                  </>
                )}
              </button>
              {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm min-h-[400px] flex flex-col">
            <h2 className="text-xl font-bold text-[#1F2937] mb-4">Image Preview</h2>
            <div className="flex-1 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center relative">
              {image ? (
                <img src={image} alt="Preview" className="w-full h-full object-contain" />
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                  <p>No image uploaded</p>
                </div>
              )}
            </div>
          </div>

          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm"
            >
              <h2 className="text-xl font-bold text-[#1F2937] mb-4">AI Analysis Result</h2>
              <div className="prose prose-sm max-w-none text-[#1F2937]/80">
                <Markdown>{analysis}</Markdown>
              </div>
              <button className="mt-6 w-full py-3 rounded-xl bg-[#1F2937] text-white font-bold btn-hover-effect">
                Use Details for Listing
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

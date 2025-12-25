'use client';

import { useState } from 'react';
import { Send, FileText, Loader2 } from 'lucide-react';

const VIOLATION_TYPES = [
  'IP Infringement',
  'Counterfeit',
  'Trademark Violation',
  'Inauthentic Product',
  'Product Safety',
  'Restricted Product',
  'Seller Code of Conduct',
  'Product Condition Complaints',
  'Multiple Policy Violations',
  'Other',
];

export default function Dashboard() {
  const [formData, setFormData] = useState({
    sellerName: '',
    asin: '',
    violationType: '',
    rootCause: '',
    marketplace: 'SA',
  });

  const [generatedPOA, setGeneratedPOA] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setGeneratedPOA('');
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-appeal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate POA');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No reader available');
      }

      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        accumulatedText += chunk;
        setGeneratedPOA(accumulatedText);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPOA);
    alert('POA copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            AMZ-Resurrect AI
          </h1>
          <p className="text-slate-600">
            AI-Powered Amazon Account Reinstatement for SA/UAE
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              Appeal Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Seller/Store Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.sellerName}
                  onChange={(e) =>
                    setFormData({ ...formData, sellerName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="e.g., Premium Electronics Store"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  ASIN (Product ID)
                </label>
                <input
                  type="text"
                  required
                  value={formData.asin}
                  onChange={(e) =>
                    setFormData({ ...formData, asin: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="e.g., B08N5WRWNW"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Marketplace
                </label>
                <select
                  value={formData.marketplace}
                  onChange={(e) =>
                    setFormData({ ...formData, marketplace: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                >
                  <option value="SA">Saudi Arabia (amazon.sa)</option>
                  <option value="AE">UAE (amazon.ae)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Violation Type
                </label>
                <select
                  required
                  value={formData.violationType}
                  onChange={(e) =>
                    setFormData({ ...formData, violationType: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                >
                  <option value="">Select violation type</option>
                  {VIOLATION_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Your Story (Root Cause)
                </label>
                <textarea
                  required
                  value={formData.rootCause}
                  onChange={(e) =>
                    setFormData({ ...formData, rootCause: e.target.value })
                  }
                  rows={8}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Explain what happened, why it happened, and any context Amazon needs to know. Be specific: include dates, supplier names, invoice numbers, and what went wrong in your process."
                />
                <p className="text-sm text-slate-500 mt-2">
                  Be detailed and honest. The AI will transform this into a professional POA.
                </p>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-4 rounded-lg transition flex items-center justify-center gap-2 shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating POA...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Generate Plan of Action
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Generated POA
              </h2>
              {generatedPOA && (
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition"
                >
                  Copy to Clipboard
                </button>
              )}
            </div>

            <div className="min-h-[600px] border-2 border-slate-200 rounded-lg p-6 bg-slate-50">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <strong>Error:</strong> {error}
                </div>
              )}

              {isGenerating && !generatedPOA && (
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                  <Loader2 className="w-12 h-12 animate-spin mb-4" />
                  <p>AI is analyzing your case...</p>
                </div>
              )}

              {!isGenerating && !generatedPOA && !error && (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <FileText className="w-16 h-16 mb-4" />
                  <p className="text-center">
                    Fill in the form and click "Generate Plan of Action"
                    <br />
                    to see your professional POA here.
                  </p>
                </div>
              )}

              {generatedPOA && (
                <div className="prose prose-slate max-w-none">
                  <div
                    className="whitespace-pre-wrap text-slate-800 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: generatedPOA
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br/>')
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Upload, Plus, Loader2 } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function PostScrapPage() {
  const [image, setImage] = useState<string | null>(null);
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Scrap listed successfully!');
      // Reset form
      setImage(null);
      setCategory('');
      setQuantity('');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#1F2937] mb-2">Post New Scrap</h1>
        <p className="text-[#1F2937]/70">List your scrap in 3 simple steps to start receiving bids.</p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm space-y-8"
      >
        {/* Step 1: Photo */}
        <div>
          <h2 className="text-xl font-bold text-[#1F2937] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#EC4899] text-white flex items-center justify-center text-sm">1</span>
            Upload Photo
          </h2>
          
          {image ? (
            <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-gray-200">
              <img src={image} alt="Scrap preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute top-4 right-4 px-4 py-2 bg-white/90 text-red-500 font-bold rounded-xl shadow-sm hover:bg-white transition-colors"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="mb-2 text-gray-500"><span className="font-semibold text-[#8B5CF6]">Click to upload</span> or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG or WEBP (MAX. 5MB)</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} required />
            </label>
          )}
        </div>

        {/* Step 2: Category */}
        <div>
          <h2 className="text-xl font-bold text-[#1F2937] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#EC4899] text-white flex items-center justify-center text-sm">2</span>
            Select Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Plastic', 'Paper', 'Metal', 'E-Waste', 'Mixed'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`py-3 px-4 rounded-xl font-bold border-2 transition-all ${
                  category === cat
                    ? 'border-[#8B5CF6] bg-[#8B5CF6]/10 text-[#8B5CF6]'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Quantity */}
        <div>
          <h2 className="text-xl font-bold text-[#1F2937] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#EC4899] text-white flex items-center justify-center text-sm">3</span>
            Rough Quantity
          </h2>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g., 5 kg, 2 bags, 1 broken TV..."
            className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent outline-none text-lg"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !image || !category || !quantity}
          className="w-full py-4 rounded-xl bg-[#EC4899] text-white font-bold text-lg btn-hover-effect flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Listing Scrap...
            </>
          ) : (
            <>
              <Plus className="w-6 h-6" />
              List Scrap for Bidding
            </>
          )}
        </button>
      </motion.form>
    </div>
  );
}

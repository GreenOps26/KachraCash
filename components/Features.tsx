import { Camera, MapPin, Handshake, IndianRupee } from 'lucide-react';
import * as motion from 'motion/react-client';

const features = [
  {
    icon: <Camera className="w-8 h-8 text-[#EC4899]" />,
    title: 'Snap & List',
    description: 'Upload a photo of your scrap, select a category, and list it in under 3 minutes.',
  },
  {
    icon: <MapPin className="w-8 h-8 text-[#8B5CF6]" />,
    title: 'Local Matching',
    description: 'Kabadiwalas see nearby listings on a map and bid on the scrap they want.',
  },
  {
    icon: <Handshake className="w-8 h-8 text-[#F59E0B]" />,
    title: 'Mutual Bidding',
    description: 'Negotiate prices directly. Both sides agree on a fair price before pickup.',
  },
  {
    icon: <IndianRupee className="w-8 h-8 text-emerald-500" />,
    title: 'Instant Payout',
    description: 'Get paid instantly to your KachraCash wallet upon pickup confirmation.',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1F2937] mb-4">
            How It Works
          </h2>
          <p className="text-xl text-[#1F2937]/70 max-w-2xl mx-auto">
            A seamless experience for both citizens and scrap collectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-[#FEF3C7]/30 border border-[#FEF3C7] card-hover-effect flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1F2937] mb-3">{feature.title}</h3>
              <p className="text-[#1F2937]/70 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

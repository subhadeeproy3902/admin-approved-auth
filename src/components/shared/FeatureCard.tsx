import { motion } from "framer-motion";

type FeatureCardProps = {
  feature: string;
  icon: React.ElementType;
  delay: number;
  desc: string;
};

const FeatureCard = ({
  feature,
  icon: Icon,
  delay,
  desc,
}: FeatureCardProps) => (
  <motion.div
    className="bg-white/5 backdrop-blur-xl rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-white/10"
    whileHover={{
      scale: 1.05,
      rotateY: 15,
      borderColor: "rgba(255,255,255,0.2)",
    }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <Icon className="w-12 h-12 mb-4 text-indigo-400" />
    <h3 className="text-xl font-bold mb-2 text-white">{feature}</h3>
    <p className="text-gray-400">{desc}</p>
  </motion.div>
);

export default FeatureCard;
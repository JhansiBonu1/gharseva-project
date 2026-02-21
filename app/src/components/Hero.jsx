
export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mt-10 text-3xl font-bold text-blue-700"
    >
      Welcome to GharSeva!
    </motion.div>
  );
}
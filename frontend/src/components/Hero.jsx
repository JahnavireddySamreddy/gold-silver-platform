import { motion } from "framer-motion";

function Hero() {
  return (
    <section
      className="
      min-h-screen
      flex
      items-center
      justify-center
      text-center
      "
    >
      <div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="
          text-7xl
          font-extrabold
          bg-gradient-to-r
          from-yellow-400
          to-gray-300
          bg-clip-text
          text-transparent
          "
        >
          Invest in Gold & Silver
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="
          mt-6
          text-xl
          text-gray-400
          "
        >
          Secure Digital Precious Metal Investing
        </motion.p>

      </div>
    </section>
  );
}

export default Hero;
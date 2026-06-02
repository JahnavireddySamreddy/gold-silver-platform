import { motion } from "framer-motion";

function PriceCards() {
  return (

    <section className="py-20">

      <div
        className="
        max-w-6xl
        mx-auto
        grid
        md:grid-cols-2
        gap-8
        "
      >

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="
          bg-white/10
          backdrop-blur-lg
          rounded-2xl
          p-8
          border
          border-yellow-500/20
          "
        >

          <h2 className="text-yellow-400 text-2xl">

            Gold

          </h2>

          <h1 className="text-5xl font-bold mt-3">

            ₹9,500

          </h1>

        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="
          bg-white/10
          backdrop-blur-lg
          rounded-2xl
          p-8
          border
          border-gray-500/20
          "
        >

          <h2 className="text-gray-300 text-2xl">

            Silver

          </h2>

          <h1 className="text-5xl font-bold mt-3">

            ₹110

          </h1>

        </motion.div>

      </div>

    </section>

  );
}

export default PriceCards;
import { useEffect, useState } from "react";

export default function LivePrices() {

  const [prices, setPrices] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/api/prices")
      .then((res) => res.json())
      .then((data) => setPrices(data))
      .catch((err) => console.log(err));

  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">

      {prices.map((item) => (

        <div
          key={item.id}
          className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transition"
        >

          <h2 className="text-3xl font-bold mb-3">

            {item.metal_type === "Gold"
              ? "🥇 Gold"
              : "🥈 Silver"}

          </h2>

          <p className="text-2xl text-green-600 font-bold">

            ₹ {item.current_price}

          </p>

          <p className="text-gray-500 mt-2">

            Current Market Price

          </p>

        </div>

      ))}

    </div>
  );
}
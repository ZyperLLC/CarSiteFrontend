"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Car, Shield, Users, Zap } from "lucide-react"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // delay between each child animation
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Hero Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About TTRidz</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trinidad & Tobago's most trusted platform for buying and selling cars. We make car trading simple, safe, and
            reliable for everyone.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {[
            { icon: <Car className="w-6 h-6 text-blue-600" />, bg: "bg-blue-100", title: "Thousands of Cars", desc: "Browse through hundreds of verified listings from trusted sellers across Trinidad & Tobago." },
            { icon: <Shield className="w-6 h-6 text-green-600" />, bg: "bg-green-100", title: "Safe & Secure", desc: "All listings are verified and we provide safety tips to ensure secure transactions." },
            { icon: <Users className="w-6 h-6 text-purple-600" />, bg: "bg-purple-100", title: "Trusted Community", desc: "Join thousands of satisfied buyers and sellers who trust TTRidz for their car needs." },
            { icon: <Zap className="w-6 h-6 text-orange-600" />, bg: "bg-orange-100", title: "Quick & Easy", desc: "List your car in minutes or find your dream car with our powerful search filters." },
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-white p-8 rounded-lg shadow-sm border"
            >
              <div className={`${f.bg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white p-8 rounded-lg shadow-sm border mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How TTRidz Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Browse or List", desc: "Search through thousands of cars or list your own vehicle for free" },
              { step: "2", title: "Connect", desc: "Contact sellers directly through WhatsApp or phone for quick communication" },
              { step: "3", title: "Deal Safely", desc: "Meet in person, inspect the vehicle, and complete your transaction securely" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you with any questions about buying or selling cars on TTRidz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-green-600 hover:bg-green-700 text-white">WhatsApp Support</Button>
            <Button variant="outline">Email Support</Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

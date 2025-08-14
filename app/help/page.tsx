"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageCircle, Mail, Phone, HelpCircle } from "lucide-react"

export default function HelpPage() {
  const faqs = [
    { question: "How do I list my car for sale?", answer: "Click on 'Sell Your Car'..." },
    { question: "Is it free to list my car?", answer: "Yes! Listing your car..." },
    { question: "How do I contact a seller?", answer: "Each listing shows..." },
    { question: "What should I do before buying a car?", answer: "Always inspect the car..." },
    { question: "How do I know if a dealer is certified?", answer: "Certified RoRo dealers..." },
    { question: "Can I edit my listing after posting?", answer: "Yes, you can edit..." },
  ]

  // Animation variant for individual items
  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help & Support</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: <MessageCircle className="w-6 h-6 text-green-600" />,
              bg: "bg-green-100",
              title: "WhatsApp",
              text: "Quick support via WhatsApp",
              button: <Button className="bg-green-600 hover:bg-green-700 text-white w-full">Chat on WhatsApp</Button>,
            },
            {
              icon: <Mail className="w-6 h-6 text-blue-600" />,
              bg: "bg-blue-100",
              title: "Email",
              text: "Send us a detailed message",
              button: <Button variant="outline" className="w-full bg-transparent">Send Email</Button>,
            },
            {
              icon: <Phone className="w-6 h-6 text-orange-600" />,
              bg: "bg-orange-100",
              title: "Phone",
              text: "Call us during business hours",
              button: <Button variant="outline" className="w-full bg-transparent">868-TTR-IDEZ</Button>,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-lg shadow-sm border text-center"
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.15 }}
            >
              <div className={`${item.bg} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.text}</p>
              {item.button}
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start space-x-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Guide Link */}
        <div className="bg-blue-50 rounded-lg p-8 mt-8 text-center">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Need help taking great car photos?</h3>
          <p className="text-blue-800 mb-6">
            Check out our comprehensive photo guide to create listings that attract more buyers
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:translate-y-1">
            View Photo Guide
          </Button>
        </div>
      </div>
    </div>
  )
}

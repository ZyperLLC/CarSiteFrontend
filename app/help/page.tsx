import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { MessageCircle, Mail, Phone, HelpCircle } from "lucide-react"

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I list my car for sale?",
      answer:
        "Click on 'Sell Your Car' in the navigation menu and follow our simple 3-step process. You'll need to provide car details, upload photos, and add your contact information.",
    },
    {
      question: "Is it free to list my car?",
      answer: "Yes! Listing your car on TTRidz is completely free. We don't charge any fees for posting your listing.",
    },
    {
      question: "How do I contact a seller?",
      answer:
        "Each listing shows the seller's contact information. You can call them directly or use WhatsApp for quick communication.",
    },
    {
      question: "What should I do before buying a car?",
      answer:
        "Always inspect the car in person, verify the seller's identity, check all documents, and consider getting a mechanic's inspection for expensive purchases.",
    },
    {
      question: "How do I know if a dealer is certified?",
      answer:
        "Certified RoRo dealers have a 'Verified' badge on their profiles. These dealers have been vetted by TTRidz and meet our quality standards.",
    },
    {
      question: "Can I edit my listing after posting?",
      answer:
        "Yes, you can edit your listing details, update photos, or change the price at any time through your account dashboard.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

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
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
            <p className="text-gray-600 mb-4">Quick support via WhatsApp</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white w-full">Chat on WhatsApp</Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 mb-4">Send us a detailed message</p>
            <Button variant="outline" className="w-full bg-transparent">
              Send Email
            </Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600 mb-4">Call us during business hours</p>
            <Button variant="outline" className="w-full bg-transparent">
              868-TTR-IDEZ
            </Button>
          </div>
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
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">View Photo Guide</Button>
        </div>
      </div>
    </div>
  )
}

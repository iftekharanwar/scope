import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart2, Clock, Leaf, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-800">SCOPE AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-slate-700 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#benefits" className="text-slate-700 hover:text-blue-600 transition-colors">
              Benefits
            </Link>
            <Link href="#sustainability" className="text-slate-700 hover:text-blue-600 transition-colors">
              Sustainability
            </Link>
            <Link href="#contact" className="text-slate-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>
          <Button className="bg-blue-600 hover:bg-blue-700">Request Demo</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">Smart Claims Optimization and Prioritization Engine</h1>
            <p className="text-xl text-slate-600 mb-10">
              Our artificial intelligence platform evaluates each incoming claim against adjuster expertise,
              availability, and track record, then assigns it automatically to the ideal handler. This streamlined
              approach accelerates processing, boosts accuracy, and delivers superior outcomes for your organization and
              your customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">Request Demo</Button>
              <Link href="/chatbot">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-6">
                  Try Our Chatbot
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Glassmorphism decorative elements */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-16">Intelligent Features</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="relative backdrop-blur-lg bg-white/40 p-8 rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all">
              <div className="absolute -top-6 left-8 bg-blue-600 p-3 rounded-lg text-white">
                <BarChart2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mt-6 mb-4">Advanced Claim Analysis</h3>
              <p className="text-slate-600">
                Our AI performs deep analysis of claim details, including complexity, urgency, risk factors, and
                geographic location to determine optimal routing paths.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="relative backdrop-blur-lg bg-white/40 p-8 rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all">
              <div className="absolute -top-6 left-8 bg-blue-600 p-3 rounded-lg text-white">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mt-6 mb-4">Intelligent Workload Distribution</h3>
              <p className="text-slate-600">
                Automatically routes claims to the most appropriate adjusters based on their expertise, current
                workload, historical performance, and specialized knowledge areas.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="relative backdrop-blur-lg bg-white/40 p-8 rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all">
              <div className="absolute -top-6 left-8 bg-blue-600 p-3 rounded-lg text-white">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mt-6 mb-4">Dynamic Priority Management</h3>
              <p className="text-slate-600">
                Prioritizes claims based on multiple factors including urgency, policy terms, customer impact, and
                business rules to optimize processing sequence and resource allocation.
              </p>
            </div>
          </div>
        </div>

        {/* Glassmorphism decorative element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </section>

      {/* Benefits Section with Diagram */}
      <section id="benefits" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-16 text-center">
              Transform Your Claims Process
            </h2>

            <div className="backdrop-blur-lg bg-white/40 p-8 rounded-xl border border-white/20 shadow-lg">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                  <Image
                    src="/images/ai-claims-routing.png"
                    alt="AI Claims Routing Process"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>

                <div className="lg:w-1/2 space-y-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <Clock className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Reduced Processing Time</h3>
                      <p className="text-slate-600">
                        Cut claim processing time by up to 60% with intelligent routing and prioritization.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <BarChart2 className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Optimized Workload</h3>
                      <p className="text-slate-600">
                        Balance adjuster workloads for maximum efficiency and employee satisfaction.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <Shield className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Improved Outcomes</h3>
                      <p className="text-slate-600">
                        Create better outcomes through expert matching and data-driven decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section id="sustainability" className="py-20 relative bg-gradient-to-b from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Sustainability Focus</h2>
            <p className="text-xl text-slate-600">
              Our AI prioritizes sustainability by optimizing claims processing for electric vehicle owners.
            </p>
          </div>

          <div className="backdrop-blur-lg bg-white/40 p-8 md:p-12 rounded-2xl border border-white/20 shadow-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <Image
                  src="/images/electric-car-charging.jpeg"
                  alt="Electric vehicle charging"
                  width={600}
                  height={400}
                  className="rounded-xl"
                />
              </div>

              <div className="md:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <Leaf className="h-10 w-10 text-green-600" />
                  <h3 className="text-2xl font-bold text-slate-800">Electric Vehicle Priority</h3>
                </div>

                <p className="text-slate-600 mb-6">
                  Our system identifies and prioritizes claims from electric vehicle owners, supporting the transition
                  to sustainable transportation.
                </p>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="h-3 w-3 text-green-600" />
                    </div>
                    <p className="text-slate-600">Specialized routing to EV-experienced adjusters</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="h-3 w-3 text-green-600" />
                    </div>
                    <p className="text-slate-600">Expedited processing for sustainable transportation</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <ArrowRight className="h-3 w-3 text-green-600" />
                    </div>
                    <p className="text-slate-600">Carbon footprint reduction through efficient claim handling</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Glassmorphism decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-green-100 to-transparent opacity-30"></div>
        <div className="absolute top-1/3 right-10 w-60 h-60 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto backdrop-blur-lg bg-white/30 p-8 md:p-12 rounded-2xl border border-white/20 shadow-xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Ready to Transform Your Claims Process?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Join leading insurance companies already using our AI solution to optimize their workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">Request Demo</Button>
            </div>
          </div>
        </div>

        {/* Glassmorphism decorative elements */}
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">SCOPEAI</span>
            </div>

            <div className="flex flex-wrap gap-8 justify-center mb-6 md:mb-0">
              <Link href="#features" className="text-slate-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#benefits" className="text-slate-300 hover:text-white transition-colors">
                Benefits
              </Link>
              <Link href="#sustainability" className="text-slate-300 hover:text-white transition-colors">
                Sustainability
              </Link>
              <Link href="#contact" className="text-slate-300 hover:text-white transition-colors">
                Contact
              </Link>
            </div>

            <div className="text-slate-400 text-sm">© 2025 SCOPE AI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

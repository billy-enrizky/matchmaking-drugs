import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  PlusCircle,
  Search,
  Hospital,
  Pill,
  ArrowRightLeft,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const handleIntentSelection = (intent: "seeking" | "providing") => {
    // Navigate to account creation wizard with the selected intent
    navigate("/account-creation", { state: { intent } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Hospital className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">
              Hospital Drug Exchange
            </h1>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost">About</Button>
            <Button variant="ghost">How It Works</Button>
            <Button variant="ghost">Contact</Button>
            <Button variant="outline">Login</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Connect, Exchange, Save Lives
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              A platform connecting hospitals with drug shortages to those with
              surplus inventory, reducing waste and addressing critical
              healthcare needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-6 justify-center"
          >
            <Card className="w-full md:w-1/2 border-2 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer">
              <CardHeader className="text-center">
                <Search className="h-12 w-12 mx-auto text-blue-600 mb-2" />
                <CardTitle className="text-2xl">Looking for Drugs</CardTitle>
                <CardDescription>
                  Find medications your hospital needs from other facilities
                  with surplus inventory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-green-500" />
                    <span>Search for specific medications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-green-500" />
                    <span>Set quantity needed and priority level</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-green-500" />
                    <span>Get matched with potential providers</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => handleIntentSelection("seeking")}
                >
                  Find Medications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="w-full md:w-1/2 border-2 hover:border-green-500 hover:shadow-lg transition-all cursor-pointer">
              <CardHeader className="text-center">
                <PlusCircle className="h-12 w-12 mx-auto text-green-600 mb-2" />
                <CardTitle className="text-2xl">Have Drugs</CardTitle>
                <CardDescription>
                  Share your surplus medications with hospitals in need and
                  reduce waste
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-green-500" />
                    <span>List your surplus medications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-green-500" />
                    <span>Set sharing preferences and quantities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-green-500" />
                    <span>Connect with hospitals in need</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  variant="outline"
                  onClick={() => handleIntentSelection("providing")}
                >
                  Share Medications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-4 bg-white rounded-t-3xl">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center p-6 rounded-lg bg-blue-50"
              whileHover={{ y: -5 }}
            >
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Hospital className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
              <p className="text-gray-600">
                Register your hospital and complete the verification process to
                join our trusted network.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-lg bg-green-50"
              whileHover={{ y: -5 }}
            >
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Pill className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">List or Search</h3>
              <p className="text-gray-600">
                Add your surplus medications or search for drugs your facility
                needs with our intuitive interface.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-lg bg-purple-50"
              whileHover={{ y: -5 }}
            >
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ArrowRightLeft className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect & Exchange</h3>
              <p className="text-gray-600">
                Get matched with potential partners and coordinate exchanges
                through our secure messaging system.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600">500+</p>
              <p className="text-gray-600">Hospitals Connected</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-600">10,000+</p>
              <p className="text-gray-600">Successful Exchanges</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-600">$15M+</p>
              <p className="text-gray-600">Value of Medications Saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto text-center bg-blue-600 text-white p-12 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join the Network?
          </h2>
          <p className="text-xl mb-8">
            Start exchanging medications and making a difference today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => handleIntentSelection("seeking")}
            >
              I Need Medications
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-blue-700"
              onClick={() => handleIntentSelection("providing")}
            >
              I Have Medications to Share
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Hospital className="h-6 w-6" />
                <h3 className="text-xl font-bold">Hospital Drug Exchange</h3>
              </div>
              <p className="text-gray-400">
                Connecting healthcare facilities to share resources and save
                lives.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Data Security
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
              <p className="text-gray-400 mb-4">
                Stay updated with our newsletter
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-900"
                />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Hospital Drug Exchange Platform.
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

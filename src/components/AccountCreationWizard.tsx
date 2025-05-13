import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface AccountCreationWizardProps {
  onComplete?: (data: AccountData) => void;
  userType?: "seeking" | "providing";
}

interface AccountData {
  hospitalName: string;
  representativeName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  hospitalType: string;
  licenseNumber: string;
  additionalInfo: string;
}

const AccountCreationWizard: React.FC<AccountCreationWizardProps> = ({
  onComplete = () => {},
  userType = "seeking",
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<AccountData>({
    hospitalName: "",
    representativeName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    hospitalType: "",
    licenseNumber: "",
    additionalInfo: "",
  });

  useEffect(() => {
    // Get intent from location state if available
    if (location.state && location.state.intent) {
      const intent = location.state.intent as "seeking" | "providing";
      // Set userType based on intent from navigation
      userType = intent;
    }
  }, [location]);

  const steps = [
    {
      title: "Basic Information",
      description: "Let's start with your basic details",
    },
    {
      title: "Hospital Details",
      description: "Tell us more about your healthcare facility",
    },
    {
      title: "Verification",
      description: "Help us verify your healthcare facility",
    },
    {
      title: "Complete",
      description: "Your account has been created successfully",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Move to completion step
    setCurrentStep(3);
    // Call the onComplete callback with the form data
    onComplete(formData);
  };

  const handleReturn = () => {
    navigate('/');
  };

  const handleStartUsing = () => {
    // Redirect based on user type
    if (userType === "seeking") {
      navigate("/drug-search");
    } else {
      navigate("/inventory");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Basic Information
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hospitalName">Hospital Name *</Label>
                <Input
                  id="hospitalName"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleInputChange}
                  placeholder="Enter hospital name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="representativeName">
                  Representative Name *
                </Label>
                <Input
                  id="representativeName"
                  name="representativeName"
                  value={formData.representativeName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Fast-Response Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 1: // Hospital Details
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Hospital Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter hospital address"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State/Province"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="ZIP/Postal Code"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospitalType">Hospital Type *</Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, "hospitalType")
                  }
                  value={formData.hospitalType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select hospital type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Hospital</SelectItem>
                    <SelectItem value="specialty">
                      Specialty Hospital
                    </SelectItem>
                    <SelectItem value="teaching">Teaching Hospital</SelectItem>
                    <SelectItem value="community">
                      Community Hospital
                    </SelectItem>
                    <SelectItem value="clinic">Clinic</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 2: // Verification
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">Hospital License Number *</Label>
                <Input
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  placeholder="Enter hospital license number"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  placeholder="Any additional information you'd like to provide"
                  rows={4}
                />
              </div>
              <div className="p-4 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-700">
                  Note: We may contact you to verify your hospital information
                  before your account is fully activated.
                </p>
              </div>
            </div>
          </div>
        );
      case 3: // Complete
        return (
          <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">
              Account Created Successfully!
            </h3>
            <p className="text-gray-600 max-w-md">
              Your account has been created and is pending verification. You'll
              receive an email once your account is verified and ready to use.
            </p>
            <div className="mt-6">
              <Button
                onClick={handleReturn}
                variant="outline"
              >
                Return to Home
              </Button>
              <Button
                className="ml-2"
                onClick={handleStartUsing}
              >
                {userType === "seeking" ? "Start Searching" : "Manage Inventory"}
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[600px] bg-gray-50 p-4">
      <Card className="w-full max-w-3xl bg-white">
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <CardDescription>{steps[currentStep].description}</CardDescription>
        </CardHeader>

        {/* Progress Indicator */}
        <div className="px-6">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index < currentStep
                      ? "bg-primary text-primary-foreground"
                      : index === currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index < currentStep ? "✓" : index + 1}
                </div>
                <span
                  className={`text-xs mt-1 ${index <= currentStep ? "text-primary" : "text-gray-500"}`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mb-6">
            <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full rounded"></div>
            <motion.div
              className="absolute top-0 left-0 h-1 bg-primary rounded"
              initial={{ width: "0%" }}
              animate={{
                width: `${(currentStep / (steps.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <CardContent>{renderStepContent()}</CardContent>

        {currentStep < 3 && (
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            {currentStep < 2 ? (
              <Button onClick={nextStep}>Continue</Button>
            ) : (
              <Button onClick={handleSubmit}>Submit</Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AccountCreationWizard;

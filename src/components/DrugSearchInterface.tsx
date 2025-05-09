import React, { useState } from "react";
import { Search, Filter, AlertCircle, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Drug {
  id: string;
  name: string;
  din?: string;
  dosage?: string;
  quantity: number;
  hospital: {
    name: string;
    location: string;
    distance?: number;
  };
  similarityScore: number;
}

const DrugSearchInterface = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [priority, setPriority] = useState<string>("medium");
  const [activeTab, setActiveTab] = useState("search");
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

  // Mock data for demonstration
  const mockResults: Drug[] = [
    {
      id: "1",
      name: "Amoxicillin 500mg",
      din: "02243465",
      dosage: "500mg",
      quantity: 100,
      hospital: {
        name: "General Hospital",
        location: "Toronto, ON",
        distance: 5.2,
      },
      similarityScore: 98,
    },
    {
      id: "2",
      name: "Amoxicillin 250mg",
      din: "02243466",
      dosage: "250mg",
      quantity: 50,
      hospital: {
        name: "Community Medical Center",
        location: "Mississauga, ON",
        distance: 12.7,
      },
      similarityScore: 92,
    },
    {
      id: "3",
      name: "Amoxil 500mg",
      din: "02243467",
      dosage: "500mg",
      quantity: 75,
      hospital: {
        name: "St. Mary Hospital",
        location: "Hamilton, ON",
        distance: 25.3,
      },
      similarityScore: 85,
    },
  ];

  const handleSearch = () => {
    // In a real implementation, this would trigger an API call
    setActiveTab("results");
  };

  const handleSendRequest = (drug: Drug) => {
    setSelectedDrug(drug);
    setShowDialog(true);
  };

  const handleConfirmRequest = () => {
    // In a real implementation, this would send the request to the provider
    setShowDialog(false);
    // Show success message or navigate to a confirmation page
  };

  const getSimilarityBadgeColor = (score: number) => {
    if (score >= 95) return "bg-green-500 hover:bg-green-600";
    if (score >= 85) return "bg-yellow-500 hover:bg-yellow-600";
    return "bg-red-500 hover:bg-red-600";
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6">Drug Search Interface</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Define Drug Requirements</CardTitle>
              <CardDescription>
                Enter the details of the drug you're looking for. Be as specific
                as possible for better matches.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="drug-name" className="text-sm font-medium">
                  Drug Name
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="drug-name"
                    placeholder="Enter drug name, DIN, or active ingredient"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Quantity Needed
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-24"
                  />
                  <span className="text-sm text-muted-foreground">units</span>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="priority" className="text-sm font-medium">
                  Priority Level
                </label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Not Urgent</SelectItem>
                    <SelectItem value="medium">Medium - Needed Soon</SelectItem>
                    <SelectItem value="high">High - Urgent Need</SelectItem>
                    <SelectItem value="critical">
                      Critical - Emergency
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Maximum Distance</label>
                <div className="pt-4">
                  <Slider defaultValue={[50]} max={200} step={10} />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>0 km</span>
                    <span>50 km</span>
                    <span>100 km</span>
                    <span>150 km</span>
                    <span>200 km</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSearch}
                disabled={!searchTerm.trim()}
                className="w-full"
              >
                Search for Matches
              </Button>
            </CardFooter>
          </Card>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Search Tips</AlertTitle>
            <AlertDescription>
              For best results, include the drug name, strength, and
              formulation. Our system uses fuzzy matching to find similar drugs
              even with slight variations in naming.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>
                Found {mockResults.length} potential matches for "{searchTerm}".
                Results are sorted by similarity score.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm">Filter by:</span>
                  <Select defaultValue="similarity">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="similarity">Similarity</SelectItem>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="quantity">
                        Quantity Available
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <span className="text-sm text-muted-foreground">
                  Showing {mockResults.length} of {mockResults.length} results
                </span>
              </div>

              <div className="space-y-4">
                {mockResults.map((drug) => (
                  <Card key={drug.id} className="overflow-hidden">
                    <div className="flex items-stretch">
                      <div className="p-4 flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg">{drug.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              DIN: {drug.din || "Not provided"} • Dosage:{" "}
                              {drug.dosage || "Not specified"}
                            </p>
                          </div>
                          <Badge
                            className={getSimilarityBadgeColor(
                              drug.similarityScore,
                            )}
                          >
                            {drug.similarityScore}% Match
                          </Badge>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">
                              Available Quantity
                            </p>
                            <p className="text-lg">{drug.quantity} units</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Provider</p>
                            <p className="text-lg">{drug.hospital.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {drug.hospital.location} •{" "}
                              {drug.hospital.distance} km away
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted w-[120px] flex flex-col items-center justify-center border-l">
                        <Button
                          variant="ghost"
                          className="h-full w-full rounded-none hover:bg-primary hover:text-primary-foreground"
                          onClick={() => handleSendRequest(drug)}
                        >
                          Send Request
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("search")}>
                Modify Search
              </Button>
              <Button variant="outline" disabled>
                Load More Results
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Drug Request</DialogTitle>
            <DialogDescription>
              You are about to send a request for the following drug. The
              provider will be notified and can choose to accept or decline.
            </DialogDescription>
          </DialogHeader>

          {selectedDrug && (
            <div className="py-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">{selectedDrug.name}</h3>
                <Badge
                  className={getSimilarityBadgeColor(
                    selectedDrug.similarityScore,
                  )}
                >
                  {selectedDrug.similarityScore}% Match
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provider:</span>
                  <span>{selectedDrug.hospital.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span>{selectedDrug.hospital.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Available Quantity:
                  </span>
                  <span>{selectedDrug.quantity} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Requested Quantity:
                  </span>
                  <span>{quantity} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Priority:</span>
                  <span className="capitalize">{priority}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <p className="text-sm">By proceeding, you agree to:</p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Coordinate pickup or delivery with the provider
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Follow all regulatory requirements for drug transfers
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Complete the transaction within 7 days of acceptance
                  </li>
                </ul>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleConfirmRequest}>
              <Check className="mr-2 h-4 w-4" />
              Confirm Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DrugSearchInterface;

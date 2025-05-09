import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Upload, FileUp, AlertCircle, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DrugInventoryManagerProps {
  onSave?: (data: any) => void;
}

const DrugInventoryManager = ({
  onSave = () => {},
}: DrugInventoryManagerProps) => {
  const [activeTab, setActiveTab] = useState("manual");
  const [manualEntry, setManualEntry] = useState({
    drugName: "",
    din: "",
    dosage: "",
    quantity: "",
    expiryDate: "",
    notes: "",
    isShareable: true,
  });
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<string[][]>([]);
  const [csvError, setCsvError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleManualInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setManualEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setManualEntry((prev) => ({ ...prev, isShareable: checked }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setManualEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ type: "manual", data: manualEntry });
    // Reset form or show success message
    setManualEntry({
      drugName: "",
      din: "",
      dosage: "",
      quantity: "",
      expiryDate: "",
      notes: "",
      isShareable: true,
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setCsvError("Please upload a CSV file");
      setCsvFile(null);
      setCsvPreview([]);
      return;
    }

    setCsvFile(file);
    setCsvError(null);

    // Read and parse CSV file
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const rows = text.split("\n").map((row) => row.split(","));

        // Validate CSV structure
        const headers = rows[0];
        if (!headers.includes("drug_name")) {
          setCsvError("CSV must include a drug_name column");
          setCsvPreview([]);
          return;
        }

        setCsvPreview(rows.slice(0, 5)); // Preview first 5 rows
      } catch (error) {
        setCsvError("Error parsing CSV file");
        setCsvPreview([]);
      }
    };
    reader.readAsText(file);
  };

  const handleCsvSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (csvFile) {
      onSave({ type: "csv", data: csvFile });
      // Reset form or show success message
      setCsvFile(null);
      setCsvPreview([]);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Drug Inventory Manager
      </h1>

      <Tabs
        defaultValue="manual"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="csv">CSV Import</TabsTrigger>
        </TabsList>

        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Add Drug to Inventory</CardTitle>
              <CardDescription>
                Enter details about the drug you want to add to your inventory.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleManualSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="drugName">Drug Name *</Label>
                    <Input
                      id="drugName"
                      name="drugName"
                      value={manualEntry.drugName}
                      onChange={handleManualInputChange}
                      placeholder="Enter drug name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="din">
                      DIN (Drug Identification Number)
                    </Label>
                    <Input
                      id="din"
                      name="din"
                      value={manualEntry.din}
                      onChange={handleManualInputChange}
                      placeholder="Enter DIN"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input
                      id="dosage"
                      name="dosage"
                      value={manualEntry.dosage}
                      onChange={handleManualInputChange}
                      placeholder="e.g., 500mg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity Available *</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      value={manualEntry.quantity}
                      onChange={handleManualInputChange}
                      placeholder="Enter quantity"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      type="date"
                      value={manualEntry.expiryDate}
                      onChange={handleManualInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={manualEntry.notes}
                    onChange={handleManualInputChange}
                    placeholder="Enter any additional information about this drug"
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isShareable"
                    checked={manualEntry.isShareable}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="isShareable">
                    Available for sharing with other hospitals
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setManualEntry({
                      drugName: "",
                      din: "",
                      dosage: "",
                      quantity: "",
                      expiryDate: "",
                      notes: "",
                      isShareable: true,
                    })
                  }
                >
                  Clear
                </Button>
                <Button type="submit">Add to Inventory</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="csv">
          <Card>
            <CardHeader>
              <CardTitle>Import Inventory from CSV</CardTitle>
              <CardDescription>
                Upload a CSV file with your drug inventory data. The file must
                include a column named "drug_name". Optional columns: "din",
                "dosage", "quantity", "expiry_date", "notes", "is_shareable".
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? "border-primary bg-primary/5" : "border-gray-300"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Upload className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">
                      Drag and drop your CSV file here
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      or click to browse files
                    </p>
                  </div>
                  <input
                    type="file"
                    id="csvFile"
                    className="hidden"
                    accept=".csv"
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("csvFile")?.click()}
                  >
                    <FileUp className="mr-2 h-4 w-4" /> Select CSV File
                  </Button>
                </div>
              </div>

              {csvError && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{csvError}</AlertDescription>
                </Alert>
              )}

              {csvFile && !csvError && (
                <div className="mt-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <p className="text-sm font-medium">
                      {csvFile.name} selected
                    </p>
                  </div>

                  {csvPreview.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">
                        Preview (first {Math.min(csvPreview.length, 5)} rows):
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="bg-muted">
                              {csvPreview[0].map((header, i) => (
                                <th key={i} className="p-2 text-left border">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {csvPreview.slice(1, 5).map((row, i) => (
                              <tr key={i}>
                                {row.map((cell, j) => (
                                  <td key={j} className="p-2 border">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={!csvFile || !!csvError}
                onClick={handleCsvSubmit}
              >
                Import Inventory
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DrugInventoryManager;

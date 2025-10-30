import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Upload, 
  Send, 
  Users, 
  FileSpreadsheet, 
  Mail,
  CheckCircle,
  AlertCircle,
  Download
} from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '../utils/clipboard';

interface BulkCertificateGeneratorProps {
  subsidiary: any;
}

export default function BulkCertificateGenerator({ subsidiary }: BulkCertificateGeneratorProps) {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [recipients, setRecipients] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel')) {
      setUploadedFile(file);
      toast.success('File uploaded successfully');
    } else {
      toast.error('Please upload a CSV or Excel file');
    }
  };

  const handleBulkSend = async () => {
    if (!selectedProgram) {
      toast.error('Please select a program');
      return;
    }

    if (!recipients.trim() && !uploadedFile) {
      toast.error('Please provide recipients or upload a file');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    // Simulate bulk processing
    const recipientList = recipients.split('\n').filter(email => email.trim());
    const totalRecipients = uploadedFile ? 50 : recipientList.length; // Mock count for uploaded file

    for (let i = 0; i <= totalRecipients; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setProgress((i / totalRecipients) * 100);
    }

    setIsProcessing(false);
    toast.success(`Successfully sent ${totalRecipients} certificates!`);
    
    // Reset form
    setRecipients('');
    setUploadedFile(null);
    setProgress(0);
  };

  const generateSampleLink = () => {
    const program = subsidiary.programs.find((p: any) => p.id === selectedProgram);
    if (program) {
      const sampleId = `${Date.now()}-sample`;
      return `${window.location.origin}/#/certificate/${subsidiary.id}/${program.id}/${sampleId}`;
    }
    return '';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Bulk Certificate Generator
        </CardTitle>
        <CardDescription>
          Send certificates to multiple recipients at once via email or generate individual links
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Program Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Select Program</Label>
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a program" />
              </SelectTrigger>
              <SelectContent>
                {subsidiary.programs.map((program: any) => (
                  <SelectItem key={program.id} value={program.id}>
                    {program.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedProgram && (
            <div className="space-y-2">
              <Label>Sample Certificate Link</Label>
              <div className="flex gap-2">
                <Input 
                  value={generateSampleLink()} 
                  readOnly 
                  className="text-sm"
                />
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={async () => {
                    const success = await copyToClipboard(generateSampleLink());
                    if (success) {
                      toast.success('Link copied to clipboard');
                    } else {
                      toast.error('Failed to copy link');
                    }
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Recipient Input Methods */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm font-medium">
            <span>Add Recipients:</span>
            <Badge variant="outline">Method 1: Manual Entry</Badge>
            <Badge variant="outline">Method 2: File Upload</Badge>
          </div>

          {/* Manual Entry */}
          <div className="space-y-2">
            <Label>Email Addresses (one per line)</Label>
            <Textarea
              placeholder="john.doe@example.com&#10;jane.smith@example.com&#10;mike.johnson@example.com"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              rows={6}
              className="font-mono text-sm"
            />
            {recipients && (
              <p className="text-sm text-gray-500">
                {recipients.split('\n').filter(email => email.trim()).length} recipients entered
              </p>
            )}
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>Or Upload CSV/Excel File</Label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {uploadedFile && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  {uploadedFile.name}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Expected format: Name, Email columns</span>
              <Button variant="link" size="sm" className="h-auto p-0 text-indigo-600">
                Download Template
              </Button>
            </div>
          </div>
        </div>

        {/* Custom Message */}
        <div className="space-y-2">
          <Label>Custom Email Message (Optional)</Label>
          <Textarea
            placeholder="Congratulations on completing the program! Please find your certificate using the link below..."
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            rows={3}
          />
        </div>

        {/* Processing Progress */}
        {isProcessing && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Sending certificates...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button 
            onClick={handleBulkSend}
            disabled={isProcessing || !selectedProgram}
            className="flex items-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Certificates
              </>
            )}
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Generate Links Only
          </Button>
        </div>

        {/* Info Panel */}
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-indigo-800 mb-1">How it works:</p>
              <ul className="text-indigo-700 space-y-1">
                <li>• Each recipient gets a unique certificate link via email</li>
                <li>• They enter their name to personalize the certificate</li>
                <li>• Certificates can be downloaded and shared on social media</li>
                <li>• Testimonial collection is automatically enabled</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
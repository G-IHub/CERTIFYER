import React from "react";
import { Award, Star } from "lucide-react";

interface CertificateTemplate6Props {
  header: string;
  courseTitle: string;
  description?: string;
  date: string;
  recipientName?: string;
  isPreview?: boolean;
  organizationName?: string;
  organizationLogo?: string;
  signatoryName1?: string;
  signatoryTitle1?: string;
  signatureUrl1?: string;
  signatoryName2?: string;
  signatoryTitle2?: string;
  signatureUrl2?: string;
  mode?: "student" | "template-selection";
  // Legacy props for backwards compatibility
  programName?: string;
  issueDate?: string;
  primaryColor?: string;
  signatories?: Array<{
    name: string;
    title: string;
    signatureUrl?: string;
  }>;
}

export default function CertificateTemplate6({
  header,
  courseTitle,
  description,
  date,
  recipientName = "Student Name",
  isPreview = false,
  organizationName = "Your Organization",
  organizationLogo,
  signatoryName1 = "John Smith",
  signatoryTitle1 = "Director",
  signatureUrl1,
  signatoryName2 = "Sammi Smith",
  signatoryTitle2 = "President",
  signatureUrl2,
  mode = "student",
  // Legacy props
  programName,
  issueDate,
  primaryColor = "#ea580c",
  signatories = [],
}: CertificateTemplate6Props) {
  // Use legacy props if provided, otherwise use new standard props
  const displayProgramName = programName || courseTitle;
  const displayIssueDate = issueDate || date;
  const displayRecipientName = recipientName;
  
  // Format date
  const formattedDate = new Date(displayIssueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative w-full h-full bg-white flex items-center justify-center p-8">
      {/* Certificate Container */}
      <div className="relative w-full max-w-[1000px] aspect-[1.414/1] bg-white">
        {/* Dark Brown Corner Decorations */}
        <div className="absolute top-0 left-0 w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M 0,0 L 100,0 L 0,100 Z" fill="#3d2817" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M 0,0 L 100,0 L 100,100 Z" fill="#3d2817" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M 0,0 L 0,100 L 100,100 Z" fill="#3d2817" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M 0,100 L 100,100 L 100,0 Z" fill="#3d2817" />
          </svg>
        </div>

        {/* Orange Border Frame */}
        <div className="absolute inset-0 m-4">
          <div className="absolute inset-0 border-4 border-[#ea580c]" />
        </div>

        {/* Inner White Content Area */}
        <div className="absolute inset-0 m-12 bg-white flex flex-col items-center justify-center p-12">
          {/* Gold Badge and Title Section */}
          <div className="flex items-start gap-8 mb-8">
            {/* Gold Circular Badge */}
            <div className="relative flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center border-4 border-yellow-600 shadow-lg">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 flex items-center justify-center border-2 border-yellow-600">
                  <div className="text-center px-2">
                    <div className="text-[10px] font-semibold text-yellow-900 uppercase tracking-wide leading-tight">
                      CERTIFICATE
                    </div>
                    {organizationLogo ? (
                      <img
                        src={organizationLogo}
                        alt="Organization"
                        className="w-10 h-10 mx-auto my-1 object-contain"
                      />
                    ) : (
                      <Award className="w-8 h-8 mx-auto my-1 text-yellow-900" />
                    )}
                    <div className="text-[11px] font-bold text-yellow-900 uppercase leading-tight">
                      BRAND
                    </div>
                    <div className="text-[11px] font-bold text-yellow-900 uppercase leading-tight">
                      AWARD
                    </div>
                    <div className="text-[8px] font-medium text-yellow-900 uppercase tracking-wider">
                      COMPANY
                    </div>
                    {/* Stars */}
                    <div className="flex justify-center gap-0.5 mt-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="w-2 h-2 fill-yellow-900 text-yellow-900"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Title Section */}
            <div className="flex-1 text-left pt-4">
              <h1
                className="text-5xl tracking-wider mb-2"
                style={{
                  fontFamily: "serif",
                  color: "#4a4a4a",
                  letterSpacing: "0.1em",
                }}
              >
                CERTIFICATE
              </h1>
              <h2 className="text-xl tracking-widest text-gray-600 uppercase">
                OF APPRECIATION
              </h2>
            </div>
          </div>

          {/* Presentation Text */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 uppercase tracking-wide mb-4">
              This certificate is proudly presented to
            </p>
            
            {/* Recipient Name */}
            <div className="mb-6">
              <h3
                className="text-4xl mb-2"
                style={{
                  fontFamily: "cursive",
                  color: "#2d2d2d",
                }}
              >
                {displayRecipientName}
              </h3>
              <div className="w-full max-w-md mx-auto h-px bg-gray-800" />
            </div>

            {/* Company/Program Name */}
            <p className="text-sm uppercase tracking-wider text-gray-700 mb-4">
              {organizationName}
            </p>

            {/* Description */}
            <p className="text-xs text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {description || `In recognition of outstanding achievement and exceptional dedication to ${displayProgramName}. This certificate acknowledges your commitment to excellence and significant contributions that have made a lasting impact on our organization and community.`}
            </p>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 w-full flex items-end justify-between">
            {/* Date */}
            <div className="text-left">
              <div className="text-xs text-gray-500 uppercase mb-1">Date</div>
              <div className="text-sm text-gray-800 border-b border-gray-400 pb-1 min-w-[150px]">
                {formattedDate}
              </div>
            </div>

            {/* Signature */}
            <div className="text-center">
              <div className="text-xs text-gray-500 uppercase mb-1">Signature</div>
              {(signatureUrl1 || (signatories.length > 0 && signatories[0].signatureUrl)) ? (
                <img
                  src={signatureUrl1 || signatories[0].signatureUrl}
                  alt="Signature"
                  className="h-12 mx-auto mb-1 object-contain"
                  style={{ maxWidth: '180px' }}
                />
              ) : (
                <div className="h-12 w-40 border-b border-gray-400 mb-1" />
              )}
              <div className="text-xs text-gray-600">{signatoryName1 || (signatories.length > 0 ? signatories[0].name : 'John Smith')}</div>
              <div className="text-xs text-gray-500">{signatoryTitle1 || (signatories.length > 0 ? signatories[0].title : 'Director')}</div>
            </div>

            {/* Verification Seals */}
            <div className="flex gap-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center border-2 border-gray-700 shadow-md">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center border-2 border-gray-700 shadow-md">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
                  <Star className="w-5 h-5 text-white fill-white" />
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center border-2 border-gray-700 shadow-md">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center text-white text-xs font-bold">
                  ★
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

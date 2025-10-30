import React from 'react';

interface CertificateTemplate7Props {
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
}

/**
 * Premium Certificate Template 7 - Brand Award Style
 * 
 * Features:
 * - Brown/orange color scheme with dark brown corner accents
 * - Gold medallion seal with organization branding
 * - Professional serif typography
 * - Elegant border design
 * - Social media sharing icons
 * 
 * This is a PREMIUM template - requires paid subscription
 */
export default function CertificateTemplate7({
  header,
  courseTitle,
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
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
  mode = "student"
}: CertificateTemplate7Props) {
  const scale = mode === "student" ? 0.3 : 1;

  const containerClass = isPreview 
    ? "w-full mx-auto origin-center overflow-visible"
    : "min-w-[1056px] flex justify-center items-center";

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={containerClass} style={{ transform: `scale(${scale})`, backgroundColor: "transparent" }}>
      <div className="relative w-[1056px] h-[816px] bg-white flex items-center justify-center p-0 overflow-hidden shadow-2xl">
        {/* Main Certificate Container */}
        <div className="relative w-full h-full bg-white">
        
        {/* Dark Brown Corner Decorations */}
        <div className="absolute top-0 left-0 w-40 h-40 overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M 0,0 L 100,0 L 0,100 Z" fill="#3d2817" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-40 h-40 overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M 0,0 L 100,0 L 100,100 Z" fill="#3d2817" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-40 h-40 overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M 0,100 L 0,0 L 100,100 Z" fill="#3d2817" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-40 h-40 overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M 100,100 L 0,100 L 100,0 Z" fill="#3d2817" />
          </svg>
        </div>

        {/* Orange Border Frame */}
        <div className="absolute inset-6">
          <div className="w-full h-full border-[6px] border-orange-600 rounded-sm"></div>
        </div>
        <div className="absolute inset-8">
          <div className="w-full h-full border-2 border-orange-400 rounded-sm"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col px-24 py-20">
          
          {/* Header Section with Medallion */}
          <div className="flex items-start gap-8 mb-8">
            
            {/* Gold Medallion Seal */}
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32">
                {/* Outer gold ring */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 128 128">
                  <circle cx="64" cy="64" r="62" fill="#d4af37" />
                  <circle cx="64" cy="64" r="58" fill="#f4e4a6" />
                  <circle cx="64" cy="64" r="54" fill="#d4af37" />
                  <circle cx="64" cy="64" r="50" fill="#f9f6e8" />
                </svg>
                
                {/* Inner content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-8 h-8 mb-1 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
                      <path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18L6 21.5L7 14.5L2 9.5L9 8.5L12 2Z" fill="#d4af37" />
                    </svg>
                  </div>
                  <div className="text-[9px] font-bold text-gray-800 leading-tight">CERTIFICATE</div>
                  <div className="text-[8px] font-semibold text-gray-700 leading-tight mt-0.5">BRAND</div>
                  <div className="text-[8px] font-semibold text-gray-700 leading-tight">AWARD</div>
                  <div className="text-[7px] text-gray-600 mt-0.5">COMPANY</div>
                </div>

                {/* Decorative stars around medallion */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#d4af37">
                    <path d="M12 2L14.5 9L22 9.5L16.5 14.5L18 22L12 18L6 22L7.5 14.5L2 9.5L9.5 9L12 2Z" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#d4af37">
                    <path d="M12 2L14.5 9L22 9.5L16.5 14.5L18 22L12 18L6 22L7.5 14.5L2 9.5L9.5 9L12 2Z" />
                  </svg>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -left-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#d4af37">
                    <path d="M12 2L14.5 9L22 9.5L16.5 14.5L18 22L12 18L6 22L7.5 14.5L2 9.5L9.5 9L12 2Z" />
                  </svg>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -right-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#d4af37">
                    <path d="M12 2L14.5 9L22 9.5L16.5 14.5L18 22L12 18L6 22L7.5 14.5L2 9.5L9.5 9L12 2Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Title Section */}
            <div className="flex-1 pt-4">
              <h1 
                className="text-6xl mb-2 tracking-wide"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  color: '#3d2817',
                  fontWeight: 700,
                  letterSpacing: '0.05em'
                }}
              >
                CERTIFICATE
              </h1>
              <h2 
                className="text-2xl tracking-wider"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  color: '#666',
                  fontWeight: 400,
                  letterSpacing: '0.15em'
                }}
              >
                OF APPRECIATION
              </h2>
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent mb-6"></div>

          {/* Presentation Text */}
          <div className="text-center mb-6">
            <p 
              className="text-sm tracking-wider"
              style={{ 
                fontFamily: 'Georgia, serif',
                color: '#666',
                letterSpacing: '0.1em'
              }}
            >
              {header.toUpperCase()}
            </p>
          </div>

          {/* Recipient Name */}
          <div className="text-center mb-2">
            <div className="inline-block">
              <h3 
                className="text-5xl mb-2 px-8"
                style={{ 
                  fontFamily: "'Brush Script MT', cursive, Georgia, serif",
                  color: '#2c2c2c',
                  fontWeight: 400,
                  fontStyle: 'italic'
                }}
              >
                {recipientName}
              </h3>
              <div className="w-full h-0.5 bg-gray-800"></div>
            </div>
          </div>

          {/* Program Name */}
          <div className="text-center mb-6">
            <p 
              className="text-xs tracking-widest"
              style={{ 
                fontFamily: 'Georgia, serif',
                color: '#666',
                fontWeight: 600,
                letterSpacing: '0.2em'
              }}
            >
              {courseTitle.toUpperCase()}
            </p>
          </div>

          {/* Description Text */}
          <div className="text-center mb-8 px-12">
            <p 
              className="text-xs leading-relaxed"
              style={{ 
                fontFamily: 'Georgia, serif',
                color: '#555',
                lineHeight: '1.8'
              }}
            >
              {description}
            </p>
          </div>

          {/* Bottom Section - Date, Signature, Icons */}
          <div className="mt-auto flex items-end justify-between">
            
            {/* Date */}
            <div className="flex flex-col items-start">
              <p 
                className="text-xs mb-2"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  color: '#2c2c2c',
                  fontWeight: 400,
                }}
              >
                {formattedDate}
              </p>
              <div className="w-40 border-b-2 border-gray-800 mb-2"></div>
              <p 
                className="text-xs tracking-wider"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  color: '#666',
                  fontWeight: 600,
                  letterSpacing: '0.1em'
                }}
              >
                DATE
              </p>
            </div>

            {/* Signature */}
            <div className="flex flex-col items-center -mt-4">
              <div className="h-12 flex items-end justify-center mb-2">
                {signatureUrl1 ? (
                  <img 
                    src={signatureUrl1} 
                    alt={`${signatoryName1} signature`}
                    className="h-10 object-contain"
                    style={{ maxWidth: '180px' }}
                  />
                ) : (
                  <p 
                    className="text-sm"
                    style={{ 
                      fontFamily: 'Georgia, serif',
                      color: '#2c2c2c',
                      fontWeight: 400,
                      fontStyle: 'italic'
                    }}
                  >
                    {signatoryName1}
                  </p>
                )}
              </div>
              <div className="w-48 border-b-2 border-gray-800 mb-2"></div>
              <p 
                className="text-xs"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  color: '#2c2c2c',
                  fontWeight: 500,
                }}
              >
                {signatoryName1}
              </p>
              <p 
                className="text-xs tracking-wider mt-0.5"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  color: '#666',
                  fontWeight: 600,
                  letterSpacing: '0.1em'
                }}
              >
                {signatoryTitle1.toUpperCase()}
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 pb-1">
              {/* Facebook Icon */}
              <div className="w-9 h-9 rounded-full bg-gray-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </div>
              
              {/* Twitter Icon */}
              <div className="w-9 h-9 rounded-full bg-gray-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </div>
              
              {/* LinkedIn Icon */}
              <div className="w-9 h-9 rounded-full bg-gray-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

// Template metadata for system integration
export const template7Metadata = {
  id: 'template7',
  name: 'Brand Award Certificate',
  description: 'Elegant certificate with gold medallion seal and brown/orange accents',
  category: 'premium',
  isPremium: true,
  tier: 'paid',
  previewImage: '/template-previews/template7.png',
  features: [
    'Gold medallion seal',
    'Dark brown corner accents',
    'Professional serif typography',
    'Social media icons',
    'Elegant border design',
  ],
  pricing: {
    oneTime: 29.99,
    subscription: 9.99,
  }
};

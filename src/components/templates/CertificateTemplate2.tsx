import { useRef } from 'react';

interface CertificateTemplate2Props {
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

export default function CertificateTemplate2({
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
    mode = "student"
}: CertificateTemplate2Props) {
    const ref = useRef<HTMLDivElement>(null);
    const scale = mode === "student" ? 0.3 : 1;

    const containerClass = isPreview 
        ? "w-full mx-auto origin-center overflow-visible"
        : "min-w-[1056px] flex justify-center items-center";

    const certificateClass = isPreview
        ? "flex flex-col justify-center items-center relative shadow-2xl"
        : "flex flex-col justify-center items-center relative";

    return (
        <div className={containerClass} style={{ transform: `scale(${scale})`, backgroundColor: "transparent" }}>
            <div ref={ref} className={certificateClass} style={{ backgroundColor: "#faf8f3" }}>
                {/* Main Certificate Container - Landscape A4 proportions */}
                <div className="relative w-[1056px] h-[816px]" style={{ backgroundColor: "#faf8f3" }}>
                    
                    {/* Ornamental Border Pattern */}
                    <div className="absolute inset-0">
                        <svg className="w-full h-full" viewBox="0 0 1056 816" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Repeating ornamental pattern on all sides */}
                            {/* Top border pattern */}
                            <pattern id="topPattern" x="0" y="0" width="60" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 30 5 Q 25 10 30 15 Q 35 10 30 5 M 30 15 L 30 25 M 25 20 Q 30 22 35 20" 
                                      stroke="#4a3728" strokeWidth="1.5" fill="none"/>
                                <circle cx="30" cy="30" r="2" fill="#4a3728"/>
                            </pattern>
                            <rect x="0" y="0" width="1056" height="40" fill="url(#topPattern)"/>
                            
                            {/* Bottom border pattern */}
                            <pattern id="bottomPattern" x="0" y="0" width="60" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 30 35 Q 25 30 30 25 Q 35 30 30 35 M 30 25 L 30 15 M 25 20 Q 30 18 35 20" 
                                      stroke="#4a3728" strokeWidth="1.5" fill="none"/>
                                <circle cx="30" cy="10" r="2" fill="#4a3728"/>
                            </pattern>
                            <rect x="0" y="776" width="1056" height="40" fill="url(#bottomPattern)"/>
                            
                            {/* Left border pattern */}
                            <pattern id="leftPattern" x="0" y="0" width="40" height="60" patternUnits="userSpaceOnUse">
                                <path d="M 5 30 Q 10 25 15 30 Q 10 35 5 30 M 15 30 L 25 30 M 20 25 Q 22 30 20 35" 
                                      stroke="#4a3728" strokeWidth="1.5" fill="none"/>
                                <circle cx="30" cy="30" r="2" fill="#4a3728"/>
                            </pattern>
                            <rect x="0" y="0" width="40" height="816" fill="url(#leftPattern)"/>
                            
                            {/* Right border pattern */}
                            <pattern id="rightPattern" x="0" y="0" width="40" height="60" patternUnits="userSpaceOnUse">
                                <path d="M 35 30 Q 30 25 25 30 Q 30 35 35 30 M 25 30 L 15 30 M 20 25 Q 18 30 20 35" 
                                      stroke="#4a3728" strokeWidth="1.5" fill="none"/>
                                <circle cx="10" cy="30" r="2" fill="#4a3728"/>
                            </pattern>
                            <rect x="1016" y="0" width="40" height="816" fill="url(#rightPattern)"/>
                            
                            {/* Corner decorative elements */}
                            <circle cx="30" cy="30" r="8" fill="none" stroke="#4a3728" strokeWidth="2"/>
                            <circle cx="1026" cy="30" r="8" fill="none" stroke="#4a3728" strokeWidth="2"/>
                            <circle cx="30" cy="786" r="8" fill="none" stroke="#4a3728" strokeWidth="2"/>
                            <circle cx="1026" cy="786" r="8" fill="none" stroke="#4a3728" strokeWidth="2"/>
                        </svg>
                    </div>

                    {/* Inner Border Frame */}
                    <div className="absolute inset-0 m-12">
                        <div className="w-full h-full border-4 border-black rounded-sm">
                            <div className="w-full h-full border-2 border-black m-2"></div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full px-24 py-20">
                        
                        {/* Top Decorative Swirl */}
                        <div className="mb-6">
                            <svg width="200" height="40" viewBox="0 0 200 40" fill="none">
                                <path d="M 10 20 Q 30 10 50 20 Q 70 30 90 20 L 100 20 M 100 20 Q 110 30 130 20 Q 150 10 170 20 Q 185 28 195 20" 
                                      stroke="#999" strokeWidth="2" fill="none"/>
                                <path d="M 100 15 Q 95 20 100 25 Q 105 20 100 15" 
                                      stroke="#999" strokeWidth="1.5" fill="none"/>
                            </svg>
                        </div>

                        {/* Main Header - CERTIFICATE */}
                        <div className="text-center mb-2">
                            <h1 className="tracking-widest" style={{ 
                                fontFamily: 'Georgia, serif',
                                fontSize: '72px',
                                color: '#4a3728',
                                fontWeight: 400,
                                letterSpacing: '0.15em'
                            }}>
                                {header || "CERTIFICATE"}
                            </h1>
                        </div>

                        {/* Subheading - OF COMPLETION with decorative swirls */}
                        <div className="flex items-center gap-6 mb-8">
                            <svg width="80" height="30" viewBox="0 0 80 30" fill="none">
                                <path d="M 5 15 Q 20 8 35 15 Q 50 22 65 15 Q 72 12 78 15" 
                                      stroke="#999" strokeWidth="1.5" fill="none"/>
                            </svg>
                            <p className="tracking-widest" style={{ 
                                fontFamily: 'Georgia, serif',
                                fontSize: '20px',
                                color: '#666',
                                letterSpacing: '0.2em'
                            }}>
                                OF COMPLETION
                            </p>
                            <svg width="80" height="30" viewBox="0 0 80 30" fill="none">
                                <path d="M 2 15 Q 8 12 15 15 Q 30 22 45 15 Q 60 8 75 15" 
                                      stroke="#999" strokeWidth="1.5" fill="none"/>
                            </svg>
                        </div>

                        {/* Presented To Text */}
                        <div className="mb-6">
                            <p className="tracking-widest" style={{ 
                                fontSize: '14px',
                                color: '#666',
                                letterSpacing: '0.15em'
                            }}>
                                THIS CERTIFICATE IS PROUDLY PRESENTED TO
                            </p>
                        </div>

                        {/* Recipient Name */}
                        <div className="mb-4 w-[600px]">
                            <div className="text-center">
                                <h2 className="" style={{ 
                                    fontFamily: 'Brush Script MT, cursive',
                                    fontSize: '64px',
                                    color: '#4a3728',
                                    fontWeight: 400
                                }}>
                                    {recipientName}
                                </h2>
                            </div>
                        </div>

                        {/* Course Title / Your Text Here */}
                        <div className="mb-6">
                            <p className="tracking-wider" style={{ 
                                fontFamily: 'Georgia, serif',
                                fontSize: '16px',
                                color: '#666',
                                letterSpacing: '0.1em'
                            }}>
                                {courseTitle || "YOUR TEXT HERE"}
                            </p>
                        </div>

                        {/* Description Text */}
                        <div className="mb-12 max-w-[700px] px-8">
                            <p className="text-center leading-relaxed" style={{ 
                                fontSize: '14px',
                                color: '#666',
                                lineHeight: '1.8'
                            }}>
                                {description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                            </p>
                        </div>

                        {/* Date and Signature Lines */}
                        <div className="w-full max-w-[700px] flex items-end justify-between pt-8 mt-auto">
                            
                            {/* Left - Date */}
                            <div className="text-center flex-1">
                                <div className="border-t-2 border-black w-48 mx-auto mb-2"></div>
                                <p className="tracking-widest" style={{ 
                                    fontSize: '12px',
                                    color: '#666',
                                    letterSpacing: '0.2em'
                                }}>
                                    DATE
                                </p>
                                <p className="text-sm mt-1" style={{ color: '#4a3728' }}>
                                    {date}
                                </p>
                            </div>

                            {/* Right - Signature */}
                            <div className="text-center flex-1">
                                <div className="h-12 flex items-end justify-center mb-2">
                                    {signatureUrl1 ? (
                                        <img 
                                            src={signatureUrl1} 
                                            alt={`${signatoryName1} signature`}
                                            className="h-10 object-contain"
                                            style={{ maxWidth: '180px' }}
                                        />
                                    ) : (
                                        <p className="text-sm" style={{ 
                                            fontFamily: 'Brush Script MT, cursive',
                                            color: '#4a3728',
                                            fontSize: '18px'
                                        }}>
                                            {signatoryName1 || 'John Smith'}
                                        </p>
                                    )}
                                </div>
                                <div className="border-t-2 border-black w-48 mx-auto mb-2"></div>
                                <p className="tracking-widest" style={{ 
                                    fontSize: '12px',
                                    color: '#666',
                                    letterSpacing: '0.2em'
                                }}>
                                    SIGNATURE
                                </p>
                                <p className="text-sm mt-1" style={{ color: '#4a3728' }}>
                                    {signatoryName1 || 'John Smith'}
                                </p>
                                <p className="text-xs mt-0.5" style={{ color: '#666' }}>
                                    {signatoryTitle1 || 'Director'}
                                </p>
                            </div>
                        </div>

                        {/* Branding */}
                        <div className="absolute bottom-3 right-6">
                            <p style={{ 
                                fontSize: '7px',
                                color: '#4a3728',
                                opacity: 0.5,
                                letterSpacing: '0.05em'
                            }}>
                                Made by G-iHub
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

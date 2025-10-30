import { useRef } from 'react';

interface CertificateTemplate3Props {
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

export default function CertificateTemplate3({
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
}: CertificateTemplate3Props) {
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
            <div ref={ref} className={certificateClass} style={{ backgroundColor: "#ffffff" }}>
                {/* Main Certificate Container - Landscape A4 proportions */}
                <div className="relative w-[1056px] h-[816px] bg-white overflow-hidden">
                    
                    {/* Top Right Decorative Wave */}
                    <div className="absolute top-0 right-0" style={{ width: '450px', height: '350px' }}>
                        <svg width="450" height="350" viewBox="0 0 450 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Navy blue wave shape */}
                            <path d="M 450 0 L 450 350 Q 350 280 280 220 Q 210 160 150 100 Q 90 40 0 0 Z" 
                                  fill="#1e3a8a"/>
                            {/* Gold border on wave */}
                            <path d="M 450 0 Q 400 25 350 50 Q 300 80 250 120 Q 200 160 150 200 Q 100 240 50 280 Q 25 300 0 320" 
                                  stroke="#ca8a04" strokeWidth="4" fill="none"/>
                        </svg>
                    </div>

                    {/* Bottom Left Decorative Wave */}
                    <div className="absolute bottom-0 left-0" style={{ width: '380px', height: '300px' }}>
                        <svg width="380" height="300" viewBox="0 0 380 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Navy blue wave shape */}
                            <path d="M 0 300 L 0 0 Q 100 70 170 130 Q 240 190 310 240 Q 350 270 380 300 Z" 
                                  fill="#1e3a8a"/>
                            {/* Gold border on wave */}
                            <path d="M 0 300 Q 50 270 100 240 Q 150 200 200 160 Q 250 120 300 80 Q 330 55 360 30" 
                                  stroke="#ca8a04" strokeWidth="4" fill="none"/>
                        </svg>
                    </div>

                    {/* Corner Brackets - Gold */}
                    {/* Top Left */}
                    <div className="absolute top-8 left-12">
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                            <path d="M 0 15 L 0 0 L 15 0" stroke="#ca8a04" strokeWidth="3"/>
                        </svg>
                    </div>
                    {/* Top Right */}
                    <div className="absolute top-8 right-12">
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                            <path d="M 60 15 L 60 0 L 45 0" stroke="#ca8a04" strokeWidth="3"/>
                        </svg>
                    </div>
                    {/* Bottom Left */}
                    <div className="absolute bottom-8 left-12">
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                            <path d="M 0 45 L 0 60 L 15 60" stroke="#ca8a04" strokeWidth="3"/>
                        </svg>
                    </div>
                    {/* Bottom Right */}
                    <div className="absolute bottom-8 right-12">
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                            <path d="M 60 45 L 60 60 L 45 60" stroke="#ca8a04" strokeWidth="3"/>
                        </svg>
                    </div>

                    {/* Badge/Seal - Left Side */}
                    <div className="absolute top-24 left-20" style={{ zIndex: 5 }}>
                        <svg width="100" height="140" viewBox="0 0 100 140" fill="none">
                            {/* Ribbon */}
                            <path d="M 35 70 L 30 110 L 50 95 L 70 110 L 65 70" fill="#ca8a04"/>
                            <path d="M 35 70 L 30 110 L 50 95 L 70 110 L 65 70" stroke="#1e3a8a" strokeWidth="1.5"/>
                            
                            {/* Main circle */}
                            <circle cx="50" cy="50" r="45" fill="#1e3a8a"/>
                            <circle cx="50" cy="50" r="45" stroke="#ca8a04" strokeWidth="3" fill="none"/>
                            <circle cx="50" cy="50" r="38" stroke="#ca8a04" strokeWidth="1.5" fill="none"/>
                            
                            {/* Inner decorative circle */}
                            <circle cx="50" cy="50" r="30" stroke="#ffffff" strokeWidth="2" fill="none" strokeDasharray="3 3"/>
                            
                            {/* Star in center */}
                            <path d="M 50 25 L 54 40 L 70 40 L 57 50 L 62 65 L 50 55 L 38 65 L 43 50 L 30 40 L 46 40 Z" 
                                  fill="#ca8a04" stroke="#ffffff" strokeWidth="1"/>
                        </svg>
                    </div>

                    {/* Content Area */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full px-32 py-20">
                        
                        {/* Main Header - CERTIFICATE */}
                        <div className="text-center mb-3">
                            <h1 className="tracking-widest" style={{ 
                                fontFamily: 'Georgia, serif',
                                fontSize: '68px',
                                color: '#1e293b',
                                fontWeight: 700,
                                letterSpacing: '0.15em'
                            }}>
                                {header || "CERTIFICATE"}
                            </h1>
                        </div>

                        {/* Subheading - OF APPRECIATION with navy background */}
                        <div className="mb-10 px-8 py-2 rounded" style={{ backgroundColor: '#1e3a8a' }}>
                            <p className="tracking-widest" style={{ 
                                fontFamily: 'Georgia, serif',
                                fontSize: '18px',
                                color: '#ffffff',
                                letterSpacing: '0.2em',
                                fontWeight: 600
                            }}>
                                OF APPRECIATION
                            </p>
                        </div>

                        {/* Presented To Text */}
                        <div className="mb-8">
                            <p className="tracking-widest" style={{ 
                                fontSize: '13px',
                                color: '#64748b',
                                letterSpacing: '0.15em'
                            }}>
                                PROUDLY PRESENTED TO
                            </p>
                        </div>

                        {/* Recipient Name */}
                        <div className="mb-4 w-[600px]">
                            <div className="text-center">
                                <h2 style={{ 
                                    fontFamily: 'Georgia, serif',
                                    fontSize: '56px',
                                    color: '#1e293b',
                                    fontWeight: 700,
                                    letterSpacing: '0.05em'
                                }}>
                                    {recipientName}
                                </h2>
                            </div>
                        </div>

                        {/* Course Title / Simple Text Here */}
                        <div className="mb-8">
                            <p className="tracking-wider" style={{ 
                                fontFamily: 'Georgia, serif',
                                fontSize: '16px',
                                color: '#64748b',
                                letterSpacing: '0.1em'
                            }}>
                                {courseTitle || "SIMPLE TEXT HERE"}
                            </p>
                        </div>

                        {/* Description Text */}
                        <div className="mb-16 max-w-[680px] px-8">
                            <p className="text-center leading-relaxed" style={{ 
                                fontSize: '14px',
                                color: '#64748b',
                                lineHeight: '1.8'
                            }}>
                                {description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                            </p>
                        </div>

                        {/* Date and Signature Lines */}
                        <div className="w-full max-w-[700px] flex items-end justify-between pt-8 mt-auto">
                            
                            {/* Left - Date */}
                            <div className="text-center flex-1">
                                <div className="border-t-2 border-gray-400 w-44 mx-auto mb-3"></div>
                                <p className="tracking-widest" style={{ 
                                    fontSize: '11px',
                                    color: '#64748b',
                                    letterSpacing: '0.2em',
                                    fontWeight: 600
                                }}>
                                    DATE
                                </p>
                                <p className="text-sm mt-1" style={{ color: '#1e293b' }}>
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
                                            fontFamily: 'Georgia, serif',
                                            color: '#1e293b',
                                            fontSize: '16px',
                                            fontStyle: 'italic'
                                        }}>
                                            {signatoryName1 || 'John Smith'}
                                        </p>
                                    )}
                                </div>
                                <div className="border-t-2 border-gray-400 w-44 mx-auto mb-3"></div>
                                <p className="tracking-widest" style={{ 
                                    fontSize: '11px',
                                    color: '#64748b',
                                    letterSpacing: '0.2em',
                                    fontWeight: 600
                                }}>
                                    SIGNATURE
                                </p>
                                <p className="text-sm mt-1" style={{ color: '#1e293b' }}>
                                    {signatoryName1 || 'John Smith'}
                                </p>
                                <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>
                                    {signatoryTitle1 || 'Director'}
                                </p>
                            </div>
                        </div>

                        {/* Branding */}
                        <div className="absolute bottom-3 right-6">
                            <p style={{ 
                                fontSize: '7px',
                                color: '#1e3a8a',
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

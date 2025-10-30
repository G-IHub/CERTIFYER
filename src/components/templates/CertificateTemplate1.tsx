import { useRef } from 'react';

interface CertificateTemplate1Props {
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

export default function CertificateTemplate1({
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
}: CertificateTemplate1Props) {
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
                <div className="relative w-[1056px] h-[816px] p-12" style={{ backgroundColor: "#faf8f3" }}>
                    
                    {/* Outer Border with Decorative Corners */}
                    <div className="absolute inset-0 p-8">
                        {/* Outer border frame */}
                        <svg className="absolute inset-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)]" viewBox="0 0 976 752" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Outer brown border */}
                            <rect x="2" y="2" width="972" height="748" stroke="#8b6f47" strokeWidth="4" fill="none" rx="0"/>
                            
                            {/* Inner gold line */}
                            <rect x="10" y="10" width="956" height="732" stroke="#c9a961" strokeWidth="2" fill="none" rx="0"/>
                            
                            {/* Top-left corner decoration */}
                            <path d="M 60 60 Q 30 60 30 30 L 30 10" stroke="#8b6f47" strokeWidth="3" fill="none"/>
                            <path d="M 60 60 Q 60 30 30 30 L 10 30" stroke="#8b6f47" strokeWidth="3" fill="none"/>
                            
                            {/* Top-right corner decoration */}
                            <path d="M 916 60 Q 946 60 946 30 L 946 10" stroke="#8b6f47" strokeWidth="3" fill="none"/>
                            <path d="M 916 60 Q 916 30 946 30 L 966 30" stroke="#8b6f47" strokeWidth="3" fill="none"/>
                            
                            {/* Bottom-left corner decoration */}
                            <path d="M 60 692 Q 30 692 30 722 L 30 742" stroke="#8b6f47" strokeWidth="3" fill="none"/>
                            <path d="M 60 692 Q 60 722 30 722 L 10 722" stroke="#8b6f47" strokeWidth="3" fill="none"/>
                            
                            {/* Bottom-right corner decoration */}
                            <path d="M 916 692 Q 946 692 946 722 L 946 742" stroke="#8b6f47" strokeWidth="3" fill="none"/>
                            <path d="M 916 692 Q 916 722 946 722 L 966 722" stroke="#8b6f47" strokeWidth="3" fill="none"/>
                            
                            {/* Corner circles */}
                            <circle cx="30" cy="30" r="8" fill="#faf8f3" stroke="#8b6f47" strokeWidth="2"/>
                            <circle cx="946" cy="30" r="8" fill="#faf8f3" stroke="#8b6f47" strokeWidth="2"/>
                            <circle cx="30" cy="722" r="8" fill="#faf8f3" stroke="#8b6f47" strokeWidth="2"/>
                            <circle cx="946" cy="722" r="8" fill="#faf8f3" stroke="#8b6f47" strokeWidth="2"/>
                        </svg>
                    </div>

                    {/* Content Area */}
                    <div className="relative z-10 flex flex-col items-center justify-between h-full py-16 px-20">
                        
                        {/* Top decorative line */}
                        <div className="w-full mb-6">
                            <div className="h-[2px] bg-gradient-to-r from-transparent via-[#c9a961] to-transparent"></div>
                        </div>

                        {/* Header - Certificate of Appreciation */}
                        <div className="text-center mb-8">
                            <h1 className="text-6xl tracking-widest" style={{ 
                                fontFamily: 'Georgia, serif',
                                color: '#8b6f47',
                                fontWeight: 400,
                                letterSpacing: '0.05em'
                            }}>
                                {header || "Certificate of Appreciation"}
                            </h1>
                        </div>

                        {/* This Certificate is Presented to */}
                        <div className="mb-8">
                            <p className="text-xl italic" style={{ color: '#c9a961' }}>
                                This Certificate is Presented to
                            </p>
                        </div>

                        {/* Recipient Name */}
                        <div className="mb-10 w-[600px]">
                            <div className="text-center pb-3 border-b-2" style={{ borderColor: '#8b6f47' }}>
                                <h2 className="text-5xl" style={{ 
                                    fontFamily: 'Brush Script MT, cursive',
                                    color: '#c9a961',
                                    fontWeight: 400
                                }}>
                                    {recipientName}
                                </h2>
                            </div>
                        </div>

                        {/* Description Text */}
                        <div className="mb-6 px-12">
                            <p className="text-center text-sm leading-relaxed" style={{ color: '#b8935d' }}>
                                {description || "For outstanding dedication and exceptional contribution to the field of excellence. Your commitment and hard work have been exemplary and serve as an inspiration to others."}
                            </p>
                        </div>

                        {/* Achievement Name */}
                        <div className="mb-8">
                            <p className="text-xl tracking-wide" style={{ color: '#c9a961' }}>
                                *{courseTitle || "ACHIEVEMENT NAME"}*
                            </p>
                        </div>

                        {/* Date */}
                        <div className="mb-8">
                            <p className="text-sm italic" style={{ color: '#b8935d' }}>
                                Presented This {date}
                            </p>
                        </div>

                        {/* Signatures and Badge Section */}
                        <div className="w-full flex items-end justify-between relative mt-auto">
                            
                            {/* Left Signature */}
                            <div className="text-center flex-1">
                                <div className="mb-2">
                                    <div className="h-16 flex items-end justify-center mb-1">
                                        {signatureUrl1 ? (
                                            <img 
                                                src={signatureUrl1} 
                                                alt={`${signatoryName1} signature`}
                                                className="h-12 object-contain"
                                                style={{ maxWidth: '180px' }}
                                            />
                                        ) : (
                                            <p className="text-2xl" style={{ 
                                                fontFamily: 'Brush Script MT, cursive',
                                                color: '#8b6f47'
                                            }}>
                                                {signatoryName1?.split(' ')[0] || 'John'}
                                            </p>
                                        )}
                                    </div>
                                    <div className="border-t-2 w-48 mx-auto" style={{ borderColor: '#8b6f47' }}></div>
                                </div>
                                <p className="text-sm" style={{ color: '#8b6f47', letterSpacing: '0.1em' }}>
                                    {signatoryName1?.toUpperCase() || "JOHN SMITH"}
                                </p>
                                <p className="text-xs" style={{ color: '#b8935d' }}>
                                    {signatoryTitle1 || "Director"}
                                </p>
                            </div>

                            {/* Center Badge */}
                            <div className="flex-shrink-0 mx-8 mb-4">
                                <div className="relative w-24 h-24">
                                    {/* Outer gold circle */}
                                    <div className="absolute inset-0 rounded-full" style={{ 
                                        background: 'linear-gradient(135deg, #f4d03f 0%, #c9a961 50%, #8b6f47 100%)',
                                        boxShadow: '0 4px 12px rgba(139, 111, 71, 0.3)'
                                    }}></div>
                                    
                                    {/* Inner dark circle */}
                                    <div className="absolute inset-2 rounded-full bg-gray-800 flex flex-col items-center justify-center">
                                        <p className="text-xs text-white">Best</p>
                                        <p className="text-xs text-white">Award</p>
                                        <p className="text-xs text-[#f4d03f]">2021</p>
                                    </div>
                                    
                                    {/* Ribbon */}
                                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                                        <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
                                            <path d="M 0 0 L 24 16 L 48 0 L 40 32 L 24 24 L 8 32 Z" fill="#c9a961"/>
                                            <path d="M 0 0 L 24 16 L 48 0 L 40 32 L 24 24 L 8 32 Z" fill="url(#ribbonGradient)" opacity="0.6"/>
                                            <defs>
                                                <linearGradient id="ribbonGradient" x1="0" y1="0" x2="0" y2="32">
                                                    <stop offset="0%" stopColor="#8b6f47"/>
                                                    <stop offset="100%" stopColor="#6b5537"/>
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Right Signature */}
                            <div className="text-center flex-1">
                                <div className="mb-2">
                                    <div className="h-16 flex items-end justify-center mb-1">
                                        {signatureUrl2 ? (
                                            <img 
                                                src={signatureUrl2} 
                                                alt={`${signatoryName2} signature`}
                                                className="h-12 object-contain"
                                                style={{ maxWidth: '180px' }}
                                            />
                                        ) : (
                                            <p className="text-2xl" style={{ 
                                                fontFamily: 'Brush Script MT, cursive',
                                                color: '#8b6f47'
                                            }}>
                                                {signatoryName2?.split(' ')[0] || 'Sammi'}
                                            </p>
                                        )}
                                    </div>
                                    <div className="border-t-2 w-48 mx-auto" style={{ borderColor: '#8b6f47' }}></div>
                                </div>
                                <p className="text-sm" style={{ color: '#8b6f47', letterSpacing: '0.1em' }}>
                                    {signatoryName2?.toUpperCase() || "SAMMI SMITH"}
                                </p>
                                <p className="text-xs" style={{ color: '#b8935d' }}>
                                    {signatoryTitle2 || "President"}
                                </p>
                            </div>
                        </div>

                        {/* Bottom decorative line */}
                        <div className="w-full mt-6">
                            <div className="h-[2px] bg-gradient-to-r from-transparent via-[#c9a961] to-transparent"></div>
                        </div>

                        {/* Branding */}
                        <div className="absolute bottom-3 right-6">
                            <p style={{ 
                                fontSize: '7px',
                                color: '#8b6f47',
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

import { useRef } from 'react';

interface CertificateTemplate4Props {
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

export default function CertificateTemplate4({
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
}: CertificateTemplate4Props) {
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
                    
                    {/* Top-Left Diagonal Chevron - Red */}
                    <div className="absolute top-0 left-0" style={{ width: '420px', height: '320px' }}>
                        <svg width="420" height="320" viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Black chevron base */}
                            <path d="M 0 0 L 0 320 L 160 160 L 0 0 Z" fill="#1f2937"/>
                            {/* White stripe */}
                            <path d="M 0 0 L 180 180 L 220 140 L 40 0 Z" fill="#ffffff"/>
                            {/* Red main chevron */}
                            <path d="M 50 0 L 420 0 L 420 320 L 260 160 L 50 0 Z" fill="#dc2626"/>
                        </svg>
                    </div>

                    {/* Bottom-Right Diagonal Chevron - Red and Black */}
                    <div className="absolute bottom-0 right-0" style={{ width: '380px', height: '280px' }}>
                        <svg width="380" height="280" viewBox="0 0 380 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Red chevron */}
                            <path d="M 380 280 L 200 100 L 380 100 L 380 280 Z" fill="#dc2626"/>
                            {/* Black chevron */}
                            <path d="M 380 280 L 380 180 L 280 280 L 380 280 Z" fill="#1f2937"/>
                        </svg>
                    </div>

                    {/* Double Red Border */}
                    <div className="absolute inset-[20px] border-[3px] border-red-600 pointer-events-none"></div>
                    <div className="absolute inset-[28px] border-[2px] border-red-600 pointer-events-none"></div>

                    {/* Top Red Ribbon - Company Name */}
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10">
                        <svg width="280" height="50" viewBox="0 0 280 50" fill="none">
                            {/* Ribbon shape */}
                            <path d="M 10 0 L 270 0 L 280 25 L 270 50 L 10 50 L 0 25 Z" fill="#dc2626"/>
                            <path d="M 10 0 L 270 0 L 280 25 L 270 50 L 10 50 L 0 25 Z" 
                                  stroke="#991b1b" strokeWidth="2" fill="none"/>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="tracking-widest" style={{ 
                                fontSize: '14px',
                                color: '#ffffff',
                                fontWeight: 700,
                                letterSpacing: '0.2em'
                            }}>
                                {organizationName.toUpperCase()}
                            </p>
                        </div>
                    </div>

                    {/* Right Badge - Honored Mention */}
                    <div className="absolute top-20 right-24 z-10">
                        <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
                            {/* Ribbon tails */}
                            <path d="M 40 85 L 35 150 L 60 130 L 85 150 L 80 85" fill="#dc2626"/>
                            <path d="M 40 85 L 35 150 L 60 130 L 85 150 L 80 85" 
                                  stroke="#991b1b" strokeWidth="1.5" fill="none"/>
                            
                            {/* Badge circle - outer */}
                            <circle cx="60" cy="60" r="55" fill="#dc2626"/>
                            <circle cx="60" cy="60" r="55" stroke="#991b1b" strokeWidth="2" fill="none"/>
                            
                            {/* Wavy edge pattern */}
                            <g>
                                {Array.from({ length: 24 }).map((_, i) => {
                                    const angle = (i * 15) * (Math.PI / 180);
                                    const x = 60 + Math.cos(angle) * 52;
                                    const y = 60 + Math.sin(angle) * 52;
                                    return (
                                        <circle key={i} cx={x} cy={y} r="3" fill="#991b1b"/>
                                    );
                                })}
                            </g>
                            
                            {/* Inner dark circle */}
                            <circle cx="60" cy="60" r="42" fill="#1f2937"/>
                            <circle cx="60" cy="60" r="42" stroke="#ca8a04" strokeWidth="2" fill="none"/>
                            
                            {/* Inner gold ring */}
                            <circle cx="60" cy="60" r="35" stroke="#ca8a04" strokeWidth="1.5" fill="none"/>
                        </svg>
                        
                        {/* Badge Text */}
                        <div className="absolute top-[20px] left-1/2 -translate-x-1/2 text-center w-full">
                            <p style={{ 
                                fontSize: '11px',
                                color: '#ca8a04',
                                fontWeight: 700,
                                letterSpacing: '0.1em'
                            }}>
                                HONORED
                            </p>
                            <p style={{ 
                                fontSize: '11px',
                                color: '#ca8a04',
                                fontWeight: 700,
                                letterSpacing: '0.1em',
                                marginTop: '2px'
                            }}>
                                MENTION
                            </p>
                            <div className="flex justify-center gap-1 mt-1">
                                {[1, 2, 3].map((i) => (
                                    <svg key={i} width="8" height="8" viewBox="0 0 8 8">
                                        <path d="M 4 0 L 5 3 L 8 3 L 5.5 5 L 6.5 8 L 4 6 L 1.5 8 L 2.5 5 L 0 3 L 3 3 Z" 
                                              fill="#ca8a04"/>
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full px-24 py-20">
                        
                        {/* Main Header - CERTIFICATE */}
                        <div className="text-center mb-2 mt-16">
                            <h1 className="tracking-widest" style={{ 
                                fontFamily: 'Georgia, serif',
                                fontSize: '72px',
                                color: '#000000',
                                fontWeight: 700,
                                letterSpacing: '0.1em'
                            }}>
                                {header || "CERTIFICATE"}
                            </h1>
                        </div>

                        {/* Subheading - OF APPRECIATION */}
                        <div className="mb-8 flex items-center gap-4">
                            <div className="h-[1px] w-20 bg-black"></div>
                            <p className="tracking-widest" style={{ 
                                fontFamily: 'Georgia, serif',
                                fontSize: '16px',
                                color: '#000000',
                                letterSpacing: '0.15em',
                                fontWeight: 700
                            }}>
                                OF APPRECIATION
                            </p>
                            <div className="h-[1px] w-20 bg-black"></div>
                        </div>

                        {/* Presented To Text */}
                        <div className="mb-6">
                            <p className="tracking-wider" style={{ 
                                fontSize: '13px',
                                color: '#000000',
                                letterSpacing: '0.15em',
                                fontWeight: 600
                            }}>
                                THIS CERTIFICATE IS PROUDLY PRESENTED TO
                            </p>
                        </div>

                        {/* Recipient Name - Red Script */}
                        <div className="mb-6 w-[600px]">
                            <div className="text-center border-b-2 border-gray-300 pb-2">
                                <h2 style={{ 
                                    fontFamily: 'Brush Script MT, cursive',
                                    fontSize: '68px',
                                    color: '#dc2626',
                                    fontWeight: 400,
                                    fontStyle: 'italic',
                                    letterSpacing: '0.02em'
                                }}>
                                    {recipientName}
                                </h2>
                            </div>
                        </div>

                        {/* Description Text */}
                        <div className="mb-16 max-w-[700px] px-12">
                            <p className="text-center leading-relaxed" style={{ 
                                fontSize: '13px',
                                color: '#000000',
                                lineHeight: '1.8'
                            }}>
                                {description || "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud."}
                            </p>
                        </div>

                        {/* Bottom Section - Date, Seal, Signature */}
                        <div className="w-full max-w-[750px] flex items-center justify-between pt-8 mt-auto relative">
                            
                            {/* Left - Date */}
                            <div className="text-center flex-1">
                                <div className="border-t-2 border-black w-36 mx-auto mb-2"></div>
                                <p className="tracking-widest" style={{ 
                                    fontSize: '11px',
                                    color: '#000000',
                                    letterSpacing: '0.2em',
                                    fontWeight: 700
                                }}>
                                    DATE
                                </p>
                                <p className="text-sm mt-1" style={{ color: '#000000' }}>
                                    {date}
                                </p>
                            </div>

                            {/* Center - Decorative Seal */}
                            <div className="flex-shrink-0 mx-8">
                                <svg width="80" height="80" viewBox="0 0 80 80">
                                    {/* Outer wavy circle */}
                                    <circle cx="40" cy="40" r="38" fill="#dc2626"/>
                                    {/* Wavy edge */}
                                    {Array.from({ length: 20 }).map((_, i) => {
                                        const angle = (i * 18) * (Math.PI / 180);
                                        const x = 40 + Math.cos(angle) * 35;
                                        const y = 40 + Math.sin(angle) * 35;
                                        return (
                                            <circle key={i} cx={x} cy={y} r="4" fill="#991b1b"/>
                                        );
                                    })}
                                    {/* Inner dark circle */}
                                    <circle cx="40" cy="40" r="28" fill="#1f2937"/>
                                    <circle cx="40" cy="40" r="28" stroke="#ca8a04" strokeWidth="2" fill="none"/>
                                    {/* Text SEAL */}
                                    <text x="40" y="42" textAnchor="middle" alignmentBaseline="middle" 
                                          style={{ fontSize: '12px', fill: '#ca8a04', fontWeight: 700, letterSpacing: '0.1em' }}>
                                        SEAL
                                    </text>
                                </svg>
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
                                            color: '#000000',
                                            fontSize: '16px',
                                            fontStyle: 'italic'
                                        }}>
                                            {signatoryName1 || 'John Smith'}
                                        </p>
                                    )}
                                </div>
                                <div className="border-t-2 border-black w-36 mx-auto mb-2"></div>
                                <p className="tracking-widest" style={{ 
                                    fontSize: '11px',
                                    color: '#000000',
                                    letterSpacing: '0.2em',
                                    fontWeight: 700
                                }}>
                                    SIGNATURE
                                </p>
                                <p className="text-sm mt-1" style={{ color: '#000000' }}>
                                    {signatoryName1 || 'John Smith'}
                                </p>
                                <p className="text-xs mt-0.5" style={{ color: '#666' }}>
                                    {signatoryTitle1 || 'Director'}
                                </p>
                            </div>
                        </div>

                        {/* Branding */}
                        <div className="absolute bottom-3 left-6">
                            <p style={{ 
                                fontSize: '7px',
                                color: '#000000',
                                opacity: 0.4,
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

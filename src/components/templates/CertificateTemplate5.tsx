import { useRef } from 'react';

interface CertificateTemplate5Props {
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

export default function CertificateTemplate5({
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
}: CertificateTemplate5Props) {
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
            <div ref={ref} className={certificateClass} style={{ backgroundColor: "#f5f5dc" }}>
                {/* Main Certificate Container - Landscape A4 proportions */}
                <div className="relative w-[1056px] h-[816px] overflow-hidden" style={{ backgroundColor: '#f5f5dc' }}>
                    
                    {/* Dark Green Double Border */}
                    <div className="absolute inset-[24px] border-[6px] border-double pointer-events-none" style={{ borderColor: '#1b5e20' }}></div>
                    <div className="absolute inset-[36px] border-[3px] border-double pointer-events-none" style={{ borderColor: '#1b5e20' }}></div>

                    {/* Top-Left Diagonal Stripes */}
                    <div className="absolute top-0 left-0" style={{ width: '350px', height: '350px' }}>
                        <svg width="350" height="350" viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Dark green stripe */}
                            <path d="M 0 0 L 0 250 L 100 150 L 0 50 L 0 0 Z" fill="#1b5e20"/>
                            {/* Light green/lime stripe */}
                            <path d="M 0 50 L 100 150 L 250 0 L 150 0 L 0 50 Z" fill="#9acd32"/>
                            {/* Another dark green */}
                            <path d="M 150 0 L 250 0 L 350 100 L 350 0 L 250 0 Z" fill="#1b5e20"/>
                        </svg>
                    </div>

                    {/* Top-Right Diagonal Stripe */}
                    <div className="absolute top-0 right-0" style={{ width: '280px', height: '200px' }}>
                        <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Light green stripe */}
                            <path d="M 150 0 L 280 0 L 280 130 L 150 0 Z" fill="#9acd32"/>
                            {/* Dark green edge */}
                            <path d="M 280 130 L 280 200 L 210 200 L 280 130 Z" fill="#1b5e20"/>
                        </svg>
                    </div>

                    {/* Bottom-Left Diagonal Stripes */}
                    <div className="absolute bottom-0 left-0" style={{ width: '380px', height: '320px' }}>
                        <svg width="380" height="320" viewBox="0 0 380 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Dark green large area */}
                            <path d="M 0 320 L 0 120 L 180 300 L 0 320 Z" fill="#1b5e20"/>
                            {/* Light green stripe */}
                            <path d="M 0 120 L 180 300 L 380 320 L 380 280 L 200 100 L 0 120 Z" fill="#9acd32"/>
                            {/* Dark green accent */}
                            <path d="M 200 100 L 380 280 L 380 150 L 200 100 Z" fill="#1b5e20" opacity="0.5"/>
                        </svg>
                    </div>

                    {/* Bottom-Right Corner Accent */}
                    <div className="absolute bottom-0 right-0" style={{ width: '150px', height: '150px' }}>
                        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 150 150 L 150 80 L 80 150 Z" fill="#1b5e20"/>
                        </svg>
                    </div>

                    {/* Left Decorative Badge - Scalloped Circle */}
                    <div className="absolute top-32 left-24 z-10">
                        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
                            {/* Outer scalloped edge */}
                            <circle cx="70" cy="70" r="65" fill="#1b5e20"/>
                            
                            {/* Create scalloped edge with multiple circles */}
                            {Array.from({ length: 32 }).map((_, i) => {
                                const angle = (i * 11.25) * (Math.PI / 180);
                                const x = 70 + Math.cos(angle) * 62;
                                const y = 70 + Math.sin(angle) * 62;
                                return (
                                    <circle key={i} cx={x} cy={y} r="6" fill="#1b5e20"/>
                                );
                            })}
                            
                            {/* Inner decorative rings */}
                            <circle cx="70" cy="70" r="55" fill="none" stroke="#9acd32" strokeWidth="2"/>
                            <circle cx="70" cy="70" r="50" fill="#f5f5dc"/>
                            <circle cx="70" cy="70" r="45" fill="none" stroke="#1b5e20" strokeWidth="2"/>
                            <circle cx="70" cy="70" r="40" fill="none" stroke="#9acd32" strokeWidth="1.5"/>
                            
                            {/* Inner pattern */}
                            <circle cx="70" cy="70" r="35" fill="none" stroke="#1b5e20" strokeWidth="1" strokeDasharray="3 3"/>
                        </svg>
                    </div>

                    {/* Content Area */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full px-32 py-24">
                        
                        {/* Main Header - Certificate */}
                        <div className="text-center mb-1 mt-8">
                            <h1 className="tracking-wide" style={{ 
                                fontFamily: 'Georgia, serif',
                                fontSize: '84px',
                                color: '#1b5e20',
                                fontWeight: 400,
                                fontStyle: 'italic',
                                letterSpacing: '0.02em'
                            }}>
                                {header || "Certificate"}
                            </h1>
                        </div>

                        {/* Subtitle with underline */}
                        <div className="mb-6 text-center">
                            <div className="inline-block border-b-2 pb-1" style={{ borderColor: '#1b5e20' }}>
                                <p className="tracking-wide" style={{ 
                                    fontSize: '13px',
                                    color: '#4a4a4a',
                                    letterSpacing: '0.05em'
                                }}>
                                    {courseTitle || "Lorem ipsum dolor sit amet"}
                                </p>
                            </div>
                        </div>

                        {/* Presented To Text */}
                        <div className="mb-6 mt-4">
                            <p className="tracking-widest" style={{ 
                                fontSize: '12px',
                                color: '#2d2d2d',
                                letterSpacing: '0.2em',
                                fontWeight: 600
                            }}>
                                LOREM IPSUM DOLOR SIT AMET
                            </p>
                        </div>

                        {/* Recipient Name - Large Green */}
                        <div className="mb-6 w-[650px]">
                            <div className="text-center">
                                <h2 style={{ 
                                    fontFamily: 'Georgia, serif',
                                    fontSize: '60px',
                                    color: '#1b5e20',
                                    fontWeight: 700,
                                    letterSpacing: '0.03em'
                                }}>
                                    {recipientName}
                                </h2>
                            </div>
                        </div>

                        {/* Second line text */}
                        <div className="mb-8">
                            <p className="tracking-widest" style={{ 
                                fontSize: '12px',
                                color: '#2d2d2d',
                                letterSpacing: '0.15em',
                                fontWeight: 600
                            }}>
                                LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT
                            </p>
                        </div>

                        {/* Description Paragraph */}
                        <div className="mb-16 max-w-[750px] px-8">
                            <p className="text-center leading-relaxed" style={{ 
                                fontSize: '13px',
                                color: '#3a3a3a',
                                lineHeight: '1.9'
                            }}>
                                {description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla est purus, ultrices in porttitor in, accumsan non quam. Nam consectetur porttitor rhoncus. Curabitur eu est leo feugiat auctor vel quis lorem. Ut et ligula dolor, sit amet consequat lorem. Aliquam porta eros sed velit imperdiet egestas. Maecenas tempus eros ac diam ullamcorper id dictum libero tempor. Donec quis augue magna condimentum lobortis. Quisque imperdiet ipsum vel magna viverra rutrum. Cras viverra molestie urna, vitae vestibulum turpis varius id."}
                            </p>
                        </div>

                        {/* Bottom Section - Awarded By and Date */}
                        <div className="w-full max-w-[700px] flex items-end justify-between pt-8 mt-auto">
                            
                            {/* Left - Awarded By */}
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
                                            color: '#1b5e20',
                                            fontSize: '15px',
                                            fontStyle: 'italic'
                                        }}>
                                            {signatoryName1 || 'John Smith'}
                                        </p>
                                    )}
                                </div>
                                <div className="border-t-2 w-52 mx-auto mb-3" style={{ borderColor: '#1b5e20' }}></div>
                                <p className="tracking-widest" style={{ 
                                    fontSize: '11px',
                                    color: '#2d2d2d',
                                    letterSpacing: '0.2em',
                                    fontWeight: 600
                                }}>
                                    AWARDED BY
                                </p>
                                <p className="text-sm mt-1" style={{ color: '#2d2d2d' }}>
                                    {signatoryName1 || 'John Smith'}
                                </p>
                                <p className="text-xs mt-0.5" style={{ color: '#666' }}>
                                    {signatoryTitle1 || 'Director'}
                                </p>
                            </div>

                            {/* Right - Date */}
                            <div className="text-center flex-1">
                                <div className="border-t-2 w-52 mx-auto mb-3" style={{ borderColor: '#1b5e20' }}></div>
                                <p className="tracking-widest" style={{ 
                                    fontSize: '11px',
                                    color: '#2d2d2d',
                                    letterSpacing: '0.2em',
                                    fontWeight: 600
                                }}>
                                    DATE
                                </p>
                                <p className="text-sm mt-1" style={{ color: '#2d2d2d' }}>
                                    {date}
                                </p>
                            </div>
                        </div>

                        {/* Branding */}
                        <div className="absolute bottom-3 right-6">
                            <p style={{ 
                                fontSize: '7px',
                                color: '#1b5e20',
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

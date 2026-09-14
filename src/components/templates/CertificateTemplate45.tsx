import { useEffect } from "react";
import type { ThemeColors } from "../../types/theme";
import type { Logo } from "../../App";
import medal from "../../assets/gold-seal.png";
import { formatCertificateDateRange } from "../../utils/certificateUtils";

interface CertificateTemplate45Props {
  header?: string;
  courseTitle?: string;
  description?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  dateMode?: "single" | "range";
  recipientName?: string;
  isPreview?: boolean;
  organizationName?: string;
  organizationLogo?: string;
  organizationLogos?: Logo[];
  signatoryName1?: string;
  signatoryTitle1?: string;
  signatureUrl1?: string;
  signatoryName2?: string;
  signatoryTitle2?: string;
  signatureUrl2?: string;
  signatoryName3?: string;
  signatoryTitle3?: string;
  signatureUrl3?: string;
  signatoryName4?: string;
  signatoryTitle4?: string;
  signatureUrl4?: string;
  mode?: "student" | "template-selection";
  certificateId?: string;
  themeColors?: ThemeColors;
}

export default function CertificateTemplate45({
  header = "OF PARTICIPATION",
  courseTitle = "4TH FACULTY OF PHARMACY SCIENTIFIC CONFERENCE",
  description = "TRANSLATIONAL RESEARCH AND STRATEGIC PARTNERSHIPS: ADVANCING PHARMACY AND HEALTH SYSTEMS",
  date = "10th – 11th September, 2025",
  startDate,
  endDate,
  dateMode,
  recipientName = "Mr. Ezeobiora Chijioke Emmanuel",
  organizationName = "UNIVERSITY OF LAGOS",
  organizationLogo,
  organizationLogos,
  signatoryName1 = "Prof. Margaret O. Sofidiya",
  signatoryTitle1 = "Conference Organising Chairperson (COC)",
  signatureUrl1,
  signatoryName2 = "Prof. Sunday A. Adesegun",
  signatoryTitle2 = "Dean, Faculty of Pharmacy",
  signatureUrl2,
  mode = "student",
  themeColors,
}: CertificateTemplate45Props) {
  // Dynamic color resolution
  const primaryColor = themeColors?.primary ?? "#4C1D95"; // Royal Deep Purple
  const secondaryColor = themeColors?.secondary ?? "#D99E30"; // Academic Gold
  const accentCoral = "#E04838"; // Coral / Red highlight
  const darkCharcoal = "#1E2024";
  const bg = themeColors?.background ?? "#FFFFFF";
  const textDark = themeColors?.text ?? "#18181B";

  // useEffect(() => {
  //   const id = "cert-font-t45";
  //   if (!document.getElementById(id)) {
  //     const link = document.createElement("link");
  //     link.id = id;
  //     link.rel = "stylesheet";
  //     link.href =
  //       "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,400&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap";
  //     document.head.appendChild(link);
  //   }
  // }, []);

  const logo1 =
    organizationLogos && organizationLogos[0]?.url
      ? organizationLogos[0]
      : null;
  const logo2 =
    organizationLogos && organizationLogos[1]?.url
      ? organizationLogos[1]
      : null;
  const fallbackLogo = organizationLogo;

  const displayDate = formatCertificateDateRange(startDate, endDate, date);

  return (
    <div
      className="relative overflow-hidden flex flex-col justify-between select-none shadow-md"
      style={{
        width: 800,
        height: 600,
        background: bg,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: textDark,
      }}
    >
      {/* ================= BACKGROUND GEOMETRIC PATTERNS ================= */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* --- TOP LEFT GEOMETRY --- */}
        <polygon points="0,0 85,0 0,85" fill={darkCharcoal} />
        <rect
          x="-35"
          y="20"
          width="70"
          height="70"
          transform="rotate(45 -35 20)"
          stroke={primaryColor}
          strokeWidth="6"
          fill="none"
        />
        <rect
          x="15"
          y="80"
          width="52"
          height="52"
          transform="rotate(45 15 80)"
          stroke={secondaryColor}
          strokeWidth="5"
          fill="none"
        />

        {/* --- LEFT MIDDLE GEOMETRY --- */}
        <rect
          x="-42"
          y="290"
          width="68"
          height="68"
          transform="rotate(45 -42 290)"
          stroke={primaryColor}
          strokeWidth="6"
          fill="none"
        />
        <rect
          x="12"
          y="350"
          width="62"
          height="62"
          transform="rotate(45 12 350)"
          stroke={secondaryColor}
          strokeWidth="6"
          fill="none"
        />

        {/* --- BOTTOM LEFT GEOMETRY --- */}
        <polygon points="0,515 0,600 85,600" fill={darkCharcoal} />
        <rect
          x="-25"
          y="560"
          width="72"
          height="72"
          transform="rotate(45 -25 560)"
          stroke={primaryColor}
          strokeWidth="6"
          fill="none"
        />
        <rect
          x="28"
          y="580"
          width="50"
          height="50"
          transform="rotate(45 28 580)"
          stroke={secondaryColor}
          strokeWidth="5"
          fill="none"
        />

        {/* --- TOP RIGHT GEOMETRY --- */}
        <polygon points="715,0 800,0 800,85" fill={darkCharcoal} />
        <rect
          x="755"
          y="15"
          width="65"
          height="65"
          transform="rotate(45 755 15)"
          stroke={primaryColor}
          strokeWidth="6"
          fill="none"
        />
        <rect
          x="735"
          y="75"
          width="50"
          height="50"
          transform="rotate(45 735 75)"
          stroke={secondaryColor}
          strokeWidth="5"
          fill="none"
        />

        {/* --- RIGHT MIDDLE GEOMETRY --- */}
        <rect
          x="770"
          y="230"
          width="75"
          height="75"
          transform="rotate(45 770 230)"
          stroke={primaryColor}
          strokeWidth="6.5"
          fill="none"
        />
        <rect
          x="780"
          y="340"
          width="70"
          height="70"
          transform="rotate(45 780 340)"
          stroke={secondaryColor}
          strokeWidth="6"
          fill="none"
        />

        {/* --- BOTTOM RIGHT GEOMETRY --- */}
        <polygon points="800,515 800,600 715,600" fill={darkCharcoal} />
        <rect
          x="775"
          y="545"
          width="72"
          height="72"
          transform="rotate(45 775 545)"
          stroke={primaryColor}
          strokeWidth="6"
          fill="none"
        />
        <rect
          x="735"
          y="575"
          width="52"
          height="52"
          transform="rotate(45 735 575)"
          stroke={secondaryColor}
          strokeWidth="5"
          fill="none"
        />

        {/* --- BOTTOM CENTER DIAMOND ACCENT --- */}
        <rect
          x="400"
          y="595"
          width="28"
          height="28"
          transform="rotate(45 400 595)"
          stroke={secondaryColor}
          strokeWidth="3.5"
          fill="none"
        />
      </svg>

      {/* ================= MAIN CONTENT LAYER ================= */}
      <div className="relative z-10 flex flex-col justify-between h-full px-16 pt-5 pb-5">
        {/* --- HEADER: LOGOS & INSTITUTION TITLE --- */}
        <div className="flex items-center justify-between w-full max-w-[660px] mx-auto min-h-[64px]">
          {/* Left Logo */}
          <div className="w-16 h-16 flex items-center justify-center ml-20">
            {logo1?.url ? (
              <img
                src={logo1.url}
                alt={logo1.name || "Organization Logo"}
                className="max-h-16 max-w-16 object-contain"
              />
            ) : fallbackLogo ? (
              <img
                src={fallbackLogo}
                alt="Organization Logo"
                className="max-h-16 max-w-16 object-contain"
              />
            ) : (
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                <span className="text-xs font-bold uppercase">
                  {organizationName?.charAt(0) || "U"}
                </span>
              </div>
            )}
          </div>

          {/* Center Title */}
          <div className="flex-1 text-center">
            <h1
              className="text-[17px] font-extrabold tracking-wider leading-tight uppercase font-['Montserrat']"
              style={{ color: darkCharcoal }}
            >
              {organizationName}
            </h1>
            <p
              className="text-[13px] font-bold tracking-widest leading-snug uppercase mt-0.5"
              style={{ color: primaryColor }}
            >
              FACULTY OF PHARMACY
            </p>
          </div>

          {/* Right Logo */}
          <div className="w-16 h-16 flex items-center justify-center mr-20">
            {logo2?.url ? (
              <img
                src={logo2.url}
                alt={logo2.name || "Secondary Logo"}
                className="max-h-16 max-w-16 object-contain"
              />
            ) : (
              <div className="w-16 h-16" />
            )}
          </div>
        </div>

        {/* --- CERTIFICATE TITLE SECTION --- */}
        <div className="text-center my-0.5 -mt-20">
          <h2
            className="text-[34px] font-black tracking-wider leading-none uppercase font-['Playfair_Display']"
            style={{ color: primaryColor }}
          >
            {header?.split(" ")[0] || "CERTIFICATE"}
          </h2>
          <h3
            className="text-[16px] font-extrabold tracking-widest leading-snug uppercase mt-1"
            style={{ color: darkCharcoal }}
          >
            {header?.split(" ").slice(1).join(" ") || "OF ACHIEVEMENT"}
          </h3>
          <p
            className="text-[12px] font-semibold mt-1 tracking-wide"
            style={{ color: accentCoral }}
          >
            Awarded to
          </p>
        </div>

        {/* --- RECIPIENT NAME & UNDERLINE --- */}
        <div className="text-center w-full max-w-[560px] mx-auto -mt-10">
          <div
            className="text-[23px] font-medium tracking-normal text-gray-900 pb-1"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {recipientName}
          </div>
          <div className="w-full h-[1.5px] bg-gray-900 mx-auto" />
        </div>

        {/* --- OCCASION, COURSE/EVENT TITLE, DATE & THEME --- */}
        <div className="text-center max-w-[580px] mx-auto flex flex-col items-center gap-0.5 -mt-16">
          <span className="text-[11px] font-normal text-gray-800">
            On the occasion of the
          </span>

          <h4
            className="text-[18px] font-extrabold tracking-wide uppercase leading-tight font-['Montserrat']"
            style={{ color: primaryColor }}
          >
            {courseTitle}
          </h4>

          <div
            className="text-[12px] font-bold tracking-normal"
            style={{ color: accentCoral }}
          >
            {displayDate}
          </div>

          {description && (
            <div className="mt-0.5">
              <span
                className="text-[14px] font-extrabold tracking-widest uppercase block"
                style={{ color: accentCoral }}
              >
                THEME:
              </span>
              <p
                className="text-[25px] font-extrabold tracking-tight uppercase leading-snug max-w-[540px] mx-auto mt-0.5"
                style={{ color: primaryColor }}
              >
                {description}
              </p>
            </div>
          )}
        </div>

        {/* --- BOTTOM SECTION: SIGNATORIES & GOLD EMBOSSED SEAL --- */}
        <div className="flex items-end justify-between w-full max-w-[620px] mx-auto mt-1 pt-1">
          {/* Signatory 1 */}
          <div className="flex flex-col items-center text-center w-[200px]">
            <div className="h-10 flex items-end justify-center mb-1">
              {signatureUrl1 ? (
                <img
                  src={signatureUrl1}
                  alt={signatoryName1}
                  className="max-h-10 max-w-[130px] object-contain"
                />
              ) : (
                <div
                  className="font-['Playfair_Display'] italic text-[18px] text-gray-700 opacity-85 select-none"
                  style={{ fontFamily: "'Playfair Display', cursive" }}
                >
                  {signatoryName1?.split(" ")[1] || "Signature"}
                </div>
              )}
            </div>
            <div className="w-40 border-b border-gray-900 mb-1" />
            <div
              className="text-[11px] font-bold leading-tight"
              style={{ color: darkCharcoal }}
            >
              {signatoryName1}
            </div>
            {signatoryTitle1 && (
              <div
                className="text-[9.5px] font-medium italic leading-tight mt-0.5"
                style={{ color: accentCoral }}
              >
                {signatoryTitle1}
              </div>
            )}
          </div>

          {/* Center Gold Ribbon Seal */}
          <div className="flex flex-col items-center justify-center px-2 pb-1">
            <img
              src={medal}
              alt="Golden Seal of Excellence"
              className="w-14 h-14 object-contain drop-shadow-sm"
            />
          </div>

          {/* Signatory 2 */}
          <div className="flex flex-col items-center text-center w-[200px]">
            <div className="h-10 flex items-end justify-center mb-1">
              {signatureUrl2 ? (
                <img
                  src={signatureUrl2}
                  alt={signatoryName2}
                  className="max-h-10 max-w-[130px] object-contain"
                />
              ) : (
                <div
                  className="font-['Playfair_Display'] italic text-[18px] text-gray-700 opacity-85 select-none"
                  style={{ fontFamily: "'Playfair Display', cursive" }}
                >
                  {signatoryName2?.split(" ")[1] || "Signature"}
                </div>
              )}
            </div>
            <div className="w-40 border-b border-gray-900 mb-1" />
            <div
              className="text-[11px] font-bold leading-tight"
              style={{ color: darkCharcoal }}
            >
              {signatoryName2}
            </div>
            {signatoryTitle2 && (
              <div
                className="text-[9.5px] font-medium italic leading-tight mt-0.5"
                style={{ color: accentCoral }}
              >
                {signatoryTitle2}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect } from "react";
import type { ThemeColors } from "../../types/theme";
import type { Logo } from "../../App";
import { formatCertificateDateRange } from "../../utils/certificateUtils";

interface CertificateTemplate47Props {
  header?: string;
  courseTitle?: string;
  description?: string;
  customMessage?: string;
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

export default function CertificateTemplate47({
  header = "CERTIFICATE OF POSTER PRESENTATION",
  courseTitle = "3RD FACULTY OF PHARMACY SCIENTIFIC CONFERENCE",
  description = "IMPLEMENTATION SCIENCE IN HEALTHCARE AND PHARMACY PRACTICE: OPTIMISING RESEARCH AND HEALTH OUTCOMES",
  date = "11TH - 12TH SEPTEMBER, 2024",
  startDate,
  endDate,
  dateMode,
  recipientName = "EZEOBIORA CHIJIOKE EMMANUEL",
  organizationName = "UNIVERSITY OF LAGOS",
  organizationLogo,
  organizationLogos,
  signatoryName1 = "PROF. MARGARET O. SOFIDIYA",
  signatoryTitle1 = "Conference Organising Chairperson (COC)",
  signatureUrl1,
  signatoryName2 = "PROF. GLORIA A. AYOOLA",
  signatoryTitle2 = "Dean, Faculty of Pharmacy",
  signatureUrl2,
  mode = "student",
  themeColors,
}: CertificateTemplate47Props) {
  // Dynamic color resolution
  const primaryPurple = themeColors?.primary ?? "#581C87"; // Royal Purple
  const secondaryGold = themeColors?.secondary ?? "#D49E35"; // Metallic Gold
  const accentRed = "#DC2626"; // Red subtitle accent
  const darkCharcoal = "#111827";
  const bg = themeColors?.background ?? "#FFFFFF";
  const textDark = themeColors?.text ?? "#111827";

  useEffect(() => {
    const id = "cert-font-t47";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Montserrat:wght@400;500;600;700;800;900&family=Oswald:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const logo1 =
    organizationLogos && organizationLogos[0]?.url
      ? organizationLogos[0]
      : null;
  const logo2 =
    organizationLogos && organizationLogos[1]?.url
      ? organizationLogos[1]
      : null;
  const fallbackLogo = organizationLogo;

  // Header display logic
  const displayHeader = (header || "CERTIFICATE OF POSTER PRESENTATION").toUpperCase();

  // Date formatting
  const displayDate =
    startDate && endDate
      ? formatCertificateDateRange(startDate, endDate).toUpperCase()
      : date
      ? date.toUpperCase()
      : "11TH - 12TH SEPTEMBER, 2024";

  const customMessage = "GENOME FEATURES AND BIOSYNTHETIC GENE CLUSTERS ANALYSIS OF ENDOPHYTIC ACTINOBACTERIUM STREPTOMYCES SP. STRAIN PGLAC3X ISOLATED FROM PIPER GUINEENSE";

  return (
    <div
      className="relative overflow-hidden select-none shadow-xl flex flex-col justify-between"
      style={{
        width: 800,
        height: 600,
        background: bg,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: textDark,
      }}
    >
      {/* ================= RIGHT-SIDE 3D GOLD RIBBON & DOTTED PURPLE ARCH ================= */}
      <svg
        className="absolute top-0 right-0 h-full w-[330px] pointer-events-none z-0"
        viewBox="0 0 330 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Gold Ribbon Gradient */}
          <linearGradient
            id="goldRibbonMainGradT47"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#F9DF8D" />
            <stop offset="25%" stopColor="#E2B148" />
            <stop offset="50%" stopColor="#F7DB8A" />
            <stop offset="80%" stopColor="#AA781D" />
            <stop offset="100%" stopColor="#DEAC42" />
          </linearGradient>

          {/* Gold Ribbon Under-fold Gradient (Darker) */}
          <linearGradient
            id="goldRibbonFoldGradT47"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#8C5C0E" />
            <stop offset="40%" stopColor="#5E3C06" />
            <stop offset="80%" stopColor="#2D1A01" />
            <stop offset="100%" stopColor="#1E1201" />
          </linearGradient>

          {/* Lower Gold Sweep Gradient */}
          <linearGradient
            id="goldLowerGradT47"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#F7DC8B" />
            <stop offset="35%" stopColor="#D9A438" />
            <stop offset="70%" stopColor="#F3D580" />
            <stop offset="100%" stopColor="#9C6B16" />
          </linearGradient>

          {/* Deep Purple Arch Gradient */}
          <linearGradient
            id="purpleArchGradT47"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#430E6E" />
            <stop offset="40%" stopColor={primaryPurple} />
            <stop offset="85%" stopColor="#6D21AA" />
            <stop offset="100%" stopColor="#350A57" />
          </linearGradient>

          {/* 3D Drop Shadow for the Gold Ribbon Twist */}
          <filter
            id="ribbonShadowT47"
            x="-20%"
            y="-20%"
            width="150%"
            height="150%"
            filterUnits="userSpaceOnUse"
          >
            <feDropShadow
              dx="-6"
              dy="8"
              stdDeviation="10"
              floodColor="#000000"
              floodOpacity="0.45"
            />
          </filter>
        </defs>

        {/* 1. Deep Royal Purple Background Arch */}
        <path
          d="M 120 0 C 170 120 80 320 120 460 C 145 540 210 580 330 600 L 330 0 Z"
          fill="url(#purpleArchGradT47)"
        />

        {/* 2. Golden Polka Dots Pattern on Purple Background */}
        <g fill="#ECC468" opacity="0.85">
          {/* Diagonal grid rows of dots on the purple arch */}
          {[
            { cx: 290, cy: 140, r: 2.5 },
            { cx: 310, cy: 165, r: 2.5 },
            { cx: 270, cy: 175, r: 2.5 },
            { cx: 295, cy: 200, r: 2.5 },
            { cx: 318, cy: 225, r: 2.5 },
            { cx: 280, cy: 235, r: 2.5 },
            { cx: 305, cy: 260, r: 2.5 },
            { cx: 290, cy: 295, r: 2.5 },
            { cx: 315, cy: 320, r: 2.5 },
            { cx: 300, cy: 355, r: 2.5 },
            { cx: 280, cy: 490, r: 3 },
            { cx: 300, cy: 510, r: 3 },
            { cx: 320, cy: 530, r: 3 },
            { cx: 260, cy: 520, r: 3 },
            { cx: 280, cy: 540, r: 3 },
            { cx: 300, cy: 560, r: 3 },
            { cx: 240, cy: 550, r: 3 },
            { cx: 260, cy: 570, r: 3 },
            { cx: 280, cy: 590, r: 3 },
            { cx: 220, cy: 580, r: 3 },
            { cx: 240, cy: 600, r: 3 },
          ].map((dot, idx) => (
            <circle key={idx} cx={dot.cx} cy={dot.cy} r={dot.r} />
          ))}
        </g>

        {/* 3. Dark Shadow/Interior Loop of the Twisted Ribbon */}
        <path
          d="M 62 360 C 50 415 88 450 142 425 C 105 400 80 375 62 360 Z"
          fill="url(#goldRibbonFoldGradT47)"
        />

        {/* 4. Upper Sweeping 3D Gold Ribbon Body */}
        <path
          d="M 125 0 C 40 100 2 245 42 360 C 60 410 98 440 145 425 C 110 370 120 220 230 110 C 275 65 305 35 330 15 L 330 0 Z"
          fill="url(#goldRibbonMainGradT47)"
          filter="url(#ribbonShadowT47)"
        />

        {/* 5. Gold Ribbon Highlight Sheen Layer */}
        <path
          d="M 125 0 C 40 100 2 245 42 360 C 48 340 38 230 105 130 C 160 50 240 15 330 0 Z"
          fill="white"
          opacity="0.22"
        />

        {/* 6. Lower Fold & Sweeping Gold Ribbon Tail */}
        <path
          d="M 42 360 C 75 425 155 530 255 600 L 330 600 C 235 520 160 435 145 425 C 100 440 60 410 42 360 Z"
          fill="url(#goldLowerGradT47)"
          filter="url(#ribbonShadowT47)"
        />
      </svg>

      {/* ================= MAIN CONTENT LAYER ================= */}
      <div className="relative z-10 flex flex-col justify-between h-full px-12 pt-5 pb-4 max-w-[590px]">
        {/* --- 1. HEADER: LOGOS & INSTITUTION NAME --- */}
        <div className="flex items-center justify-between w-full min-h-[56px] -ml-2">
          {/* Left Logo */}
          <div className="w-16 h-16 flex items-center justify-start ml-16">
            {logo1?.url ? (
              <img
                src={logo1.url}
                alt={logo1.name || "University Logo"}
                className="max-h-16 max-w-16 object-contain"
              />
            ) : fallbackLogo ? (
              <img
                src={fallbackLogo}
                alt="University Logo"
                className="max-h-16 max-w-16 object-contain"
              />
            ) : (
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-xs"
                style={{ borderColor: primaryPurple, color: primaryPurple }}
              >
                <span className="text-xs font-black uppercase">
                  {organizationName?.charAt(0) || "U"}
                </span>
              </div>
            )}
          </div>

          {/* Center Institution Title */}
          <div className="flex-1 text-center px-2">
            <h1
              className="text-[17px] font-black tracking-wider leading-tight uppercase font-['Montserrat']"
              style={{ color: darkCharcoal }}
            >
              {organizationName}
            </h1>
            <p
              className="text-[13px] font-extrabold tracking-widest leading-snug uppercase mt-0.5"
              style={{ color: primaryPurple }}
            >
              FACULTY OF PHARMACY
            </p>
          </div>

          {/* Right Logo */}
          <div className="w-16 h-16 flex items-center justify-end -ml-16">
            {logo2?.url ? (
              <img
                src={logo2.url}
                alt={logo2.name || "Faculty Seal"}
                className="max-h-16 max-w-16 object-contain"
              />
            ) : (
              <div className="w-16 h-16" />
            )}
          </div>
        </div>

        {/* --- 2. SOLID METALLIC GOLD RECTANGULAR HEADER BAR --- */}
        <div
          className="w-[400px] mx-auto py-1.5 px-4 text-center rounded-[2px] shadow-sm my-0.5"
          style={{
            background:
              "linear-gradient(90deg, #D49E35 0%, #F5D88A 45%, #E2B148 70%, #C99324 100%)",
          }}
        >
          <span
            className="text-[14px] font-black tracking-[0.14em] uppercase text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] block font-['Montserrat']"
          >
            {displayHeader}
          </span>
        </div>

        {/* --- 3. AWARDED TO & RECIPIENT NAME --- */}
        <div className="text-center w-full flex flex-col items-center justify-center -my-0.5">
          <p
            className="text-[11.5px] font-black tracking-[0.18em] uppercase text-gray-900 mb-0.5 font-['Montserrat']"
          >
            AWARDED TO
          </p>

          <div
            className="text-[26px] font-bold text-gray-900 tracking-wide uppercase font-['Oswald'] leading-tight"
          >
            {recipientName}
          </div>
          <div className="w-[320px] h-[1.5px] bg-gray-400 mx-auto mt-0.5" />
        </div>

        {/* --- 4. OCCASION, CONFERENCE TITLE, DATE & THEME --- */}
        <div className="text-center max-w-[530px] mx-auto flex flex-col items-center gap-0.5 my-0.5">
          <span className="text-[11.5px] font-bold text-gray-900 font-['Plus_Jakarta_Sans']">
            on the occasion of the
          </span>

          <h4
            className="text-[15.5px] max-w-[400px] font-black tracking-wide uppercase leading-tight font-['Montserrat']"
            style={{ color: primaryPurple }}
          >
            {courseTitle}
          </h4>

          <div className="text-[11px] font-extrabold tracking-wider text-gray-900">
            {displayDate}
          </div>

          {description && (
            <div className="mt-0.5 flex flex-col items-center">
              <span className="text-[10px] font-black tracking-[0.14em] uppercase text-gray-900 block">
                THEME:
              </span>
              <p
                className="text-[18px] font-black tracking-tight uppercase leading-[1.2] max-w-[450px] mx-auto mt-0.5"
                style={{ color: primaryPurple }}
              >
                {description}
              </p>
            </div>
          )}
        </div>

        {/* --- 5. PRESENTATION TITLE BLOCK --- */}
        {customMessage && (
          <div className="text-center max-w-[520px] mx-auto flex flex-col items-center -my-0.5">
            <span className="text-[9.5px] font-black tracking-[0.16em] uppercase text-gray-900 block">
              PRESENTATION TITLE:
            </span>
            <p
              className="text-[15px] font-bold tracking-normal uppercase leading-[1.25] text-gray-900 font-['Oswald'] max-w-[500px] mt-0.5"
            >
              {customMessage}
            </p>
          </div>
        )}

        {/* --- 6. BOTTOM SIGNATORIES --- */}
        <div className="flex items-end justify-between w-full max-w-[510px] mx-auto pt-1 pb-1">
          {/* Signatory 1 */}
          <div className="flex flex-col items-center text-center w-[170px]">
            <div className="h-8 flex items-end justify-center mb-0.5">
              {signatureUrl1 ? (
                <img
                  src={signatureUrl1}
                  alt={signatoryName1}
                  className="max-h-8 max-w-[120px] object-contain"
                />
              ) : (
                <div
                  className="italic text-[20px] text-gray-800 font-bold select-none"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  {signatoryName1?.split(" ")[1] || "Topmike"}
                </div>
              )}
            </div>
            <div className="w-36 border-b border-gray-400 mb-1" />
            <div
              className="text-[10px] font-extrabold leading-tight uppercase"
              style={{ color: darkCharcoal }}
            >
              {signatoryName1}
            </div>
            {signatoryTitle1 && (
              <div
                className="text-[9.5px] font-semibold italic leading-tight mt-0.5"
                style={{ color: accentRed }}
              >
                {signatoryTitle1}
              </div>
            )}
          </div>

          {/* Signatory 2 */}
          <div className="flex flex-col items-center text-center w-[170px]">
            <div className="h-8 flex items-end justify-center mb-0.5">
              {signatureUrl2 ? (
                <img
                  src={signatureUrl2}
                  alt={signatoryName2}
                  className="max-h-8 max-w-[120px] object-contain"
                />
              ) : (
                <div
                  className="italic text-[20px] text-gray-800 font-bold select-none"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  {signatoryName2?.split(" ")[1] || "Ayoola"}
                </div>
              )}
            </div>
            <div className="w-36 border-b border-gray-400 mb-1" />
            <div
              className="text-[10px] font-extrabold leading-tight uppercase"
              style={{ color: darkCharcoal }}
            >
              {signatoryName2}
            </div>
            {signatoryTitle2 && (
              <div
                className="text-[9.5px] font-semibold italic leading-tight mt-0.5"
                style={{ color: accentRed }}
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

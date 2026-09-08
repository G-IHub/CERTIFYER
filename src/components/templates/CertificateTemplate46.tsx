import { useEffect } from "react";
import type { ThemeColors } from "../../types/theme";
import type { Logo } from "../../App";
import { formatCertificateDateRange } from "../../utils/certificateUtils";

interface CertificateTemplate46Props {
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

export default function CertificateTemplate46({
  header = "OF PARTICIPATION",
  courseTitle = "3RD FACULTY OF PHARMACY SCIENTIFIC CONFERENCE",
  description = "IMPLEMENTATION SCIENCE IN HEALTHCARE AND PHARMACY PRACTICE: OPTIMISING RESEARCH AND HEALTH OUTCOMES",
  date = "11TH - 12TH SEPTEMBER, 2024",
  startDate,
  endDate,
  dateMode,
  recipientName = "Ezeobiora, Chijioke Emmanuel",
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
}: CertificateTemplate46Props) {
  // Dynamic color resolution
  const primaryPurple = themeColors?.primary ?? "#581C87"; // Royal Purple
  const secondaryGold = themeColors?.secondary ?? "#D49E35"; // Metallic Gold
  const accentRed = "#DC2626"; // Red subtitle accent
  const darkCharcoal = "#111827";
  const bg = themeColors?.background ?? "#FFFFFF";
  const textDark = themeColors?.text ?? "#111827";

  useEffect(() => {
    const id = "cert-font-t46";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Kalam:wght@400;700&family=Montserrat:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
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

  // Header ribbon text
  const isDefaultHeader =
    !header ||
    header.toUpperCase() === "CERTIFICATE" ||
    header.toUpperCase() === "CERTIFICATE OF PARTICIPATION" ||
    header.toUpperCase() === "OF PARTICIPATION";

  const subHeader = isDefaultHeader
    ? "OF PARTICIPATION"
    : header.toUpperCase();

  // Date formatting
  const displayDate =
    startDate && endDate
      ? formatCertificateDateRange(startDate, endDate).toUpperCase()
      : date
      ? date.toUpperCase()
      : "11TH - 12TH SEPTEMBER, 2024";

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
      {/* ================= PURPLE OUTER RECTANGULAR BORDER ================= */}
      <div
        className="absolute inset-[10px] pointer-events-none z-0 rounded-[2px]"
        style={{ border: `1.5px solid ${primaryPurple}` }}
      />

      {/* ================= RIGHT-SIDE FLOWING GOLD & PURPLE WAVES ================= */}
      <svg
        className="absolute top-0 right-0 h-full w-[300px] pointer-events-none z-0"
        viewBox="0 0 300 600"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Top Gold Gradient */}
          <linearGradient
            id="goldSweepGradT46"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#F9E295" />
            <stop offset="30%" stopColor="#DCA83E" />
            <stop offset="60%" stopColor="#F5D88A" />
            <stop offset="90%" stopColor="#A8751E" />
            <stop offset="100%" stopColor="#E5B751" />
          </linearGradient>

          {/* Purple Wave Gradient */}
          <linearGradient
            id="purpleSweepGradT46"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#4A1377" />
            <stop offset="45%" stopColor={primaryPurple} />
            <stop offset="80%" stopColor="#6C24A8" />
            <stop offset="100%" stopColor="#370D5A" />
          </linearGradient>

          {/* Bottom Gold Gradient */}
          <linearGradient
            id="goldBottomGradT46"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#A8751E" />
            <stop offset="35%" stopColor="#F5D88A" />
            <stop offset="70%" stopColor="#DCA83E" />
            <stop offset="100%" stopColor="#F9E295" />
          </linearGradient>

          {/* Drop shadow for ribbon layering */}
          <filter
            id="waveShadowT46"
            x="-10%"
            y="-10%"
            width="130%"
            height="130%"
            filterUnits="userSpaceOnUse"
          >
            <feDropShadow
              dx="-4"
              dy="6"
              stdDeviation="7"
              floodColor="#000000"
              floodOpacity="0.28"
            />
          </filter>
        </defs>

        {/* 1. Large Royal Purple Body Wave */}
        <path
          d="M 50 0 C 130 90 60 270 90 420 C 110 520 180 570 300 600 L 300 0 Z"
          fill="url(#purpleSweepGradT46)"
        />

        {/* 2. Top-to-Mid Flowing Metallic Gold Ribbon */}
        <path
          d="M 15 0 C 105 80 180 240 210 390 C 230 490 260 550 300 580 L 300 0 Z"
          fill="url(#goldSweepGradT46)"
          filter="url(#waveShadowT46)"
        />

        {/* 3. Deep Purple Inset Accent over Gold */}
        <path
          d="M 85 0 C 145 75 195 230 220 370 C 240 480 270 540 300 560 L 300 0 Z"
          fill="url(#purpleSweepGradT46)"
        />

        {/* 4. Bottom Swirling Gold Ribbon Accent */}
        <path
          d="M 40 600 C 110 570 180 530 240 470 C 270 440 290 420 300 400 L 300 600 Z"
          fill="url(#goldBottomGradT46)"
          filter="url(#waveShadowT46)"
        />
      </svg>

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      <div className="relative z-10 flex flex-col justify-between h-full px-12 pt-5 pb-4 max-w-[620px]">
        {/* --- 1. HEADER LOGOS & INSTITUTION TITLE --- */}
        <div className="flex items-center justify-between w-full min-h-[58px]">
          {/* Left Logo */}
          <div className="w-16 h-16 flex items-center justify-start ml-20">
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

          {/* Center Institution Name */}
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
          <div className="w-16 h-16 flex items-center justify-end -ml-20">
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

        {/* --- 2. CERTIFICATE TITLE & GOLD RIBBON BANNER --- */}
        <div className="flex flex-col items-center justify-center my-1">
          {/* Metallic Gold 'CERTIFICATE' */}
          <h2
            className="text-[38px] font-black tracking-[0.16em] uppercase leading-none font-['Montserrat']"
            style={{
              background:
                "linear-gradient(180deg, #EBC563 0%, #D49D31 45%, #B88118 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 1px 1px rgba(180, 130, 20, 0.25))",
            }}
          >
            CERTIFICATE
          </h2>

          {/* Golden Swallowtail Ribbon */}
          <div className="relative flex items-center justify-center mt-1">
            {/* Ribbon Background SVG with Folded Tails */}
            <svg
              className="w-[330px] h-[34px]"
              viewBox="0 0 330 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="ribbonFaceGradT46"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#E5B239" />
                  <stop offset="50%" stopColor="#F9DC82" />
                  <stop offset="100%" stopColor="#D99E28" />
                </linearGradient>
                <linearGradient
                  id="ribbonTailGradT46"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#A87518" />
                  <stop offset="100%" stopColor="#C99324" />
                </linearGradient>
              </defs>

              {/* Left Folded Tail */}
              <polygon
                points="0,4 26,4 26,30 0,30 12,17"
                fill="url(#ribbonTailGradT46)"
              />
              <polygon points="26,26 26,34 34,26" fill="#6B4507" />

              {/* Right Folded Tail */}
              <polygon
                points="330,4 304,4 304,30 330,30 318,17"
                fill="url(#ribbonTailGradT46)"
              />
              <polygon points="304,26 304,34 296,26" fill="#6B4507" />

              {/* Main Center Banner Plate */}
              <rect
                x="26"
                y="0"
                width="278"
                height="28"
                rx="1"
                fill="url(#ribbonFaceGradT46)"
                stroke="#B88118"
                strokeWidth="0.75"
              />
            </svg>

            {/* Ribbon Subtitle Text */}
            <span
              className="absolute inset-0 flex items-center justify-center text-[13.5px] font-black tracking-[0.18em] uppercase pb-1.5"
              style={{ color: primaryPurple }}
            >
              — {subHeader} —
            </span>
          </div>

          {/* AWARDED TO label */}
          <p
            className="text-[11.5px] font-black tracking-[0.16em] uppercase mt-2.5"
            style={{ color: darkCharcoal }}
          >
            AWARDED TO
          </p>
        </div>

        {/* --- 3. RECIPIENT NAME & UNDERLINE --- */}
        <div className="text-center w-full max-w-[480px] mx-auto -my-1">
          <div
            className="text-[30px] font-bold text-gray-900 leading-tight px-4"
            style={{
              fontFamily: "'Caveat', 'Kalam', cursive",
              letterSpacing: "0.02em",
            }}
          >
            {recipientName}
          </div>
          <div className="w-[430px] h-[1.5px] bg-gray-400 mx-auto mt-0.5" />
        </div>

        {/* --- 4. OCCASION, CONFERENCE TITLE, DATE & THEME --- */}
        <div className="text-center max-w-[530px] mx-auto flex flex-col items-center gap-0.5 my-0.5 mb-10">
          <span className="text-[12px] font-bold text-gray-900 font-['Plus_Jakarta_Sans']">
            on the occasion of the
          </span>

          <h4
            className="text-[18px] font-black tracking-wide uppercase leading-tight font-['Montserrat']"
            style={{ color: primaryPurple }}
          >
            {courseTitle}
          </h4>

          <div
            className="text-[14px] font-extrabold tracking-wider text-gray-900 mt-0.5"
          >
            {displayDate}
          </div>

          {description && (
            <div className="mt-1 flex flex-col items-center">
              <span
                className="text-[14px] font-black tracking-[0.14em] uppercase text-gray-900 block"
              >
                THEME:
              </span>
              <p
                className="text-[25px] font-black tracking-tight uppercase leading-[1.22] max-w-[490px] mx-auto mt-0.5"
                style={{ color: primaryPurple }}
              >
                {description}
              </p>
            </div>
          )}
        </div>

        {/* --- 5. BOTTOM SECTION: SIGNATORIES & ROSETTE SEAL --- */}
        <div className="flex items-end justify-between w-full max-w-[560px] mx-auto pt-1 pb-1">
          {/* Signatory 1 */}
          <div className="flex flex-col items-center text-center w-[170px]">
            <div className="h-9 flex items-end justify-center mb-0.5">
              {signatureUrl1 ? (
                <img
                  src={signatureUrl1}
                  alt={signatoryName1}
                  className="max-h-9 max-w-[120px] object-contain"
                />
              ) : (
                <div
                  className="italic text-[21px] text-gray-800 font-bold select-none"
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

          {/* Central Royal Purple & Gold Rosette Medallion Seal */}
          <div className="flex flex-col items-center justify-center px-1">
            <svg
              className="w-16 h-16 drop-shadow-md"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Gold Rosette Gradient */}
                <radialGradient
                  id="goldRosetteGradT46"
                  cx="50%"
                  cy="50%"
                  r="50%"
                >
                  <stop offset="0%" stopColor="#FCE798" />
                  <stop offset="55%" stopColor="#D9A132" />
                  <stop offset="85%" stopColor="#B37C19" />
                  <stop offset="100%" stopColor="#F2D177" />
                </radialGradient>

                {/* Purple Dome Gradient */}
                <radialGradient
                  id="purpleDomeGradT46"
                  cx="35%"
                  cy="35%"
                  r="65%"
                >
                  <stop offset="0%" stopColor="#7E22CE" />
                  <stop offset="60%" stopColor="#4A1377" />
                  <stop offset="100%" stopColor="#250640" />
                </radialGradient>
              </defs>

              {/* 16-Point Fluted Gold Rosette Cogwheel */}
              <g fill="url(#goldRosetteGradT46)" stroke="#A87518" strokeWidth="0.8">
                {[...Array(16)].map((_, i) => (
                  <circle
                    key={i}
                    cx={50 + 38 * Math.cos((i * Math.PI) / 8)}
                    cy={50 + 38 * Math.sin((i * Math.PI) / 8)}
                    r="8.5"
                  />
                ))}
                <circle cx="50" cy="50" r="41" />
              </g>

              {/* Inner Gold Beaded Ring */}
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="#F9E295"
                strokeWidth="1.2"
                strokeDasharray="2 2.5"
              />

              {/* Inner Deep Purple Glossy Disc */}
              <circle cx="50" cy="50" r="31" fill="url(#purpleDomeGradT46)" />

              {/* Gold Stars */}
              <g fill="#FBD365" transform="translate(50, 36) scale(0.9)">
                {/* Center Top Star */}
                <polygon points="0,-7 2,-2 7,-2 3,1 5,6 0,3 -5,6 -3,1 -7,-2 -2,-2" />
                {/* Left Star */}
                <polygon
                  points="0,-5 1.5,-1.5 5,-1.5 2,1 3.5,4.5 0,2.5 -3.5,4.5 -2,1 -5,-1.5 -1.5,-1.5"
                  transform="translate(-14, 6)"
                />
                {/* Right Star */}
                <polygon
                  points="0,-5 1.5,-1.5 5,-1.5 2,1 3.5,4.5 0,2.5 -3.5,4.5 -2,1 -5,-1.5 -1.5,-1.5"
                  transform="translate(14, 6)"
                />
              </g>

              {/* Lower Laurel / Arc of Gold Dots */}
              <g fill="#FBD365">
                {[-40, -25, -10, 0, 10, 25, 40].map((deg, i) => (
                  <circle
                    key={i}
                    cx={50 + 22 * Math.sin((deg * Math.PI) / 180)}
                    cy={50 + 22 * Math.cos((deg * Math.PI) / 180)}
                    r="1.2"
                  />
                ))}
              </g>

              {/* Gloss Sheen Reflection */}
              <path
                d="M 28 35 Q 50 20 72 35 Q 50 28 28 35 Z"
                fill="white"
                opacity="0.25"
              />
            </svg>
          </div>

          {/* Signatory 2 */}
          <div className="flex flex-col items-center text-center w-[170px]">
            <div className="h-9 flex items-end justify-center mb-0.5">
              {signatureUrl2 ? (
                <img
                  src={signatureUrl2}
                  alt={signatoryName2}
                  className="max-h-9 max-w-[120px] object-contain"
                />
              ) : (
                <div
                  className="italic text-[21px] text-gray-800 font-bold select-none"
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

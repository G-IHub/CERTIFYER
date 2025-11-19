import React, { useEffect } from "react";

import DecorImg from "../../assets/Decor2.svg";
import logo from "../../assets/Sq_logo.svg";
import badge from "../../assets/Badge.svg";

interface CertificateTemplate12Props {
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

export default function CertificateTemplate12({
  header,
  courseTitle,
  description = "This certificate acknowledges your outstanding contribution and dedication to the Design project, showcasing your commitment to excellence, innovation, and teamwork.",
  date,
  recipientName = "Name Surname",
  isPreview = false,
  organizationName = "Your Organization",
  organizationLogo,
  signatoryName1 = "Signature",
  signatoryTitle1 = "MANAGER, CTO",
  signatureUrl1,
  signatoryName2,
  signatoryTitle2,
  signatureUrl2,
  mode = "student",
}: CertificateTemplate12Props) {
  // scale for preview vs student mode
  const transformClass =
    mode === "student" ? "transform scale-[0.3]" : "transform scale-100";
  const containerClass = isPreview
    ? "w-full mx-auto origin-center overflow-visible flex justify-center"
    : "min-w-[1056px] flex justify-center items-center";

  // inject fonts: Libre Baskerville (available on Google Fonts) and attempt Momo_Signature (fallbacks will apply if unavailable)
  useEffect(() => {
    const link1 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href =
      "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap";
    document.head.appendChild(link1);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    // Momo_Signature may be a custom font; we attempt to load it via Google Fonts name (harmless if not found).
    link2.href =
      "https://fonts.googleapis.com/css2?family=Momo+Signature&display=swap";
    document.head.appendChild(link2);

    return () => {
      document.head.removeChild(link1);
      document.head.removeChild(link2);
    };
  }, []);

  // formatted date
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={`${containerClass} ${transformClass} bg-transparent`}>
      <div
        className="flex shadow-md rounded-sm relative overflow-hidden bg-white"
        style={{ width: "640px", height: "450px" }}
      >
        <div className="flex flex-col gap-10 items-start w-5/6 p-10">
          <div className="space-y-2">
            <div className="flex gap-4">
              <img src={logo} alt="organization_logo" />
              <h1 className="text-4xl font-ectrabold tracking-widest">SQ</h1>
            </div>
            <h3
              className="uppercase"
              style={{ fontFamily: "'Liber Baskerville', serif" }}
            >
              Real Estate
            </h3>
          </div>

          <div className="space-y-2 mt-4">
            <h2
              className="text-2xl font-medium"
              style={{ fontFamily: "'Liber Baskerville', serif" }}
            >
              CERTIFICATE OF EXCELLENCE TO
            </h2>
            <div className="border-b-2 w-1/2"
            style={{border: "1px solid #CEAD6A"}}></div>
          </div>
          <div className="space-y-4">
            <p
              className="text-3xl font-light w-3/4 uppercase"
              style={{ fontFamily: "'Liber Baskerville', serif",
                color: "#CEAD6A"
               }}
            >
              {recipientName}
            </p>
            <p className="text-[#5A5549] max-w-lg">{description}</p>
          </div>

          <div
            className="flex items-center"
            style={{ fontFamily: "'Liber Baskerville', serif",
                gap: "60px",
                alignSelf: "center"
            }}
          >
            <div className="flex flex-col gap-2 text-sm">
              <img src={signatureUrl1} alt="signature" className="w-20" />
              <p className="border-b border-gray-500">Julie L. Tilor</p>
              <p>Director SQ Real Estate</p>
            </div>
            <img src={badge} alt="" className="w-20" />
          </div>
        </div>

        {/* Right side decorations */}
        <div className="h-full">
          <img
            src={DecorImg}
            alt=""
            className="absolute -right-40 object-cover"
          />
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import shape1 from "../../assets/shapes (1).svg";
import shape2 from "../../assets/shapes (2).svg";
import shape3 from "../../assets/shapes (3).svg";
import shape4 from "../../assets/shapes (4).svg";
import shape5 from "../../assets/shapes (5).svg";
import shape6 from "../../assets/shapes (6).svg";
import shape7 from "../../assets/shapes (7).svg";
import shape8 from "../../assets/shapes (8).svg";
import shape9 from "../../assets/shapes (9).svg";

interface CertificateTemplate15Props {
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

export default function CertificateTemplate15({
  header,
  courseTitle,
  description = "In recognition of exceptional performance and dedication to excellence in the pursuit of knowledge and skill development.",
  date,
  recipientName = "Name Surname",
  isPreview = false,
  organizationName = "Your Organization",
  organizationLogo,
  signatoryName1,
  signatoryTitle1,
  signatureUrl1,
  signatoryName2,
  signatoryTitle2,
  signatureUrl2,
  mode = "student",
}: CertificateTemplate15Props) {
  const transformClass =
    mode === "student" ? "transform scale-[0.3]" : "transform scale-100";
  const containerClass = isPreview
    ? "w-full mx-auto origin-center overflow-visible flex justify-center"
    : "min-w-[1056px] flex justify-center items-center";

  useEffect(() => {
    const link1 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href = "https://fonts.googleapis.com/css2?family=Felipa&display=swap";
    document.head.appendChild(link1);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href =
      "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap";
    document.head.appendChild(link2);

    return () => {
      document.head.removeChild(link1);
      document.head.removeChild(link2);
    };
  }, []);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Determine signature count
  const hasSignature1 = signatoryName1 || signatoryTitle1 || signatureUrl1;
  const hasSignature2 = signatoryName2 || signatoryTitle2 || signatureUrl2;

  return (
    <div className={`${containerClass} ${transformClass} bg-transparent`}>
      <div
        className="flex justify-center shadow-sm rounded relative overflow-hidden px-10"
        style={{
          width: "640px",
          height: "500px",
          paddingTop: "56px",
          paddingBottom: "56px",
          fontFamily: "'Open sans', sans-serif",
        }}
      >
        <div className="z-0">
          <img
            src={shape1}
            alt=""
            className="absolute top-36 left-5 w-14"
            style={{ top: "80px", left: "24px" }}
          />
          <img
            src={shape2}
            alt=""
            className="absolute w-20"
            style={{ top: "120px", left: "60px" }}
          />
          <img src={shape3} alt="" className="absolute top-40 left-0" />
          <img src={shape9} alt="" className="absolute bottom-0 left-0" />
          <img src={shape4} alt="" className="absolute top-40 right-0" />
          {/* <img src={shape5} alt="" className="absolute bottom-0 right-86" /> */}
          <img src={shape6} alt="" className="absolute bottom-0 right-5" />
          <img src={shape7} alt="" className="absolute bottom-5 right-0" />
          <img src={shape8} alt="" className="absolute top-0 right-0" />

          {/* Organization name in header */}
          <div
            className="flex items-center justify-between absolute"
            style={{ top: "10px", left: "10px" }}
          >
            {organizationLogo && (
              <img
                src={organizationLogo}
                alt="Organization Logo"
                className="w-16 h-16 object-contain"
              />
            )}
            <p className="text-white font-bold tracking-wider">
              {organizationName}
            </p>
          </div>
        </div>

        <div
          className="flex flex-col items-center w-full text-center"
          style={{ gap: "50px" }}
        >
          {/* Header */}
          <div className="">
            <h1 className="text-4xl font-bold" style={{ color: "#0C3C58" }}>
              {header || "Recognition"}
            </h1>
          </div>

          {/* Presented to */}
          <p className="text-sm text-gray-600">
            This Certificate is Proudly Presented to
          </p>

          {/* Recipient Name */}
          <h2
            className="w-1/2 text-center border-b border-gray-400 font-semibold text-3xl tracking-wider pb-2"
            style={{ color: "#0C3C58", fontFamily: "'Felipa', serif" }}
          >
            {recipientName}
          </h2>

          {/* Description */}
          <p className="text-[#5F7E84] max-w-xl text-sm text-gray-600 leading-relaxed">
            {description}
          </p>

          {/* Signatures Section */}
          <div className="flex justify-between items-end mt-12">
            <div className="flex gap-12">
              {hasSignature1 && (
                <div className="flex flex-col">
                  {signatureUrl1 && (
                    <img
                      src={signatureUrl1}
                      alt="Signature"
                      className="h-12 mb-2"
                    />
                  )}
                  {signatoryName1 && (
                    <p className="text-xs font-semibold text-gray-800 border-t-2 border-orange-500 pt-1">
                      {signatoryName1}
                    </p>
                  )}
                  {signatoryTitle1 && (
                    <p className="text-xs text-gray-600">{signatoryTitle1}</p>
                  )}
                </div>
              )}

              {hasSignature2 && (
                <div className="flex flex-col">
                  {signatureUrl2 && (
                    <img
                      src={signatureUrl2}
                      alt="Signature"
                      className="h-12 mb-2"
                    />
                  )}
                  {signatoryName2 && (
                    <p className="text-xs font-semibold text-gray-800 border-t-2 border-orange-500 pt-1">
                      {signatoryName2}
                    </p>
                  )}
                  {signatoryTitle2 && (
                    <p className="text-xs text-gray-600">{signatoryTitle2}</p>
                  )}
                </div>
              )}
            </div>

            {/* Date */}
            <div className="flex flex-col items-end">
              <p className="text-xs text-gray-600 mb-1">Date Issued</p>
              <p className="text-xs font-semibold text-gray-800">
                {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

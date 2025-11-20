import React, { useEffect } from "react";

interface CertificateTemplate16Props {
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

export default function CertificateTemplate16({
  header,
  courseTitle,
  description = "For exceptional dedication, outstanding performance, and significant contributions to the successful completion of this program.",
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
}: CertificateTemplate16Props) {
  const transformClass =
    mode === "student" ? "transform scale-[0.3]" : "transform scale-100";
  const containerClass = isPreview
    ? "w-full mx-auto origin-center overflow-visible flex justify-center"
    : "min-w-[1056px] flex justify-center items-center";

  useEffect(() => {
    const link1 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href =
      "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap";
    document.head.appendChild(link1);

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href =
      "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap";
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
        className="flex shadow-sm rounded p-4"
        style={{
          width: "640px",
          height: "500px",
          background: "#2A2D30"
        }}
      >
        <div className="bg-white w-full p-2 rounded-lg relative overflow-hidden"
        style={{border: "6px solid #AD814B"}}>
          <div className="bg-transparent w-full h-full rounded-lg px-20 flex flex-col items-center gap-10 text-center font-['Libre_Baskerville'] text-[#3A3D3D]"
          style={{border: "4px solid #AD814B",
            paddingTop: "64px",
            paddingBottom: "64px"
          }}>
            {/* Organization Logo */}
            {organizationLogo && (
              <img
                src={organizationLogo}
                alt="Organization Logo"
                className="w-16 h-16 object-contain mb-4"
              />
            )}

            {/* Header */}
            <div
              className="mb-6"
              style={{ fontFamily: "'Merriweather', serif" }}
            >
              <h1 className="text-5xl font-black text-gray-900">
                {header || "Distinction"}
              </h1>
            </div>

            {/* Decorative line */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-blue-600"></div>
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <div className="w-12 h-px bg-blue-600"></div>
            </div>

            {/* Presented to */}
            <p
              className="text-xs text-gray-600 mb-2"
              style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
            >
              This is hereby awarded to
            </p>

            {/* Recipient Name */}
            <h2
              className="text-4xl font-bold text-blue-700 mb-6"
              style={{ fontFamily: "'Merriweather', serif" }}
            >
              {recipientName}
            </h2>

            {/* Description */}
            <p
              className="text-xs text-gray-700 max-w-lg mb-8 leading-relaxed"
              style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
            >
              {description}
            </p>

            {/* Signatures Section */}
            <div className="flex justify-center items-end gap-16 w-full mt-auto mb-4">
              {hasSignature1 && (
                <div className="flex flex-col items-center">
                  {signatureUrl1 && (
                    <img
                      src={signatureUrl1}
                      alt="Signature"
                      className="h-12 mb-2"
                    />
                  )}
                  <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent mb-1"></div>
                  {signatoryName1 && (
                    <p
                      className="text-xs font-semibold text-gray-800"
                      style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
                    >
                      {signatoryName1}
                    </p>
                  )}
                  {signatoryTitle1 && (
                    <p
                      className="text-xs text-gray-600"
                      style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
                    >
                      {signatoryTitle1}
                    </p>
                  )}
                </div>
              )}

              {hasSignature2 && (
                <div className="flex flex-col items-center">
                  {signatureUrl2 && (
                    <img
                      src={signatureUrl2}
                      alt="Signature"
                      className="h-12 mb-2"
                    />
                  )}
                  <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent mb-1"></div>
                  {signatoryName2 && (
                    <p
                      className="text-xs font-semibold text-gray-800"
                      style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
                    >
                      {signatoryName2}
                    </p>
                  )}
                  {signatoryTitle2 && (
                    <p
                      className="text-xs text-gray-600"
                      style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
                    >
                      {signatoryTitle2}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Date */}
            <div className="flex justify-center items-center gap-2 mt-2">
              <div className="w-3 h-3 border-2 border-blue-600 rounded-full"></div>
              <p
                className="text-xs text-gray-600"
                style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
              >
                Awarded on {formattedDate}
              </p>
              <div className="w-3 h-3 border-2 border-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

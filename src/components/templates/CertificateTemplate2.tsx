import { useRef, useEffect } from "react";
import wavy from "../../assets/Wavy.svg";
import rect4 from "../../assets/Rect4.svg";
import rect from "../../assets/Rect.svg";
import rect2 from "../../assets/Rect2.svg";
import rect3 from "../../assets/Rect3.svg";

interface CertificateTemplate2Props {
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

export default function CertificateTemplate2({
  header,
  courseTitle,
  description,
  date,
  recipientName = "Student Name",
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
}: CertificateTemplate2Props) {
  const ref = useRef<HTMLDivElement>(null);
  const scale =
    mode === "student" ? "transform-scale-[0.3]" : "transform-scale-100";

  // Load decorative fonts used by this template
  useEffect(() => {
    const id1 = "cinzel-decorative-font";
    const id2 = "tangerine-font";
    if (!document.getElementById(id1)) {
      const link = document.createElement("link");
      link.id = id1;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&display=swap";
      document.head.appendChild(link);
    }
    if (!document.getElementById(id2)) {
      const link2 = document.createElement("link");
      link2.id = id2;
      link2.rel = "stylesheet";
      link2.href =
        "https://fonts.googleapis.com/css2?family=Tangerine:wght@700&display=swap";
      document.head.appendChild(link2);
    }
  }, []);

  const containerClass = isPreview
    ? "w-full mx-auto origin-center overflow-visible"
    : "min-w-[1056px] flex justify-center items-center";

  // Normalize signatory data into a single array so we can render uniformly
  const mergedSignatories: Array<{
    src?: string;
    name?: string;
    title?: string;
  }> = [
    { src: signatureUrl1, name: signatoryName1, title: signatoryTitle1 },
    { src: signatureUrl2, name: signatoryName2, title: signatoryTitle2 },
    ];
  
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className={containerClass}
      style={{ transform: `scale(${scale})`, backgroundColor: "transparent" }}
    >
      <div
        className="flex justify-center bg-[#FEFEFD] items-center shadow-md px-16 py-10 rounded-lg relative overflow-hidden text-[#4D4D4D]"
        style={{ width: "700px" }}
      >
        {/* Repeating wavy background */}
        <div className="z-0 w-full h-full">
          {Array.from({ length: 32 }).map((_, i) => (
            <img
              key={i}
              src={wavy}
              alt=""
              className="absolute w-full left-0"
              style={{ top: `${i * 20}px` }}
            />
          ))}
        </div>

        {/* Corner decorations */}
        <div className="z-10">
          <div className="absolute top-0 left-0">
            <img src={rect4} alt="" className="" style={{ width: "300px" }} />
          </div>
          <div className="absolute top-0 right-0">
            <img src={rect} alt="" className="" style={{ width: "380px" }} />
          </div>
          <div className="absolute bottom-0 right-0">
            <img src={rect2} alt="" className="" style={{ width: "300px" }} />
          </div>
          <div className="absolute bottom-0 left-0">
            <img src={rect3} alt="" className="" style={{ width: "380px" }} />
          </div>
        </div>

        <div className="bg-transparent rounded p-6 w-full z-40 flex flex-col items-center gap-6">
          <div className="flex gap-10 items-center">
            <div className="flex items-center justify-center w-32 h-32 rounded-full border overflow-hidden">
              {organizationLogo ? (
                <img
                  src={organizationLogo}
                  alt={organizationName}
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <p className="uppercase text-sm text-center px-2">
                  {organizationName || "Brand Award"}
                </p>
              )}
            </div>

            <div className="flex flex-col text-center items-start space-y-2">
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: "'Cinzel Decorative', serif" }}
              >
                {header || "CERTIFICATE"}
              </h2>
              {/* <p className="text-xl font-medium text-center">OF APPRECIATION</p> */}
            </div>
          </div>

          <p className="text-center mt-4 font-medium">
            THIS CERTIFICATE IS PROUDLY PRESENTED TO
          </p>

          <p
            className="text-4xl text-center"
            style={{
              width: "500px",
              fontFamily: "'Tangerine', cursive",
              fontWeight: 700,
              borderBottom: "2px solid #000",
              paddingBottom: "8px",
            }}
          >
            {recipientName}
          </p>

          <p className="font-medium text-2xl" style={{fontFamily: 'cursive'}} > {courseTitle || "Course Title"} </p>

          <p className="text-center max-w-2xl px-8">
            {description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."}
          </p>

          <div className="mt-20 flex justify-between items-end">
            <div className="flex gap-8 justify-center items-center mt-5">
              {/* Signature 1 - Always show if name is provided */}
              {signatoryName1 && (
                <div
                  className="flex flex-col items-center text-center"
                  style={{ marginTop: -20 }}
                >
                  {signatureUrl1 && (
                    <img
                      src={signatureUrl1}
                      alt={signatoryName1}
                      className="w-24 h-16 object-contain"
                      style={{ marginBottom: -12 }}
                    />
                  )}
                  {!signatureUrl1 && (
                    <div className="w-32 border-b-2 border-gray-400 mb-2" />
                  )}
                  <div
                    className="text-sm font-bold"
                    style={{ color: "#4D4D4D" }}
                  >
                    {signatoryName1}
                  </div>
                  {signatoryTitle1 && (
                    <div className="text-xs font-medium">{signatoryTitle1}</div>
                  )}
                </div>
              )}

              {/* Signature 2 - Always show if name is provided */}
              {signatoryName2 && (
                <div
                  className="flex flex-col items-center text-center"
                  style={{ marginTop: -20 }}
                >
                  {signatureUrl2 && (
                    <img
                      src={signatureUrl2}
                      alt={signatoryName2}
                      className="w-24 h-16 object-contain"
                      style={{ marginBottom: -12 }}
                    />
                  )}
                  {!signatureUrl2 && (
                    <div className="w-32 border-b-2 border-gray-400 mb-2" />
                  )}
                  <div
                    className="text-sm font-bold"
                    style={{ color: "#4D4D4D" }}
                  >
                    {signatoryName2}
                  </div>
                  {signatoryTitle2 && (
                    <div className="text-xs font-medium">{signatoryTitle2}</div>
                  )}
                </div>
              )}

              {/* Date display */}
              {date && (
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 mt-5 mb-2" />
                  <div
                    className="text-sm font-medium"
                    style={{ color: "#4D4D4D" }}
                  >
                    {formattedDate || "DATE"}
                  </div>
                  <div className="text-xs font-bold ">Date</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
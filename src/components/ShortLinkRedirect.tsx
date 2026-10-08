import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resolveShortLink } from "../utils/shortLinkApi";
import { Award, AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";

/**
 * ShortLinkRedirect Component
 * Handles custom short certificate URLs like /c/:suffix
 * Resolves the short suffix, increments click analytics, and redirects to the certificate
 */
export default function ShortLinkRedirect() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isResolving, setIsResolving] = useState<boolean>(true);

  const resolveAndRedirect = async () => {
    if (!code) {
      setError("No short link provided.");
      setIsResolving(false);
      return;
    }

    try {
      setIsResolving(true);
      setError(null);

      const res = await resolveShortLink(code);

      if (!res.success) {
        setError(res.error || `Short link "/c/${code}" was not found or has been moved.`);
        setIsResolving(false);
        return;
      }

      // Determine redirect path
      let redirectPath = "";
      if (res.targetUrl) {
        redirectPath = res.targetUrl.startsWith("/")
          ? res.targetUrl
          : `/${res.targetUrl}`;
      } else if (res.organizationId && res.courseId && res.certificateId) {
        redirectPath = `/certificate/${res.organizationId}/${res.courseId}/${res.certificateId}`;
      } else {
        setError("Invalid destination for this short link.");
        setIsResolving(false);
        return;
      }

      console.log(`🔗 Short link "/c/${code}" resolved! Redirecting to ${redirectPath}`);
      navigate(redirectPath, {
        replace: true,
        state: {
          certificateData: res.certificateData,
          fromShortLink: code,
        },
      });
    } catch (err: any) {
      console.error("Short link redirect error:", err);
      setError(err.message || "Failed to resolve short link.");
      setIsResolving(false);
    }
  };

  useEffect(() => {
    resolveAndRedirect();
  }, [code]);

  // Loading state
  if (isResolving && !error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-sm w-full bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-orange-100">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-orange-200 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
            <Award className="w-8 h-8 text-primary absolute inset-0 m-auto" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Loading Certificate...
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            Resolving secure link <span className="font-mono font-semibold text-primary">/c/{code}</span>
          </p>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-2/3 animate-indeterminate"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Link Not Found</h2>
        <p className="text-sm text-gray-500 font-mono bg-gray-50 py-1.5 px-3 rounded-lg border inline-block mb-4">
          certifyer.online/c/{code}
        </p>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
          {error || "The custom certificate link you visited does not exist or may have been updated."}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={resolveAndRedirect}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Go to Certifyer
          </button>
        </div>
      </div>
    </div>
  );
}

import { nanoid } from 'nanoid';
import { encryptCertificateData } from './encryption';

/**
 * Generate a unique certificate ID using nanoid
 * Format: CERT-[timestamp]-[8-character-nanoid]
 * Example: CERT-1234567890-V1StGXR8
 */
export const generateCertificateId = (): string => {
  const timestamp = Date.now();
  const id = `CERT-${timestamp}-${nanoid(8).toUpperCase()}`;
  return id;
};

/**
 * Generate a shorter certificate ID for demo purposes
 * Format: DEMO-[6-character-nanoid]
 * Example: DEMO-V1StGX
 */
export const generateDemoCertificateId = (): string => {
  return `DEMO-${nanoid(6).toUpperCase()}`;
};

/**
 * Generate certificate URL for student access (LEGACY - unencrypted)
 * @param organizationId - The organization ID
 * @param courseName - The course name
 * @param certificateId - The certificate ID
 * @returns Complete certificate URL
 * @deprecated Use generateSecureCertificateUrl instead for encrypted links
 */
export const generateCertificateUrl = (
  organizationId: string, 
  courseName: string, 
  certificateId: string
): string => {
  return `${window.location.origin}/certificate/${organizationId}/${courseName}/${certificateId}`;
};

/**
 * Generate secure certificate URL with time-based encryption
 * @param organizationId - The organization ID
 * @param courseName - The course name
 * @param certificateId - The certificate ID
 * @param expirationDays - Number of days until link expires (default: 365)
 * @returns Complete encrypted certificate URL
 */
export const generateSecureCertificateUrl = (
  organizationId: string, 
  courseName: string, 
  certificateId: string,
  expirationDays: number = 365
): string => {
  const encryptedData = encryptCertificateData(organizationId, courseName, certificateId, expirationDays);
  return `${window.location.origin}/certificate/${encryptedData}`;
};

/**
 * Generate SHORT certificate URL (6-character code) - NEW!
 * This creates a much shorter, more shareable URL
 * @param shortCode - The 6-character short code
 * @returns Complete short certificate URL
 * @example https://certifyer.online/c/Ab3xY9
 */
export const generateShortCertificateUrl = (shortCode: string): string => {
  console.warn('generateShortCertificateUrl called but short links are disabled');
  return '/';
};

/**
 * Validate if a string looks like a nanoid-based certificate ID
 * @param id - The ID to validate
 * @returns true if it looks like a valid certificate ID
 */
export const isValidCertificateId = (id: string): boolean => {
  // Check if it starts with CERT- or DEMO- and has appropriate format
  return (
    /^CERT-\d+-[A-Z0-9]{8}$/.test(id) || // CERT-timestamp-8chars
    /^DEMO-[A-Z0-9]{6}$/.test(id)        // DEMO-6chars
  );
};

/**
 * Generate a unique course ID using nanoid
 * Format: COURSE-[8-character-nanoid]
 * Example: COURSE-V1STGXR8
 */
export const generateCourseId = (): string => {
  return `COURSE-${nanoid(8).toUpperCase()}`;
};

/**
 * Normalize certificate URL (remove leading slash if present)
 * @param url - URL to normalize
 * @returns Normalized URL without leading slash
 */
export const normalizeCertificateUrl = (url: string): string => {
  const normalized = url.startsWith('/') ? url.slice(1) : url;
  return normalized;
};

/**
 * Build full certificate URL with proper hash routing
 * @param certificateUrl - The certificate URL path (can be encrypted or plain)
 * @returns Full URL with hash routing
 */
export const buildFullCertificateUrl = (certificateUrl: string | undefined): string => {
  if (!certificateUrl || certificateUrl.trim() === '') {
    console.error('❌ ERROR: Certificate URL is empty or undefined!');
    return '/';
  }
  
  const normalized = normalizeCertificateUrl(certificateUrl);
  const fullUrl = `${window.location.origin}/${normalized}`;
  return fullUrl;
};

/**
 * Add ordinal suffix to day (e.g., 1 -> "1st", 2 -> "2nd", 3 -> "3rd", 4 -> "4th")
 */
export const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

/**
 * Format a single date or start-to-end date range into a clean certificate date string
 * Examples:
 * - "2025-09-10" to "2025-09-11" => "10th – 11th September, 2025"
 * - "2025-09-25" to "2025-10-05" => "25th September – 5th October, 2025"
 * - "2024-12-28" to "2025-01-10" => "28th December, 2024 – 10th January, 2025"
 * - "2025-09-10" (single) => "September 10, 2025"
 */
export const formatCertificateDateRange = (
  startDate?: string,
  endDate?: string,
  fallbackSingleDate?: string
): string => {
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const startDay = start.getDate();
      const endDay = end.getDate();
      const startMonth = start.toLocaleDateString("en-US", { month: "long" });
      const endMonth = end.toLocaleDateString("en-US", { month: "long" });
      const startYear = start.getFullYear();
      const endYear = end.getFullYear();

      // Same exact day
      if (startDay === endDay && startMonth === endMonth && startYear === endYear) {
        return `${startMonth} ${startDay}, ${startYear}`;
      }

      // Same month & year: "10th – 11th September, 2025"
      if (startMonth === endMonth && startYear === endYear) {
        return `${getOrdinalSuffix(startDay)} – ${getOrdinalSuffix(endDay)} ${startMonth}, ${startYear}`;
      }

      // Different month, same year: "25th September – 5th October, 2025"
      if (startYear === endYear) {
        return `${getOrdinalSuffix(startDay)} ${startMonth} – ${getOrdinalSuffix(endDay)} ${endMonth}, ${startYear}`;
      }

      // Different years: "28th December, 2024 – 10th January, 2025"
      return `${getOrdinalSuffix(startDay)} ${startMonth}, ${startYear} – ${getOrdinalSuffix(endDay)} ${endMonth}, ${endYear}`;
    }
  }

  const dateToFormat = endDate || startDate || fallbackSingleDate;
  if (!dateToFormat) {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const parsed = new Date(dateToFormat);
  if (!isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return dateToFormat;
};
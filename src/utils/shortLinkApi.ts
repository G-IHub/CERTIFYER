import { projectId, publicAnonKey } from "./supabase/info";

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-a611b057`;

export interface ShortLinkRecord {
  code: string;
  organizationId: string;
  courseId: string;
  certificateId: string;
  recipientName?: string;
  courseName?: string;
  targetUrl?: string;
  certificateData?: any;
  createdAt: string;
  clicks: number;
  lastClickedAt?: string | null;
  clickDetails?: Array<{
    timestamp: string;
    userAgent: string;
    referer: string;
    ip?: string;
  }>;
}

export interface CheckShortSuffixResponse {
  available: boolean;
  code?: string;
  isCurrent?: boolean;
  message?: string;
  error?: string;
}

/**
 * Check if a custom short suffix is available
 */
export async function checkShortSuffixAvailability(
  suffix: string,
  certId?: string
): Promise<CheckShortSuffixResponse> {
  try {
    const cleanSuffix = encodeURIComponent(suffix.trim().toLowerCase());
    const query = certId ? `?certId=${encodeURIComponent(certId)}` : "";
    const res = await fetch(`${API_BASE}/short/check/${cleanSuffix}${query}`, {
      headers: {
        Authorization: `Bearer ${publicAnonKey}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        available: false,
        message: data.error || data.message || "Could not check suffix availability",
      };
    }
    return data;
  } catch (error: any) {
    console.error("checkShortSuffixAvailability error:", error);
    return {
      available: false,
      message: error.message || "Network error checking availability",
      error: error.message,
    };
  }
}

/**
 * Create or update a short link for a certificate with optional custom suffix
 */
export async function createShortLink(params: {
  organizationId: string;
  courseId: string;
  certificateId: string;
  customSuffix?: string;
  targetUrl?: string;
  recipientName?: string;
  courseName?: string;
  certificateData?: any;
  oldCode?: string;
}): Promise<{
  success: boolean;
  shortCode?: string;
  shortUrl?: string;
  fullShortUrl?: string;
  error?: string;
}> {
  try {
    const res = await fetch(`${API_BASE}/short/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify(params),
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.error || "Failed to create short link",
      };
    }

    return data;
  } catch (error: any) {
    console.error("createShortLink error:", error);
    return {
      success: false,
      error: error.message || "Network error while creating short link",
    };
  }
}

/**
 * Resolve a short code and track a click
 */
export async function resolveShortLink(code: string): Promise<{
  success: boolean;
  code?: string;
  organizationId?: string;
  courseId?: string;
  certificateId?: string;
  targetUrl?: string;
  recipientName?: string;
  courseName?: string;
  certificateData?: any;
  error?: string;
}> {
  try {
    const cleanCode = encodeURIComponent(code.trim());
    const res = await fetch(`${API_BASE}/short/${cleanCode}`, {
      headers: {
        Authorization: `Bearer ${publicAnonKey}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.error || "Certificate short link not found",
      };
    }

    return data;
  } catch (error: any) {
    console.error("resolveShortLink error:", error);
    return {
      success: false,
      error: error.message || "Failed to resolve short link",
    };
  }
}

/**
 * Get analytics for a specific short link
 */
export async function getShortLinkAnalytics(code: string): Promise<{
  success: boolean;
  analytics?: {
    code: string;
    certificateId: string;
    organizationId: string;
    createdAt: string;
    totalClicks: number;
    lastClickedAt: string | null;
    clicks: Array<{
      timestamp: string;
      userAgent: string;
      referer: string;
    }>;
  };
  error?: string;
}> {
  try {
    const cleanCode = encodeURIComponent(code.trim());
    const res = await fetch(`${API_BASE}/short/${cleanCode}/analytics`, {
      headers: {
        Authorization: `Bearer ${publicAnonKey}`,
      },
    });
    return await res.json();
  } catch (error: any) {
    console.error("getShortLinkAnalytics error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Get all short links for an organization
 */
export async function getOrganizationShortLinks(
  organizationId: string,
  accessToken?: string
): Promise<{
  success: boolean;
  shortLinks?: ShortLinkRecord[];
  totalLinks?: number;
  totalClicks?: number;
  error?: string;
}> {
  try {
    const token = accessToken || publicAnonKey;
    const res = await fetch(`${API_BASE}/short/org/${organizationId}/links`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const data = await res.json();
      return {
        success: false,
        error: data.error || "Failed to fetch organization short links",
      };
    }

    return await res.json();
  } catch (error: any) {
    console.error("getOrganizationShortLinks error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete a short link
 */
export async function deleteShortLink(
  code: string,
  accessToken?: string
): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  try {
    const cleanCode = encodeURIComponent(code.trim());
    const res = await fetch(`${API_BASE}/short/${cleanCode}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken || publicAnonKey}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("deleteShortLink error:", error);
    return { success: false, error: error.message };
  }
}
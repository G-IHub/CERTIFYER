import React, { useState, useEffect, useMemo } from "react";
import {
  Link2,
  Copy,
  Check,
  ExternalLink,
  Edit3,
  QrCode,
  Search,
  Plus,
  Trash2,
  Eye,
  RefreshCw,
  AlertCircle,
  Calendar,
  User,
  Download,
  Award,
  TrendingUp,
  FileText,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { toast } from "sonner";
import { copyToClipboard } from "../utils/clipboard";
import {
  checkShortSuffixAvailability,
  createShortLink,
  deleteShortLink,
  getOrganizationShortLinks,
  type ShortLinkRecord,
} from "../utils/shortLinkApi";
import { generateSecureCertificateUrl } from "../utils/certificateUtils";
import type { Subsidiary } from "../App";

interface ShortLinksViewProps {
  currentOrganization: Subsidiary | null;
  accessToken: string | null;
  allCertificates: any[];
  onRefreshCertificates?: () => void;
}

export default function ShortLinksView({
  currentOrganization,
  accessToken,
  allCertificates,
  onRefreshCertificates,
}: ShortLinksViewProps) {
  const [shortLinks, setShortLinks] = useState<ShortLinkRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Filter tab: "all" (active short links) vs "unlinked" (certificates without short link)
  const [activeFilter, setActiveFilter] = useState<"all" | "unlinked">("all");

  // Create / Edit modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [customSuffixInput, setCustomSuffixInput] = useState<string>("");
  const [editingOldCode, setEditingOldCode] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Live availability check state
  const [availabilityStatus, setAvailabilityStatus] = useState<{
    checking: boolean;
    available?: boolean;
    message?: string;
  }>({ checking: false });

  // QR Code Modal State
  const [qrModalData, setQrModalData] = useState<{
    code: string;
    url: string;
    title: string;
  } | null>(null);

  // Load organization short links from backend
  const fetchShortLinks = async () => {
    if (!currentOrganization?.id) return;
    try {
      setIsLoading(true);
      const res = await getOrganizationShortLinks(
        currentOrganization.id,
        accessToken || undefined
      );
      if (res.success && Array.isArray(res.shortLinks)) {
        setShortLinks(res.shortLinks);
      }
    } catch (err) {
      console.error("Failed to fetch short links:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShortLinks();
  }, [currentOrganization?.id, accessToken]);

  // Map certificates by ID for quick lookup and fallback
  const certsById = useMemo(() => {
    const map = new Map<string, any>();
    allCertificates.forEach((c) => {
      if (c.id) map.set(c.id, c);
    });
    return map;
  }, [allCertificates]);

  // Short links enriched with certificate details and merged with any certificate shortCode
  const enrichedShortLinks = useMemo(() => {
    const list = [...shortLinks];
    const existingCertIds = new Set(list.map((s) => s.certificateId));
    const existingCodes = new Set(list.map((s) => s.code));

    // Also include any certificate from allCertificates that has a shortCode
    allCertificates.forEach((c) => {
      if (c.id && c.shortCode && !existingCertIds.has(c.id) && !existingCodes.has(c.shortCode)) {
        list.push({
          code: c.shortCode,
          organizationId: c.organizationId || currentOrganization?.id || "",
          courseId: c.courseId || c.courseName || "",
          certificateId: c.id,
          recipientName: c.recipientName || c.studentName || c.name || "Student",
          courseName: c.courseName || "Course",
          targetUrl: c.certificateUrl || `/certificate/${c.id}`,
          createdAt: c.generatedAt || new Date().toISOString(),
          clicks: 0,
        });
        existingCertIds.add(c.id);
        existingCodes.add(c.shortCode);
      }
    });

    return list.map((link) => {
      const matchedCert = certsById.get(link.certificateId);
      return {
        ...link,
        recipientName:
          link.recipientName ||
          matchedCert?.recipientName ||
          matchedCert?.studentName ||
          "Student",
        courseName:
          link.courseName ||
          matchedCert?.courseName ||
          link.courseId ||
          "Course",
        generatedAt: matchedCert?.generatedAt || link.createdAt,
      };
    });
  }, [shortLinks, certsById, allCertificates, currentOrganization?.id]);

  // Set of certificate IDs that already have short links
  const linkedCertIds = useMemo(() => {
    return new Set(enrichedShortLinks.map((s) => s.certificateId));
  }, [enrichedShortLinks]);

  // Certificates that do not yet have a short link assigned
  const unlinkedCertificates = useMemo(() => {
    return allCertificates.filter((cert) => !linkedCertIds.has(cert.id));
  }, [allCertificates, linkedCertIds]);

  // Analytics aggregates
  const totalClicks = useMemo(() => {
    return enrichedShortLinks.reduce((sum, item) => sum + (item.clicks || 0), 0);
  }, [enrichedShortLinks]);

  const avgClicks = useMemo(() => {
    if (enrichedShortLinks.length === 0) return 0;
    return (totalClicks / enrichedShortLinks.length).toFixed(1);
  }, [enrichedShortLinks, totalClicks]);

  const topLink = useMemo(() => {
    if (enrichedShortLinks.length === 0) return null;
    return [...enrichedShortLinks].sort((a, b) => (b.clicks || 0) - (a.clicks || 0))[0];
  }, [enrichedShortLinks]);

  // Real-time suffix debounced availability check
  useEffect(() => {
    const trimmed = customSuffixInput.trim().toLowerCase();
    if (!trimmed || !isModalOpen) {
      setAvailabilityStatus({ checking: false });
      return;
    }

    if (editingOldCode && trimmed === editingOldCode.toLowerCase()) {
      setAvailabilityStatus({
        checking: false,
        available: true,
        message: "Current suffix",
      });
      return;
    }

    if (trimmed.length < 2) {
      setAvailabilityStatus({
        checking: false,
        available: false,
        message: "Suffix must be at least 2 characters",
      });
      return;
    }

    setAvailabilityStatus({ checking: true });
    const timer = setTimeout(async () => {
      const res = await checkShortSuffixAvailability(
        trimmed,
        selectedCert?.id
      );
      setAvailabilityStatus({
        checking: false,
        available: res.available,
        message:
          res.message ||
          (res.available ? "Suffix is available!" : "This suffix is not available"),
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [customSuffixInput, isModalOpen, selectedCert, editingOldCode]);

  // Sanitize suffix input on change
  const handleSuffixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-_]/g, "");
    setCustomSuffixInput(val);
  };

  // Open Create / Edit modal
  const openEditModal = (cert: any, currentCode?: string) => {
    setSelectedCert(cert);
    setEditingOldCode(currentCode || null);
    setCustomSuffixInput(currentCode || "");
    setIsModalOpen(true);
  };

  // Save / Update Short Link
  const handleSaveShortLink = async () => {
    if (!selectedCert || !currentOrganization?.id) return;

    if (
      customSuffixInput.trim() &&
      availabilityStatus.available === false &&
      customSuffixInput !== editingOldCode
    ) {
      toast.error("Please pick an available suffix before saving.");
      return;
    }

    try {
      setIsSaving(true);
      const courseSlug =
        selectedCert.courseName?.toLowerCase().replace(/\s+/g, "-") ||
        selectedCert.courseId ||
        "course";

      // Compute secure encrypted target URL
      const encryptedTargetUrl = generateSecureCertificateUrl(
        currentOrganization.id,
        courseSlug,
        selectedCert.id,
        365
      ).replace(`${window.location.origin}/`, "");

      const res = await createShortLink({
        organizationId: currentOrganization.id,
        courseId: selectedCert.courseId || courseSlug,
        certificateId: selectedCert.id,
        customSuffix: customSuffixInput.trim() || undefined,
        targetUrl: encryptedTargetUrl,
        recipientName: selectedCert.recipientName || selectedCert.name || "",
        courseName: selectedCert.courseName || "",
        certificateData: selectedCert,
        oldCode: editingOldCode || undefined,
      });

      if (res.success && res.shortCode) {
        toast.success(
          editingOldCode
            ? `Short link updated to /c/${res.shortCode}`
            : `Short link /c/${res.shortCode} created!`
        );

        // Optimistically update local state immediately
        const createdRecord: ShortLinkRecord = {
          code: res.shortCode,
          organizationId: currentOrganization.id,
          courseId: selectedCert.courseId || courseSlug,
          certificateId: selectedCert.id,
          recipientName: selectedCert.recipientName || selectedCert.name || "",
          courseName: selectedCert.courseName || "",
          targetUrl: encryptedTargetUrl,
          createdAt: new Date().toISOString(),
          clicks: 0,
        };

        setShortLinks((prev) => [
          createdRecord,
          ...prev.filter(
            (p) => p.code !== res.shortCode && p.certificateId !== selectedCert.id
          ),
        ]);

        setIsModalOpen(false);
        fetchShortLinks();
        if (onRefreshCertificates) onRefreshCertificates();
      } else {
        toast.error(res.error || "Failed to save short link");
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Short Link
  const handleDeleteShortLink = async (code: string) => {
    if (!confirm(`Are you sure you want to delete the short link "/c/${code}"?`)) {
      return;
    }

    try {
      const res = await deleteShortLink(code, accessToken || undefined);
      if (res.success) {
        toast.success(`Short link /c/${code} deleted.`);
        setShortLinks((prev) => prev.filter((p) => p.code !== code));
        fetchShortLinks();
        if (onRefreshCertificates) onRefreshCertificates();
      } else {
        toast.error(res.error || "Failed to delete short link");
      }
    } catch (err: any) {
      toast.error(err.message || "Error deleting short link");
    }
  };

  // Copy Short Link to clipboard
  const handleCopyLink = async (code: string) => {
    const fullUrl = `${window.location.origin}/c/${code}`;
    const ok = await copyToClipboard(fullUrl);
    if (ok) {
      setCopiedCode(code);
      toast.success("Short link copied to clipboard!");
      setTimeout(() => setCopiedCode(null), 2500);
    } else {
      toast.error("Failed to copy link");
    }
  };

  // Filtered lists
  const filteredActiveLinks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return enrichedShortLinks;
    return enrichedShortLinks.filter(
      (link) =>
        link.code.toLowerCase().includes(q) ||
        link.recipientName?.toLowerCase().includes(q) ||
        link.courseName?.toLowerCase().includes(q) ||
        link.certificateId.toLowerCase().includes(q)
    );
  }, [enrichedShortLinks, searchQuery]);

  const filteredUnlinkedCerts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return unlinkedCertificates;
    return unlinkedCertificates.filter(
      (cert) =>
        cert.recipientName?.toLowerCase().includes(q) ||
        cert.courseName?.toLowerCase().includes(q) ||
        cert.id?.toLowerCase().includes(q)
    );
  }, [unlinkedCertificates, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header Matching Rest of Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link2 className="w-5 h-5 text-gray-900" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Shorten your Certificate Links
            </h2>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Create branded, memorable links and track engagement in real time
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchShortLinks}
            disabled={isLoading}
            className="h-9"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            {isLoading ? "Refreshing..." : "Refresh"}
          </Button>
          <Button
            size="sm"
            onClick={() => {
              if (unlinkedCertificates.length > 0) {
                openEditModal(unlinkedCertificates[0]);
              } else if (allCertificates.length > 0) {
                openEditModal(allCertificates[0]);
              } else {
                toast.info("Please generate certificates first to create short links.");
              }
            }}
            className="h-9 bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Short Link
          </Button>
        </div>
      </div>

      {/* Analytics Overview Cards Matching Dashboard Pattern */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 md:p-6">
            <CardTitle className="text-xs md:text-sm font-medium text-gray-600">
              Total Short Links
            </CardTitle>
            <Link2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <div className="text-xl md:text-2xl font-bold text-gray-900">
              {enrichedShortLinks.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {allCertificates.length > 0
                ? `${Math.round(
                    (enrichedShortLinks.length / allCertificates.length) * 100
                  )}% of issued certificates`
                : "0 certificates"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 md:p-6">
            <CardTitle className="text-xs md:text-sm font-medium text-gray-600">
              Total Clicks
            </CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <div className="text-xl md:text-2xl font-bold text-gray-900">
              {totalClicks}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total visits tracked across all links
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 md:p-6">
            <CardTitle className="text-xs md:text-sm font-medium text-gray-600">
              Avg. Clicks / Link
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <div className="text-xl md:text-2xl font-bold text-gray-900">
              {avgClicks}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Average engagement per short URL
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 md:p-6">
            <CardTitle className="text-xs md:text-sm font-medium text-gray-600">
              Top Performing
            </CardTitle>
            <Award className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <div className="text-lg md:text-xl font-bold text-gray-900 truncate">
              {topLink ? `/c/${topLink.code}` : "None yet"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {topLink ? `${topLink.clicks} clicks recorded` : "No visits recorded"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <Card>
        <CardContent className="p-6">
          <Tabs
            value={activeFilter}
            onValueChange={(val) => setActiveFilter(val as any)}
            className="w-full space-y-6"
          >
            {/* Search and Filter Tabs Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <TabsList className="bg-gray-100 p-1">
                <TabsTrigger
                  value="all"
                  className="text-xs sm:text-sm font-medium px-4"
                >
                  Active Short Links ({enrichedShortLinks.length})
                </TabsTrigger>
                <TabsTrigger
                  value="unlinked"
                  className="text-xs sm:text-sm font-medium px-4"
                >
                  Needs Short Link ({unlinkedCertificates.length})
                </TabsTrigger>
              </TabsList>

              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={
                    activeFilter === "all"
                      ? "Search short links..."
                      : "Search certificates..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-9"
                />
              </div>
            </div>

            {/* TAB 1: ACTIVE SHORT LINKS */}
            <TabsContent value="all" className="mt-0">
              {isLoading ? (
                <div className="py-16 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3"></div>
                  <p className="text-sm text-gray-500">
                    Loading short links...
                  </p>
                </div>
              ) : filteredActiveLinks.length === 0 ? (
                <div className="py-16 text-center px-4">
                  <Link2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-base font-semibold text-gray-900">
                    {searchQuery
                      ? "No matching short links"
                      : "No Short Links Created Yet"}
                  </h3>
                  <p className="text-sm text-gray-500 max-w-md mx-auto mt-1 mb-5">
                    {searchQuery
                      ? "Try adjusting your search query or reset filters."
                      : "Assign branded short links like /c/react-mastery to your certificates for easy sharing and clean QR codes."}
                  </p>
                  {unlinkedCertificates.length > 0 && !searchQuery && (
                    <Button
                      onClick={() => setActiveFilter("unlinked")}
                      className="bg-primary hover:bg-primary/90 text-white"
                      size="sm"
                    >
                      View Certificates to Shorten ({unlinkedCertificates.length})
                    </Button>
                  )}
                </div>
              ) : (
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
                  {filteredActiveLinks.map((item) => {
                    const fullUrl = `${window.location.origin}/c/${item.code}`;
                    const isCopied = copiedCode === item.code;
                    return (
                      <div
                        key={item.code}
                        className="p-4 sm:p-5 hover:bg-gray-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        {/* Left: Short URL and certificate meta */}
                        <div className="flex items-start gap-3.5 min-w-0">
                          <div className="w-10 h-10 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Link2 className="w-5 h-5 text-primary" />
                          </div>
                          <div className="min-w-0 space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className="font-mono font-semibold text-gray-900 text-base hover:text-primary transition-colors cursor-pointer"
                                onClick={() => handleCopyLink(item.code)}
                                title="Click to copy link"
                              >
                                /c/{item.code}
                              </span>
                              <Badge
                                variant="outline"
                                className="text-xs font-medium text-gray-600 gap-1"
                              >
                                <Eye className="w-3 h-3 text-gray-400" />
                                {item.clicks || 0} {item.clicks === 1 ? "click" : "clicks"}
                              </Badge>
                              {item.courseName && (
                                <Badge variant="secondary" className="text-xs">
                                  {item.courseName}
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                              {item.recipientName && (
                                <span className="flex items-center gap-1 font-medium text-gray-700">
                                  <User className="w-3.5 h-3.5 text-gray-400" />
                                  {item.recipientName}
                                </span>
                              )}
                              <span className="text-gray-400 font-mono text-[11px]">
                                {item.certificateId}
                              </span>
                              {item.lastClickedAt ? (
                                <span className="flex items-center gap-1 text-gray-400">
                                  <Calendar className="w-3 h-3 text-gray-400" />
                                  Last clicked:{" "}
                                  {new Date(item.lastClickedAt).toLocaleDateString()}
                                </span>
                              ) : item.createdAt ? (
                                <span className="flex items-center gap-1 text-gray-400">
                                  <Calendar className="w-3 h-3 text-gray-400" />
                                  Created:{" "}
                                  {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        {/* Right: Action Buttons */}
                        <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                          {/* Copy Link Button */}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyLink(item.code)}
                            className="h-8 text-xs gap-1.5"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-600">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-gray-500" />
                                <span>Copy</span>
                              </>
                            )}
                          </Button>

                          {/* View QR Code Button */}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setQrModalData({
                                code: item.code,
                                url: fullUrl,
                                title: `${item.courseName} (${item.recipientName})`,
                              })
                            }
                            className="h-8 text-xs gap-1.5"
                            title="View QR Code"
                          >
                            <QrCode className="w-3.5 h-3.5 text-gray-500" />
                            <span className="hidden sm:inline">QR Code</span>
                          </Button>

                          {/* Edit Custom Suffix Button */}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const matchedCert =
                                certsById.get(item.certificateId) || {
                                  id: item.certificateId,
                                  courseName: item.courseName,
                                  recipientName: item.recipientName,
                                  courseId: item.courseId,
                                };
                              openEditModal(matchedCert, item.code);
                            }}
                            className="h-8 text-xs gap-1.5"
                            title="Edit Custom Suffix"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-gray-500" />
                            <span>Edit</span>
                          </Button>

                          {/* Open in new tab */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(fullUrl, "_blank")}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-700"
                            title="Open Link"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>

                          {/* Delete Link */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteShortLink(item.code)}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                            title="Delete Short Link"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            {/* TAB 2: UNLINKED CERTIFICATES */}
            <TabsContent value="unlinked" className="mt-0">
              {filteredUnlinkedCerts.length === 0 ? (
                <div className="py-16 text-center px-4">
                  <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-base font-semibold text-gray-900">
                    All Certificates Have Short Links!
                  </h3>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto mt-1 mb-4">
                    Every issued certificate already has a short link assigned.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveFilter("all")}
                  >
                    View Active Short Links
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
                  {filteredUnlinkedCerts.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 sm:p-5 hover:bg-gray-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900 text-sm truncate">
                            {cert.courseName || "Untitled Course"}
                          </h4>
                          <Badge variant="outline" className="text-[11px] text-gray-500">
                            {cert.id}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          {cert.recipientName && (
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5 text-gray-400" />
                              {cert.recipientName}
                            </span>
                          )}
                          {cert.generatedAt && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-gray-400" />
                              {new Date(cert.generatedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          onClick={() => openEditModal(cert)}
                          className="bg-primary hover:bg-primary/90 text-white h-8 text-xs gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Create Short Link
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* CREATE / EDIT SHORT LINK DIALOG */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Link2 className="w-5 h-5 text-primary" />
              {editingOldCode ? "Edit Short Link" : "Create Short Link"}
            </DialogTitle>
            <DialogDescription>
              Assign a custom suffix for easy certificate sharing and verification.
            </DialogDescription>
          </DialogHeader>

          {selectedCert && (
            <div className="space-y-4 py-2">
              {/* Target Certificate Summary */}
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200/80 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-600">Course:</span>
                  <span className="text-gray-900 font-medium">
                    {selectedCert.courseName || "Certificate"}
                  </span>
                </div>
                {selectedCert.recipientName && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-600">Recipient:</span>
                    <span className="text-gray-900 font-medium">
                      {selectedCert.recipientName}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-600">Certificate ID:</span>
                  <span className="font-mono text-gray-500">{selectedCert.id}</span>
                </div>
              </div>

              {/* Suffix Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block">
                  Custom Suffix / URL Slug
                </label>
                <div className="flex items-center rounded-md border border-input focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 overflow-hidden bg-background">
                  <span className="bg-muted text-muted-foreground px-3 py-2 text-sm font-mono border-r select-none">
                    certifyer.online/c/
                  </span>
                  <input
                    type="text"
                    value={customSuffixInput}
                    onChange={handleSuffixChange}
                    placeholder="my-custom-suffix"
                    className="flex-1 px-3 py-2 text-sm font-mono bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
                    autoFocus
                  />
                </div>

                {/* Live Availability Status */}
                <div className="text-xs flex items-center gap-1.5 pt-0.5 min-h-[20px]">
                  {availabilityStatus.checking ? (
                    <span className="text-muted-foreground flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Checking availability...
                    </span>
                  ) : availabilityStatus.available === true ? (
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {availabilityStatus.message}
                    </span>
                  ) : availabilityStatus.available === false ? (
                    <span className="text-destructive font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {availabilityStatus.message}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      {availabilityStatus.message || "Enter lowercase letters, numbers, hyphens"}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Suggestions */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-medium text-muted-foreground">Quick suggestions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    selectedCert.recipientName
                      ? `${selectedCert.recipientName.toLowerCase().replace(/\s+/g, "-")}-cert`
                      : null,
                    selectedCert.courseName
                      ? `${selectedCert.courseName.toLowerCase().replace(/\s+/g, "-").slice(0, 20)}`
                      : null,
                    `cert-${Date.now().toString().slice(-6)}`,
                  ]
                    .filter(Boolean)
                    .map((suggestion, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          setCustomSuffixInput(suggestion!.replace(/[^a-z0-9-_]/g, ""))
                        }
                        className="text-[11px] bg-secondary hover:bg-secondary/80 text-secondary-foreground px-2 py-0.5 rounded-md font-mono transition-colors"
                      >
                        +{suggestion}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveShortLink}
              disabled={
                isSaving ||
                (!!customSuffixInput.trim() &&
                  availabilityStatus.available === false &&
                  customSuffixInput !== editingOldCode)
              }
              className="bg-primary hover:bg-primary/90 text-white"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : editingOldCode ? (
                "Update Short Link"
              ) : (
                "Save Short Link"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* QR CODE PREVIEW DIALOG */}
      <Dialog
        open={!!qrModalData}
        onOpenChange={(open) => !open && setQrModalData(null)}
      >
        <DialogContent className="sm:max-w-sm text-center">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center gap-2">
              <QrCode className="w-5 h-5 text-primary" />
              Certificate QR Code
            </DialogTitle>
            <DialogDescription>
              Scan to view the verified certificate instantly
            </DialogDescription>
          </DialogHeader>

          {qrModalData && (
            <div className="space-y-4 py-2">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 inline-block">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                    qrModalData.url
                  )}&color=000000&bgcolor=ffffff&margin=2&qzone=1`}
                  alt="QR Code"
                  className="w-44 h-44 mx-auto rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <p className="font-mono text-sm font-semibold text-primary">
                  /c/{qrModalData.code}
                </p>
                <p className="text-xs text-muted-foreground truncate max-w-xs mx-auto">
                  {qrModalData.title}
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 text-xs gap-1.5"
                  onClick={() => handleCopyLink(qrModalData.code)}
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy Link
                </Button>
                <Button
                  className="flex-1 text-xs gap-1.5 bg-primary hover:bg-primary/90 text-white"
                  onClick={() => {
                    const downloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(
                      qrModalData.url
                    )}&color=000000&bgcolor=ffffff&margin=2&qzone=1`;
                    window.open(downloadUrl, "_blank");
                  }}
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PNG
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import { Loader2, Crown, Eye, Check, AlertCircle } from 'lucide-react';
import { templateApi } from '../utils/api';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import CertificateRenderer from './CertificateRenderer';
import type { Organization } from '../App';

// Error Boundary Component
class TemplateErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Template render error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center p-4 text-gray-500">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span className="text-sm">Preview unavailable</span>
        </div>
      );
    }

    return this.props.children;
  }
}

interface Template {
  id: string;
  name: string;
  description: string;
  config: any;
  type: 'default' | 'custom' | 'premium';
  createdBy?: string;
  createdAt: string;
  isDefault: boolean;
}

interface TemplatesPageProps {
  organization: Organization;
  accessToken?: string | null;
  onSelectTemplate?: (template: Template) => void;
  showBuilderButton?: boolean;
  isPremiumUser?: boolean;
}

export default function TemplatesPage({ 
  organization,
  accessToken,
  onSelectTemplate,
  showBuilderButton = true,
  isPremiumUser = false
}: TemplatesPageProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [isReseeding, setIsReseeding] = useState(false);

  // Load templates on mount
  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setIsLoading(true);
    try {
      const response = await templateApi.getAll();
      console.log('📋 Templates loaded:', response);
      setTemplates(response.templates || []);
    } catch (error: any) {
      console.error('Failed to load templates:', error);
      toast.error(error.message || 'Failed to load templates');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForceReseed = async () => {
    setIsReseeding(true);
    try {
      toast.loading('Reseeding templates...', { id: 'reseed' });
      const response = await templateApi.forceReseed();
      toast.success('Templates reseeded successfully!', { id: 'reseed' });
      console.log('✅ Reseed response:', response);
      
      // Reload templates
      await loadTemplates();
    } catch (error: any) {
      console.error('Failed to reseed templates:', error);
      toast.error(error.message || 'Failed to reseed templates', { id: 'reseed' });
    } finally {
      setIsReseeding(false);
    }
  };

  const handleSelectTemplate = (template: Template) => {
    // Check if user has access to this template
    const isPremiumTemplate = template.type === 'premium';
    if (isPremiumTemplate && !isPremiumUser) {
      toast.error('This is a premium template. Upgrade to premium to use it.');
      return;
    }

    setSelectedTemplateId(template.id);
    if (onSelectTemplate) {
      onSelectTemplate(template);
      toast.success(`Selected template: ${template.name}`);
    }
  };

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
  };

  // Separate templates by type - ensure no duplicates between free and premium
  // Free users can only see free templates, premium users can see all templates
  const freeTemplates = templates.filter(t => t.type !== 'premium' && (t.type === 'default' || t.isDefault));
  const premiumTemplates = isPremiumUser ? templates.filter(t => t.type === 'premium') : [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2>Templates</h2>
          <p className="text-gray-600 mt-1">
            Certificate templates for {organization?.name || 'your organization'}
          </p>
        </div>

        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading templates...</p>
          </div>
        </div>
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2>Templates</h2>
          <p className="text-gray-600 mt-1">
            Certificate templates for {organization?.name || 'your organization'}
          </p>
        </div>

        <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
          <Crown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No templates available</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Default templates haven't been initialized yet. Click below to seed the templates.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={handleForceReseed} disabled={isReseeding}>
              {isReseeding ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Seeding Templates...
                </>
              ) : (
                'Seed Templates'
              )}
            </Button>
            <Button onClick={loadTemplates} variant="outline">
              Reload Templates
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Templates</h2>
          <p className="text-gray-600 mt-1">
            {isPremiumUser 
              ? `${freeTemplates.length} free + ${premiumTemplates.length} premium certificate templates for ${organization?.name || 'your organization'}`
              : `${freeTemplates.length} free certificate templates for ${organization?.name || 'your organization'}`
            }
          </p>
        </div>
      </div>

      {/* Free Templates Grid */}
      {freeTemplates.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-gray-600" />
            <h3>Free Templates</h3>
            <Badge variant="secondary">{freeTemplates.length} Available</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplateId === template.id}
                onSelect={handleSelectTemplate}
                onPreview={handlePreview}
                isPremiumUser={isPremiumUser}
              />
            ))}
          </div>
        </div>
      )}

      {/* Premium Templates Grid */}
      {premiumTemplates.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-primary" />
            <h3>Premium Templates</h3>
            <Badge className="bg-gradient-to-r from-primary to-orange-600 text-white border-0">
              {premiumTemplates.length} Premium
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplateId === template.id}
                onSelect={handleSelectTemplate}
                onPreview={handlePreview}
                isPremiumUser={isPremiumUser}
              />
            ))}
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <PreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onSelect={handleSelectTemplate}
          isPremiumUser={isPremiumUser}
        />
      )}
    </div>
  );
}

// Template Card Component
interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (template: Template) => void;
  onPreview: (template: Template) => void;
  isPremiumUser: boolean;
}

function TemplateCard({ template, isSelected, onSelect, onPreview, isPremiumUser }: TemplateCardProps) {
  const isPremiumTemplate = template.type === 'premium';
  const isLocked = isPremiumTemplate && !isPremiumUser;
  
  const handleSelectClick = () => {
    if (isLocked) {
      toast.error('This is a premium template. Upgrade to use premium templates.');
      return;
    }
    onSelect(template);
  };

  return (
    <div 
      className={`relative border rounded-lg overflow-hidden transition-all hover:shadow-md ${
        isSelected ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-gray-200'
      } ${isLocked ? 'opacity-90' : ''}`}
    >
      {/* Premium Badge Overlay */}
      {isPremiumTemplate && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-gradient-to-r from-primary to-orange-600 text-white border-0 shadow-md">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        </div>
      )}

      {/* Lock Overlay for Non-Premium Users */}
      {isLocked && (
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="bg-white/95 rounded-lg p-4 shadow-lg text-center max-w-[200px]">
            <Crown className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium mb-1">Premium Template</p>
            <p className="text-xs text-gray-600">Upgrade to unlock</p>
          </div>
        </div>
      )}

      {/* Template Preview */}
      <div className="bg-gray-50 p-4 aspect-[4/3] flex items-center justify-center overflow-hidden">
        <TemplateErrorBoundary>
          <div className="transform scale-[0.3] origin-center">
            <CertificateRenderer
              templateId={template.id}
              header="Certificate of Completion"
              courseTitle="Sample Course"
              description="For successfully completing the program"
              date="22nd January 2025"
              recipientName="John Doe"
              isPreview={true}
              mode="template-selection"
            />
          </div>
        </TemplateErrorBoundary>
      </div>

      {/* Template Info */}
      <div className="p-4 space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h4 className="line-clamp-1">{template.name}</h4>
            {template.isDefault && !isPremiumTemplate && (
              <Badge variant="secondary" className="text-xs">
                Free
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {template.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1"
            onClick={() => onPreview(template)}
          >
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button
            size="sm"
            className="flex-1 gap-1"
            onClick={handleSelectClick}
            variant={isSelected ? "default" : "outline"}
            disabled={isLocked}
          >
            {isLocked ? (
              <>
                <Crown className="w-4 h-4" />
                Upgrade
              </>
            ) : isSelected ? (
              <>
                <Check className="w-4 h-4" />
                Selected
              </>
            ) : (
              'Use Template'
            )}
          </Button>
        </div>
      </div>

      {/* Selected Indicator */}
      {isSelected && !isLocked && (
        <div className="absolute top-2 right-2">
          <div className="bg-primary text-white rounded-full p-1">
            <Check className="w-4 h-4" />
          </div>
        </div>
      )}
    </div>
  );
}

// Preview Modal Component
interface PreviewModalProps {
  template: Template;
  onClose: () => void;
  onSelect: (template: Template) => void;
  isPremiumUser: boolean;
}

function PreviewModal({ template, onClose, onSelect, isPremiumUser }: PreviewModalProps) {
  const isPremiumTemplate = template.type === 'premium';
  const isLocked = isPremiumTemplate && !isPremiumUser;

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Trap focus within modal
  useEffect(() => {
    const modal = document.querySelector('[role="dialog"]');
    if (modal) {
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTab);
      firstElement?.focus();

      return () => document.removeEventListener('keydown', handleTab);
    }
  }, []);

  const handleUseTemplate = () => {
    if (isLocked) {
      toast.error('This is a premium template. Upgrade to use premium templates.');
      return;
    }
    onSelect(template);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
      aria-describedby="preview-modal-description"
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="border-b border-gray-200 p-4 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 id="preview-modal-title" className="flex items-center gap-2">
                {template.name}
                {isPremiumTemplate && (
                  <Badge className="bg-gradient-to-r from-primary to-orange-600 text-white border-0">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </h3>
              <p id="preview-modal-description" className="text-sm text-gray-600">
                {template.description}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              aria-label="Close preview"
            >
              ✕
            </Button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-8 flex items-center justify-center bg-gray-50 relative">
          <TemplateErrorBoundary>
            <div className="transform scale-[0.7] origin-center">
              <CertificateRenderer
                templateId={template.id}
                header="Certificate of Completion"
                courseTitle="Advanced Web Development"
                description="For successfully completing the comprehensive web development program"
                date="22nd January 2025"
                recipientName="John Doe"
                isPreview={true}
                mode="template-selection"
              />
            </div>
          </TemplateErrorBoundary>

          {/* Lock Overlay for Preview */}
          {isLocked && (
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white/95 rounded-lg p-6 shadow-lg text-center max-w-sm">
                <Crown className="w-12 h-12 text-primary mx-auto mb-3" />
                <h4 className="font-medium mb-2">Premium Template</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Upgrade to premium to unlock this template and access all premium features.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-200 p-4 sticky bottom-0 bg-white">
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              onClick={handleUseTemplate}
              disabled={isLocked}
            >
              {isLocked ? (
                <>
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Use
                </>
              ) : (
                'Use This Template'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

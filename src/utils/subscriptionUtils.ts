// Subscription and Premium Feature Utilities

export interface SubscriptionStatus {
  organizationId: string;
  plan: string;
  planName: string;
  status: 'active' | 'expired' | 'free';
  expiryDate?: string;
  features?: string[];
}

/**
 * Check if an organization has a premium (active paid) subscription
 */
export function isPremiumOrganization(subscription: SubscriptionStatus | null): boolean {
  if (!subscription) return false;
  return subscription.status === 'active' && subscription.plan !== 'free';
}

/**
 * Check if an organization can access custom templates
 */
export function canAccessCustomTemplates(subscription: SubscriptionStatus | null): boolean {
  return isPremiumOrganization(subscription);
}

/**
 * Check if an organization can use the template builder
 */
export function canUseTemplateBuilder(subscription: SubscriptionStatus | null): boolean {
  return isPremiumOrganization(subscription);
}

/**
 * Check if an organization has unlimited certificate generation
 */
export function hasUnlimitedCertificates(subscription: SubscriptionStatus | null): boolean {
  return isPremiumOrganization(subscription);
}

/**
 * Get certificate generation limit for free users
 */
export function getFreeCertificateLimit(): number {
  return 50; // Free users can generate up to 50 certificates
}

/**
 * Check if organization has reached free tier limit
 */
export function hasReachedFreeLimit(
  subscription: SubscriptionStatus | null,
  certificateCount: number
): boolean {
  if (isPremiumOrganization(subscription)) {
    return false; // Premium users have no limit
  }
  return certificateCount >= getFreeCertificateLimit();
}

/**
 * Get remaining certificates for free tier
 */
export function getRemainingFreeCertificates(
  subscription: SubscriptionStatus | null,
  certificateCount: number
): number {
  if (isPremiumOrganization(subscription)) {
    return Infinity; // Premium users have unlimited
  }
  const limit = getFreeCertificateLimit();
  return Math.max(0, limit - certificateCount);
}

/**
 * Get premium features list
 */
export function getPremiumFeatures(): string[] {
  return [
    'Custom Templates',
    'Template Builder',
    'Unlimited Certificates',
    'Priority Support',
    'Advanced Analytics',
    'Custom Branding',
    'Bulk Certificate Generation',
    'API Access'
  ];
}

/**
 * Get free tier features list
 */
export function getFreeTierFeatures(): string[] {
  return [
    'Basic Templates (7 templates)',
    'Up to 50 Certificates',
    'Standard Support',
    'Basic Analytics'
  ];
}

/**
 * Format subscription expiry message
 */
export function getSubscriptionExpiryMessage(subscription: SubscriptionStatus | null): string {
  if (!subscription || subscription.status === 'free') {
    return 'You are on the Free Plan';
  }
  
  if (subscription.status === 'expired') {
    const expiredDate = subscription.expiryDate 
      ? new Date(subscription.expiryDate).toLocaleDateString()
      : 'recently';
    return `Your subscription expired on ${expiredDate}`;
  }
  
  if (subscription.status === 'active' && subscription.expiryDate) {
    const daysRemaining = Math.ceil(
      (new Date(subscription.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysRemaining < 0) {
      return 'Your subscription has expired';
    } else if (daysRemaining === 0) {
      return 'Your subscription expires today';
    } else if (daysRemaining === 1) {
      return 'Your subscription expires tomorrow';
    } else if (daysRemaining <= 7) {
      return `Your subscription expires in ${daysRemaining} days`;
    } else {
      return `Active until ${new Date(subscription.expiryDate).toLocaleDateString()}`;
    }
  }
  
  return 'Active';
}

/**
 * Check if subscription needs renewal soon (within 7 days)
 */
export function needsRenewalSoon(subscription: SubscriptionStatus | null): boolean {
  if (!subscription || subscription.status !== 'active' || !subscription.expiryDate) {
    return false;
  }
  
  const daysRemaining = Math.ceil(
    (new Date(subscription.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  
  return daysRemaining >= 0 && daysRemaining <= 7;
}

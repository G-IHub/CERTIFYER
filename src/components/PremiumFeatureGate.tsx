import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Crown, Lock, Sparkles, ArrowRight } from 'lucide-react';

interface PremiumFeatureGateProps {
  isPremium: boolean;
  featureName: string;
  children: React.ReactNode;
  onUpgradeClick?: () => void;
  mode?: 'overlay' | 'replace' | 'inline'; // How to display the gate
  showBadge?: boolean; // Show premium badge on the feature
}

export default function PremiumFeatureGate({
  isPremium,
  featureName,
  children,
  onUpgradeClick,
  mode = 'overlay',
  showBadge = true
}: PremiumFeatureGateProps) {
  // If premium, just render the children
  if (isPremium) {
    return <>{children}</>;
  }

  // Overlay mode: Show content but with a locked overlay
  if (mode === 'overlay') {
    return (
      <div className="relative">
        {/* Content (blurred/disabled) */}
        <div className="pointer-events-none opacity-40 blur-sm">
          {children}
        </div>

        {/* Premium Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm">
          <Card className="max-w-md mx-4 border-2 border-primary/20 shadow-xl">
            <CardHeader className="text-center pb-3">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center mb-3">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Premium Feature</CardTitle>
              <CardDescription>
                Upgrade to unlock {featureName}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <p className="text-sm text-gray-600">
                This feature is available exclusively for Premium subscribers. 
                Upgrade now to access unlimited possibilities.
              </p>
              <Button
                onClick={onUpgradeClick}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Upgrade to Premium
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Replace mode: Replace content entirely with upgrade prompt
  if (mode === 'replace') {
    return (
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              <CardTitle>{featureName}</CardTitle>
            </div>
            <Badge className="bg-gradient-to-r from-orange-500 to-amber-600 text-white">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          </div>
          <CardDescription>
            Upgrade to access this feature
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <Sparkles className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-sm text-gray-700">
              This feature is part of our Premium plan. Upgrade now to unlock {featureName} 
              and many more powerful tools.
            </AlertDescription>
          </Alert>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={onUpgradeClick}
              className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
            >
              <Crown className="w-4 h-4 mr-2" />
              View Premium Plans
            </Button>
            <Button variant="outline" className="flex-1">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Inline mode: Show a simple message
  return (
    <Alert className="border-2 border-primary/20 bg-gradient-to-br from-orange-50 to-amber-50">
      <Crown className="h-4 w-4 text-primary" />
      <AlertDescription className="flex items-center justify-between">
        <span className="text-sm">
          <strong>{featureName}</strong> is a Premium feature.
        </span>
        {onUpgradeClick && (
          <Button
            size="sm"
            onClick={onUpgradeClick}
            className="ml-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Upgrade
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}

// Export a hook for checking premium status
export function usePremiumStatus(subscription: any) {
  const isPremium = subscription && subscription.status === 'active' && subscription.plan !== 'free';
  
  return {
    isPremium,
    subscription,
    canAccessFeature: (featureName: string) => isPremium,
  };
}

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { CheckCircle, XCircle, Loader2, RefreshCw, Server } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export default function BackendHealthCheck() {
  const [status, setStatus] = useState<'checking' | 'healthy' | 'error' | 'idle'>('idle');
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const checkHealth = async (attempt = 1, maxAttempts = 4) => {
    setStatus('checking');
    setError(null);
    setResponse(null);
    if (attempt === 1) {
      setLogs([]);
    }
    
    const url = `https://${projectId}.supabase.co/functions/v1/make-server-a611b057/health`;
    
    addLog(`🚀 Starting health check (Attempt ${attempt}/${maxAttempts})...`);
    if (attempt === 1) {
      addLog(`📡 URL: ${url}`);
      addLog(`🔑 Using project: ${projectId}`);
    }

    try {
      const controller = new AbortController();
      // Longer timeout for first attempt (cold start), shorter for retries
      const timeout = attempt === 1 ? 30000 : 15000;
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      addLog(`⏳ Sending request (${timeout/1000}s timeout)...`);
      
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      addLog(`📥 Response received: ${res.status} ${res.statusText}`);
      
      const data = await res.json();
      
      if (res.ok) {
        addLog('✅ Backend is HEALTHY!');
        setStatus('healthy');
        setResponse(data);
      } else {
        addLog(`❌ Backend returned error: ${res.status}`);
        setStatus('error');
        setError(`HTTP ${res.status}: ${JSON.stringify(data)}`);
        setResponse(data);
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        addLog(`⏱️ Request timed out after ${attempt === 1 ? 30 : 15} seconds`);
        
        // Retry if we haven't exhausted attempts
        if (attempt < maxAttempts) {
          const waitTime = 5000; // Wait 5 seconds between retries
          addLog(`⏳ Waiting ${waitTime/1000}s before retry...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          return checkHealth(attempt + 1, maxAttempts);
        } else {
          setError('Request timed out after multiple attempts. The Edge Function may not be deployed or is experiencing issues.');
        }
      } else {
        addLog(`❌ Network error: ${err.message}`);
        
        // Retry on network errors too
        if (attempt < maxAttempts) {
          const waitTime = 5000;
          addLog(`⏳ Waiting ${waitTime/1000}s before retry...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          return checkHealth(attempt + 1, maxAttempts);
        } else {
          setError(`Network error after ${maxAttempts} attempts: ${err.message}`);
        }
      }
      setStatus('error');
    }
  };

  useEffect(() => {
    // Auto-check on mount
    checkHealth();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Backend Health Check</h1>
          <p className="text-gray-600">Verify the Edge Function is running</p>
        </div>

        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              Edge Function Status
            </CardTitle>
            <CardDescription>
              Checking: https://{projectId}.supabase.co/functions/v1/make-server-a611b057/health
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status Badge */}
            <div className="flex items-center gap-3">
              {status === 'checking' && (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  <Badge variant="outline" className="bg-blue-50">Checking...</Badge>
                </>
              )}
              {status === 'healthy' && (
                <>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </>
              )}
              {status === 'error' && (
                <>
                  <XCircle className="w-6 h-6 text-red-600" />
                  <Badge className="bg-red-100 text-red-800">Error</Badge>
                </>
              )}
              {status === 'idle' && (
                <>
                  <Server className="w-6 h-6 text-gray-400" />
                  <Badge variant="outline">Idle</Badge>
                </>
              )}
            </div>

            {/* Retry Button */}
            <Button onClick={checkHealth} disabled={status === 'checking'} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              {status === 'checking' ? 'Checking...' : 'Check Again'}
            </Button>

            {/* Error Message */}
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Response Data */}
            {response && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Response Data:</p>
                <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Logs Card */}
        <Card>
          <CardHeader>
            <CardTitle>Request Logs</CardTitle>
            <CardDescription>Detailed information about the health check request</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm space-y-1 max-h-96 overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-gray-500">No logs yet...</p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="whitespace-pre-wrap break-all">
                    {log}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Instructions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="font-medium text-blue-900 mb-1">🎯 Most Common Solution</p>
              <p className="text-blue-800">The Edge Function needs to be deployed from the Supabase dashboard. This is required for the app to work.</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">1. Deploy the Edge Function</p>
              <p className="text-gray-600 mb-2">Go to your Supabase project → Edge Functions → Deploy the function named "server" or "make-server-a611b057"</p>
              <p className="text-xs text-gray-500">• Make sure the function code is properly uploaded</p>
              <p className="text-xs text-gray-500">• Wait 60 seconds after deployment for it to initialize</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">2. Set Environment Variables (Required)</p>
              <p className="text-gray-600 mb-2">In Edge Function settings, ensure these variables are set:</p>
              <p className="text-xs text-gray-500">• SUPABASE_URL</p>
              <p className="text-xs text-gray-500">• SUPABASE_ANON_KEY</p>
              <p className="text-xs text-gray-500">• SUPABASE_SERVICE_ROLE_KEY</p>
              <p className="text-xs text-gray-500">• SUPABASE_DB_URL</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">3. Handle Cold Starts</p>
              <p className="text-gray-600">First request after deployment takes 30-60 seconds. Click "Check Again" after waiting.</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">4. Check Logs</p>
              <p className="text-gray-600">In Supabase → Edge Functions → Click your function → Logs tab to see errors</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 mb-1">5. Verify Function Code</p>
              <p className="text-gray-600">Ensure the function code at /supabase/functions/server/index.tsx matches your deployed function</p>
            </div>
          </CardContent>
        </Card>

        {/* Project Info */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Project ID:</span>
              <span className="font-mono">{projectId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Edge Function:</span>
              <span className="font-mono">make-server-a611b057</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Health Endpoint:</span>
              <span className="font-mono text-xs">/health</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

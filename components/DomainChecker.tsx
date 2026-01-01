import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle, XCircle, Globe } from 'lucide-react';

// --- 1. HELPER HOOK (Just keep it here for now) ---
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function DomainChecker({
  onDomainChange,
}: {
  onDomainChange: (domain: string, isValid: boolean) => void;
}) {
  const [domain, setDomain] = useState('');
  const debouncedDomain = useDebounce(domain, 500);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!debouncedDomain) {
      setStatus('idle');
      setMessage('');
      onDomainChange('', false);
      return;
    }

    setStatus('loading');

    fetch(
      `http://localhost:8080/api/v1/admin/tenants/check-availability?domain=${encodeURIComponent(debouncedDomain)}`
    )
      .then(res => res.json())
      .then(data => {
        if (data.available) {
          setStatus('success');
          setMessage(data.message);
          onDomainChange(debouncedDomain, true);
        } else {
          setStatus('error');
          setMessage(data.message);
          onDomainChange('', false);
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Server error. Please try again.');
        onDomainChange('', false);
      });
  }, [debouncedDomain, onDomainChange]);

  return (
    <div className="mb-6">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
        Company Domain
      </label>
      <div className="relative">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value.toLowerCase().trim())}
          placeholder="e.g. omnicorp"
          className={`w-full pl-10 pr-10 py-3 border rounded-md outline-none ${
            status === 'error'
              ? 'border-red-500 bg-red-50'
              : status === 'success'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300'
          }`}
        />
        <div className="absolute left-3 top-3.5 text-gray-400">
          <Globe size={18} />
        </div>
        <div className="absolute right-3 top-3.5">
          {status === 'loading' && <Loader2 className="animate-spin text-blue-500" size={18} />}
          {status === 'success' && <CheckCircle className="text-green-600" size={18} />}
          {status === 'error' && <XCircle className="text-red-600" size={18} />}
        </div>
      </div>
      <p className={`text-xs mt-1 h-4 ${status === 'error' ? 'text-red-600' : 'text-green-600'}`}>
        {message}
      </p>
    </div>
  );
}

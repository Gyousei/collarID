import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { generateQrDataUrl } from '../utils/qrCode';
import { QrCode, Download, Printer, X, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';

interface CollarBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CollarBadgeModal: React.FC<CollarBadgeModalProps> = ({ isOpen, onClose }) => {
  const { profile, showToast } = useProfile();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [targetUrl, setTargetUrl] = useState<string>('');
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const current = window.location.href;
      setTargetUrl(current);
      generateQrDataUrl(current, 360).then(data => {
        setQrDataUrl(data);
      });
    }
  }, [isOpen]);

  const handleCustomUrlChange = async (newUrl: string) => {
    setTargetUrl(newUrl);
    if (newUrl.trim()) {
      const data = await generateQrDataUrl(newUrl, 360);
      setQrDataUrl(data);
    }
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `${profile.name.toLowerCase()}-collar-qr.png`;
    a.click();
    showToast('Collar QR image downloaded!', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopiedUrl(true);
      showToast('Profile URL copied to clipboard!', 'success');
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      showToast('Could not copy link', 'alert');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-750 rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-800 text-rose-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Collar QR Badge
              </h2>
              <p className="text-xs text-slate-400">
                Print or attach to collar medallion / lanyard
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Printable Physical Badge Card Preview */}
          <div className="bg-white text-slate-900 rounded-2xl p-5 shadow-xl border border-slate-200 flex flex-col items-center text-center">
            <div className="w-full flex items-center justify-between border-b border-slate-200 pb-2 mb-3 text-left">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-rose-600">
                  Consent & Boundaries
                </p>
                <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                  {profile.name}
                </h3>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-semibold text-slate-500">
                  {profile.pronouns}
                </p>
                <p className="text-[10px] font-medium text-slate-400">
                  {profile.roles[0] || 'Scene Profile'}
                </p>
              </div>
            </div>

            {/* QR Code Canvas */}
            <div className="p-2.5 bg-white rounded-xl border border-slate-150 shadow-inner my-1">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={`QR code for ${profile.name}'s collar profile`}
                  className="w-48 h-48 object-contain"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center bg-slate-100 text-slate-400 text-xs">
                  Generating QR...
                </div>
              )}
            </div>

            <p className="text-[11px] font-bold text-slate-800 mt-2 tracking-tight">
              SCAN COLLAR TO VIEW BOUNDARIES & SAFETY
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5 max-w-xs">
              Check nonverbal signals, limits (Red/Yellow/Green), and emergency protocols
            </p>

            {/* Emergency footnote */}
            <div className="w-full mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-600">
              <span className="font-semibold text-rose-700">RED = Stop / Release</span>
              <span>Handler: {profile.emergencyContact.phone}</span>
            </div>
          </div>

          {/* URL Management */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
            <label className="text-[11px] font-medium text-slate-400 block mb-1">
              Scanned Destination URL:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={targetUrl}
                onChange={e => handleCustomUrlChange(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-750 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-slate-600 font-mono truncate"
              />
              <button
                onClick={copyUrl}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium shrink-0 flex items-center gap-1"
                title="Copy link"
              >
                {copiedUrl ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copy</span>
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={handleDownloadQr}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 active:scale-95 transition-all min-h-[44px]"
            >
              <Download className="w-4 h-4 text-slate-300" />
              <span>Download PNG</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all min-h-[44px]"
            >
              <Printer className="w-4 h-4" />
              <span>Print Badge</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

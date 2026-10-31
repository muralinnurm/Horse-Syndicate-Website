import React, { useState, useEffect } from 'react';
import { X, Settings, Mail, Phone, MapPin, Check, RefreshCw, FileText } from 'lucide-react';
import { SyndicateConfig, EnquirySubmission } from '../types';

interface CustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: SyndicateConfig;
  onSaveConfig: (newConfig: SyndicateConfig) => void;
}

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [formData, setFormData] = useState<SyndicateConfig>(config);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>([]);

  useEffect(() => {
    setFormData(config);
  }, [config]);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem('elysian_enquiries');
        if (stored) {
          setEnquiries(JSON.parse(stored));
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const clearEnquiries = () => {
    localStorage.removeItem('elysian_enquiries');
    setEnquiries([]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] text-[#161B18] shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#EAE6DB] pb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#8A826B]" />
                <h3 className="text-lg font-bold tracking-tight">
                  Syndicate Settings
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#EFECE3] hover:bg-[#E2DDD0] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#57615A] leading-relaxed">
              Configure your syndicate’s operational details, destination email
              for leads, and inspect received registrations.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#161B18]">
                  Syndicate Name
                </label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) =>
                    setFormData({ ...formData, brandName: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D9D5CA] text-xs font-semibold text-[#161B18]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#161B18]">
                  Designated Email Destination
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, contactEmail: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D9D5CA] text-xs font-medium text-[#161B18]"
                />
                <span className="text-[10px] text-[#736E5C] block">
                  Enquiries from the landing page route here.
                </span>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#161B18]">
                  Phone Concierge
                </label>
                <input
                  type="text"
                  value={formData.contactPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPhone: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D9D5CA] text-xs font-medium text-[#161B18]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#161B18]">
                  Headquarters / Training Centers
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D9D5CA] text-xs font-medium text-[#161B18]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#161B18] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#303B33] flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-[#ECE7D1]" />
                    <span>Configuration Updated</span>
                  </>
                ) : (
                  <span>Save Configuration</span>
                )}
              </button>
            </form>

            {/* Received Inbound Registrations */}
            <div className="pt-6 border-t border-[#EAE6DB] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#161B18]">
                  Received Enquiries ({enquiries.length})
                </span>
                {enquiries.length > 0 && (
                  <button
                    onClick={clearEnquiries}
                    className="text-[10px] text-red-600 hover:underline cursor-pointer"
                  >
                    Clear Records
                  </button>
                )}
              </div>

              {enquiries.length === 0 ? (
                <div className="p-4 bg-[#F2EFE9] rounded-2xl text-xs text-[#736E5C] text-center">
                  No submissions yet. Test the enquiry form on the page to verify!
                </div>
              ) : (
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-3 bg-white rounded-xl border border-[#E5E1D5] text-xs space-y-1 shadow-xs"
                    >
                      <div className="flex items-center justify-between font-bold text-[#161B18]">
                        <span>{enq.fullName}</span>
                        <span className="text-[10px] text-[#736E5C]">
                          {new Date(enq.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#555E57]">
                        {enq.email} · {enq.phone}
                      </div>
                      <div className="text-[10px] text-[#8A826B] font-semibold">
                        {enq.horseInterest} ({enq.shareInterest})
                      </div>
                      {enq.message && (
                        <div className="text-[11px] text-[#444D46] italic pt-1 border-t border-[#F2EFE9]">
                          "{enq.message}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-[#EAE6DB] flex items-center justify-between text-xs text-[#736E5C]">
            <span>Elysian Syndicate Control</span>
            <button
              onClick={onClose}
              className="text-[#161B18] font-bold hover:underline cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

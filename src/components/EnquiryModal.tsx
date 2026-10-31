import React, { useState } from 'react';
import { X, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Horse, EnquirySubmission } from '../types';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  horses: Horse[];
  destinationEmail: string;
  initialHorse?: string;
  onSubmissionSuccess?: (submission: EnquirySubmission) => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  horses,
  destinationEmail,
  initialHorse = 'General Syndicate Interest',
  onSubmissionSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [horseInterest, setHorseInterest] = useState(initialHorse);
  const [shareInterest, setShareInterest] = useState('5% Stake (Recommended)');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    if (initialHorse) {
      setHorseInterest(initialHorse);
    }
  }, [initialHorse]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full Name is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) errs.email = 'Email address is required.';
    else if (!emailRegex.test(email.trim())) errs.email = 'Invalid email address.';
    if (!phone.trim()) errs.phone = 'Phone number is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const submission: EnquirySubmission = {
        id: `enq-modal-${Date.now()}`,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        horseInterest,
        shareInterest,
        message: message.trim(),
        submittedAt: new Date().toISOString(),
      };

      try {
        const stored = localStorage.getItem('elysian_enquiries');
        const list = stored ? JSON.parse(stored) : [];
        list.push(submission);
        localStorage.setItem('elysian_enquiries', JSON.stringify(list));
      } catch (err) {
        console.error(err);
      }

      if (onSubmissionSuccess) onSubmissionSuccess(submission);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#121614]/85 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[#FAF9F6] rounded-3xl overflow-hidden shadow-2xl border border-white/20 z-10 my-8 p-6 sm:p-8 text-[#161B18]"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#EFECE3] hover:bg-[#E2DDD0] text-[#161B18] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </motion.button>

            {isSubmitted ? (
              <div className="py-6 text-center space-y-5">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="w-14 h-14 rounded-full bg-[#E8EFEA] text-[#285235] mx-auto flex items-center justify-center"
                >
                  <CheckCircle className="w-7 h-7" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-[#161B18]">
                    Enquiry Registered
                  </h3>
                  <p className="text-xs text-[#57615A] mt-2 leading-relaxed">
                    Thank you for contacting Elysian Syndicate. Our bloodstock team
                    will respond to your email at <span className="font-semibold">{email}</span> within 24 hours.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#161B18] text-white rounded-full hover:bg-[#303B33] cursor-pointer"
                >
                  Close Window
                </motion.button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="pr-8">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#736E5C]">
                    Direct Syndicate Communication
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-[#161B18] mt-0.5">
                    Enquire to Join
                  </h3>
                  <p className="text-xs text-[#57615A] mt-1">
                    Receive the syndicate documentation & upcoming share allocations.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#161B18]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-[#161B18] placeholder-[#9CA39E] focus:outline-none ${
                      errors.fullName ? 'border-red-500' : 'border-[#D9D5CA] focus:border-[#161B18]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600">{errors.fullName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#161B18]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-[#161B18] placeholder-[#9CA39E] focus:outline-none ${
                        errors.email ? 'border-red-500' : 'border-[#D9D5CA] focus:border-[#161B18]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#161B18]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-[#161B18] placeholder-[#9CA39E] focus:outline-none ${
                        errors.phone ? 'border-red-500' : 'border-[#D9D5CA] focus:border-[#161B18]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#161B18]">
                      Horse Preference
                    </label>
                    <select
                      value={horseInterest}
                      onChange={(e) => setHorseInterest(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D9D5CA] text-xs text-[#161B18] focus:outline-none cursor-pointer"
                    >
                      <option value="General Syndicate Interest">General Syndicate Interest</option>
                      {horses.map((h) => (
                        <option key={h.id} value={h.name}>{h.name}</option>
                      ))}
                      <option value="Upcoming Yearling Sales">Upcoming Yearling Sales</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#161B18]">
                      Share Stake
                    </label>
                    <select
                      value={shareInterest}
                      onChange={(e) => setShareInterest(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D9D5CA] text-xs text-[#161B18] focus:outline-none cursor-pointer"
                    >
                      <option value="2.5% Stake">2.5% Stake</option>
                      <option value="5% Stake (Recommended)">5% Stake (Recommended)</option>
                      <option value="10% Leadership Stake">10% Leadership Stake</option>
                      <option value="Undecided">Undecided</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#161B18]">
                    Note or Message (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Optional questions or preferences..."
                    className="w-full px-4 py-2 rounded-xl bg-white border border-[#D9D5CA] text-xs text-[#161B18] placeholder-[#9CA39E] focus:outline-none resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-widest bg-[#161B18] text-white hover:bg-[#303B33] rounded-full transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Submit Interest</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </motion.button>
                <p className="text-[10px] text-center text-[#736E5C]">
                  Dispatched directly to {destinationEmail}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

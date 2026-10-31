import React, { useState } from 'react';
import { CheckCircle, Send, AlertCircle, ShieldCheck, Mail, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { syndicateImages } from '../data/syndicateData';
import { EnquirySubmission, Horse } from '../types';

interface EnquirySectionProps {
  horses: Horse[];
  destinationEmail: string;
  preselectedHorse?: string;
  onSubmissionSuccess?: (submission: EnquirySubmission) => void;
}

export const EnquirySection: React.FC<EnquirySectionProps> = ({
  horses,
  destinationEmail,
  preselectedHorse = '',
  onSubmissionSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [horseInterest, setHorseInterest] = useState(preselectedHorse || 'General Syndicate Interest');
  const [shareInterest, setShareInterest] = useState('5% Stake (Recommended)');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    if (preselectedHorse) {
      setHorseInterest(preselectedHorse);
    }
  }, [preselectedHorse]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    } else if (fullName.trim().length < 2) {
      errs.fullName = 'Please enter a valid full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid email format (e.g. name@example.com).';
    }

    const phoneRegex = /^[\d\s+\-().]{7,20}$/;
    if (!phone.trim()) {
      errs.phone = 'Phone number is required for syndicate accreditation.';
    } else if (!phoneRegex.test(phone.trim())) {
      errs.phone = 'Please provide a valid phone number.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const submission: EnquirySubmission = {
        id: `enq-${Date.now()}`,
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
      } catch (e) {
        console.error('Storage error', e);
      }

      if (onSubmissionSuccess) {
        onSubmissionSuccess(submission);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setHorseInterest('General Syndicate Interest');
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <section
      id="enquire"
      className="relative py-28 md:py-36 bg-[#121614] text-white overflow-hidden"
    >
      {/* Background Image with Dark Atmospheric Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={syndicateImages.enquiryAtmosphere}
          alt="Champion thoroughbred racehorse in enclosure at twilight"
          className="w-full h-full object-cover object-center transform scale-105 opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121614] via-[#121614]/85 to-[#0E1110]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Trust Markers */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.25em] uppercase text-[#ECE7D1]">
                <span className="w-8 h-[1px] bg-[#ECE7D1]" />
                <span>Join the Syndicate</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.12] [text-wrap:balance]">
                Step into the inner circle of thoroughbred racing.
              </h2>

              <p className="text-base sm:text-lg text-[#D5D3CA] leading-relaxed font-normal">
                Register your interest today. Our syndicate manager will contact
                you directly to review upcoming horse shares, syndicate
                disclosure documentation, and private trackwork schedules.
              </p>
            </div>

            {/* Direct Contact Info & Configurable Recipient */}
            <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
              <div className="flex items-center gap-3 text-white/90">
                <Mail className="w-4 h-4 text-[#ECE7D1] shrink-0" />
                <span>
                  <span className="text-white/60 text-xs block">
                    Designated Syndicate Inbox:
                  </span>
                  <a
                    href={`mailto:${destinationEmail}`}
                    className="hover:underline font-medium text-[#ECE7D1]"
                  >
                    {destinationEmail}
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-3 text-white/90">
                <Phone className="w-4 h-4 text-[#ECE7D1] shrink-0" />
                <span>
                  <span className="text-white/60 text-xs block">
                    Private Syndicate Concierge:
                  </span>
                  <span className="font-medium">+1 (859) 428-7900</span>
                </span>
              </div>
            </div>

            {/* Trust & Compliance Note */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#ECE7D1]">
                <ShieldCheck className="w-4 h-4" />
                <span>Confidential & Direct</span>
              </div>
              <p className="text-xs text-[#C9C8C0] leading-relaxed">
                Your enquiry is handled in strict confidence. No spam, no
                aggressive sales outreach. We provide honest equine appraisals and
                transparent co-ownership documentation.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Lead Capture Form */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-[#FAF9F6] text-[#161B18] rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl border border-white/20">
              {isSubmitted ? (
                <div className="py-8 text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="w-16 h-16 rounded-full bg-[#E8EFEA] text-[#285235] mx-auto flex items-center justify-center"
                  >
                    <CheckCircle className="w-8 h-8" />
                  </motion.div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight text-[#161B18]">
                      Enquiry Successfully Received
                    </h3>
                    <p className="text-sm text-[#57615A] max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="font-semibold text-[#161B18]">{fullName}</span>. 
                      Our syndicate director has received your enquiry and will be in touch within 24 hours at{' '}
                      <span className="font-semibold text-[#161B18]">{email}</span>.
                    </p>
                  </div>

                  <div className="p-4 bg-[#F2EFE9] rounded-2xl text-xs text-[#57615A] max-w-md mx-auto text-left space-y-1">
                    <div>
                      <strong>Registered Interest:</strong> {horseInterest}
                    </div>
                    <div>
                      <strong>Stake Preference:</strong> {shareInterest}
                    </div>
                    <div>
                      <strong>Dispatched To:</strong> {destinationEmail}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleReset}
                    className="px-6 py-2.5 text-xs font-semibold tracking-wider uppercase bg-[#161B18] text-white hover:bg-[#303B33] rounded-full transition-colors cursor-pointer"
                  >
                    Submit Another Enquiry
                  </motion.button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="border-b border-[#EAE6DB] pb-4">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#161B18]">
                      Syndicate Ownership Enquiry
                    </h3>
                    <p className="text-xs text-[#736E5C] mt-1">
                      Complete the details below to receive the latest horse prospectus.
                    </p>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-bold uppercase tracking-wider text-[#161B18]"
                    >
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="e.g. William Harrington"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) {
                          setErrors({ ...errors, fullName: '' });
                        }
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-[#161B18] placeholder-[#9CA39E] focus:outline-none transition-all ${
                        errors.fullName
                          ? 'border-red-500 ring-1 ring-red-500'
                          : 'border-[#D9D5CA] focus:border-[#161B18] focus:ring-1 focus:ring-[#161B18]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold uppercase tracking-wider text-[#161B18]"
                      >
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="william@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) {
                            setErrors({ ...errors, email: '' });
                          }
                        }}
                        className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-[#161B18] placeholder-[#9CA39E] focus:outline-none transition-all ${
                          errors.email
                            ? 'border-red-500 ring-1 ring-red-500'
                            : 'border-[#D9D5CA] focus:border-[#161B18] focus:ring-1 focus:ring-[#161B18]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="phone"
                        className="block text-xs font-bold uppercase tracking-wider text-[#161B18]"
                      >
                        Phone Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) {
                            setErrors({ ...errors, phone: '' });
                          }
                        }}
                        className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-[#161B18] placeholder-[#9CA39E] focus:outline-none transition-all ${
                          errors.phone
                            ? 'border-red-500 ring-1 ring-red-500'
                            : 'border-[#D9D5CA] focus:border-[#161B18] focus:ring-1 focus:ring-[#161B18]'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Horse Selection & Share Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="horseInterest"
                        className="block text-xs font-bold uppercase tracking-wider text-[#161B18]"
                      >
                        Horse of Interest
                      </label>
                      <select
                        id="horseInterest"
                        value={horseInterest}
                        onChange={(e) => setHorseInterest(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#D9D5CA] text-sm text-[#161B18] focus:border-[#161B18] focus:ring-1 focus:ring-[#161B18] focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="General Syndicate Interest">
                          General Syndicate Portfolio
                        </option>
                        {horses.map((h) => (
                          <option key={h.id} value={h.name}>
                            {h.name} ({h.gender})
                          </option>
                        ))}
                        <option value="Upcoming Yearling Sales">
                          Upcoming Yearling Sales
                        </option>
                        <option value="Bespoke Private Partnership">
                          Bespoke Private Partnership
                        </option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="shareInterest"
                        className="block text-xs font-bold uppercase tracking-wider text-[#161B18]"
                      >
                        Preferred Share Size
                      </label>
                      <select
                        id="shareInterest"
                        value={shareInterest}
                        onChange={(e) => setShareInterest(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#D9D5CA] text-sm text-[#161B18] focus:border-[#161B18] focus:ring-1 focus:ring-[#161B18] focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="2.5% Stake">2.5% Stake</option>
                        <option value="5% Stake (Recommended)">
                          5% Stake (Recommended)
                        </option>
                        <option value="10% Leadership Stake">
                          10% Leadership Stake
                        </option>
                        <option value="Undecided / Open to Advice">
                          Undecided / Open to Advice
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Optional Message */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="block text-xs font-bold uppercase tracking-wider text-[#161B18]"
                    >
                      Message / Specific Questions (Optional)
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Share any questions regarding training locations, syndicate terms, or racecourse passes..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#D9D5CA] text-sm text-[#161B18] placeholder-[#9CA39E] focus:border-[#161B18] focus:ring-1 focus:ring-[#161B18] focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submission Button */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 text-xs font-bold tracking-widest uppercase bg-[#161B18] hover:bg-[#2B352E] text-white rounded-full transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span>Transmitting Enquiry...</span>
                      ) : (
                        <>
                          <span>Submit Ownership Enquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                    <p className="text-center text-[11px] text-[#736E5C] mt-2.5">
                      Submissions route directly to the designated syndicate manager at{' '}
                      <span className="font-medium text-[#161B18]">{destinationEmail}</span>.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

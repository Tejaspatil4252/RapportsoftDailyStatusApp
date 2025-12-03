// src/pages/Login.jsx - CLEAN & RESPONSIVE
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCalendarDay, FaChartLine, FaUsers, FaCheckCircle,
  FaUser, FaLock, FaBuilding, FaMapMarkerAlt, FaShieldAlt,
  FaSyncAlt, FaArrowRight, FaTimes, FaRocket, FaBell
} from 'react-icons/fa';

const statusImages = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1600',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600'
];

const Login = () => {
  const [formData, setFormData] = useState({
    companyName: 'DailyStatus Pro',
    department: '',
    username: '',
    password: '',
    otp: ''
  });
  
  const [showOtp, setShowOtp] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const statusMetrics = [
    { icon: <FaCalendarDay />, value: '1,247', label: 'Daily Updates' },
    { icon: <FaUsers />, value: '89', label: 'Active Teams' },
    { icon: <FaCheckCircle />, value: '94%', label: 'Completion' },
    { icon: <FaChartLine />, value: '37%', label: 'Productivity' }
  ];

  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = () => {
    if (!formData.department) {
      showToast('Please select your department', 'error');
      return;
    }
    if (!formData.username) {
      showToast('Please enter your username', 'error');
      return;
    }
    if (!formData.password) {
      showToast('Please enter your password', 'error');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setShowOtp(true);
      setIsLoading(false);
      setOtpCountdown(30);
      showToast('OTP sent to your registered email', 'success');
      
      const timer = setInterval(() => {
        setOtpCountdown(prev => prev <= 1 ? (clearInterval(timer), 0) : prev - 1);
      }, 1000);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showOtp || !formData.otp) {
      showToast('Please complete OTP verification', 'error');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      showToast('Login successful! Redirecting...', 'success');
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % statusImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 relative overflow-hidden bg-gradient-to-br from-gray-900 to-blue-900">
      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md px-4 py-3 rounded-lg shadow-lg border-l-4 backdrop-blur-sm ${
              toast.type === 'error' 
                ? 'bg-red-500/95 text-white border-red-600' 
                : 'bg-green-500/95 text-white border-green-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${toast.type === 'error' ? 'bg-red-200' : 'bg-green-200'}`} />
                <span className="text-sm font-medium">{toast.message}</span>
              </div>
              <button onClick={() => setToast({ show: false, message: '', type: '' })}>
                <FaTimes className="text-sm" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background */}
      <div className="absolute inset-0">
        {statusImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentImage === index ? 0.3 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        ))}
      </div>

      {/* SINGLE RESPONSIVE LAYOUT */}
      <div className="w-full max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Left Panel - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 flex-col justify-between p-8">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-white/20 p-3 rounded-xl">
                  <FaRocket className="text-2xl text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white">Daily<span className="font-black">Status</span></h1>
                  <p className="text-white/80 text-sm">Team Productivity Dashboard</p>
                </div>
              </div>

             <div className="grid grid-cols-2 gap-4 mb-8">
  {statusMetrics.map((metric, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
    >
      <div className="flex items-center gap-3">
        {/* Colorful icons based on index */}
        {index === 0 && (
          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg text-white">
            {metric.icon}
          </div>
        )}
        {index === 1 && (
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white">
            {metric.icon}
          </div>
        )}
        {index === 2 && (
          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg text-white">
            {metric.icon}
          </div>
        )}
        {index === 3 && (
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg text-white">
            {metric.icon}
          </div>
        )}
        <div>
          <div className="text-2xl font-bold text-white">{metric.value}</div>
          <div className="text-white/70 text-sm">{metric.label}</div>
        </div>
      </div>
    </motion.div>
  ))}
</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-start gap-3">
                <FaBell className="text-white/60 text-xl mt-1" />
                <p className="text-lg italic text-white/90">
                  "Streamline your team's workflow with daily status updates."
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Form (Full width on mobile, half on desktop) */}
          <div className="w-full lg:w-1/2 bg-white/95 backdrop-blur-sm p-6 md:p-8">
            {/* Mobile Header (only on mobile/tablet) */}
            <div className="lg:hidden text-center mb-6">
              <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg mb-3 inline-flex">
                <FaRocket />
                <h1 className="text-xl font-bold">DailyStatus</h1>
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Welcome Back</h2>
              <p className="text-gray-500 text-sm">Sign in to continue</p>
            </div>

            {/* Mobile Stats (only on mobile/tablet) */}
         <div className="lg:hidden mb-6">
  <div className="flex overflow-x-auto gap-3 pb-2">
    {statusMetrics.map((metric, index) => (
      <div key={index} className="flex-shrink-0 bg-white rounded-lg p-3 min-w-[100px] border border-gray-200 shadow-sm">
        <div className="text-center">
          {/* Colorful icon for each metric */}
          <div className="flex justify-center mb-2">
            {index === 0 && (
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg text-white">
                {metric.icon}
              </div>
            )}
            {index === 1 && (
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white">
                {metric.icon}
              </div>
            )}
            {index === 2 && (
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg text-white">
                {metric.icon}
              </div>
            )}
            {index === 3 && (
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg text-white">
                {metric.icon}
              </div>
            )}
          </div>
          <div className="text-lg font-bold text-gray-800">{metric.value}</div>
          <div className="text-gray-500 text-xs">{metric.label}</div>
        </div>
      </div>
    ))}
  </div>
</div>

            {/* Form Header (desktop) */}
            <div className="hidden lg:block text-center mb-8">
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-500">Sign in to access your dashboard</p>
            </div>

            {/* Form - Same for all devices */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Organization */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization
                </label>
                <div className="relative">
                  <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600"
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-gray-700 bg-white appearance-none"
                  >
                    <option value="">Select department</option>
                    <option value="development">Development</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="operations">Operations</option>
                  </select>
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="Enter username"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg placeholder-gray-400"
                  />
                </div>
              </div>

              {/* OTP Section */}
              <AnimatePresence>
                {showOtp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-3">
                      <label className="text-sm font-medium text-blue-700 mb-2 flex items-center gap-2">
                        <FaShieldAlt className="text-blue-600" />
                        OTP Verification
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="otp"
                          value={formData.otp}
                          onChange={handleChange}
                          required
                          placeholder="6-digit OTP"
                          maxLength="6"
                          className="flex-1 px-4 py-2 border border-blue-300 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={otpCountdown > 0}
                          className={`px-4 py-2 rounded-lg font-medium text-sm ${
                            otpCountdown > 0
                              ? 'bg-gray-100 text-gray-400' 
                              : 'bg-blue-500 text-white'
                          }`}
                        >
                          <FaSyncAlt className="inline mr-2" />
                          {otpCountdown > 0 ? `${otpCountdown}s` : 'Resend'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                {!showOtp ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3.5 rounded-lg font-semibold disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending OTP...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <FaShieldAlt />
                        <span>Send OTP & Continue</span>
                      </div>
                    )}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3.5 rounded-lg font-semibold disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Signing In...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <FaCheckCircle />
                        <span>Access Dashboard</span>
                      </div>
                    )}
                  </button>
                )}

                <div className="text-center">
                  <button type="button" className="text-gray-500 hover:text-blue-600 text-sm hover:underline">
                    Forgot password?
                  </button>
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="text-center mt-6 pt-4 border-t border-gray-100">
              <p className="text-gray-400 text-xs">
                Secure access • Real-time updates • Team collaboration
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
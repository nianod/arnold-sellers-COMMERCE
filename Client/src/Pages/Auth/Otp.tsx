import { useRef, useState,  useEffect } from 'react';
import type {KeyboardEvent} from 'react'
import { Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

type InputProps = {
  length?: number;
};

const Otp = ({ length = 6 }: InputProps) => {
 const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const [OTP, setOTP] = useState<string[]>(Array(length).fill(''));
  const [loading, setLoading] = useState<boolean>(false);
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  

  
  useEffect(() => {
    if (!email) {
      navigate('/signin');
    }
  }, [email, navigate]);

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  const handleTextChange = (input: string, index: number) => {
     
    if (input && !/^\d+$/.test(input)) return;

    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);

    
    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    
    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

  
    if (newPin.every((digit) => digit !== '')) {
      handleVerifyOTP(newPin.join(''));
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
     
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRef.current[index + 1]?.focus();
      e.preventDefault();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRef.current[index - 1]?.focus();
      e.preventDefault();
    }

   
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then(text => {
        const digits = text.replace(/\D/g, '').split('').slice(0, length);
        const newPin = [...OTP];
        digits.forEach((digit, i) => {
          if (i < length) {
            newPin[i] = digit;
          }
        });
        setOTP(newPin);

        const lastFilledIndex = Math.min(digits.length - 1, length - 1);
        inputRef.current[lastFilledIndex]?.focus();
 
        if (newPin.every(digit => digit !== '')) {
          handleVerifyOTP(newPin.join(''));
        }
      });
    }
  };
   const apiUrl = import.meta.env.VITE_HEROKU_URL
  const handleVerifyOTP = async (otpCode: string) => {
    setLoading(true);
    setError('');

    try {
     
      const response = await axios.post(
        `${apiUrl}/api/auth/verify-otp`,
        {
          email,
          otp: otpCode
        }
      );

   
      localStorage.setItem('token', response.data.token);
             
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
         
      }

      navigate('/');

    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
      
      setOTP(Array(length).fill(''));
      inputRef.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = OTP.join('');
    
    if (otpCode.length !== length) {
      setError(`Please enter all ${length} digits`);
      return;
    }

    handleVerifyOTP(otpCode);
  };

  const resendCode = async () => {
    setResendLoading(true);
    setError('');

    try {
      await axios.post(
        `${apiUrl}/api/auth/request-otp`,
        { email }
      );

       
      setOTP(Array(length).fill(''));
      inputRef.current[0]?.focus();

       
      alert('OTP has been resent to your email');

    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to resend OTP');
      }
    } finally {
      setResendLoading(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <div className="flex bg-gray-50 flex-col justify-center min-h-screen items-center px-4">
      <div className='bg-white p-8 rounded-xl shadow-lg max-w-md w-full'>
        <div className="text-center mb-8">
          <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Verify OTP</h2>
          <p className='text-sm text-gray-600'>
            We've sent a {length}-digit code to
          </p>
          <p className='text-sm font-medium text-gray-800 mt-1'>{email}</p>
        </div>

        <form onSubmit={handleManualSubmit}>
          <div className="flex justify-center gap-3 mb-6">
            {Array.from({ length }, (_, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={OTP[index]}
                onChange={(e) => handleTextChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
               ref={(ref) => { inputRef.current[index] = ref;}}

                 className="w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl font-semibold 
                         border-2 border-gray-300 rounded-lg 
                         focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                         transition-all duration-200
                         hover:border-gray-400
                         shadow-sm
                         disabled:bg-gray-100 disabled:cursor-not-allowed"
                autoComplete="one-time-code"
                aria-label={`Digit ${index + 1} of ${length}`}
                disabled={loading}
              />
            ))}
          </div>

          {error && (
            <div className="mb-4 ">
              <p className="text-sm text-red-500 text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || OTP.some(digit => digit === '')}
            className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" />
                Verifying...
              </div>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Didn't receive the code?
          </p>
          <button
            className='text-sm font-medium cursor-pointer text-blue-600 hover:text-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={resendCode}
            disabled={resendLoading || loading}
          >
            {resendLoading ? 'Sending...' : 'Resend code'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;

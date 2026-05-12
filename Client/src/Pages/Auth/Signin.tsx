import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const navigate = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
   
    if(!email) {
      setError('please provide an email')
      setLoading(false)
      return
    }
    
    try {
      const apiUrl = import.meta.env.VITE_HEROKU_URL
      const res =  await axios.post(`${apiUrl}/api/auth/check-user`, {
        email,
       })
        
       if(res.data.exists){
        await axios.post(`${apiUrl}/api/auth/request-otp`, {
          email
        })
        navigate ('/otp', {state: {email}})
       } else {
        navigate ('/credentials', {state: {email}})
       }
       
          
  
    } catch (err: any) {
      setError(err.response?.data || err.message)
    } finally{
      setLoading(false)
    }
    
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <div className='flex flex-col justify-center items-center mb-6'>
          <img 
            src="/download.jpg" 
            alt="logo"
            className='w-24 h-24 rounded-full object-cover mb-4'
          />
          <h1 className="text-2xl font-bold text-gray-800">
            Login to Arnold Sellers
          </h1>
        </div>
 
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className='text-sm'>{error}</p>
          </div>
        )}
        
        <form className="space-y-6" onSubmit={submit}>
                <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Enter your email:
                </label>
                <input
                 
                  type="text"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@gmail.com"
                />
              </div>
          
           
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 cursor-pointer'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Veryfying...
              </div>
            ) : (
              'Proceed'
            )}
          </button>
        </form>
        
        <div className="text-center text-sm text-gray-600 mt-6">
          <p>Serving you beyond your expectations</p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
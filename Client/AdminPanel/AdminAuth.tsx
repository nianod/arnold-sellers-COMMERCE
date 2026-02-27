import { useState } from "react"
import { useNavigate } from 'react-router-dom'

const AdminAuth = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [passcode, setPasscode] = useState<string>("")
  const [success, setSuccess] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [adminId, setAdminId] = useState<string>('')

  const navigate = useNavigate()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    const ADMIN_PASSCODE: string = "12345"
    const ADMIN_ID: string = "commerce"

    setTimeout(() => {
        if (adminId !== ADMIN_ID) {
        setError('Wrong Admin id')
        setLoading(false)
        return
      }
      if (passcode !== ADMIN_PASSCODE) {
        setError("Unknown Passcode")
        setLoading(false)
        return;
      }

      setSuccess("Verified, Redirecting to Admin Dashboard...")
      setLoading(false)
      navigate("/admin/dashboard")

    }, 1000);  
  };

  return (
    <div className="items-center justify-center flex flex-col min-h-screen border">
      <div className="bg-gray-200 gap-7 flex flex-col p-10 rounded">
        <h1 className="font-semibold">Admin Page - Only accessible to Admins</h1>
        <form onSubmit={submit}>
          <p>Verify Your authorization by entering a credentials below</p>
          <div>
          <label className="font-bold block mt-2">Admin Id:</label>
          <input
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            className="border border-gray-500 p-2 rounded outline-blue-700"
            required
          />
          <label className="font-bold mt-2 block">Passcode:</label>
           <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="border border-gray-500 p-2 rounded outline-blue-700"
            required
          />
          </div>

          {error && <p className="text-red-600 mt-1">{error}</p>}
          {success && <p className="text-green-600 mt-1">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`${
              loading
                ? "cursor-not-allowed opacity-40"
                : "hover:bg-blue-700 cursor-pointer"
            } w-full bg-blue-600 text-white px-3 rounded mt-6 py-2`}
          >
            {loading ? "Verifying..." : "Verify and Proceed"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;

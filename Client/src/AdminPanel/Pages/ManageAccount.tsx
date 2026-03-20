import { useState } from "react";

const ManageAccount = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleCancel = () => {
    console.log("Cancelled");
   };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      console.log("Confirmed")

     } catch (err) {
      setError('An error occurred')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inset-0 fixed flex items-center justify-center z-50">
      <div className="bg-blue-900 p-6 rounded-lg">
        <p className="text-white mb-4">Are you sure you want to log out?</p>
        {error && (
          <p className="text-center text-sm text-red-500 mt-2">{error}</p>
        )}
        <div className="flex justify-between space-x-4">
          <button
            onClick={handleCancel}
            className="bg-red-500 cursor-pointer rounded-lg p-2 text-white font-semibold px-3 hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`bg-red-500 p-2 text-white font-semibold rounded-lg px-3 hover:bg-red-700 ${
              loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
          >
            {loading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;

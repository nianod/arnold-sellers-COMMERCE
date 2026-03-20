import { useState, useEffect } from "react"
import axios from "axios"
import { Trash } from "lucide-react"

interface User {
  _id: string
  email: string
  firstName: string
  lastName: string
  mobileNumber: string
}

const Users = () => {

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const API = import.meta.env.VITE_HEROKU_URL
        const token = localStorage.getItem("token")
        console.log('token...', token)
        const { data } = await axios.get(
          `${API}/api/users/users`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setUsers(data.users)
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const del = () =>{
    alert('Deleting....')
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <p className="text-text-dim mb-4">Total Users: {users.length}</p>

      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-text-dim">
            <tr>
              <th className="text-left px-4 py-3">#</th>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Phone</th>
              <th className="text-left px-4 py-3">Actions</th>
  
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-t border-border hover:bg-muted/50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{user.firstName}  {user.lastName}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.mobileNumber}</td>
                <td className="px-4 py-3"><button onClick={del} className="cursor-pointer" title="remove-user"><Trash size={20} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users


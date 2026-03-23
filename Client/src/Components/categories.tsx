import { useState } from "react"

const Categories = () => {
    const [activeTab, setActiveTab] = useState('0')

    const tabs = [
        { id: "0", label: "All"},
        { id: "1", label: "Fashion", },
        { id: "2", label: "Electronics", },
        { id: "3", label: "Textile", },
        { id: "4", label: "Beverages", },
        { id: "5", label: "Stationary", },
        { id: "6", label: "Cosmetics", },
        { id: "7", label: "Fabrics", },
        { id: "8", label: "Jewelerry", }
    ]

    return(
        <nav className="flex justify-center gap-2 mb-4">
            {tabs.map((tab) => (
                <div
                 className="flex justify-center items-center"
                 key={tab.id}>
                    <button 
                    onClick={() => setActiveTab(tab.id)}
                    className={`cursor-pointer border rounded-xl p-3 font-medium border-gray-400 px-3  hover:bg-[#2de09c] ${activeTab === tab.id ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-[#3fcb96]"}`}>
                        {tab.label}
                    </button>
                </div>
            ))}
        </nav>
    )
}

export default Categories


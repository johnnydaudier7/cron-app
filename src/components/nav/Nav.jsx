import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";


const Nav = () => {
  const [activeTab, setActiveTab] = useState("daily");  

  const tabs = ["daily", "weekly", "monthly", "custom"];    
  
  const location = useLocation();
  
  useEffect(() => {

    const currentLocation = location.pathname.replace("/","");
    
    if(!tabs.includes(currentLocation)){
      return
    }else{
      setActiveTab(currentLocation)      
    }
  }, [activeTab,location])

  const handleTabClick = (tab) => {
        setActiveTab(tab);
  };
    
  return (
    <div className="cron-scheduler">      
      <nav className="tabs flex border-b border-gray-700 mb-5">
        {tabs.map((tab) => (
          <NavLink
            to={tab}
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`py-3 px-5 cursor-pointer ${activeTab === tab ? "border-b-2 border-blue-700 font-bold" : "border-none font-normal" }`}
          >
            {tab}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
export default Nav;
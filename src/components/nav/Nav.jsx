import { useState } from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {

    const [activeTab, setActiveTab] = useState("Daily");
    
        const tabs = ["Daily", "Weekly", "Monthly","Custom"];    
    
        const handleTabClick = (tab) => {
        setActiveTab(tab);
      };
    
      return (
        <div className="cron-scheduler">      
          <nav className="tabs" style={{ display: "flex", borderBottom: "1px solid #ddd", marginBottom: "20px" }}>
            {tabs.map((tab) => (
              <NavLink
                to={tab}
                key={tab}
                onClick={() => handleTabClick(tab)}
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                  borderBottom: activeTab === tab ? "2px solid blue" : "none",
                  fontWeight: activeTab === tab ? "bold" : "normal",
                }}
              >
                {tab}
              </NavLink>
            ))}
          </nav>
        </div>
    )
}
export default Nav;
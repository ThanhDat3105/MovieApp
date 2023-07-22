import React, { useState } from "react";
import "./switchTabs.scss";

interface Props {
  data: any;
  onTabChange: (tab: any) => void;
}

export default function SwitchTabs(props: Props) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab: any, index: any) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    props.onTabChange(tab);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {props.data.map((tab: any, index: any) => (
          <span
            key={index}
            className={`tabItem ${selectedTab === index ? "active" : ""}`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left }} />
      </div>
    </div>
  );
}

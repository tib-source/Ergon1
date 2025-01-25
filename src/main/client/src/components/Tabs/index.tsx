import React, { useState } from 'react';
import "../styling/tabs.css";
interface TabProps {
    label: string;
    children: React.ReactNode;
}

interface TabsProps {
    handleFilter: ( type: string) => void;
    children: React.ReactElement<TabProps>[];
}

const Tab: React.FC<TabProps> = ({ children }) => {
    return <div>{children}</div>;
};

const Tabs: React.FC<TabsProps> = ({ children, handleFilter }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number, label: string) => {
        handleFilter(label);
        setActiveTab(index);
    };

    return (
        <div>
            <div className="tab-list">
                {children.map((tab, index) => (
                    <button
                        key={index}
                        className={`tab-button ${index === activeTab ? 'active' : ''}`}
                        onClick={() => handleTabClick(index, tab.props.label)}
                    >
                        {tab.props.label}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {children[activeTab]}
            </div>
        </div>
    );
};

export { Tabs, Tab };
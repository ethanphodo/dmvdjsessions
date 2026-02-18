import { useState, useId } from 'react'

function Tabs({ tabs, defaultTab, onChange, className = '' }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.value)
  const tablistId = useId()

  const handleTabChange = (value) => {
    setActiveTab(value)
    onChange?.(value)
  }

  const handleKeyDown = (e, index) => {
    let newIndex = index

    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % tabs.length
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + tabs.length) % tabs.length
    } else if (e.key === 'Home') {
      newIndex = 0
    } else if (e.key === 'End') {
      newIndex = tabs.length - 1
    } else {
      return
    }

    e.preventDefault()
    const newTab = tabs[newIndex]
    handleTabChange(newTab.value)
    document.getElementById(`${tablistId}-tab-${newTab.value}`)?.focus()
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Content tabs"
        className="flex items-center justify-center gap-4"
      >
        {tabs.map((tab, index) => {
          const isSelected = activeTab === tab.value
          return (
            <button
              key={tab.value}
              id={`${tablistId}-tab-${tab.value}`}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`${tablistId}-panel-${tab.value}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => handleTabChange(tab.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`px-6 py-3 text-sm font-medium uppercase tracking-wide transition-all ${
                isSelected
                  ? 'bg-white text-black'
                  : 'border border-[#333] text-[#888] hover:border-white hover:text-white'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && ` (${tab.count})`}
            </button>
          )
        })}
      </div>

      {tabs.map((tab) => {
        const isSelected = activeTab === tab.value
        return (
          <div
            key={tab.value}
            id={`${tablistId}-panel-${tab.value}`}
            role="tabpanel"
            aria-labelledby={`${tablistId}-tab-${tab.value}`}
            hidden={!isSelected}
            tabIndex={0}
          >
            {isSelected && tab.content}
          </div>
        )
      })}
    </div>
  )
}

export default Tabs

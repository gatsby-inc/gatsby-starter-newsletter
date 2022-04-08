import React from "react"
import { useSelect, UseSelectStateChange } from "downshift"

const Dropdown = ({
  items,
  selectedItem,
  handleSelectedItemChange,
  tabIndex = 0,
}: {
  items: string[]
  selectedItem: string
  handleSelectedItemChange: (changes: UseSelectStateChange<string>) => void
  tabIndex?: number
}) => {
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    selectedItem,
    onSelectedItemChange: handleSelectedItemChange,
  })
  return (
    <div className="dropdown">
      <button type="button" {...getToggleButtonProps()} tabIndex={tabIndex}>
        {selectedItem}
        <div className={`caret ${isOpen ? "up" : "down"}`} />
      </button>
      <ul {...getMenuProps()} className={isOpen ? "open" : ""}>
        {isOpen &&
          items.map((item, index) => (
            <li
              className={highlightedIndex === index ? "highlight" : ""}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Dropdown

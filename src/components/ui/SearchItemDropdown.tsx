// Dropdown.tsx
import React, {useEffect, useRef} from 'react';

interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (value: string) => void;
}

const SearchItemDropdown: React.FC<DropdownProps> = ({ isOpen, onClose, onSelect }) => {
    const options = ["name","tags"];

    if (!isOpen) return null;

    return (
        <div className="absolute mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-40 z-50">
            <div className="space-y-2">
                {options.map((search, key) => (
                    <button
                        key={key}
                        onClick={() => {
                            onSelect(search);
                            onClose();
                        }}
                        className="block w-full text-center px-4 py-2 text-gray-800 hover:bg-violet-400 hover:text-white focus:outline-none"
                    >
                        {search}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchItemDropdown;

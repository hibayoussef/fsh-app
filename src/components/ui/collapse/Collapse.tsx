import { ReactNode, useState } from "react";
import { ChevronDownIcon } from "../../../icons";

const Collapse = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#bdc0c34d] border-solid rounded-[4px] p-2 w-full bg-[#EBEFF1]">
      <button
        type="button"
        className="flex justify-between items-center w-full text-left font-semibold text-[14px] text-placeholderText p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronDownIcon className="w-5 h-5" />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-2 text-gray-700 max-h-[350px] overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Collapse;

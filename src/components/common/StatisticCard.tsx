import { ReactNode } from "react";

interface Props {
  title: string;
  number: string;
  icon: ReactNode;
  className?: string;
}

const StatisticCard = ({
  title,
  number,
  icon,
  className = "bg-white text-mainBlack",
}: Props) => {
  return (
    <div
      className={` shadow-md shadow-black/18 px-8 py-6 space-y-5 rounded-[4px] ${className}`}
    >
      <h3 className=" font-semibold text-base">{title}</h3>
      <div className="flex justify-between items-center">
        <h1 className=" font-semibold text-[28px]">{number}</h1>
        {icon}
      </div>
    </div>
  );
};

export default StatisticCard;

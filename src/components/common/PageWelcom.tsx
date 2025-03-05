import React from "react";

interface Props {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  content: string;
}

const PageWelcom = ({ Icon, content }: Props) => {
  return (
    <div className="space-y-2">
      <div className="p-5 rounded-[4px] border-dashed border border-secondary flex items-center gap-5">
        <Icon width={54} height={54} fill="#49CFB0" />
        <p className="font-[700] text-label text-[14px]">{content}</p>
      </div>
    </div>
  );
};

export default PageWelcom;

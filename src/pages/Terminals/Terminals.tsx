import PageMeta from "../../components/common/PageMeta";
import PageWelcom from "../../components/common/PageWelcom";
import StatisticCard from "../../components/common/StatisticCard";
import PartnersList from "../../components/partners/PartnersList";
import ChartIcon from "../../components/ui/icons/ChartIcon";
import PartnersIcon from "../../components/ui/icons/PartnersIcon";
import TerminalsIcon from "../../components/ui/icons/TerminalsIcon";

const Terminals = () => {
  return (
    <>
      <PageMeta title="FSH" description="Terminals" />
      <div className="space-y-5">
        <h2 className="text-[#222B45] font-semibold">Terminals</h2>
        <div className="space-y-3">
          <PageWelcom
            Icon={TerminalsIcon}
            content="You're now in the Terminals Management page! Here, you can effortlessly view, add, update, or remove terminal details. Keep your terminal operations 
streamlined and efficient to support seamless transactions and successful partnerships—all in one place!"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <StatisticCard
              title="# Total number of terminals"
              number="132"
              icon={<PartnersIcon fill="#64748B" width={30} height={30} />}
            />
            <StatisticCard
              title="Average revenue from terminals"
              number="112"
              icon={<ChartIcon fill="#00FF3A" width={30} height={30} />}
              className="bg-primary text-white"
            />
            <StatisticCard
              title="# Recently added terminals"
              number="54"
              icon={<PartnersIcon fill="#fff" width={30} height={30} />}
              className="bg-[#919293] text-white"
            />
          </div>
        </div>
        <PartnersList />
      </div>
    </>
  );
};

export default Terminals;

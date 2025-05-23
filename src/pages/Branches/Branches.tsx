import BranchesList from "../../components/branches/BranchesList";
import PageMeta from "../../components/common/PageMeta";
import PageWelcom from "../../components/common/PageWelcom";
import StatisticCard from "../../components/common/StatisticCard";
import BranchesIcon from "../../components/ui/icons/BranchesIcon";
import ChartIcon from "../../components/ui/icons/ChartIcon";
import PartnersIcon from "../../components/ui/icons/PartnersIcon";

const Branches = () => {
  return (
    <>
      <PageMeta title="FSH" description="Branches" />
      <div className="space-y-5">
        <h2 className="text-[#222B45] font-semibold">Branches</h2>
        <div className="space-y-3">
          <PageWelcom
            Icon={BranchesIcon}
            content="You're now in the Merchant Management page! Here, you can easily view, add, update, or remove merchant details. Stay organized and manage your 

merchants efficiently to ensure smooth operations and successful partnerships—all in one place!"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <StatisticCard
              title="# Total number of branches"
              number="132"
              icon={<PartnersIcon fill="#64748B" width={30} height={30} />}
            />
            <StatisticCard
              title="Average revenue from branches"
              number="112"
              icon={<ChartIcon fill="#00FF3A" width={30} height={30} />}
              className="bg-primary text-white"
            />
            <StatisticCard
              title="# Recently added branches"
              number="54"
              icon={<PartnersIcon fill="#fff" width={30} height={30} />}
              className="bg-[#919293] text-white"
            />
          </div>
        </div>
        <BranchesList />
      </div>
    </>
  );
};

export default Branches;

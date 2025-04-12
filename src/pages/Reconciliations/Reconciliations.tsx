import PageMeta from "../../components/common/PageMeta";
import PageWelcom from "../../components/common/PageWelcom";
import StatisticCard from "../../components/common/StatisticCard";
import ReconciliationsList from "../../components/reconciliations/ReconciliationsList";
import ChartIcon from "../../components/ui/icons/ChartIcon";
import PartnersIcon from "../../components/ui/icons/PartnersIcon";
import ReconciliationIcon from "../../components/ui/icons/ReconciliationsIcon";

const Reconciliations = () => {
  return (
    <>
      <PageMeta title="FSH" description="Reconciliations" />
      <div className="space-y-5">
        <h2 className="text-[#222B45] font-semibold">Reconciliations</h2>
        <div className="space-y-3">
          <PageWelcom
            Icon={ReconciliationIcon}
            content="Welcome to the Reconciliations page! Here, you can review, match, and resolve transactions with ease. Keep your financial records accurate and 
organized by managing reconciliation details directly from this page. Everything you need is right here!"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <StatisticCard
              title="# Total number of Reconciliations"
              number="132"
              icon={<PartnersIcon fill="#64748B" width={30} height={30} />}
            />
            <StatisticCard
              title="Average revenue from Reconciliations"
              number="112"
              icon={<ChartIcon fill="#00FF3A" width={30} height={30} />}
              className="bg-primary text-white"
            />
            <StatisticCard
              title="# Recently added Reconciliations"
              number="54"
              icon={<PartnersIcon fill="#fff" width={30} height={30} />}
              className="bg-[#919293] text-white"
            />
          </div>
        </div>
        <ReconciliationsList />
      </div>
    </>
  );
};

export default Reconciliations;

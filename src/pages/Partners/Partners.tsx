import PageMeta from "../../components/common/PageMeta";
import PartnersIcon from "../../components/ui/icons/PartnersIcon";
import PageWelcom from "../../components/common/PageWelcom";
import StatisticCard from "../../components/common/StatisticCard";
import ChartIcon from "../../components/ui/icons/ChartIcon";

const Partners = () => {
  return (
    <>
      <PageMeta title="FSH" description="Partners" />
      <div className="space-y-5">
        <h2 className="text-[#222B45] font-semibold">Partners</h2>
        <div className="space-y-3">
          <PageWelcom
            Icon={PartnersIcon}
            content="Welcome to the Partner Management page! Here, you can view, add, update, or remove partners with ease. Keep everything organized and ensure smooth collaboration by managing partner details directly from this page. It's all at your fingertips!"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <StatisticCard
              title="# Total number of partners"
              number="132"
              icon={<PartnersIcon fill="#64748B" width={30} height={30} />}
            />
            <StatisticCard
              title="Average revenue from partners"
              number="112"
              icon={<ChartIcon fill="#00FF3A" width={30} height={30} />}
              className="bg-primary text-white"
            />
            <StatisticCard
              title="# Recently added partners"
              number="54"
              icon={<PartnersIcon fill="#fff" width={30} height={30} />}
              className="bg-[#919293] text-white"
            />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-label font-semibold ">Partners in our system</h2>
        </div>
      </div>
    </>
  );
};

export default Partners;

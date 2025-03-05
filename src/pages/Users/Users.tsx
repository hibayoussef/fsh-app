import PageMeta from "../../components/common/PageMeta";
import PageWelcom from "../../components/common/PageWelcom";
import StatisticCard from "../../components/common/StatisticCard";
import ChartIcon from "../../components/ui/icons/ChartIcon";
import MerchantsIcon from "../../components/ui/icons/MerchantsIcon";
import PartnersIcon from "../../components/ui/icons/PartnersIcon";
import UsersList from "../../components/users/UsersList";

const Users = () => {
  return (
    <>
      <PageMeta title="FSH" description="Users" />
      <div className="space-y-5">
        <h2 className="text-[#222B45] font-semibold">Users</h2>
        <div className="space-y-3">
          <PageWelcom
            Icon={MerchantsIcon}
            content="Welcome to the Users Management page! Here, you can seamlessly view, add, update, or remove user details. Manage your team's access and roles effortlessly to

ensure smooth operations and effective collaboration—all in one centralized hub!"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <StatisticCard
              title="# Total number of users"
              number="132"
              icon={<PartnersIcon fill="#64748B" width={30} height={30} />}
            />
            <StatisticCard
              title="Average revenue from users"
              number="112"
              icon={<ChartIcon fill="#00FF3A" width={30} height={30} />}
              className="bg-primary text-white"
            />
            <StatisticCard
              title="# Recently added users"
              number="54"
              icon={<PartnersIcon fill="#fff" width={30} height={30} />}
              className="bg-[#919293] text-white"
            />
          </div>
        </div>
        <UsersList />
      </div>
    </>
  );
};

export default Users;

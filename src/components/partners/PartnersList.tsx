import { Link } from "react-router-dom";
import { useFetchOrganizationsByType } from "../../hooks/useOrganization";
import { OrganizationModel } from "../../types/organization";
import ComponentCard from "../common/ComponentCard";
import DataTable, { Column } from "../common/DataTable";
import Switch from "../form/switch/Switch";
import Button from "../ui/button/Button";
import { PencilIcon, TrashBinIcon } from "../../icons";
import AltChartIcon from "../ui/icons/AltChartIcon";

const PartnersList = () => {
  const { data, isLoading } = useFetchOrganizationsByType("PARTNER");
  console.log("data", data);
  const COLUMNS: Column<OrganizationModel>[] = [
    {
      key: "name",
      header: "Partner Name",
    },
    {
      key: "description",
      header: "Description",
    },
    {
      header: "Users",
      render: (row) => <Link to={`/partners/${row.id}`}>View Users</Link>,
    },
    {
      header: "View As Chart",
      render: (row) => (
        <Link to="#">
          <AltChartIcon />
        </Link>
      ),
    },
    {
      header: "Activate",
      render: (row) => <Switch label="Activate" />,
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex gap-3">
          <Button size="icon">
            <PencilIcon />
          </Button>
          <Button size="icon">
            <TrashBinIcon />
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) return <>Loading...</>;

  return (
    <div className="space-y-3">
      <h2 className="text-label font-semibold ">Partners in our system</h2>
      <ComponentCard title="Basic Table 1">
        {data && <DataTable data={data} columns={COLUMNS} />}
      </ComponentCard>
    </div>
  );
};

export default PartnersList;

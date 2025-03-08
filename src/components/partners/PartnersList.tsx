import { Link } from "react-router-dom";
import { useFetchOrganizationsByType } from "../../hooks/useOrganization";
import { OrganizationModel } from "../../types/organization";
import ComponentCard from "../common/ComponentCard";
import DataTable, { Column } from "../common/DataTable";
import Switch from "../form/switch/Switch";
import Button from "../ui/button/Button";
import { PencilIcon, PlusIcon, TrashBinIcon } from "../../icons";
import AltChartIcon from "../ui/icons/AltChartIcon";
import { useState } from "react";
import PartnerForm from "./PartnerForm";

const PartnersList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useFetchOrganizationsByType("PARTNER");

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
        <Link to={`/partners/${row.id}/chart`}>
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

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      <PartnerForm isOpen={isOpen} handleClose={handleClose} />
      <div className="space-y-3">
        <h2 className="text-label font-semibold">Partners in our system</h2>
        <ComponentCard
          title={
            <div className="flex justify-between items-center">
              <div>Search</div>
              <Button onClick={handleOpen} size="sm" startIcon={<PlusIcon />}>
                Add New
              </Button>
            </div>
          }
        >
          <DataTable data={data} columns={COLUMNS} isLoading={isLoading} />
        </ComponentCard>
      </div>
    </>
  );
};

export default PartnersList;

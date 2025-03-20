import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchOrganizationsByType } from "../../hooks/useOrganization";
import { PencilIcon, PlusIcon, TrashBinIcon } from "../../icons";
import { OrganizationModel } from "../../types/organization";
import ComponentCard from "../common/ComponentCard";
import ConfirmDelete from "../common/ConfirmDelete";
import DataTable, { Column } from "../common/DataTable";
import Switch from "../form/switch/Switch";
import FilterModal from "../merchants/FilterModal";
import Button from "../ui/button/Button";
import AltChartIcon from "../ui/icons/AltChartIcon";
import BranchForm from "./BranchForm";

const BranchesList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data, isLoading } = useFetchOrganizationsByType("BRANCH");

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const COLUMNS: Column<OrganizationModel>[] = [
    {
      key: "name",
      header: "branch Name",
    },
    {
      key: "description",
      header: "Description",
    },
    {
      header: "Users",
      render: (row) => <Link to={`/branches/${row.id}`}>View Users</Link>,
    },
    {
      header: "View As Chart",
      render: (row) => (
        <Link to={`/branches/${row.id}/chart`}>
          <AltChartIcon />
        </Link>
      ),
    },
    {
      header: "Activate",
      render: () => <Switch label="Activate" />,
    },
    {
      header: "Actions",
      render: () => (
        <div className="flex gap-3">
          <Button size="icon">
            <PencilIcon />
          </Button>
          <Button
            size="icon"
            variant="error"
            onClick={() => setIsDeleteOpen(true)}
          >
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
      <BranchForm isOpen={isOpen} handleClose={handleClose} />
      <ConfirmDelete
        isOpen={isDeleteOpen}
        handleClose={() => setIsDeleteOpen(false)}
      />
      <div className="space-y-3">
        <h2 className="text-label font-semibold">Branches in our system</h2>
        <ComponentCard
          title={
            <div className="flex justify-between items-center">
              <div>
                <FilterModal />
              </div>
              <div className="flex gap-3">
                {selectedRows.size > 0 && (
                  <Button
                    size="sm"
                    variant="error"
                    onClick={() => setIsDeleteOpen(true)}
                  >
                    Delete Selected
                  </Button>
                )}
                <Button onClick={handleOpen} size="sm" startIcon={<PlusIcon />}>
                  Add New
                </Button>
              </div>
            </div>
          }
        >
          <DataTable
            data={data}
            columns={COLUMNS}
            isLoading={isLoading}
            selectedRows={selectedRows}
            onSelectionChange={setSelectedRows}
          />
        </ComponentCard>
      </div>
    </>
  );
};

export default BranchesList;

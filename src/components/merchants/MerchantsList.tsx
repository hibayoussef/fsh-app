import { Link, useNavigate } from "react-router-dom";
import { useFetchOrganizationsByType } from "../../hooks/useOrganization";
import { OrganizationModel } from "../../types/organization";
import ComponentCard from "../common/ComponentCard";
import DataTable, { Column } from "../common/DataTable";
import Switch from "../form/switch/Switch";
import Button from "../ui/button/Button";
import { CloseIcon, PencilIcon, TrashBinIcon } from "../../icons";
import AltChartIcon from "../ui/icons/AltChartIcon";
import { Modal } from "../ui/modal";
import { useState } from "react";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import FileInput from "../form/input/FileInput";

const MerchantsList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useFetchOrganizationsByType("MERCHANT");

  const COLUMNS: Column<OrganizationModel>[] = [
    {
      key: "name",
      header: "Merchant Name",
    },
    {
      header: "Users",
      render: (row) => <Link to={`/merchants/${row.id}`}>View Users</Link>,
    },
    {
      header: "View As Chart",
      render: () => (
        <div className="flex justify-center items-center ml-4 text-left">
          <Link to="#">
            <AltChartIcon />
          </Link>
        </div>
      ),
    },

    // {
    //   key: "created_at",
    //   header: "Created at",
    // },
    // {
    //   key: "updated_at",
    //   header: "Updated at",
    // },
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

  const navigate = useNavigate(); 
  
  if (isLoading) return <>Loading...</>;

  return (
    <div className="space-y-3">
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        className="max-w-[600px] m-4"
        showCloseButton={false}
      >
        <div className="rounded-tr-[4px] rounded-tl-[4px] p-3 bg-[#EBEFF1] flex items-center justify-between">
          <h2>Add partner</h2>
          <button onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="p-3 space-y-3">
          <h2 className="text-label font-semibold text-[14px]">
            Add a new partner
          </h2>
          <form className="space-y-2">
            <div>
              <Label>Name</Label>
              <Input />
            </div>
            <div>
              <Label>Address</Label>
              <Input />
            </div>
            <div>
              <Label>Description</Label>
              <Input />
            </div>
            <div>
              <Label>Upload Icon</Label>
              <FileInput />
            </div>
            <div className="flex justify-end gap-4 ">
              <Button type="submit" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </div>
      </Modal>
      <h2 className="text-label font-semibold " onClick={handleOpen}>
        Merchants in our system
      </h2>
      <ComponentCard title="Merchants" onCreate={() => navigate("")}>
        {data && <DataTable data={data} columns={COLUMNS} />}
      </ComponentCard>
    </div>
  );
};

export default MerchantsList;

import { useState } from "react";
import { useFetchOrganizationsByType } from "../../hooks/useOrganization";
import { CloseIcon, PencilIcon, TrashBinIcon } from "../../icons";
import { OrganizationModel } from "../../types/organization";
import ComponentCard from "../common/ComponentCard";
import DataTable, { Column } from "../common/DataTable";
import FileInput from "../form/input/FileInput";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Switch from "../form/switch/Switch";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import Loader from "../ui/loder/loader";

const UsersList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useFetchOrganizationsByType("PARTNER");

  const COLUMNS: Column<OrganizationModel>[] = [
    {
      header: "First Name",
      // render: (row) => <>{row.person.firstName}</>,
    },
    {
      header: "Last Name",
      // render: (row) => <>{row.person.lastName}</>,
    },
    {
      header: "Email Address",
      // render: (row) => <>{row.person.email}</>,
    },
    {
      header: "Role",
      // render: (row) => <>{row.role ? row.role : "-"}</>,
    },
    {
      header: "Organizations",
      // render: (row) => <>{row.role ? row.role : "-"}</>,
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

  if (isLoading) return <Loader />;

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
        Users in our system
      </h2>
      <ComponentCard title="Basic Table 1">
        {data && <DataTable data={data} columns={COLUMNS} />}
      </ComponentCard>
    </div>
  );
};

export default UsersList;

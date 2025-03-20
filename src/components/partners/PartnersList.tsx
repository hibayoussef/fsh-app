import { useState } from "react";
import { getColumns } from "../../columns/partner";
import { useFetchOrganizationsByType } from "../../hooks/useOrganization";
import { PlusIcon } from "../../icons";
import ComponentCard from "../common/ComponentCard";
import ConfirmDelete from "../common/ConfirmDelete";
import DataTable from "../common/DataTable";
import Button from "../ui/button/Button";
import FilterModal from "./FilterModal";
import PartnerForm from "./PartnerForm";

const PartnersList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data, isLoading } = useFetchOrganizationsByType("PARTNER");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectedData, setSelectedData] = useState<any | null>(null); 
  
  const handleEdit = (id: number) => {
  const partnerToEdit = data?.find((partner) => partner.id === id);
  if (partnerToEdit) {
    setSelectedData(partnerToEdit); 
    setSelectedId(id);
    setIsOpen(true);
  }
};

  const handleDelete = () => setIsDeleteOpen(true);

  const columns = getColumns({
    onDelete: handleDelete,
    onEdit: handleEdit,
  });

  return (
    <>
       <PartnerForm
      isOpen={isOpen}
      handleClose={() => {
        setIsOpen(false);
        setSelectedData(null); 
      }}
      initialData={selectedData} 
    />
      <ConfirmDelete
        isOpen={isDeleteOpen}
        handleClose={() => setIsDeleteOpen(false)}
      />

      <div className="space-y-3">
        <h2 className="text-label font-semibold">Partners in our system</h2>
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
                <Button
                  onClick={() => setIsOpen(true)}
                  size="sm"
                  startIcon={<PlusIcon />}
                >
                  Add New
                </Button>
              </div>
            </div>
          }
        >
          <DataTable
            data={data}
            columns={columns}
            isLoading={isLoading}
            selectedRows={selectedRows}
            onSelectionChange={setSelectedRows}
          />
        </ComponentCard>
      </div>
    </>
  );
};

export default PartnersList;

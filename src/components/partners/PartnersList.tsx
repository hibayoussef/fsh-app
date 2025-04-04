import { useEffect, useState } from "react";
import { getColumns } from "../../columns/partner";
import { useFetchPartners } from "../../hooks/usePartners";
import { PlusIcon } from "../../icons";
import { useOrganizationStore } from "../../store/useHirarchyStore";
import ComponentCard from "../common/ComponentCard";
import ConfirmDelete from "../common/ConfirmDelete";
import DataTable from "../common/DataTable";
import FilterModal from "../merchants/FilterModal";
import Button from "../ui/button/Button";
import PartnerForm from "./PartnerForm";


const PartnersList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { setOrganizations } = useOrganizationStore();

  const { data: partners, isLoading } = useFetchPartners();

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectedData, setSelectedData] = useState<any | null>(null);

  const handleEdit = (id: number) => {
    const merchantToEdit = partners?.find((merchant) => merchant.id === id);
    if (merchantToEdit) {
      setSelectedData(merchantToEdit);
      setIsOpen(true);
    }
  };


  useEffect(() => {
    if (partners) {
      setOrganizations(partners);
    }
  }, [partners, setOrganizations]);

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
        <h2 className="text-label font-semibold">TerminalsList in our system</h2>
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
            data={partners || []}  
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

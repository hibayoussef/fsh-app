import { useEffect, useState } from "react";
import { getColumns } from "../../columns/partner";
import { useFetchBranches } from "../../hooks/useBranches";
import { useFetchMerchantsByType } from "../../hooks/useMerchants";
import { PlusIcon } from "../../icons";
import { useOrganizationStore } from "../../store/useHirarchyStore";
import ComponentCard from "../common/ComponentCard";
import ConfirmDelete from "../common/ConfirmDelete";
import DataTable from "../common/DataTable";
import FilterModal from "../merchants/FilterModal";
import Button from "../ui/button/Button";
import BranchForm from "./BranchForm";

const BranchesList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { setOrganizations } = useOrganizationStore();

  const { data: branches, isLoading } = useFetchBranches();

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectedData, setSelectedData] = useState<any | null>(null);

  const handleEdit = (id: number) => {
    const merchantToEdit = branches?.find((merchant) => merchant.id === id);
    if (merchantToEdit) {
      setSelectedData(merchantToEdit);
      setIsOpen(true);
    }
  };


  const { data } = useFetchMerchantsByType();

  useEffect(() => {
    if (branches) {
      setOrganizations(branches);
    }
  }, [branches, setOrganizations]);

  const handleDelete = () => setIsDeleteOpen(true);

  const columns = getColumns({
    onDelete: handleDelete,
    onEdit: handleEdit,
  });

  return (
    <>
      <BranchForm
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
          setSelectedData(null);
        }}
        initialData={selectedData} 
        partnerData={data}
      />
      
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
            data={branches || []}  
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

export default BranchesList;

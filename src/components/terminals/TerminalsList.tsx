import { useEffect, useState } from "react";
import { getColumns } from "../../columns/partner";
import { useFetchBranchesByType } from "../../hooks/useBranches";
import { useFetchTerminals } from "../../hooks/useTerminals";
import { PlusIcon } from "../../icons";
import { useOrganizationStore } from "../../store/useHirarchyStore";
import ComponentCard from "../common/ComponentCard";
import ConfirmDelete from "../common/ConfirmDelete";
import DataTable from "../common/DataTable";
import FilterModal from "../merchants/FilterModal";
import Button from "../ui/button/Button";
import TerminalForm from "./TerminalForm";


const TerminalsList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { setOrganizations } = useOrganizationStore();

  const { data: terminals, isLoading } = useFetchTerminals();

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectedData, setSelectedData] = useState<any | null>(null);

  const handleEdit = (id: number) => {
    const merchantToEdit = terminals?.find((merchant) => merchant.id === id);
    if (merchantToEdit) {
      setSelectedData(merchantToEdit);
      setIsOpen(true);
    }
  };


  const { data } = useFetchBranchesByType();

  useEffect(() => {
    if (terminals) {
      setOrganizations(terminals);
    }
  }, [terminals, setOrganizations]);

  const handleDelete = () => setIsDeleteOpen(true);

  const columns = getColumns({
    onDelete: handleDelete,
    onEdit: handleEdit,
  });

  return (
    <>
      <TerminalForm
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
          setSelectedData(null);
        }}
        initialData={selectedData} 
        branchesData={data}
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
            data={terminals || []}  
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

export default TerminalsList;

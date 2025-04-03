import { useEffect, useState } from "react";
import { getColumns } from "../../columns/partner";
import { PlusIcon } from "../../icons";
import { useOrganizationStore } from "../../store/useHirarchyStore";
import ComponentCard from "../common/ComponentCard";
import ConfirmDelete from "../common/ConfirmDelete";
import DataTable from "../common/DataTable";
import Button from "../ui/button/Button";
import FilterModal from "./FilterModal";
import MerchantsForm from "./MerchantForm";
import { useFetchMerchants } from "../../hooks/useMerchants";
import { useFetchOrganizationsByType } from "../../hooks/useOrganization";

const MerchantsList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { setOrganizations } = useOrganizationStore();

  const { data: merchants, isLoading } = useFetchMerchants();

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectedData, setSelectedData] = useState<any | null>(null);

  const handleEdit = (id: number) => {
    const merchantToEdit = merchants?.find((merchant) => merchant.id === id);
    if (merchantToEdit) {
      setSelectedData(merchantToEdit);
      setIsOpen(true);
    }
  };


  const { data } = useFetchOrganizationsByType("PARTNER");

  useEffect(() => {
    if (merchants) {
      setOrganizations(merchants);
    }
  }, [merchants, setOrganizations]);

  const handleDelete = () => setIsDeleteOpen(true);

  const columns = getColumns({
    onDelete: handleDelete,
    onEdit: handleEdit,
  });

  return (
    <>
      <MerchantsForm
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
        <h2 className="text-label font-semibold">Merchants in our system</h2>
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
            data={merchants || []}  
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

export default MerchantsList;

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

const MerchantsList = () => {
  // 🟢 حالة فتح وإغلاق نافذة الإضافة والتعديل
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // 🟢 تخزين قائمة المنظمات في الستور
  const { setOrganizations } = useOrganizationStore();

  // 🟢 جلب بيانات جميع التجار (Merchants)
  const { data: merchants, isLoading } = useFetchMerchants();

  // 🟢 تتبع الصفوف المحددة
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectedData, setSelectedData] = useState<any | null>(null);

  // ✅ تحديث حالة التعديل عند الضغط على زر Edit
  const handleEdit = (id: number) => {
    const merchantToEdit = merchants?.find((merchant) => merchant.id === id);
    if (merchantToEdit) {
      setSelectedData(merchantToEdit);
      setIsOpen(true);
    }
  };

  // ✅ تحديث حالة قائمة التجار عند جلب البيانات
  useEffect(() => {
    if (merchants) {
      setOrganizations(merchants);
    }
  }, [merchants, setOrganizations]);

  // ✅ فتح نافذة الحذف عند الضغط على زر Delete
  const handleDelete = () => setIsDeleteOpen(true);

  // ✅ تعريف الأعمدة وتمرير دوال الحذف والتعديل إليها
  const columns = getColumns({
    onDelete: handleDelete,
    onEdit: handleEdit,
  });

  return (
    <>
      {/* ✅ نموذج إضافة/تعديل Merchant */}
      <MerchantsForm
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
          setSelectedData(null);
        }}
        initialData={selectedData} 
      />
      
      {/* ✅ نافذة تأكيد الحذف */}
      <ConfirmDelete
        isOpen={isDeleteOpen}
        handleClose={() => setIsDeleteOpen(false)}
      />

      {/* ✅ الواجهة الأساسية لقائمة التجار */}
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
          {/* ✅ جدول عرض الـ Merchants */}
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

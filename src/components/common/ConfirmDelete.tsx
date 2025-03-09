import { TrashBinIcon } from "../../icons";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";

const ConfirmDelete = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="!bg-[#EBEFF1] max-w-[500px] m-4 p-5"
    >
      <div className="flex flex-col items-center space-y-2">
        <TrashBinIcon color="red" fontSize={40} />
        <h2 className="text-[16px]">
          Are you sure you want to delete this partner/s?
        </h2>
        <p className="text-[12px]">
          Deleting partner/s will permanently remove them
        </p>
        <p className="text-[12px]">
          from the system .This action cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button>Delete partner/s</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDelete;

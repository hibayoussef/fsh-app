// src/components/UserProfile/UserInfoCard.tsx
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

export default function UserInfoCard({ user }) {
  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = () => {
    console.log("Saving changes...");
    closeModal();
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      {/* User Information */}
      <div className="flex items-center">
        <img
          src={user?.profileImageURL}
          alt="Profile"
          className="rounded-full w-16 h-16 mr-4"
        />
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {user?.firstName} {user?.lastName}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user?.email}
          </p>
        </div>
      </div>

      {/* Organizations List */}
      <h5 className="mt-6 text-lg font-medium text-gray-800 dark:text-white/90">
        Organizations
      </h5>
      <ul className="mt-2 ">
        {user?.organizations?.map((org) => (
          <li key={org.id} className="text-sm text-gray-600 dark:text-gray-400">
            <strong>{org.name }:</strong> {org.description}
          </li>
        ))}
      </ul>

      <button
        onClick={openModal}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto mt-4"
      >
        Edit
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

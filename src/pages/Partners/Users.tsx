import { useParams } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import DataTable, { Column } from "../../components/common/DataTable";
import { useFetchOrganizationUsers } from "../../hooks/useOrganization";
import { OrganizationUser } from "../../types/organization";
import Button from "../../components/ui/button/Button";
import { PencilIcon } from "../../icons";

const UsersPartners = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchOrganizationUsers(id!);

  const COLUMNS: Column<OrganizationUser>[] = [
    {
      header: "First Name",
      render: (row) => <>{row?.person?.firstName}</>,
    },
    {
      header: "Last Name",
      render: (row) => <>{row.person.lastName}</>,
    },
    {
      header: "Email Address",
      render: (row) => <>{row.person.email}</>,
    },
    {
      header: "Role",
      render: (row) => <>{row.role ? row.role : "-"}</>,
    },
    {
      header: "Actions",
      render: () => (
        <Button size="icon">
          <PencilIcon />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <h2>Users</h2>
      <ComponentCard title="">
        <DataTable data={data} columns={COLUMNS} isLoading={isLoading} />
      </ComponentCard>
    </div>
  );
};

export default UsersPartners;

import { useParams } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import DataTable, { Column } from "../../components/common/DataTable";
import { useFetchOrganizationUsers } from "../../hooks/useOrganization";
import { OrganizationUser } from "../../types/organization";
import Button from "../../components/ui/button/Button";
import { PencilIcon } from "../../icons";
import Loader from "../../components/ui/loder/loader";

const UsersTerminals = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchOrganizationUsers(id!);

  const COLUMNS: Column<OrganizationUser>[] = [
    {
      header: "First Name",
      render: (row) => <>{row.person.firstName}</>,
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

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-3">
      <h2>[Terminal Name]/Users</h2>
      <ComponentCard title="">
        {data && <DataTable data={data} columns={COLUMNS} />}
      </ComponentCard>
    </div>
  );
};

export default UsersTerminals;

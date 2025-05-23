import { Link } from "react-router-dom";
import type { OrganizationModel } from "../types/organization";
import type { Column } from "../components/common/DataTable";
import AltChartIcon from "../components/ui/icons/AltChartIcon";
import Switch from "../components/form/switch/Switch";
import Button from "../components/ui/button/Button";
import { PencilIcon, TrashBinIcon } from "../icons";

export type ColumnsProps = {
  onDelete: () => void;
  onEdit: (id: number) => void;
};

export const getColumns = ({
  onDelete,
  onEdit,
}: ColumnsProps): Column<OrganizationModel>[] => [
  {
    key: "name",
    header: "Name",
  },
  {
    key: "description",
    header: "Description",
  },
  {
    header: "Users",
    render: (row) => <Link to={`/users/${row.id}`}>View Users</Link>,
  },
  {
    header: "View As Chart",
    render: (row) => (
      <Link to={`/${row.id}/chart`}>
        <AltChartIcon className="ml-7" />
      </Link>
    ),
  },
  {
    header: "Activate",
    render: () => <Switch label="Activate" />,
  },
  {
    header: "Actions",
    render: (row) => (
      <div className="flex gap-3">
        <Button size="icon" onClick={() => onEdit(row.id)}>
          <PencilIcon />
        </Button>
        <Button size="icon" variant="error" onClick={onDelete}>
          <TrashBinIcon />
        </Button>
      </div>
    ),
  },
];

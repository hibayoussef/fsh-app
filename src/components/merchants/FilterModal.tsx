import { useState } from "react";
import { ListIcon } from "../../icons";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Select from "../form/Select";
import Label from "../form/Label";

export default function FilterModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[4px]">
        <Input className="!h-9" placeholder="Search here..." />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-1/2 -translate-y-1/2 right-0 bg-green-500 text-white p-2  h-full"
        >
          <ListIcon />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-9 left-0 w-96 bg-white shadow-lg rounded-[4px] p-6 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Filter
            {/* partners */}
          </h2>

          <div className="space-y-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Search by name
              </Label>
              <Input
                type="text"
                placeholder="Enter name.."
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Created by
              </Label>
              <Select options={[{ label: "Creator name", value: "1" }]} />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Updated by
              </Label>
              <Input
                type="text"
                placeholder="Enter name..."
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Filter by chart creation date
              </Label>
              <Input
                type="date"
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-sm font-medium text-gray-700">
                  Status
                </span>
                <div className="space-y-2 mt-1">
                  <Label className="flex items-center space-x-2">
                    <Checkbox /> <span>All users</span>
                  </Label>
                  <Label className="flex items-center space-x-2">
                    <Checkbox /> <span>Active users</span>
                  </Label>
                  <Label className="flex items-center space-x-2">
                    <Checkbox /> <span>Inactive users</span>
                  </Label>
                </div>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700">
                  Has users
                </span>
                <div className="space-y-2 mt-1">
                  <Label className="flex items-center space-x-2">
                    <Checkbox /> <span>All</span>
                  </Label>
                  <Label className="flex items-center space-x-2">
                    <Checkbox /> <span>Yes</span>
                  </Label>
                  <Label className="flex items-center space-x-2">
                    <Checkbox /> <span>No</span>
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="error">Reset filters</Button>
            <Button variant="primary">Apply filters</Button>
          </div>
        </div>
      )}
    </div>
  );
}

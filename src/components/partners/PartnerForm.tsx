import { Modal } from "../ui/modal";
import { CloseIcon, PlusIcon, TrashBinIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import Switch from "../form/switch/Switch";
import Collapse from "../ui/collapse/Collapse";
import Form from "../form/Form";
import FileUploader from "../form/input/FileUploader";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreatePartner } from "../../hooks/useOrganization";
import { PartnerRequest } from "../../types/organization";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  address: yup.string().optional(),
  logoBase64: yup.string().optional(),
  users: yup.array().of(
    yup
      .object()
      .shape({
        firstName: yup.string().optional(),
        lastName: yup.string().optional(),
        email: yup.string().optional(),
        phoneNumber: yup.string().optional(),
      })
      .optional()
  ),
  enabled: yup.boolean().optional(),
});

const PartnerForm = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      // address: "",
      description: "",
      logoBase64: "",
      users: [{ firstName: "", lastName: "", email: "", phoneNumber: "" }],
      enabled: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "users",
  });

  const { mutateAsync: addMutation, isPending: adding } = useCreatePartner();

  const onSubmit = (values: yup.InferType<typeof schema>) => {
    const payload: PartnerRequest = {
      organization: {
        name: values.name,
        description: values.description,
        enabled: values.enabled,
        logoBase64: values.logoBase64,
        type: {
          name: "PARTNER",
        },
        // ...values,
      },
      users: values?.users?.map((user) => ({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
      })),
    };

    addMutation(payload);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        handleClose();
        reset();
      }}
      className="max-w-[600px] m-4"
      showCloseButton={false}
    >
      <div className="rounded-tr-[4px] rounded-tl-[4px] p-3 bg-[#EBEFF1] flex items-center justify-between">
        <h2 className="font-semibold text-lg">Add partner</h2>
        <button
          onClick={handleClose}
          className="transition duration-300 hover:text-gray-500"
        >
          <CloseIcon />
        </button>
      </div>
      <div className="p-3 space-y-3">
        <h2 className="text-label font-semibold text-[14px]">
          Add a new partner
        </h2>
        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <div>
              <Label>Name</Label>
              <Input {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label>Address</Label>
              <Input {...register("address")} />
            </div>
            <div>
              <Label>Description</Label>
              <Input {...register("description")} />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <Label>Upload Icon</Label>
              <Controller
                name="logoBase64"
                control={control}
                render={({ field }) => (
                  <FileUploader
                    field={field}
                    setValue={setValue}
                    name="logoBase64"
                  />
                )}
              />
            </div>

            {/* Users Section */}
            <div>
              <Collapse title="Add a new user to manage your partner">
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>First Name</Label>
                      <Input
                        {...register(`users.${index}.firstName`)}
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input
                        {...register(`users.${index}.lastName`)}
                        placeholder="Last Name"
                      />
                    </div>
                    <div>
                      <Label>Email Address</Label>
                      <Input
                        {...register(`users.${index}.email`)}
                        placeholder="Email Address"
                      />
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <Input
                        {...register(`users.${index}.phoneNumber`)}
                        placeholder="Phone Number"
                      />
                    </div>
                    {fields.length > 1 && (
                      <div className="col-span-2 flex justify-end">
                        <Button
                          variant="outline"
                          onClick={() => remove(index)}
                          size="icon"
                        >
                          <TrashBinIcon />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-2 text-center">
                  <Button
                    type="button"
                    onClick={() =>
                      append({
                        firstName: "",
                        lastName: "",
                        email: "",
                        // phoneNumber: "",
                      })
                    }
                    size="sm"
                    startIcon={<PlusIcon />}
                  >
                    Add User
                  </Button>
                </div>
              </Collapse>
            </div>

            <div>
              <Switch
                label="Activate"
                onChange={(checked) => setValue("enabled", checked)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={adding}>
              {adding ? "Adding..." : "Save Partner"}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default PartnerForm;

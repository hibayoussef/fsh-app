import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { CloseIcon, PlusIcon, TrashBinIcon } from "../../icons";
import Form from "../form/Form";
import Label from "../form/Label";
import Select from "../form/Select";
import FileUploader from "../form/input/FileUploader";
import Input from "../form/input/InputField";
import Switch from "../form/switch/Switch";
import Button from "../ui/button/Button";
import Collapse from "../ui/collapse/Collapse";
import { Modal } from "../ui/modal";
import { useAddMerchant, useUpdateMerchant } from "../../hooks/useMerchants";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  address: yup.string().optional(),
  logoBase64: yup.string().optional(),
  partnerId: yup.number().optional(),
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

const MerchantsForm = ({
  isOpen,
  handleClose,
  initialData,
  partnerData,
}: {
  isOpen: boolean;
  handleClose: () => void;
  initialData?: any;
  partnerData?: any;
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
      description: "",
      address: "",
      partnerId: 0,
      logoBase64: "",
      users: [{ firstName: "", lastName: "", email: "", phoneNumber: "" }],
      enabled: false,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "users",
  });
  const { mutateAsync: addMutation, isPending: adding } = useAddMerchant();
  const { mutateAsync: updateMutation, isPending: updating } =
    useUpdateMerchant();

  const onSubmit = async (values: yup.InferType<typeof schema>) => {
    const payload: any = {
      organization: {
        name: values.name,
        description: values.description,
        enabled: values.enabled,
        type: {
          name: "MERCHANT",
        },
      },
      users: values?.users?.map((user) => ({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
      })),
      // partnerId: values.partnerId,
    };

    const data = {
      name: values.name,
      description: values.description,
    };
    if (initialData) {
      await updateMutation({
        id: initialData.id,
        data: data,
      });
    } else {
      await addMutation({
        partnerId: Number(values?.partnerId),
        data: payload,
      });
    }

    handleClose();
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
        <h2>{initialData ? "Edit Merchant" : "Add Merchant"}</h2>
        <button
          onClick={handleClose}
          className="transition duration-300 hover:text-gray-500"
        >
          <CloseIcon />
        </button>
      </div>
      <div className="p-3 space-y-3">
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
              <Label>Parnter Name</Label>
              <Controller
                name="partnerId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={partnerData.map((partner) => ({
                      value: String(partner.id),
                      label: partner.name,
                    }))}
                    placeholder="Select a Partner"
                    onChange={(value) => field.onChange(Number(value))}
                  />
                )}
              />
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
                      append({ firstName: "", lastName: "", email: "" })
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
              {initialData
                ? updating
                  ? "Updating..."
                  : "Update"
                : adding
                ? "Adding..."
                : "Save"}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default MerchantsForm;

import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

export default function ForgotPasswordForm() {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8 text-center">
            <h2 className="mb-2 font-semibold text-gray-800  text-title-sm dark:text-white/90 sm:text-title-sm md:text-md">
              Confirm your email address!
            </h2>
            <p className="text-sm text-gray-500  dark:text-gray-400">
              To enhance security and complete your login process,
            </p>
            <p className="text-sm text-gray-500  dark:text-gray-400">
              please verify your email address.
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-6">
                <div>
                  <Label>
                    Enter your email address{" "}
                    <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="info@gmail.com" />
                </div>
                <div>
                  <Button
                    className="w-full bg-[#49CFB0] hover:bg-[#3bb89a] text-white"
                    size="sm"
                  >
                    Send Confirmation Email
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

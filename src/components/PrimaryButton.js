import { Button } from "antd";

const PrimaryButton = ({ children, className = "", ...props }) => (
  <Button
    type="primary"
    className={`bg-[#BAC887] text-[#101010] text-[14px] font-semibold border-[#BAC887] p-[12px_16px] h-auto hover:!bg-[#889947] hover:!border-[#889947] hover:!text-[#101010] ${className}`}
    {...props}
  >
    {children}
  </Button>
);

export default PrimaryButton;

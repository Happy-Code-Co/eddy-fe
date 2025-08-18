import { Button } from "antd";

const OutlinedButton = ({ children, className = "", ...props }) => (
  <Button
    className={`bg-transparent text-[#BAC887] border-[#BAC887] p-[12px_16px] h-auto hover:!border-[#889947] hover:!text-[#889947] hover:!bg-transparent ${className}`}
    {...props}
  >
    {children}
  </Button>
);

export default OutlinedButton;

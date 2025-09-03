import { Input } from "antd";
import cn from "classnames";

const MainInput = ({
  className = "",
  width = "w-full",
  type = "text",
  ...props
}) =>
  type === "password" ? (
    <Input.Password
      className={cn(
        `flex flex-row gap-3 h-full p-3 !bg-transparent border-2 ! border-[#383838] text-white placeholder-gray-400 rounded-md focus:bg-transparent`,
        [width, className]
      )}
      {...props}
    />
  ) : (
    <Input
      className={cn(
        `flex flex-row gap-3 h-full p-3 !bg-transparent border-2 !border-[#383838] text-white placeholder-gray-400 rounded-md focus:bg-transparent`,
        [width, className]
      )}
      {...props}
    />
  );

export default MainInput;

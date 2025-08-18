import useAuth from "../../hooks/useAuth";

const ProfilePill = () => {
  const { accountInfo } = useAuth();
  const initials = `${accountInfo?.first_name?.[0] || ""}${
    accountInfo?.last_name?.[0] || ""
  }`.toUpperCase();
  return (
    <div className="flex items-center gap-2">
      <span className="w-8 h-8 rounded-full bg-[#49513B] flex items-center justify-center text-[#D6E3B3] font-bold">
        {initials}
      </span>
      <div className="flex flex-col">
        <span className="text-white text-xs leading-tight">
          {accountInfo.first_name}
        </span>
        <span className="text-[#D6E3B3] text-xs leading-tight">
          {accountInfo?.role?.name}
        </span>
      </div>
    </div>
  );
};

export default ProfilePill;

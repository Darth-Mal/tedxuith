import Image from "next/image";

const Navbar = () => {
  return (
    <>
      <div className="flex w-full h-20 justify-between items-center fixed z-10 px-12">
        <div className="h-full flex items-center justify-center">
          <img
            className="h-[65%]"
            src="/logo-white.png"
            alt="TEDxUITH Ilorin logo"
          />
        </div>
        <div className="flex w-[40%] justify-evenly items-center">
          <div className="text-sm">ABOUT</div>
          <div className="text-sm">SPEAKERS</div>
          <div className="text-sm">ATTEND</div>
          <div className="text-sm">CONTACT</div>
        </div>
      </div>
    </>
  );
};
export default Navbar;

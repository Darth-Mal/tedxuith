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
          <div>
            {" "}
            <p> About</p>
          </div>
          <div>
            <p>Speakers</p>
          </div>
          <div>
            {" "}
            <p>Attend</p>{" "}
          </div>
          <div>
            {" "}
            <p>Contact</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;

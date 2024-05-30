import { Link } from "react-router-dom";
import useStorage from "../hooks/useStorage";

const Landing = () => {
  const { getDataFromStorage } = useStorage();
  const token = getDataFromStorage("userToken");
  return (
    <>
      {token === null ? (
        <div className="flex flex-col w-full px-[20px] py-[30px] md:px-[70px] h-screen bg-bgcolor">
          <div className="flex justify-center w-full h-screen flex-col">
            <span className="flex justify-center items-center text-main text-3xl md:text-4xl font-bold">
              Welcome to Film Fusion
            </span>

            <div className="flex flex-row justify-center items-center gap-5 mt-[20px]">
              <Link to="/login">
                <button className="px-[20px] py-[10px] border-[1px] border-main hover:bg-main rounded-lg text-lg font-bold text-[#ffffff]">
                  Sign In
                </button>
              </Link>

              <Link to="/register">
                <button className="px-[20px] py-[10px] border-[1px] border-main hover:bg-main rounded-lg text-lg font-bold text-[#ffffff]">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Landing;

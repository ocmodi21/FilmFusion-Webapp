import { useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import useStorage from "../hooks/useStorage";

type UserDataType = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
};

const Signup = () => {
  const { httpPost } = useFetch();
  const { setDataToStorage } = useStorage();
  const [loading, setLoading] = useState(false);

  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const handleRegister = async () => {
    const validateEmail = (email: string) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validateMobileNo = (mobile: string) => {
      return /^\d{10}$/.test(mobile);
    };

    if (
      !userDetails.first_name ||
      userDetails.first_name === "" ||
      !userDetails.last_name ||
      userDetails.last_name === "" ||
      !userDetails.email ||
      userDetails.email === "" ||
      !userDetails.phone_number ||
      userDetails.phone_number === "" ||
      !userDetails.password ||
      userDetails.password === ""
    ) {
      toast.warn("All fields are mandatory.");
      return;
    } else if (!validateEmail(userDetails.email)) {
      toast.warn("Invalid Email");
      return;
    } else if (!validateMobileNo(userDetails.phone_number)) {
      toast.warn("Invalid Mobile Number");
      return;
    }

    setLoading(true);
    const data = await httpPost("user/register", userDetails);
    if (data.isError) {
      setLoading(false);
      toast.error(`${data.data}`);
      return;
    } else if (data) {
      toast.success("Verification link sent on email.");
      setDataToStorage("userToken", data.data.token);
      setLoading(false);
      setUserDetails({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
      });
    }
  };

  return (
    <div className="flex justify-center px-[30px] items-center w-full h-screen bg-bgcolor">
      <div className="flex justify-center items-center w-full md:w-[400px]">
        <div className="flex flex-col w-full px-[20px] py-[40px] justify-center items-center">
          <span className="text-2xl text-center w-full md:w-[305px] md:text-[30px]  font-bold text-main">
            Registration
          </span>
          <div className="flex flex-col my-8 w-full">
            <input
              className="w-full text-[14px] md:text-[16px] bg-bgcolor text-font p-[10px] font-bold !outline-none rounded-sm border-[1px] border-font"
              placeholder="FirstName"
              type="text"
              value={userDetails.first_name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, first_name: e.target.value })
              }
            />
            <input
              className="w-full text-[14px] md:text-[16px] mt-2 bg-bgcolor text-font p-[10px] font-bold !outline-none rounded-sm border-[1px] border-font"
              placeholder="LastName"
              type="text"
              value={userDetails.last_name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, last_name: e.target.value })
              }
            />
            <input
              className="w-full text-[14px] md:text-[16px] mt-2 bg-bgcolor text-font p-[10px] font-bold !outline-none rounded-sm border-[1px] border-font"
              placeholder="Email"
              type="email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
            <input
              className="w-full text-[14px] md:text-[16px] mt-2 bg-bgcolor text-font p-[10px] font-bold !outline-none rounded-sm border-[1px] border-font"
              placeholder="Mobile No."
              type="text"
              value={userDetails.phone_number}
              onChange={(e) =>
                setUserDetails({ ...userDetails, phone_number: e.target.value })
              }
            />
            <input
              className="w-full text-[14px] md:text-[16px] mt-2 bg-bgcolor text-font p-[10px] font-bold !outline-none rounded-sm border-[1px] border-font"
              placeholder="Password"
              type="password"
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />
          </div>

          <div className="flex items-center justify-center w-full">
            <CustomButton
              title="Register"
              onClick={handleRegister}
              loading={loading}
            />
          </div>

          <div className="flex flex-row my-2 justify-center items-center w-full">
            <div className="flex w-[90px] md:w-[140px] border-t-[1px] border-solid border-font"></div>
            <div>
              <span className="mx-[5px] text-font font-semibold">or</span>
            </div>
            <div className="flex w-[90px] md:w-[140px] border-t-[1px] border-solid border-font"></div>
          </div>

          <div className="w-full flex justify-center items-center">
            <span className=" font-medium text-[12px] md:text-[14px] text-font">
              Already have an account?
            </span>
            <Link to="/login">
              <span className="ml-2 text-Background-secondary text-font font-bold text-[14px] md:text-[16px]">
                Sign in
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

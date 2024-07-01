import { SignupInput } from "@100xdevs/medium-common";
import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { BACKEND_URL } from "../config/config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();  
  const [inputFields, setInputFields] = useState<SignupInput>({
    name: "",
    password: "",
    username: "",
  });
  async function Signupuser  () {
    try {
        const response = await axios.post(`${BACKEND_URL}api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`,inputFields)
        const data = response.data;
        localStorage.setItem('token',data.token)
        navigate("/blog")

    } catch (error) {
        alert("Error auth")
    }
  }
  
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="">
        <div className="max-w-lg text-4xl font-bold text-center mt-2">
          {type === 'signup' ? "Create an account" : "Log in to account"}
        </div>
        <div className="max-w-lg text-lg font-semibold text-center mt-2 text-slate-500 ">
          {type === "signup"
            ? "Already have an account?"
            : "Dont have an account?"}
          <Link
            to={type === "signup" ? "/signin" : "/signup"}
            className="underline"
          >
            {type === "signup" ? "signin" : "signup"}
          </Link>
        </div>
        {type === "signup" ? (
          <InputBox
            placeholder="vekariaayush"
            label="username"
            onChange={(e) => {
                setInputFields({
                    ...inputFields,
                    name:e.target.value
                })
            }}
          />
        ) : null}
        <InputBox
          placeholder="ayush@gmail.com"
          label="Email"
          onChange={(e) => {
            setInputFields({
                ...inputFields,
                username:e.target.value
            })
        }}
        />

        <InputBox
          placeholder="password"
          label="password"
          type="password"
          onChange={(e) => {
            setInputFields({
                ...inputFields,
                password:e.target.value
            })
        }}
        />

        <button
          type="button"
          className="mt-4 py-2.5 px-5 w-full me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-black rounded-lg border border-gray-200  focus:z-10 focus:ring-4 focus:ring-gray-100 "
          onClick={Signupuser}
        >
          {type === "signup" ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Auth;

interface labelledInputTypes {
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type?: string;
}

export const InputBox = ({
  placeholder,
  onChange,
  label,
  type,
}: labelledInputTypes) => {
  return (
    <div className="mt-2">
      <label className="block mb-1 text-md font-semibold text-black">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
};

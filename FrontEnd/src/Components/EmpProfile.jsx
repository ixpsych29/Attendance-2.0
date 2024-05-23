import { useContext } from "react";
import UserContext from "./UserContext";

export default function EmpProfile({}) {
  return (
    <form className="space-y-4 w-full lg:w-1/2">
      <div className="ml-0 lg:ml-12">
        <div className="flex items-center space-x-4 mb-4 justify-end">
          <label htmlFor="name" className="label-style">
            Name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="input-style"
            value={user.name}
            maxLength="30"
            disabled
          />
        </div>
        <div className="flex items-center space-x-4 mb-4 justify-end">
          <label htmlFor="email" className="label-style">
            Email:
          </label>
          <input
            id="email"
            type="email"
            className="input-style cursor-not-allowed"
            value={user.email}
            disabled
          />
        </div>
        <div className="flex items-center space-x-4 mb-4 justify-end">
          <label htmlFor="username" className="label-style">
            Username:
          </label>
          <input
            id="username"
            type="text"
            className="input-style cursor-not-allowed"
            value={user.username}
            disabled
          />
        </div>
        <div className="flex items-center space-x-4 mb-4 justify-end">
          <label htmlFor="dob" className="label-style">
            DOB:
          </label>
          <div className="flex items-center">
            <input
              id="dob"
              name="dob"
              type="date"
              style={{ width: "210px" }}
              className="input-style"
              value={formatDate(user.dob)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-4 justify-end">
          <label htmlFor="phoneNo" className="label-style">
            Phone:
          </label>
          <div>
            <input
              id="phoneNo"
              name="phoneNo"
              type="tel"
              className="input-style"
              value={user.phoneNumber}
            />
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center">
        <button
          type="submit"
          className="mt-10 mr-48 px-7 py-2 rounded-md shadow-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400 hover:from-cyan-400 hover:to-sky-600">
          Update Profile
        </button>
      </div> */}
    </form>
  );
}

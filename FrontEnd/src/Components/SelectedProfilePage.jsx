import React from "react";

export default function SelectedProfilePage({
  formData,
  formErrors,
  handleValueChange,
  handleSubmit,
  formatDate,
  setFormData,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full lg:w-1/2">
      <div className="mr-0 lg:ml-12 pl-20">
        <div className="flex items-center space-x-4 mb-4  justify-end">
          <label htmlFor="name" className="label-style">
            Name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={`input-style ${
              formErrors.name ? "border-red-500" : ""
            } px-14`}
            value={formData.name}
            onChange={handleValueChange}
            maxLength="30"
            disabled
          />
          {formErrors.name && (
            <span className="text-red-500 block mt-1">
              Please fill this field
            </span>
          )}
        </div>
        <div className="flex items-center space-x-4 mb-4 justify-end">
          <label htmlFor="email" className="label-style">
            Email:
          </label>
          <input
            id="email"
            type="email"
            className="input-style cursor-not-allowed px-14"
            value={formData.email}
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
            className="input-style px-14 cursor-not-allowed"
            value={formData.username}
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
              // style={{ width: "250px" }}
              className="input-style px-[84px]"
              value={formatDate(formData.dob)}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  dob: e.target.value,
                }))
              }
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
              className={`input-style ${
                formErrors.phoneNo ? "border-red-500" : ""
              } px-14`}
              value={formData.phoneNo}
              onChange={handleValueChange}
            />
            {formErrors.phoneNo && (
              <span className="text-red-500 mt-1">Please fill this field</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="mt-10 mr-48 px-7 py-2 rounded-md shadow-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400 hover:from-cyan-400 hover:to-sky-600"
        >
          Update Profile
        </button>
      </div>
    </form>
  );
}

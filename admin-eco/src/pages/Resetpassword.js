

import React from "react";
import CustomInput from "../components/CustomInput";
const Resetpassword = () => {
    return (
    <div className="py-5" style={{ background: "rgba(255, 255, 255, 0.3)", minHeight: "100vh" }}>
        <br />
        <br />
        <br />
        <br />
        <  br />
        <div className="my-5 w-25 bg-white rounded-4 mx-auto p-4">
            <h3 className="text-center">reset password</h3>
            <p className="text-center">Please enter your new password </p>
            <form action="">
                <CustomInput type="password" label="New password" id="pass" />
                <CustomInput type="password" label="Confirm password" id="Confirmpass" />
                <button
                    className="border-0 px-3 py-2 text-white fw-bold w-100"
                    style={{ background: "#008900" }}
                    type="submit"
                >
                reset password
                </button>
            </form>

         </div>
    </div>

);
};
export default Resetpassword;
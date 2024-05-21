import React from "react";
import CustomInput from "../components/CustomInput";
const Forgotpassword = () => {
    return (
    <div className="py-5" style={{ background: "gainsboro", minHeight: "100vh" }}>
        <br />
        <br />
        <br />
        <br />
        <  br />
        <div className="my-5 w-25 bg-white rounded-4 mx-auto p-4">
            <h3 className="text-center">Forgot  password</h3>
            <p className="text-center">Please enter your register email to get reset password </p>
            <form action="">
                <CustomInput type="text" label="Email Address" id="email" />
                
                <button
                    className="border-0 px-3 py-2 text-white fw-bold w-100"
                    style={{ background: "#008900" }}
                    type="submit"
                >
                send Link
                </button>
            </form>

         </div>
    </div>

);
};
export default Forgotpassword;
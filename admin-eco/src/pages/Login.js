// import React from "react";
// import CustomInput from "../components/CustomInput";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import {Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../feature/auth/authSlice";
// import { useNavigate } from "react-router-dom";
// import  { useEffect } from "react";



// const Login = () => {
//     const dispatch= useDispatch();
//     const navigate= useNavigate();
//     let schema = Yup.object().shape({
//         email: Yup.string().email("Email Should be valid ").required("Email is required"),
//         password: Yup.string().required("Password is Required"),
//     });
//     const formik =useFormik({
//         initialValues: {
//         firstName: "", 
//         lastName:"" , 
//         email: "",
//         },
//         validationSchema: schema ,
//         onSubmit: (values) => {
//             dispatch(login(values));
//             alert(JSON.stringify(values, null, 2));
//         },
//     });
//     const { user, isError, isSuccess, isLoading, message } = useSelector(
//         (state) => state.auth
//     );

//     useEffect(() => {
//         if (!user == null || isSuccess) {
//           navigate("admin");
//         } else {
//           navigate("");
//         }
//       }, [user, isError, isSuccess, isLoading]);


//     return (
//     <div className="py-5" style={{ background: "gainsboro", minHeight: "100vh" }}>
//         <br />
//         <br />
//         <br />
//         <br />
//         <  br />
//         <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
//             <h3 className="text-center">Login</h3>
//             <p className="text-center">Login to your account to continue.</p>
//             <form action="" onSubmit={formik.handleSubmit}>
//                 <CustomInput type="text"  name='email' label="Email Address" id="email" val={formik.values.email} onCh={formik.handleChange("email")}  />
//                 <div className="error">
//                 {formik.touched.email && formik.errors.email? ( <div>{formik.errors.email}</div>
//                  ):null}
//                 </div>
//                 <CustomInput type="password"  name="Password" label="Password" id="pass"  val={formik.values.password} onCh={formik.handleChange("password")}/>
//                 <div className="error">
//                 {formik.touched.password && formik.errors.password? ( <div>{formik.errors.password}</div>
//                  ):null}
//                 </div>
//                 <div className="mb-3 text-end">
//                     <Link to="forgot-password" className="">
//                         Forgot Password?
//                     </Link>
//                 </div>
//                 <button
                   
//                     className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
//                     style={{ background: "#008900" }}
//                     type="submit"
//                 >
//                 Login
//                 </button>
//             </form>

//          </div>
//     </div>

// );
// };
// export default Login;

import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../feature/auth/authSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const schema = Yup.object().shape({
        email: Yup.string().email("Email Should be valid ").required("Email is required"),
        password: Yup.string().required("Password is Required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(login(values));
            alert(JSON.stringify(values, null, 2));
        },
    });

    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (user && isSuccess) {
            navigate("admin");
        }
        // console.log(user);
    },
     [user, isError, isSuccess, isLoading, navigate]
    );

    return (
        <div className="py-5" style={{ background: "gainsboro", minHeight: "100vh" }}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
                <h3 className="text-center">Login</h3>
                <p className="text-center">Login to your account to continue.</p>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput type="text" name='email' label="Email Address" id="email" val={formik.values.email} onCh={formik.handleChange("email")} />
                    <div className="error">
                        {formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>) : null}
                    </div>
                    <CustomInput type="password" name="password" label="Password" id="pass" val={formik.values.password} onCh={formik.handleChange("password")} />
                    <div className="error">
                        {formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>) : null}
                    </div>
                    <div className="mb-3 text-end">
                        <Link to="forgot-password" className="">
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                        style={{ background: "#008900" }}
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

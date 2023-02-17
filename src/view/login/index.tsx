import * as Yup from "yup";

import { ILoginPayload, doLoginRequest } from "@store/actions";
import { useAppDispatch, useAppSelector } from "@hooks/useReduxToolKit";

import { Button } from "react-bootstrap";
import { Formik } from "formik";
import { getAuthSelector } from "@store/selector";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* eslint-disable jsx-a11y/label-has-associated-control */
export default function LoginView() {
  const { isLoading, authChecked, loggedIn, currentUser } = useAppSelector(getAuthSelector);
  const dispatch = useAppDispatch();
  const history = useNavigate();
  useEffect(() => {
    if (isLoading === false) {
      if (authChecked && loggedIn && currentUser !== null) history("/");
    }
  }, [authChecked, currentUser, history, isLoading, loggedIn]);

  const handleSubmitLogin = async (values: any, { setErrors, setStatus, setSubmitting }: any) => {
    try {
      const payload: ILoginPayload = {
        email: values.email,
        password: values.password,
      };

      dispatch(doLoginRequest(payload));
      setStatus({ success: true });
      setSubmitting(false);
    } catch (err: any) {
      console.error(err);
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };
  return (
    <div className="login-box d-flex aligns-items-center justify-content-center">
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-4 fw-light fs-5">Sign In</h5>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                    submit: null,
                  }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string().max(255).required("Email is required"),
                    password: Yup.string().max(255).required("Password is required"),
                  })}
                  onSubmit={handleSubmitLogin}
                >
                  {({ errors, handleBlur, handleChange, handleSubmit, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                      <div className=" mb-3">
                        <input
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          type="email"
                          name="email"
                          className="form-control form-control-lg"
                          placeholder="Email"
                        />
                        {errors.email && <small className="text-danger form-text ">{errors.email}</small>}
                      </div>
                      <div className=" mb-3">
                        <input
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          name="password"
                          type="password"
                          className="form-control form-control-lg"
                          placeholder="Password"
                        />
                        {errors.password && <small className="text-danger form-text ">{errors.password}</small>}
                      </div>
                      <div className="d-grid">
                        <Button
                          disabled={isLoading}
                          variant="primary"
                          type="submit"
                          className="btn-login text-uppercase fw-bold"
                        >
                          Sign in
                        </Button>
                      </div>
                      {errors.submit && <small className="text-danger form-text ">{errors.submit}</small>}
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

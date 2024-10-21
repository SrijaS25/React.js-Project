import { useState } from "react"
import "./Registerpage.css"
import { RegisterApi } from "../services/Api";
import { storeUserData } from "../services/Storage";
import { isAuthenticated } from "../services/Auth";
import { Link, Navigate } from 'react-router-dom'
import NavBar from "../components/NavBar";

export default function Registerpage() {
  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    name: { required: false },
    custom_error: null
  }
  const [errors, setErrors] = useState(initialStateErrors);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = initialStateErrors;
    let hasError = false;

    if (inputs.name == "") {
      errors.name.required = true;
      hasError = true;
    }
    if (inputs.email == "") {
      errors.email.required = true;
      hasError = true;
    }
    if (inputs.password == "") {
      errors.password.required = true;
      hasError = true;
    }
    if (!hasError) {
      //sending register api request
      setLoading(true)
      RegisterApi(inputs).then((response) => {
        storeUserData(response.data.idToken);
      }).catch((err) => {
        if (err.response.data.error.message == "EMAIL_EXISTS") {
          setErrors({ ...errors, custom_error: "Alreay this email has been register!" })
        } else if (String(err.response.data.error.message).includes("WEAK_PASSWORD ")) {
          setErrors({ ...errors, custom_error: "Please Enter atleast 6 character in password" })
        }

      }).finally(() => {
        setLoading(false)
      })
    }

    setErrors({...errors});
  }

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  })

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  if (isAuthenticated()) {
    // redireact to dashboard

    return <Navigate to="/dashboard" />
  }

  return (
  <>
  <NavBar/>
    <section className="register-block">
      <div className="container">
        <div className="row ">
          <div className="col register-sec">
            <h2 className="text-center">Register Now</h2>
            <form onSubmit={handleSubmit} className="register-form" action="" >
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">Name</label>
                <input type="text" className="form-control" onChange={handleInputs} placeholder="Name" name="name" />

                {errors.name.required ?
                  (<span className="text-danger" >
                    Name is required.
                  </span>) : null}

              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                <input type="text" className="form-control" onChange={handleInputs} placeholder="E-mail" name="email" />

                {errors.email.required ?
                  (<span className="text-danger" >
                    Email is required.
                  </span>) : null}

              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                <input className="form-control" type="password" onChange={handleInputs} placeholder="Password" name="password" />
                {errors.password.required ?
                  (<span className="text-danger" >
                    Password is required.
                  </span>) : null}
              </div>

              <div className="form-group">
                <span className="text-danger" >
                  {errors.custom_error ?
                    (<p>{errors.custom_error}</p>) : null
                  }
                </span>

                {loading ?
                  (<div className="text-center">
                    <div className="spinner-border text-primary " role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>) : null}

                <input type="submit" className="btn btn-login float-right" disabled={loading} value="Register" />
              </div>
              <div className="clearfix"></div>
              <div className="form-group">
                Already have account ? Please <Link to="/login">Login</Link>
              </div>


            </form>


          </div>

        </div>


      </div>
    </section>
  </>
  )
}
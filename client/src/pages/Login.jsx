import {useForm} from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

import {  Navigate } from "react-router-dom";


const schema = yup.object({
    email: yup.string()
      .trim()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup.string()
      .trim()
      .required('Password is required')
      .min(2, 'Password must be at least 2 characters long')
  });





const Login = () => {
    const {loginUser, user} = useContext(AuthContext)
    

    const {register, handleSubmit ,formState : {errors, isSubmitting}} = useForm({
        resolver: yupResolver(schema)
    })

    const handleOnSubmit = async (data) => {
        try{
            let response = await loginUser(data)
        }catch(err){   
            console.log(err)
        }
    }

  return (
    <>
    <div className="row mt-5 justify-content-center">
        <div className="col-md-5 card p-3">
            {user?.first_name}
        <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            {...register("email")}
          />
           {errors.email && <p className='text-danger'>{errors.email.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="exampleInputPassword1"
            {...register("password")}
          />
          {errors.password && <p className='text-danger'>{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? 'Logging' : 'Login'}
        </button>
        {user && <Navigate to={"/"}/>}
      </form>
        </div>
    </div>
    </>
  );
};

export default Login;

import React from 'react';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import {useMutation} from '@tanstack/react-query';
import { signup } from '../../services/index/users';
import toast from 'react-hot-toast';

export default function RegisterPage() {

    const {mutate, isLoading} = useMutation({
        mutationFn:({name, email, password}) => {
            return signup({name, email, password});
        },
        onSuccess: (data) =>{       //AFTER GETTING DATA FROM BACKEND,THIS FUNCTION RUNS AUTOMATICALLY
          console.log(data);
        },
        onError: (error) => {
          toast.error(error.message)
          console.log(error);
        }
    });

    const {register, handleSubmit, formState:{errors, isValid},watch} = useForm({
        defaultValues:{
            name:"",
            email:"",
            password:"",
            confirmPassword:""
        },
        mode:"onChange"
    })
    const submitHandler = (data) =>{
        const {name, email, password} = data;
        mutate({name, email, password});
    };
    const password=watch('password');

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="font-roboto font-bold text-2xl text-center text-dark-hard mb-8">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="name"
                className="text-[#5a7184] font-semibold block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name",{           //validation rules
                    minLength:{
                        value:1,
                        message:"Name length must be atleast 1 character"
                    },
                    required:{
                        value:true,
                        message:"Name is required"
                    }
                 })}
                placeholder="Enter name"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9] ${errors.name? "border-red-500": "border-[#c3cad9]"}`}
              />
              {errors.name?.message && (
                <p className='text-red-500 text-xs mt-1'>{errors.name?.message}</p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="email"
                className="text-[#5a7184] font-semibold block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email",{           //validation rules
                    pattern:{
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Enter a valid email',
                    },
                    required:{
                        value:true,
                        message:"email is required"
                    }
                 })}
                placeholder="Enter email"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9] ${errors.email? "border-red-500": "border-[#c3cad9]"}`} />
                {errors.email?.message && (
                    <p className='text-red-500 text-xs mt-1'>{errors.email?.message}</p>
                  )}
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="password"
                className="text-[#5a7184] font-semibold block"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password",{
                    required:{
                        value:true,
                        message:"Password is required"
                    },
                    minLength:{
                        value:6,
                        message:"Password length must be atleast 6 character"
                    }
                })}
                placeholder="Enter password"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9] ${errors.password? "border-red-500": "border-[#c3cad9]"}`} />
                {errors.password?.message && (
                <p className='text-red-500 text-xs mt-1'>{errors.password?.message}</p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="confirmpassword"
                className="text-[#5a7184] font-semibold block"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                {...register("confirmPassword",{
                    required:{
                        value:true,
                        message:"Confirm password is required"
                    },
                    validate: (value)=>{
                        if(value !== password){
                            return "Passwords do not match";
                        }
                    }
                })}
                placeholder="Enter confirm password"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9] ${errors.confirmPassword? "border-red-500": "border-[#c3cad9]"}`} />
                {errors.confirmPassword?.message && (
                <p className='text-red-500 text-xs mt-1'>{errors.confirmPassword?.message}</p>
              )}
            </div>
            <Link to="/forget-password" className='text-sm font-semibold text-primary'>Forget Password?</Link>
            <button type='submit' disabled={!isValid || isLoading} className='bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed'>Register</button>
            <p className='text-sm font-semibold text-[#5a7184]'>You have an account? <Link to='/login' className='text-primary'>login now</Link></p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Toast } from 'flowbite-react';
import { HiCheck, HiExclamation } from 'react-icons/hi';
import { Button } from '../../../components/Buttons';
import InputField from '../../../components/InputField';
import FormikForm from '../../../components/FormikForm';

function SignIn() {
  const {
    loginLoading, loginSucc, loginError, loginErrorMessage,
  } = useSelector((state) => state.user);

  const formValues = {
    email: '',
    password: '',
  };

  const validate = Yup.object({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be atleast 8 characters long')
      .required('Password is required')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        `Must Contain One Uppercase, One Lowercase,
            One Number and one special case Character`,
      ),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateSuccess = () => {
    navigate('/dashboard');
  };

  const login = async (values) => {
  
  };

  const handleSubmit = (values) => {
    login(values);
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-[80%] md:w-[60%]">
        <h1 className="text-lg sm:text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
          Login to your Account ✨
        </h1>
        <FormikForm
          initialValues={formValues}
          validationSchema={validate}
          submit={handleSubmit}
          className="mt-[24px] w-full"
          styling="w-full"
        >
          <InputField
            tag="input"
            label="Email"
            height="h-[38px]"
            type="email"
            name="email"
            required
          />
          <InputField
            tag="input"
            label="Password"
            height="h-[38px]"
            type="password"
            name="password"
            styling="mt-[16px]"
            required
          />

          {loginSucc && (
            <Toast
              className="w-full"
              theme={{
                root: {
                  base: 'flex items-center justify-start w-full bg-white mt-5 py-2 px-4 rounded-lg',
                },
              }}
            >
              <div className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <HiCheck className="h-4 w-4" />
              </div>
              <div className="ml-3 text-sm font-normal">Login success</div>
            </Toast>
          )}

          {loginError && (
            <Toast
              className="w-full"
              theme={{
                root: {
                  base: 'flex items-center justify-start w-full bg-white mt-5 py-2 px-4 rounded-lg',
                },
              }}
            >
              <div className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                <HiExclamation className="h-4 w-4" />
              </div>
              <div className="ml-3 text-sm font-normal">
                {loginErrorMessage}
              </div>
            </Toast>
          )}
          {/* submit button */}
          <Button styling="mt-[24px]" type="submit" disabled={loginLoading}>
            {loginLoading ? (
              <span className="flex items-center justify-center">
                <Spinner aria-label="Spinner button example" size="sm" />
                <span className="pl-3 text-[14px]">Loading...</span>
              </span>
            ) : (
              'Submit'
            )}
          </Button>

          <div className="flex justify-end mt-[12px]">
            <Link
              to="/password-reset-verify-email"
              className="font-[600] text-[13px] underline"
            >
              Forgot Password?
            </Link>
          </div>

          <hr className="my-[24px]" />
          <p className="text-[14px] font-[500]">
            Don't have an account?
            {' '}
            <Link to="/signup" className="text-[#6366F1] hover:underline">
              Sign Up
            </Link>
          </p>
        </FormikForm>
      </div>
    </div>
  );
}

export default SignIn;

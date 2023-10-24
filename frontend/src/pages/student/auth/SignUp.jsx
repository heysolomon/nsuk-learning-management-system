/* eslint-disable react/prop-types */
/* eslint-disable default-case */
import React, { useState } from 'react';
// import image from "../../images/woman.png";
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Toast } from 'flowbite-react';
import { HiCheck, HiExclamation } from 'react-icons/hi';
import InputField from '../../../components/InputField';
import FormikForm from '../../../components/FormikForm';
import { Button } from '../../../components/Buttons';
import { api } from '../../../services/api';
import {
  registerFailure,
  registerStart,
  registerSuccess,
  reset,
} from '../../../redux/features/userSlice';

export function SignUp() {
  const [currentStep, setCurrentStep] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    matric_number: '',
    current_level: '',
    password: '',
    confirmPassword: '',
    picture: '',
  });

  const navigateSuccess = () => {
    navigate('/');
  };

  const registerUser = async (values) => {
    const API_URL = '/student';
    dispatch(registerStart());
    try {
      const res = await api.post(API_URL, values, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res);
      dispatch(registerSuccess());
      // setTimeout(() => {
      //   navigate('/login');
      //   dispatch(reset());
      // }, 1000);
    } catch (err) {
      if (err.message === 'Network Error') {
        dispatch(registerFailure('Network Error'));
      } else {
        dispatch(registerFailure(err.response.data.message));
      }

      console.log(err);
    }
  };

  const handleNextStep = (newData, file, final = false) => {
    setData((prev) => ({ ...prev, ...newData, picture: file }));

    if (final) {
      registerUser(newData);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  // set bring in the steps
  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
  ];
  return (
    <div className="flex items-center justify-center">
      <div className="w-[80%] md:w-[60%]">
        <h1 className="text-lg sm:text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
          Create your Account ✨
        </h1>
        {steps[currentStep]}
      </div>
    </div>
  );
}

export function StepOne(props) {
  const [file, setFile] = useState('');
  const { next, data } = props;
  const handleSubmit = (values) => {
    next(values, file);
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  // Create a reference to the hidden file input element
  const hiddenPictureInput = React.useRef(null);

  // funtion to upload profile picture
  const handleUpload = () => {
    hiddenPictureInput.current.click();
  };
  // the yup validation schema
  const validate = Yup.object({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
  });
  return (
    <FormikForm
      initialValues={data}
      validationSchema={validate}
      submit={handleSubmit}
      className="mt-[24px]"
    >
      <InputField
        tag="input"
        label="First Name"
        height="h-[38px]"
        type="text"
        name="first_name"
        required
      />
      <InputField
        tag="input"
        label="Middle Name (Optional)"
        height="h-[38px]"
        type="text"
        name="middle_name"
        styling="mt-[16px]"
      />
      <InputField
        tag="input"
        label="Last Name"
        height="h-[38px]"
        type="text"
        name="last_name"
        styling="mt-[16px]"
        required
      />

      {/* image upload */}
      <section className="mt-[12.08px]">
        <div className="mt-[12px]">
          <div
            className="border-[0.754688px] shadow-textField border-[#D0D5DD] text-[12.075px] text-[#667085] font-[400] py-2 px-5 focus:outline-none
                     focus:border-indigo-500 rounded-[6.0375px] flex flex-col items-center"
          >
            <p>
              <span
                className="font-[600] text-indigo-500 hover:cursor-pointer hover:underline"
                aria-hidden
                onClick={handleUpload}
              >
                Click to upload
              </span>
              {' '}
              or drag and drop a picture of your choice.
              {' '}
              <br />
              {' '}
              This picture
              will act as your profile picture
            </p>
            <p>SVG, PNG, JPG(max.800x400px)</p>
            <p className="font-[600]">{file.name}</p>
          </div>
          <input
            name="picture"
            type="file"
            ref={hiddenPictureInput}
            onChange={(e) => handleChange(e)}
            className="hidden"
            accept=".png, .jpeg, .jpg"
          />
        </div>
      </section>

      <Button styling="mt-[24px]" type="submit">
        Next
      </Button>

      <hr className="my-[24px]" />
      <p className="text-[14px] font-[500]">
        Have an account?
        {' '}
        <Link to="/" className="text-[#6366F1] hover:underline">
          Sign In
        </Link>
      </p>
    </FormikForm>
  );
}

export function StepTwo(props) {
  const { next, data, prev } = props;
  const {
    registerLoading, registerSucc, registerError, registerErrorMessage,
  } = useSelector((state) => state.user);
  const handleSubmit = (values) => {
    next(values, values.picture, true);
  };

  const validate = Yup.object({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    matric_number: Yup.string().required('Matric Number is Required'),
    current_level: Yup.string().required('Current Level is Required'),
    password: Yup.string()
      .min(8, 'Password must be atleast 8 characters long')
      .required('Password is required')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        `Must Contain One Uppercase, One Lowercase,
        One Number and one special case Character`,
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  return (
    <Formik
      initialValues={data}
      validationSchema={validate}
      onSubmit={handleSubmit}
      className="mt-[24px]"
    >
      {({ values }) => (
        <Form>
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
            label="Matric Number"
            height="h-[38px]"
            type="text"
            name="matric_number"
            styling="mt-[16px]"
            required
          />
          <InputField
            tag="input"
            label="Current Level"
            height="h-[38px]"
            type="text"
            name="current_level"
            styling="mt-[16px]"
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
          <InputField
            tag="input"
            label="Confirm Password"
            height="h-[38px]"
            type="password"
            name="confirmPassword"
            styling="mt-[16px]"
            required
          />

          {registerSucc && (
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
              <div className="ml-3 text-sm font-normal">Register success</div>
            </Toast>
          )}

          {registerError && (
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
                {registerErrorMessage}
              </div>
            </Toast>
          )}
          <div className="grid grid-cols-2 gap-x-5">
            <Button
              styling="mt-[24px]"
              type="button"
              onClick={() => prev(values)}
            >
              Back
            </Button>

            {/* submit button */}
            <Button styling="mt-[24px]" type="submit">
              {registerLoading ? (
                <span className="flex items-center justify-center">
                  <Spinner aria-label="Spinner button example" size="sm" />
                  <span className="pl-3 text-[14px]">Loading...</span>
                </span>
              ) : (
                'Sign Up'
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/Buttons';
import InputField from '../../../components/InputField';
import FormikForm from '../../../components/FormikForm';
import BannerAuth from '../../../partials/BannerAuth';

export function ForgotPasswordVerifyEmail() {
  const formValues = {
    email: '',
  };

  const validate = Yup.object({
    email: Yup.string().email('Email is invalid').required('Email is required'),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateSuccess = () => {
    navigate('/dashboard');
  };

  const login = async (values) => {};

  const handleSubmit = (values) => {
    login(values);
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-[80%] md:w-[60%]">
        <h1 className="text-lg sm:text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
          Forgot Password?
        </h1>
        <p className="text-[14px] font-[500]">
          Please enter your registered email to reset your password.
        </p>
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
          {/* submit button */}
          <Button styling="mt-[24px]" type="submit">
            Submit
          </Button>
        </FormikForm>
      </div>
    </div>
  );
}

export function ForgotPasswordEmailVerified() {
  const [prompt, setPrompt] = useState(false);
  const [message, setMessage] = useState('');
  const { signingIn } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateSuccess = () => {
    navigate('/dashboard');
  };

  const login = async (values) => {};

  const handleSubmit = (values) => {
    login(values);
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-[80%] md:w-[60%]">
        <h1 className="text-lg sm:text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
          Forgot Password
        </h1>
        <p className="text-[14px] font-[500]">
          An email has been sent to your registered email. Follow the link to
          reset your password.
        </p>

        <Button styling="mt-[24px]" type="submit">
          Done
        </Button>
      </div>
    </div>
  );
}

/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { FieldArray } from 'formik';
import { closeModal } from '../../../redux/features/Modals/modalSlice';
import FormikForm from '../../FormikForm/FormikForm';
import InputField from '../../InputField';
import { addQ } from '../../../redux/features/criteriaSlice';
import { CircleAddIcon } from '../../../assets/images';

function MultipleInputModal() {
  const dispatch = useDispatch();

  const formValue = {
    type: 'multipleInput',
    questions: [
      {
        id: uuidv4(),
        question: '',
        input: '',
      },
    ],
  };

  const options = [
    {
      id: 1,
      name: '-- select inputs --',
      isDisabled: true,
    },
    {
      id: 2,
      name: '1 Input',
      isDisabled: false,
    },
    {
      id: 3,
      name: '2 Inputs',
      isDisabled: false,
    },
    {
      id: 4,
      name: '3 Inputs',
      isDisabled: false,
    },
  ];

  const validate = Yup.object({
    questions: Yup.array()
      .of(
        Yup.object().shape({
          question: Yup.string().min(4, 'too short').required('Required'), // these constraints take precedence
          input: Yup.string().required('Required'), // these constraints take precedence
        }),
      )
      .required('Must have friends') // these constraints are shown if and only if inner constraints are satisfied
      .min(1, 'Minimum of 3 friends'),
  });

  const addQuestion = async (values) => {
    dispatch(addQ(values));
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const submit = async (values) => {
    addQuestion(values);
    dispatch(closeModal());
  };
  return (
    <div className="p-5 w-full h-full">
      <h1 className="font-[600] text-[28px] text-black2 mb-[27px]">
        Input Single Question
      </h1>

      <FormikForm
        initialValues={formValue}
        submit={submit}
        validationSchema={validate}
      >
        <FieldArray name="questions">
          {(props) => {
            const { push, form } = props;
            const { values } = form;
            const { questions } = values;
            return (
              <div>
                {questions.map((i, index) => (
                  <div key={i.id} className="mt-[20px]">
                    <InputField
                      type="text"
                      tag="input"
                      name={`questions.${index}.question`}
                      placeholder="Enter the question"
                      styling="h-[60px]"
                      inputStyle="py-3 pl-4"
                    />
                    <InputField
                      type="text"
                      tag="select"
                      options={options}
                      name={`questions.${index}.input`}
                      styling="h-[60px] mt-5"
                      inputStyle="py-3 pl-4"
                    />
                  </div>
                ))}

                <div
                  className="flex mt-[20px] hover:cursor-pointer"
                  aria-hidden
                  onClick={() => push({
                      id: uuidv4(),
                      question: '',
                      input: '',
                  })}
                >
                  <button type="button" className="mr-[10px]">
                    <CircleAddIcon color="#058B94" />
                  </button>
                  <p className="font-[400] text-[18px] text-black5">
                    Add another question
                  </p>
                </div>
              </div>
            );
          }}
        </FieldArray>
        <div className="mt-24 flex justify-between">
          <button
            onClick={handleClose}
            type="button"
            className="border-[1px] border-pri3 rounded-[10px] font-[600] text-[14px] text-[#023C40] hover:bg-pri10 duration-700 h-[47px] px-10"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-pri3 rounded-[10px] font-[600] text-[14px] text-white hover:bg-pri2 duration-700 h-[47px] mr-[10px] px-10"
          >
            Done
          </button>
        </div>
      </FormikForm>
    </div>
  );
}

export default MultipleInputModal;

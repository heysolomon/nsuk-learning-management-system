import React, { useState } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/features/Modals/modalSlice';
import FormikForm from '../../FormikForm/FormikForm';
import InputField from '../../InputField';
import { addQ } from '../../../redux/features/criteriaSlice';
import { CircleAddIcon, SubtractIcon } from '../../../assets/images';

function MultipleChoiceInputModal() {
  const dispatch = useDispatch();

  const initialOptions = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ];

  const [options, setOptions] = useState(initialOptions);

  //   initial form values
  const formValue = options.reduce(
    (acc, option) => {
      const optionKey = `option-${option.id}`;
      return {
        ...acc,
        [optionKey]: '',
      };
    },
    {
      question: '',
    },
  );

  const validate = Yup.object({
    question: Yup.string().required(''),
  });

  const addQuestion = async (values) => {
    const newValues = {
      type: 'multipleChoiceInput',
      ...values,
    };
    dispatch(addQ(newValues));
  };

  const addNewOption = () => {
    setOptions([
      ...options,
      {
        id: options.length + 1,
      },
    ]);
  };

  const removeOption = (id) => {
    if (options.length > 2) {
      const updatedOptions = options.filter((option) => option.id !== id);
      setOptions(updatedOptions);
    }
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
      <h1 className="font-[600] text-[28px] text-black2 mb-[47px]">
        Input Multiple Select Option
      </h1>

      <FormikForm
        initialValues={formValue}
        submit={submit}
        validationSchema={validate}
      >
        <InputField
          type="text"
          tag="input"
          name="question"
          placeholder="Enter the question"
          styling="h-[60px]"
          inputStyle="py-3 pl-4"
        />

        {options.map((i) => (
          <div
            key={i.id}
            className="flex items-center rounded-[5px] pr-[10px] mt-[20px] border-[1px] border-black8 focus-within:border-pri3 focus-within:ring-pri3 focus-within:ring-1"
          >
            <InputField
              border={false}
              type="text"
              tag="input"
              placeholder="Enter option"
              name={`option-${i.id}`}
              styling="h-[50px]"
              inputStyle="py-3 pl-4"
            />

            <button type="button" onClick={() => removeOption(i.id)}>
              <SubtractIcon color="#000000" />
            </button>
          </div>
        ))}

        <div className="flex justify-end mt-[20px]">
          <button type="button" className="mr-[10px]" onClick={addNewOption}>
            <CircleAddIcon color="#058B94" />
          </button>
        </div>

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

export default MultipleChoiceInputModal;

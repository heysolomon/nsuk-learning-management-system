import React from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/features/Modals/modalSlice';
import FormikForm from '../../FormikForm/FormikForm';
import InputField from '../../InputField';
import { addQ } from '../../../redux/features/criteriaSlice';
import { CircleAddIcon } from '../../../assets/images';

function FileInputModal() {
  const dispatch = useDispatch();
  const formValue = {
    question: '',
  };

  const options = [
    {
      id: 1,
      name: 'File type',
    },
    {
      id: 2,
      name: 'image',
    },
    {
      id: 3,
      name: 'pdf',
    },
  ];

  const quantityOptions = [
    {
      id: 1,
      name: 'Qty',
    },
  ];

  const validate = Yup.object({
    question: Yup.string().required(''),
  });

  const addQuestion = async (values) => {
    const newValues = {
      type: 'fileInput',
      ...values,
    };
    dispatch(addQ(newValues));
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
        Input File Request
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
        <div className="flex justify-between items-center mt-[25px]">
          <p className="font-[400] text-[18px] text-black1 mr-2">1.</p>
          <InputField
            border={false}
            type="text"
            tag="input"
            responsive={false}
            name="fileName"
            placeholder="File name"
            styling="border-b-[1px] border-b-black9 w-[40%]"
            inputStyle=""
          />

          {/* filetype */}
          <InputField
            tag="select"
            options={options}
            name="fileType"
            responsive={false}
            styling="w-[25%]"
            inputStyle="py-3 pl-4"
          />

          {/* quantity */}
          <InputField
            tag="select"
            options={quantityOptions}
            name="quantity"
            responsive={false}
            styling="w-[20%]"
            inputStyle="py-3 pl-4"
          />
        </div>
        <div className="flex justify-between items-center mt-[25px]">
          <p className="font-[400] text-[18px] text-black1 mr-2">2.</p>
          <InputField
            border={false}
            type="text"
            tag="input"
            responsive={false}
            name="fileName"
            placeholder="File name"
            styling="border-b-[1px] border-b-black9 w-[40%]"
            inputStyle=""
          />

          {/* filetype */}
          <InputField
            tag="select"
            options={options}
            name="fileType"
            responsive={false}
            styling="w-[25%]"
            inputStyle="py-3 pl-4"
          />

          {/* quantity */}
          <InputField
            tag="select"
            options={quantityOptions}
            name="quantity"
            responsive={false}
            styling="w-[20%]"
            inputStyle="py-3 pl-4"
          />
        </div>
        <div className="flex mt-[20px]">
          <button type="button" className="mr-[10px]">
            <CircleAddIcon color="#058B94" />
          </button>
          <p className="font-[400] text-[18px] text-black5">Add field</p>
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

export default FileInputModal;

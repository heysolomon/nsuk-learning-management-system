import React from 'react';
import { useDispatch } from 'react-redux';
import { ResetPasswordIllustration } from '../../../assets/images';
import { closeModal } from '../../../redux/features/Modals/modalSlice';

function CreateProgramSuccessModal() {
  const dispatch = useDispatch();
  return (
    <div>
      <h2 className="font-mukta font-[600] text-black1 text-[18px] md:text-[24px]">
        Program created successfully!
      </h2>
      <ResetPasswordIllustration styling="mt-[28px] mb-5" />
      <div className="flex justify-center">
        <button
          onClick={() => dispatch(closeModal())}
          type="button"
          className="bg-pri3 py-2.5 px-10 rounded-md text-white font-semibold mx-1"
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default CreateProgramSuccessModal;

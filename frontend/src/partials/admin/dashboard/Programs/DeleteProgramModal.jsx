import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteImage } from '../../../assets/images';
import { closeModal } from '../../../redux/features/Modals/modalSlice';

function DeleteProgramModal() {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-mukta font-[600] text-black1 text-[18px] md:text-[24px] text-center">
        Program Deleted Successfully
      </h2>

      <DeleteImage styling="mt-[28px]" />
      <div className="flex items-center justify-between mt-[28px] w-full">
        <button
          type="button"
          className="border-[1px] border-pri3 rounded-[10px] font-[600] text-[16px] text-[#023C40] hover:bg-pri10 duration-700 h-[50px] px-10"
        >
          Undo
        </button>
        <button
          type="submit"
          onClick={() => dispatch(closeModal())}
          className="bg-pri3 rounded-[10px] font-[600] text-[16px] text-white hover:bg-pri2 duration-700 h-[50px] mr-[10px] px-10"
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default DeleteProgramModal;

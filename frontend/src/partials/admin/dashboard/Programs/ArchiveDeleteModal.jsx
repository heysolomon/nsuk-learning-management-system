import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/features/Modals/modalSlice';
import ArchiveProgramModal from './ArchiveProgramModal';
import DeleteProgramModal from './DeleteProgramModal';

function ArchiveDeleteModal() {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(openModal(<DeleteProgramModal />));
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-mukta font-[600] text-black1 text-[18px] md:text-[24px] text-center my-24">
        Choose to Delete or Archive Program
      </h2>

      <div className="flex items-center justify-between w-[80%]">
        <button
          type="button"
          onClick={handleDelete}
          className="border-[1px] border-pri3 rounded-[10px] font-[600] text-[16px] text-[#023C40] hover:bg-pri10 duration-700 h-[50px] px-10"
        >
          Delete
        </button>
        <button
          type="submit"
          onClick={() => dispatch(openModal(<ArchiveProgramModal />))}
          className="bg-pri3 rounded-[10px] font-[600] text-[16px] text-white hover:bg-pri2 duration-700 h-[50px] mr-[10px] px-10"
        >
          Archive
        </button>
      </div>
    </div>
  );
}

export default ArchiveDeleteModal;

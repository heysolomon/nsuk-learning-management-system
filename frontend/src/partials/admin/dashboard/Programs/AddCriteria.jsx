import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal,
  openModal } from '../../../redux/features/Modals/modalSlice';
import FileInputModal from './FileInputModal';
import MultipleChoiceInputModal from './MultipleChoiceInputModal';
import MultipleInputModal from './MultipleInputModal';
import SingleInputModal from './SingleInputModal';
import YesOrNoModal from './YesOrNo';

function AddCriteria() {
  const dispatch = useDispatch();
  const inputTypes = [
    {
      id: 1,
      name: 'Single Input',
    },
    {
      id: 2,
      name: 'Multiple Input',
    },
    {
      id: 3,
      name: 'Yes/No',
    },
    {
      id: 4,
      name: 'File Input',
    },
    {
      id: 5,
      name: 'Multi Choice',
    },
  ];

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleClickItem = (i) => {
    if (i.id === 1) {
      dispatch(openModal(<SingleInputModal />));
    }
    if (i.id === 2) {
      dispatch(openModal(<MultipleInputModal />));
    }
    if (i.id === 3) {
      dispatch(openModal(<YesOrNoModal />));
    }
    if (i.id === 4) {
      dispatch(openModal(<FileInputModal />));
    }
    if (i.id === 5) {
      dispatch(openModal(<MultipleChoiceInputModal />));
    }
  };
  return (
    <div className="w-full h-full p-5">
      <h1 className="font-[600] text-[28px] text-black2 mb-[47px]">
        Select Input Type
      </h1>

      <ul className="shadow-criteriaShadow rounded-[5px] bg-white">
        {inputTypes.map((i) => (
          <li
            key={i.id}
            className="font-[400] text-[18px] text-black5 pl-[20px] py-[14px] hover:cursor-pointer hover:bg-pri11"
            onClick={() => handleClickItem(i)}
            aria-hidden
          >
            {i.name}
          </li>
        ))}
      </ul>

      <button
        onClick={handleClose}
        type="button"
        className="border-[1px] border-pri3 rounded-[10px] font-[600] text-[14px] text-[#023C40] hover:bg-pri10 duration-700 h-[47px] px-10 mt-10"
      >
        Cancel
      </button>
    </div>
  );
}

export default AddCriteria;

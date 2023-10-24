/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SpinnerCircular } from 'spinners-react';
import { closeModal } from '../../../redux/features/Modals/modalSlice';
import { uploadProfilePictureStart,
  uploadProfilePictureSuccess } from '../../../redux/features/userSlice';
import Button from '../../utilities/Buttons/Button';
// import { useDispatch } from 'react-redux';;

function UploadAvatar({ image, imgUrl }) {
  const dispatch = useDispatch();

  const { uploadingProfilePicture } = useSelector((state) => state.user);

  const uploadPicture = async () => {
    dispatch(uploadProfilePictureStart());

    const form = new FormData();

    form.append('profile_picture', image);

    dispatch(uploadProfilePictureSuccess(imgUrl));
    dispatch(closeModal());
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-mukta font-[600] text-black1 text-[18px] md:text-[24px]">
        New Program Avatar Preview
      </h2>
      <img
        src={imgUrl}
        className="w-[200px] h-[200px] rounded-full object-cover object-top mt-5 mb-5"
        alt=""
      />

      <div className="w-full">
        <Button
          width="w-full mt-[28px] w-[50%]"
          onClick={uploadPicture}
          aria-hidden="true"
        >
          {uploadingProfilePicture ? (
            <SpinnerCircular
              color="#F7FEFF"
              className="mr-2"
              thickness={250}
              size={20}
            />
          ) : (
            'Upload Avatar'
          )}
        </Button>
      </div>
    </div>
  );
}

export default UploadAvatar;

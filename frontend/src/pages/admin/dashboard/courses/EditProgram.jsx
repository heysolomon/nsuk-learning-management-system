/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RiSearchLine } from 'react-icons/ri';
import { BsFilter, BsPlusCircle } from 'react-icons/bs';
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import { SpinnerCircular } from 'spinners-react';
import { ProgramAvatar, RemoveIcon } from '../../../assets/images';
import { openModal } from '../../../redux/features/Modals/modalSlice';
import CreateTask from '../../../components/Modals/CreateTask';
import FormikForm from '../../../components/FormikForm/FormikForm';
import InputField from '../../../components/InputField';
import { createTaskFailure,
  createTaskStart,
  createTaskSuccess } from '../../../redux/features/taskSlice';
import { tasks } from '../../../services/api';
import TaskLoading from '../../../components/Dashboard/Tasks/TasksLoading';
import UploadAvatar from '../../../components/Dashboard/Programs/UploadAvatar';
import EditProgramSuccessModal from '../../../components/Dashboard/Programs/EditProgramSuccessModal';

function EditProgram() {
  const [checked, setChecked] = useState(false);
  const [sort, setSort] = useState(false);
  const [mentorsOpen, setMentorsOpen] = useState(true);
  const [mentorsmanagersOpen, setmentorsmanagersOpen] = useState(false);
  const [searchText, setSearch] = useState('');
  const [selectedMentors, setSelectedMentors] = useState([]);
  const [selectedMentorsManagers, setSelectedMentorsManagers] = useState([]);

  const { userInfo, profilePicture, uploadingProfilePicture } = useSelector(
    (state) => state.user,
  );
  const userToken = userInfo.data.access_token;

  const dispatch = useDispatch();

  const search = () => {
    setChecked(true);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  const { isLoading } = useSelector((state) => state.tasks);

  const initialValues = {
    title: '',
    description: '',
    task_id: 123,
  };

  const validate = Yup.object({
    title: Yup.string()
      .max(32, 'The title must contain a maximum of 32 characters')
      .required('The task title is required'),
    description: Yup.string().required('The task description is required'),
  });

  const createTask = async (values) => {
    dispatch(createTaskStart());
    // console.log(values);
    try {
      await tasks.post(
        '/tasks',
        {
          ...values,
          mentors: selectedMentors,
          mentorManagers: selectedMentorsManagers,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      dispatch(createTaskSuccess());
      dispatch(openModal(<CreateTask />));
      // console.log(EditProgram);
      // setMessage(changeUserPasswordRequest.data.message);
    } catch (err) {
      if (err) {
        dispatch(createTaskFailure());
        // console.log();
        // setMessage(err.response.data.message);
      }
    }
  };
  const submit = async (values) => {
    createTask(values);
  };

  const pushMentors = (mentorSelected) => {
    if (selectedMentors.includes(mentorSelected) !== true) {
      setSelectedMentors(() => [...selectedMentors, mentorSelected]);
    }
  };
  const pushMentorsManagers = (mentorSelected) => {
    if (selectedMentorsManagers.includes(mentorSelected) !== true) {
      setSelectedMentorsManagers(() => [
        ...selectedMentorsManagers,
        mentorSelected,
      ]);
    }
  };
  const removeMentors = () => {
    setSelectedMentors([]);
  };

  const removeMentorsManagers = () => {
    setSelectedMentorsManagers([]);
  };

  const hiddenPictureInput = React.useRef(null);

  const handleChangeFile = (e) => {
    dispatch(
      openModal(
        <UploadAvatar
          image={e.target.files[0]}
          imgUrl={URL.createObjectURL(e.target.files[0])}
        />,
      ),
    );
  };
  // funtion to upload profile picture
  const handleUpload = () => {
    hiddenPictureInput.current.click();
  };

  const mentorsList = [
    {
      id: 1,
      name: 'Alison Davis',
      role: 'Program Assistant, She/her',
      tags: ['MENTOR-GADS'],
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      dateAdded: 'Added 0ct. 10 2022',
      about:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, justo ut consectetur bibendum, lorem lectus pellentesque nisi, a dapibus neque elit vel dolor. Ves',
    },
    {
      id: 2,
      name: 'Olivia Cooper',
      role: 'Mentor Manager, Andela, She/her',
      tags: ['PROGRAM ASST.'],
      url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      dateAdded: 'Added 0ct. 10 2022',
      about:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, justo ut consectetur bibendum, lorem lectus pellentesque nisi, a dapibus neque elit vel dolor. Ves',
    },
    {
      id: 3,
      name: 'Emma Patel',
      role: 'Mentor, Andela, She/her',
      tags: ['PROGRAM ASST.', 'MENTOR-GADS', 'MENTOR-MANAGER'],
      url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      dateAdded: 'Added 0ct. 10 2022',
      about:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, justo ut consectetur bibendum, lorem lectus pellentesque nisi, a dapibus neque elit vel dolor. Ves',
    },
    {
      id: 4,
      name: 'Ava Ramirez',
      role: 'Program Assistant, Andela, She/her',
      tags: ['PROGRAM ASST.', 'MENTOR-GADS'],
      url: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      dateAdded: 'Added 0ct. 10 2022',
      about:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, justo ut consectetur bibendum, lorem lectus pellentesque nisi, a dapibus neque elit vel dolor. Ves',
    },
    {
      id: 5,
      name: 'Caleb Nguyen',
      role: 'Admin, Andela, Him/he',
      tags: ['PROGRAM ASST.', 'MENTOR-GADS'],
      url: 'https://images.unsplash.com/photo-1576695444267-40cdd214f06e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=422&q=80',
      dateAdded: 'Added 0ct. 10 2022',
      about:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, justo ut consectetur bibendum, lorem lectus pellentesque nisi, a dapibus neque elit vel dolor. Ves',
    },
    {
      id: 6,
      name: 'Chloe Kim',
      role: 'Program Assistant, Andela, She/her',
      tags: ['PROGRAM ASST.', 'MENTOR-GADS'],
      url: 'https://images.unsplash.com/photo-1532170579297-281918c8ae72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1184&q=80',
      dateAdded: 'Added 0ct. 10 2022',
      about:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, justo ut consectetur bibendum, lorem lectus pellentesque nisi, a dapibus neque elit vel dolor. Ves',
    },
    {
      id: 7,
      name: 'Jackson Robinson',
      role: 'Program Assistant, Andela, Him/he',
      tags: ['PROGRAM ASST.', 'MENTOR-GADS'],
      url: 'https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      dateAdded: 'Added 0ct. 10 2022',
      about:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, justo ut consectetur bibendum, lorem lectus pellentesque nisi, a dapibus neque elit vel dolor. Ves',
    },
    {
      id: 8,
      name: 'Sophia Singh',
      role: 'Program Assistant, Andela, She/her',
      tags: ['PROGRAM ASST.', 'MENTOR-GADS'],
      url: 'https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80',
      dateAdded: 'Added 0ct. 10 2022',
      about:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, justo ut consectetur bibendum, lorem lectus pellentesque nisi, a dapibus neque elit vel dolor. Ves',
    },
    {
      id: 9,
      name: 'Liam Davis',
      role: 'Program Assistant, Andela, Him/he',
      tags: ['PROGRAM ASST.', 'MENTOR-GADS'],
      url: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      dateAdded: 'Added 0ct. 10 2022',
      about:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, justo ut consectetur bibendum, lorem lectus pellentesque nisi, a dapibus neque elit vel dolor. Ves',
    },
    {
      id: 10,
      name: 'Emma Hernandez',
      role: 'Program Assistant, Andela, She/her',
      tags: ['PROGRAM ASST.', 'MENTOR-GADS'],
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      dateAdded: 'Added 0ct. 10 2022',
      about:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, justo ut consectetur bibendum, lorem lectus pellentesque nisi, a dapibus neque elit vel dolor. Ves',
    },
    {
      id: 11,
      name: 'Sophia Singh',
      role: 'Program Assistant, Andela, She/her',
      tags: ['PROGRAM ASST.', 'MENTOR-GADS'],
      url: 'https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80',
      dateAdded: 'Added 0ct. 10 2022',
      about:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, justo ut consectetur bibendum, lorem lectus pellentesque nisi, a dapibus neque elit vel dolor. Ves',
    },
    {
      id: 12,
      name: 'Liam Davis',
      role: 'Program Assistant, Andela, Him/he',
      tags: ['PROGRAM ASST.', 'MENTOR-GADS'],
      url: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      dateAdded: 'Added 0ct. 10 2022',
      about:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, justo ut consectetur bibendum, lorem lectus pellentesque nisi, a dapibus neque elit vel dolor. Ves',
    },
    {
      id: 13,
      name: 'Emma Hernandez',
      role: 'Program Assistant, Andela, She/her',
      tags: ['PROGRAM ASST.', 'MENTOR-GADS'],
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      dateAdded: 'Added 0ct. 10 2022',
      about:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, justo ut consectetur bibendum, lorem lectus pellentesque nisi, a dapibus neque elit vel dolor. Ves',
    },
  ];

  return (
    <div className="h-full pb-[50px]">
      <div className="h-full">
        <h1 className="font-[700] grow flex-basis-1 w-full">Edit Program</h1>

        <div className="max-lg:flex-col-reverse flex grow flex-row max-lg:mt-5 h-full">
          <FormikForm
            initialValues={initialValues}
            validationSchema={validate}
            submit={submit}
            className="w-full"
            styling="grow h-full overflow-y-auto scroll pr-[10px]"
          >
            {/* program picture */}
            <section className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                {profilePicture === null ? (
                  <ProgramAvatar styling="h-[73px] w-[73px]" />
                ) : (
                  <img
                    src={profilePicture}
                    className="w-[73px] h-[73px] object-cover rounded-[50%] object-top"
                    alt="profile"
                  />
                )}

                <div className="ml-4 md:ml-[20px]">
                  <div className="flex items-center">
                    <h2 className="font-semibold text-2xl text-black2 mr-2">
                      Set Program Avatar
                    </h2>
                  </div>

                  <div className="mt-2">
                    <button
                      className="h-[24px] border-[1px] border-pri3 flex items-center justify-center text-[#023C40] hover:bg-pri10 duration-700 text-[12px] font-[400] text-mukta py-2 rounded-[5px] px-3"
                      type="button"
                      onClick={handleUpload}
                    >
                      {uploadingProfilePicture ? (
                        <SpinnerCircular
                          color="#F7FEFF"
                          className="mr-2"
                          thickness={250}
                          size={20}
                        />
                      ) : (
                        'Select File'
                      )}
                    </button>
                    <input
                      type="file"
                      id="uploadPicture"
                      ref={hiddenPictureInput}
                      className="hidden"
                      onChange={handleChangeFile}
                      accept=".png, .jpeg, .jpg"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* form fields */}
            <p className="text-[16px] font-[600] mt-5">Program Name</p>
            <InputField
              tag="input"
              type="text"
              name="programName"
              placeholder="Enter program name"
              styling="my-2"
              inputStyle="placeholder:text-black6 py-3 pl-3 pr-3 "
            />
            <p className="text-gray-400 text-sm">
              The title must contain a maximum of 32 characters
            </p>

            <p className="font-black text-[16px] font-[600] mt-5">
              Program Description
            </p>
            <InputField
              tag="textarea"
              name="description"
              placeholder="Enter description"
              styling="mt-2 mb-6"
              inputStyle="placeholder:text-black6 py-3 pl-3 pr-3"
            />
            {/* start mentors */}
            <div className="flex md:flex-row flex-col">
              <div className="basis-1/1 md:basis-1/2 bg-pri11 mb-2 mr-4 flex flex-col md:flex-row items-center rounded ">
                <div className="flex flex-col grow justify-center items-center grow">
                  <p className="font-black text-[16px] font-[600] mt-5 mb-2 mx-1">
                    Add Mentor Manager
                  </p>
                  {/* start select mentor */}
                  <div
                    className="flex flex-row bg-white px-3 py-.5 mb-2"
                    onClick={() => removeMentorsManagers()}
                    onKeyDown={() => removeMentorsManagers()}
                    role="button"
                    tabIndex={0}
                  >
                    <p className="mr-3">{`${selectedMentorsManagers.length} Selected`}</p>
                    <RemoveIcon styling="ml-2 object-contain cursor-pointer" />
                  </div>
                  {/* end select mentor */}
                </div>
                <div className="flex flex-col  justify-center items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setmentorsmanagersOpen(true);
                      setMentorsOpen(false);
                    }}
                    onKeyDown={() => {
                      setmentorsmanagersOpen(true);
                      setMentorsOpen(false);
                    }}
                    className="bg-pri3 py-1 mb-2 px-4 rounded-md text-white mr-1 font-light font-sm   max-md:self-center self-start lg:text-base text-sm"
                  >
                    Select
                  </button>
                </div>
              </div>

              <div className="basis-1/1 md:basis-1/2 bg-pri11 mr-4 flex flex-col md:flex-row items-center rounded ">
                <div className="flex flex-col grow justify-center items-center grow">
                  <p className="font-black text-[16px] font-[600] mt-5 mb-2 mx-1 ">
                    Add Mentor
                  </p>
                  {/* start select mentor */}
                  <div
                    className="flex flex-row bg-white px-3 py-.5 mb-2"
                    onClick={() => removeMentors()}
                    onKeyDown={() => removeMentors()}
                    role="button"
                    tabIndex={0}
                  >
                    <p className="mr-3">
                      {' '}
                      {`${selectedMentors.length} Selected`}
                    </p>
                    <RemoveIcon styling="pl-3 object-contain cursor-pointer" />
                  </div>
                  {/* end select mentor */}
                </div>
                <div className="flex flex-col  justify-center items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setmentorsmanagersOpen(false);
                      setMentorsOpen(true);
                    }}
                    onKeyDown={() => {
                      setmentorsmanagersOpen(false);
                      setMentorsOpen(true);
                    }}
                    className="bg-pri3 py-1 mb-2 px-4 rounded-md text-white mr-1 font-light font-sm   max-md:self-center self-start lg:text-base text-sm"
                  >
                    Select
                  </button>
                </div>
              </div>

              {!mentorsOpen && !mentorsmanagersOpen && (
                <div className="basis-1/1 md:basis-1/2 bg-pri11 mr-4 flex flex-col md:flex-row items-center rounded ">
                  <div className="flex flex-col grow justify-center items-center grow">
                    <p className="font-black text-[16px] font-[600] mt-5 mb-2 mx-1 ">
                      Set Criteria
                    </p>
                    {/* start select mentor */}
                    <div
                      className="flex flex-row bg-white px-3 py-.5 mb-2"
                      onClick={() => removeMentors()}
                      onKeyDown={() => removeMentors()}
                      role="button"
                      tabIndex={0}
                    >
                      <p className="mr-3">0 Selected</p>
                      <RemoveIcon styling="pl-3 object-contain cursor-pointer" />
                    </div>
                    {/* end select mentor */}
                  </div>
                  <div className="flex flex-col  justify-center items-center">
                    <button
                      type="button"
                      onClick={() => {
                        setmentorsmanagersOpen(false);
                        setMentorsOpen(true);
                      }}
                      onKeyDown={() => {
                        setmentorsmanagersOpen(false);
                        setMentorsOpen(true);
                      }}
                      className="bg-pri3 py-1 mb-2 px-4 rounded-md text-white mr-1 font-light font-sm   max-md:self-center self-start lg:text-base text-sm"
                    >
                      Select
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* end mentors */}
            <section className="flex items-center justify-end mt-[30px]">
              <button
                type="submit"
                onClick={() => dispatch(openModal(<EditProgramSuccessModal />))}
                className="bg-pri3 py-2.5 px-10 rounded-md text-white font-semibold"
              >
                {isLoading ? (
                  <SpinnerCircular
                    color="#F7FEFF"
                    className="mr-2"
                    thickness={250}
                    size={20}
                  />
                ) : (
                  'Save Changes'
                )}
              </button>
            </section>
          </FormikForm>
          {/* start mentors */}
          <div
            className={`${
              mentorsOpen ? '' : 'hidden'
            } h-full w-[62%] overflow-y-auto scroll pr-[10px]`}
          >
            <div className="tasksHeader flex flex-row justify-end">
              {checked ? (
                <div className="flex flex-row-reverse">
                  <input
                    type="text"
                    className="focus:outline-none bg-transparent pl-4 w-full"
                    placeholder="Search Mentors"
                    onChange={(e) => handleChange(e)}
                    value={searchText}
                  />
                  <BiArrowBack
                    className="text-teal-700 text-2xl mx-2 cursor-pointer"
                    onClick={() => setChecked(false)}
                  />
                </div>
              ) : (
                <>
                  <RiSearchLine
                    className="text-teal-700 text-xl mx-2 cursor-pointer"
                    onClick={search}
                  />
                  <BsFilter
                    className={`text-teal-700 text-2xl mx-2 cursor-pointer ${
                      sort ? 'rotate-180' : ''
                    }`}
                    onClick={() => setSort(!sort)}
                  />

                  <AiOutlineClose
                    className={`text-teal-700 text-md mt-1 mx-2 cursor-pointer ${
                      sort ? 'rotate-180' : ''
                    }`}
                    onClick={() => {
                      setMentorsOpen(false);
                      setmentorsmanagersOpen(false);
                    }}
                  />
                </>
              )}
            </div>
            <div className="taskContainer">
              {mentorsList.length > 0 ? (
                mentorsList
                  .filter((x) => x.name.toLowerCase().includes(searchText.toLowerCase()))
                  .map((item) => (
                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                    <div
                      className="task flex m-3 p-3 rounded-md items-center border-2
              border-grey-400 cursor-pointer flex-row max-lg:flex-col
               max-lg:justify-self-start max-lg:justify-items-start"
                      key={item.id}
                    >
                      <img
                        src={item.url}
                        alt=""
                        className="w-[50px] h-[50px] object-cover object-top rounded-full"
                      />

                      <div className="rightTask ms-4 grow max-lg:w-full max-lg:mb-3">
                        <h3 className="font-semibold">{item.name}</h3>
                        <div className="taskdate flex">
                          <p className="text-xs text-gray-600 font-light align-middle">
                            {item.role}
                          </p>
                        </div>
                        {item.tags.map((role, index) => (
                          <span
                            className="bg-pri11 text-grey-300 text-xs mt-5 p-1 mx-1"
                            key={index}
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                      {selectedMentors.includes(item.id) ? (
                        <AiOutlineCheck className="text-teal-700 text-2xl mx-2 cursor-pointer" />
                      ) : (
                        <BsPlusCircle
                          className="text-teal-700 text-2xl mx-2 cursor-pointer"
                          onClick={() => pushMentors(item.id)}
                          onKeyDown={() => pushMentors(item.id)}
                          role="button"
                          tabIndex={0}
                        />
                      )}
                    </div>
                  ))
              ) : (
                <TaskLoading />
              )}
            </div>
            {/* end tasks */}
          </div>

          {/* start mentors managers */}
          <div
            className={`${
              mentorsmanagersOpen ? '' : 'hidden'
            } h-full w-[62%] overflow-y-auto scroll pr-[10px]`}
          >
            <div className="tasksHeader flex flex-row justify-end">
              {checked ? (
                <div className="flex flex-row-reverse">
                  <input
                    type="text"
                    className="focus:outline-none bg-transparent pl-4 w-full"
                    placeholder="Search Mentors"
                    onChange={(e) => handleChange(e)}
                    value={searchText}
                  />
                  <BiArrowBack
                    className="text-teal-700 text-2xl mx-2 cursor-pointer"
                    onClick={() => setChecked(false)}
                  />
                </div>
              ) : (
                <>
                  <RiSearchLine
                    className="text-teal-700 text-xl mx-2 cursor-pointer"
                    onClick={search}
                  />
                  <BsFilter
                    className={`text-teal-700 text-2xl mx-2 cursor-pointer ${
                      sort ? 'rotate-180' : ''
                    }`}
                    onClick={() => setSort(!sort)}
                  />

                  <AiOutlineClose
                    className={`text-teal-700 text-md mt-1 mx-2 cursor-pointer ${
                      sort ? 'rotate-180' : ''
                    }`}
                    onClick={() => {
                      setMentorsOpen(false);
                      setmentorsmanagersOpen(false);
                    }}
                  />
                </>
              )}
            </div>
            <div className="taskContainer">
              {mentorsList.length > 0 ? (
                mentorsList
                  .filter((x) => x.name.toLowerCase().includes(searchText.toLowerCase()))
                  .map((item) => (
                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                    <div
                      className="task flex m-3 p-3 rounded-md items-center border-2
              border-grey-400 cursor-pointer flex-row max-lg:flex-col
               max-lg:justify-self-start max-lg:justify-items-start"
                      key={item.id}
                    >
                      <img
                        src={item.url}
                        alt=""
                        className="w-[50px] h-[50px] object-cover object-top rounded-full"
                      />

                      <div className="rightTask ms-4 grow max-lg:w-full max-lg:mb-3">
                        <h3 className="font-semibold">Alison Davis</h3>
                        <div className="taskdate flex">
                          <p className="text-xs text-gray-600 font-light align-middle">
                            {item.role}
                          </p>
                        </div>
                        {item.tags.map((role, index) => (
                          <span
                            className="bg-pri11 text-grey-300 text-xs mt-5 p-1 mx-1"
                            key={index}
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                      {selectedMentorsManagers.includes(item.id) ? (
                        <AiOutlineCheck className="text-teal-700 text-2xl mx-2 cursor-pointer" />
                      ) : (
                        <BsPlusCircle
                          className="text-teal-700 text-2xl mx-2 cursor-pointer"
                          onClick={() => pushMentorsManagers(item.id)}
                          onKeyDown={() => pushMentorsManagers(item.id)}
                          role="button"
                          tabIndex={0}
                        />
                      )}
                    </div>
                  ))
              ) : (
                <TaskLoading />
              )}
            </div>
            {/* end mentor managers */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProgram;

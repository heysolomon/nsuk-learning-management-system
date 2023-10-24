/* eslint-disable max-len */
import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { BsFilter } from 'react-icons/bs';
import { BiArrowBack } from 'react-icons/bi';
import { GoCalendar } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import { openModal } from '../../../redux/features/Modals/modalSlice';
import Time from '../../../assets/archive/time.svg';
import Google from '../../../assets/archive/google.svg';

import TaskLoading from '../../../components/Dashboard/Tasks/TasksLoading';
import { DeleteIconPrograms,
  MentorIcon,
  MentorManagerIcon,
  NoSelectedPrograms,
  ReportIcon } from '../../../assets/images';
import { programInfoOpen } from '../../../redux/features/programsSlice';
import ArchiveDeleteModal from '../../../components/Dashboard/Programs/ArchiveDeleteModal';

function ProgramsHome() {
  const [checked, setChecked] = useState(false);
  const [sort, setSort] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchText, setSearch] = useState('');

  // retrieving the tasks data from redux
  const { isProgramClicked, clickedProgram, isLoading, isDeleting } = useSelector((state) => state.programs);
  const dispatch = useDispatch();

  const search = () => {
    setChecked(true);
  };

  const programs = [
    {
      id: 1,
      programTitle: 'Andela Learning Community',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque',
    },
    {
      id: 2,
      programTitle: 'Google Africa Scholarship Program',
      description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                    commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                    penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    Donec quam felis, ultricies nec, pellentesque eu`,
    },
    {
      id: 3,
      programTitle: 'Google Africa Scholarship Program',
      description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                    commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                    penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    Donec quam felis, ultricies nec, pellentesque eu`,
    },
    {
      id: 4,
      programTitle: 'General Frequently Asked Question?',
      description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                    commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                    penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    Donec quam felis, ultricies nec, pellentesque eu`,
    },
    {
      id: 5,
      programTitle: 'Google Africa Scholarship Program',
      description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                    commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                    penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    Donec quam felis, ultricies nec, pellentesque eu`,
    },
    {
      id: 6,
      programTitle: 'Google Africa Scholarship Program',
      description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                    commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                    penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    Donec quam felis, ultricies nec, pellentesque eu`,
    },
  ];
  // function for deleting a task
  const handleDelete = () => {
    dispatch(openModal(<ArchiveDeleteModal />));
  };
  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div
        className={`${
          open ? '' : 'max-lg:hidden'
        }  basis-1/1 flex m-5 flex-col pb-5 w-[40%] lg:w-100 h-full`}
      >
        <div className="tasksHeader flex flex-row">
          {checked ? (
            <div className="flex flex-row-reverse">
              <input
                type="text"
                className="focus:outline-none bg-transparent pl-4 w-full"
                placeholder="Search tasks"
                onChange={(e) => handleChange(e)}
                value={searchText}
              />
              <BiArrowBack
                className="text-teal-700 text-2xl mx-2 cursor-pointer"
                onClick={() => {
                  setChecked(false);
                  setSearch('');
                }}
              />
            </div>
          ) : (
            <>
              <h1 className="font-[600] tasksH grow">Programs</h1>
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
            </>
          )}
        </div>
        {/* start tasks */}
        <div className="taskContainer me-2 h-full overflow-y-auto overflow-x-hidden scroll pr-[10px]">
          {isLoading ? (
            <TaskLoading />
          ) : (
            <>
              {programs
                .filter((x) => x.programTitle
                    .toLowerCase()
                    .includes(searchText.toLowerCase()))
                .map((i) => (
                  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                  <div
                    className="task flex my-3 p-3 rounded-md  border-2 border-grey-400 cursor-pointer hover:scale-95 duration-500"
                    onClick={() => {
                      setOpen(false);
                      dispatch(programInfoOpen(i));
                    }}
                    onKeyUp={() => setOpen(false)}
                    key={i.id}
                  >
                    <img src={Google} alt={i} className="w-[20%]" />
                    <div className="rightTask ms-3">
                      <h3 className="font-semibold truncate w-[80%]">
                        {i.programTitle}
                      </h3>

                      <div className="flex items-center justify-between w-max">
                        <div className="taskdate flex items-center">
                          <GoCalendar className="text-pri3 text-l me-1" />
                          <p className="text-xs text-gray-600 font-light align-middle">
                            Dec 12, 2022
                          </p>
                        </div>
                        <div className="flex items-center ml-2">
                          <img src={Time} alt="time" />
                          <p className="ml-1 font-normal text-xs text-black5">
                            8:00 pm
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
        {/* end tasks */}
      </div>

      {Object.keys(clickedProgram).length > 0 ? (
        <div
          className={`${
            open ? 'max-lg:hidden' : ''
          } g:basis-2/3 basis-1/1 w-full`}
        >
          <div className="flex flex-row-reverse">
            <NavLink
              to="/admin-dashboard/programs/new_program"
              className="bg-pri3 py-2.5 lg:px-10 px-5 rounded-md text-white font-semibold mb-3 lg:text-base text-xs"
            >
              Create New Program
            </NavLink>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="visible lg:invisible border-pri3 py-2.5 lg:px-10 px-5 rounded-md text-teal-700 font-semibold border-2 mb-3 mr-2 lg:text-base text-xs"
            >
              show all Tasks
            </button>
          </div>

          <div className="pr-[10px] pb-[100px] h-full overflow-y-auto scroll">
            <div className="task flex  flex-col  rounded-md  border-2 border-grey-400 w-full">
              <div className="flex flex-row p-4">
                <img src={Google} alt="icon" className="object-contain" />
                <div className="rightTask ms-8">
                  <h3 className="font-semibold text-xl ">
                    {clickedProgram.programTitle}
                  </h3>
                  <section className="flex items-center">
                    <div className="flex items-center mr-5">
                      <GoCalendar className="text-teal-700 text-l me-1" />
                      <p className="ml-3 font-normal text-xs text-black5">
                        Dec, 12, 2023
                      </p>
                    </div>

                    <div className="flex items-center">
                      <img src={Time} alt="time" />
                      <p className="ml-3 font-normal text-xs text-black5">
                        8:00 pm
                      </p>
                    </div>
                  </section>
                </div>
              </div>
              <div className="bg-pri11 rounded-b-lg p-4">
                <h3 className="font-[600] text-black2 text-[18px]">About:</h3>
                <p className="text-gray-500 pt-2">
                  {clickedProgram.description}
                </p>
                {/* start task1 */}
                <div className="bg-pri10 flex justify-between items-center px-5 py-1 mt-[20px]">
                  <div className="flex items-center">
                    <MentorManagerIcon styling="w-[24px]" color="#058B94" />
                    <div className="font-[700] text-[32px] text-black2 ml-5 flex items-center">
                      12
                      {' '}
                      <span className="text-[20px] font-[600] ml-3">
                        Mentor Managers assigned to this program
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="h-[24px] rounded-[5px] flex items-center justify-center px-3 border-[1px] border-pri3 duration-200 bg-pri3 text-pri11 text-[12px] hover:bg-pri2"
                  >
                    View
                  </button>
                </div>
                {/* end task 1 */}

                {/* start task 2 */}
                <div className="bg-pri10 flex justify-between items-center px-5 py-1 mt-[20px]">
                  <div className="flex items-center">
                    <MentorIcon styling="w-[24px]" color="#058B94" />
                    <div className="font-[700] text-[32px] text-black2 ml-5 flex items-center">
                      40
                      {' '}
                      <span className="text-[20px] font-[600] ml-3">
                        Mentors assigned to this program
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="h-[24px] rounded-[5px] flex items-center justify-center px-3 border-[1px] border-pri3 duration-200 bg-pri3 text-pri11 text-[12px] hover:bg-pri2"
                  >
                    View
                  </button>
                </div>
                {/* end task 2 */}

                {/* start task 3 */}
                <div className="bg-pri10 flex justify-between items-center px-5 py-1 mt-[20px]">
                  <div className="flex items-center">
                    <ReportIcon styling="w-[24px]" color="#058B94" />
                    <div className="font-[700] text-[32px] text-black2 ml-5 flex items-center">
                      40
                      {' '}
                      <span className="text-[20px] font-[600] ml-3">
                        Program Reports
                      </span>
                      <div className="w-[20px] h-[20px] bg-sec3 rounded-full text-white font-[600] flex items-center justify-center text-[18px] ml-3">
                        3
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="h-[24px] rounded-[5px] flex items-center justify-center px-3 border-[1px] border-pri3 duration-200 bg-pri3 text-pri11 text-[12px] hover:bg-pri2"
                  >
                    View
                  </button>
                </div>
                {/* end task  3 */}
                <div className="flex flex-row-reverse my-7">
                  <NavLink
                    to="/admin-dashboard/programs/edit_program"
                    className="bg-pri3 py-2.5 px-10 rounded-md text-white font-semibold"
                  >
                    Edit Program
                  </NavLink>
                  <button
                    type="button"
                    className="bg-transparent py-2.5 px-10  text-red-600 font-meduim flex flex-row"
                    onClick={handleDelete}
                    disabled={!isProgramClicked && true}
                  >
                    {isDeleting ? (
                      <SpinnerCircular
                        color="#F7FEFF"
                        className="mr-2"
                        thickness={250}
                        size={20}
                      />
                    ) : (
                      <div className="flex items-center">
                        <DeleteIconPrograms color="#CC000E" styling="mr-2" />
                        <p className="underline">Delete/Archive Program</p>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        Object.keys(clickedProgram).length === 0 && (
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col items-center">
              <NoSelectedPrograms color="#058B94" />
              <p className="font-[400] text-[16px] text-black1 mt-3">
                No item selected yet
                {' '}
              </p>

              <p className="font-[400] text-[16px] text-black6 mt-3">
                Select an item from the list to view program details
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default ProgramsHome;

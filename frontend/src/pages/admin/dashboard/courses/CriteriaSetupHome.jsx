/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import { FieldArray } from 'formik';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditIcon, SubtractIcon } from '../../../assets/images';
import AddCriteria from '../../../components/Dashboard/Programs/AddCriteria';
import FormikForm from '../../../components/FormikForm/FormikForm';
import InputField from '../../../components/InputField';
import Button from '../../../components/utilities/Buttons/Button';
import { openModal } from '../../../redux/features/Modals/modalSlice';

function CriteriaSetupHome() {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(true);

  const { criteriaQuestions, initialCriteriaQuestions } = useSelector(
    (state) => state.criteria,
  );

  const handleClick = useCallback(() => {
    dispatch(openModal(<AddCriteria />));
  }, []);

  const closePrompt = () => {
    setIsOpen(false);
  };
  return (
    <div className="w-full h-full overflow-y-auto scroll pr-[10px]">
      <h1 className="font-[700] text-[24px] text-slate-950">Criteria Setup</h1>
      {isOpen && criteriaQuestions.length === 0 && (
        <div className="rounded-[10px] bg-pri11 p-10 mt-[36px]">
          <p className="text-black4 text-[20px] font-[400]">
            To be accepted as a mentor or a mentor manager, an applicant must
            provide relevant information and documents regarding their past
            experience(s). The criteria setup lets you create input fields for
            these information.
          </p>

          <div className="flex justify-end">
            <Button width="w-[10%]" onClick={closePrompt}>
              Ok
            </Button>
          </div>
        </div>
      )}

      {criteriaQuestions.length > 0 && (
        <FormikForm
          className="mt-[30px]"
          initialValues={initialCriteriaQuestions}
        >
          {criteriaQuestions.map((i) => (
            <div key={i.id} className="mb-[30px]">
              {i.type === 'singleInput' ? (
                <div>
                  <p className="font-[400] text-[18px] text-black5 mb-[16px]">
                    {i.question}
                  </p>
                  <InputField
                    type="text"
                    tag="input"
                    name={`answer_${i.id}`}
                    styling="h-[50px]"
                    inputStyle="py-3 pl-4"
                  />
                </div>
              ) : (
                i.type === 'multipleInput' && (
                  <FieldArray name="multipleInputQuestions">
                    {({ form }) => {
                      const { values } = form;
                      const { multipleInputQuestions } = values;
                      return (
                        <>
                          {multipleInputQuestions.map((item, index) => (
                            <div key={item.id}>
                              {/* question */}
                              <p className="font-[400] text-[18px] text-black5 mb-[16px]">
                                {item.question}
                              </p>
                              <div>
                                {item.input === '2 Inputs' ? (
                                  <>
                                    <InputField
                                      type="text"
                                      tag="input"
                                      name={`multipleInputQuestions.${index}.firstAnswer`}
                                      styling="h-[50px]"
                                      inputStyle="py-3 pl-4"
                                    />
                                    <InputField
                                      type="text"
                                      tag="input"
                                      name={`multipleInputQuestions.${index}.secondAnswer`}
                                      styling="h-[50px] mt-3"
                                      inputStyle="py-3 pl-4"
                                    />
                                  </>
                                ) : item.input === '3 Inputs' ? (
                                  <>
                                    <InputField
                                      type="text"
                                      tag="input"
                                      name={`questions.${index}.firstAnswer`}
                                      styling="h-[50px]"
                                      inputStyle="py-3 pl-4"
                                    />
                                    <InputField
                                      type="text"
                                      tag="input"
                                      name={`questions.${index}.secondAnswer`}
                                      styling="h-[50px] mt-3"
                                      inputStyle="py-3 pl-4"
                                    />
                                    <InputField
                                      type="text"
                                      tag="input"
                                      name={`questions.${index}.thirdAnswer`}
                                      styling="h-[50px] mt-3"
                                      inputStyle="py-3 pl-4"
                                    />
                                  </>
                                ) : (
                                  ''
                                )}
                              </div>
                            </div>
                          ))}
                        </>
                      );
                    }}
                  </FieldArray>
                )
              )}

              <div className="flex justify-end mt-[20px]">
                <div>
                  <button type="button" className="mr-3">
                    <EditIcon color="#058B94" />
                  </button>
                  <button type="button">
                    <SubtractIcon color="#058B94" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </FormikForm>
      )}
      <div className="h-full mt-[33px]">
        <Button
          width="px-5 disabled:bg-opacity-[0.5]"
          onClick={handleClick}
          isDisabled={isOpen && true}
        >
          Add Criteria
        </Button>
      </div>
    </div>
  );
}

export default CriteriaSetupHome;

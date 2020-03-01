import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Questionnaires } from "./__generated__/Questionnaires";
import { QuestionnaireFragment } from "./__generated__/QuestionnaireFragment";
import {
  UpdateQuestionnaire,
  UpdateQuestionnaireVariables
} from "./__generated__/UpdateQuestionnaire";
import {
  QUESTIONNAIRE_FRAGMENT,
  QuestionnaireComponent
} from "./Questionnaire";

const GET_QUESTIONNAIRES = gql`
  query Questionnaires {
    questionnaires {
      ...QuestionnaireFragment
    }
  }
  ${QUESTIONNAIRE_FRAGMENT}
`;

const UPDATE_QUESTIONNAIRE = gql`
  mutation UpdateQuestionnaire($questionnaire: UpdateQuestionnaireInput!) {
    updateQuestionnaire(questionnaire: $questionnaire) {
      id
      success
    }
  }
`;

export const QuestionnaireContainer = () => {
  const { data, loading } = useQuery<Questionnaires>(GET_QUESTIONNAIRES);
  const [updateQuestionnaireFn] = useMutation<
    UpdateQuestionnaire,
    UpdateQuestionnaireVariables
  >(UPDATE_QUESTIONNAIRE);
  const submit = async (id: number, title: string) => {
    await updateQuestionnaireFn({
      variables: {
        questionnaire: {
          id,
          title
        }
      },
      update: proxy => {
        const current = proxy.readFragment<QuestionnaireFragment>({
          id: `Questinnaire:${id}`,
          fragment: QUESTIONNAIRE_FRAGMENT
        });
        proxy.writeFragment({
          id: `Questionnaire:${id}`,
          fragment: QUESTIONNAIRE_FRAGMENT,
          data: {
            ...current,
            title
          }
        });
      }
    });
  };
  return (
    <>
      {loading || !data ? (
        "loading..."
      ) : (
        <>
          {data.questionnaires.map(q => {
            return (
              <QuestionnaireComponent
                key={q.id}
                questionnaire={q}
                submit={submit}
              />
            );
          })}
        </>
      )}
    </>
  );
};

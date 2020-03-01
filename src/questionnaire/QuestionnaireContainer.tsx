import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Questionnaires } from "./__generated__/Questionnaires";
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

export const QuestionnaireContainer = () => {
  const { data, loading } = useQuery<Questionnaires>(GET_QUESTIONNAIRES);
  return (
    <>
      {loading || !data ? (
        "loading..."
      ) : (
        <>
          {data.questionnaires.map(q => {
            return <QuestionnaireComponent key={q.id} questionnaire={q} />;
          })}
        </>
      )}
    </>
  );
};

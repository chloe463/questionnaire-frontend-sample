import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";

import { QuestionnaireFragment } from "./__generated__/QuestionnaireFragment";

export const QUESTIONNAIRE_FRAGMENT = gql`
  fragment QuestionnaireFragment on Questionnaire {
    id
    title
    description
    startAt
    endAt
    questions {
      id
      text
      typeCd
      type
      required
      options {
        id
        text
      }
    }
  }
`;

interface Props {
  questionnaire: QuestionnaireFragment;
}

export const QuestionnaireComponent: React.FC<Props> = props => {
  const { questionnaire } = props;
  return (
    <Wrapper>
      <Item>
        {questionnaire.id}:{questionnaire.title}
      </Item>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Item = styled.li``;

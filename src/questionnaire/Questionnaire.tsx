import React, { useState } from "react";
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
  submit: (id: number, title: string) => void;
}

export const QuestionnaireComponent: React.FC<Props> = props => {
  const { questionnaire, submit } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(questionnaire.title);
  return (
    <Wrapper>
      <Item>
        {questionnaire.id}
        {isEditing ? (
          <TextField value={title} onChange={e => setTitle(e.target.value)} />
        ) : (
          `${questionnaire.title}`
        )}
        <EditToggleButton onClick={() => setIsEditing(v => !v)}>
          {isEditing ? `Cancel` : `Edit`}
        </EditToggleButton>
        {isEditing && (
          <SubmitButton
            onClick={() => {
              setIsEditing(false);
              submit(questionnaire.id, title);
            }}
          >
            Done
          </SubmitButton>
        )}
      </Item>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Item = styled.li``;

const TextField = styled.input.attrs({ type: "text" })``;

const EditToggleButton = styled.button``;

const SubmitButton = styled.button``;

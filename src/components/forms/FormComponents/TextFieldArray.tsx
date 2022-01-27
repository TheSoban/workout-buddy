import { Field, FieldArray, useFormikContext } from 'formik';
import React from 'react';

const TextFieldArray = <T extends unknown>() => {
  const {values} = useFormikContext<{friends: T[]}>();
  return <FieldArray
    name="friends"
    render={arrayHelpers => (
      <div>
        {values.friends && values.friends.length > 0 ? (
          values.friends.map((friend, index) => (
            <div key={index}>
              <Field name={`friends.${index}`} />
              <button
                type="button"
                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
              >
                -
              </button>
              <button
                type="button"
                onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
              >
                +
              </button>
            </div>
          ))
        ) : (
          <button type="button" onClick={() => arrayHelpers.push('')}>
            {/* show this when user has removed all friends from the list */}
            Add a friend
          </button>
        )}
        <div>
          <button type="submit">Submit</button>
        </div>
      </div>
    )}
  />
};

export default TextFieldArray;

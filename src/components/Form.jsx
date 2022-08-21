import React, { useReducer } from 'react';
import { useRef } from 'react';
import { formReducer, INITIAL_STATE } from '../hooks/formReducer';

export const Form = () => {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const tagRef = useRef(null);

  console.log('state', state);

  const handleTags = () => {
    const tags = tagRef.current.value.split(',');
    tags.forEach((tag) => {
      dispatch({ type: 'ADD_TAG', payload: tag });
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    dispatch({
      type: 'CHANGE_INPUT',
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  return (
    <div>
      <form>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={state.title}
          onChange={handleChange}
        />
        <input
          type='text'
          name='desc'
          placeholder='Desc'
          value={state.desc}
          onChange={handleChange}
        />
        <input
          type='number'
          name='price'
          placeholder='Price'
          value={state.price}
          onChange={handleChange}
        />
        <p>Category:</p>
        <select
          name='category'
          id='category'
          value={state.category}
          onChange={handleChange}
        >
          <option value='sneakers'>Sneakers</option>
          <option value='tshirts'>T-shirts</option>
          <option value='jeanzzzzz'>Jeans</option>
        </select>
        <p>Tags:</p>
        <textarea
          ref={tagRef}
          placeholder='Seperate tags with commas...'
        ></textarea>
        <button type='button' onClick={handleTags}>
          Add Tags
        </button>
        <div className='tags'>
          {state?.tags.map((tag) => (
            <small
              onClick={() => dispatch({ type: 'REMOVE_TAG', payload: tag })}
              key={tag}
            >
              {tag}
            </small>
          ))}
        </div>
        <div className='quantity'>
          <button onClick={() => dispatch({ type: 'DECREMENT' })} type='button'>
            -
          </button>
          <span>Quantity {state.quantity} </span>
          <button onClick={() => dispatch({ type: 'INCREMENT' })} type='button'>
            +
          </button>
        </div>
      </form>
    </div>
  );
};

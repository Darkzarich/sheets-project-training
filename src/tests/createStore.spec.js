import { createStore } from '@engine/store/createStore'

const initialState = {
  count: 0,
}

const reducer = (state, action) => {
  if (action.type === 'ADD') {
    return { ...state, count: state.count + 1 }
  }
  return state
}

describe('engine/store/createStore', () => {
  let store
  let handler

  beforeEach(() => {
    store = createStore(reducer, initialState)
    handler = jest.fn()
  })

  test('should return store object with its methods', () => {
    expect(store).toBeDefined()
    expect(store.dispatch).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.getState).not.toBeUndefined()
  })

  test('should return object as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object)
  })

  test('should return default state', () => {
    expect(store.getState()).toEqual(initialState)
  })

  test('should change state if an action exists', () => {
    store.dispatch({
      type: 'ADD',
    })
    expect(store.getState()).not.toEqual(initialState)
  })

  test('should NOT change state if an action does not exists', () => {
    store.dispatch({
      type: 'not_existing_action',
    })
    expect(store.getState()).toEqual(initialState)
  })

  test('should call subscriber function', () => {
    store.subscribe(handler)
    store.dispatch({
      type: 'any action',
    })
    expect(handler).toBeCalled()
  })

  test('should call subscriber function with state object', () => {
    store.subscribe(handler)
    store.dispatch({
      type: 'any action',
    })
    expect(handler).toBeCalledWith(store.getState())
  })

  test('should NOT call subscriber function after being unsubscribed', () => {
    const unsub = store.subscribe(handler)
    unsub()
    store.dispatch({
      type: 'any action',
    })
    expect(handler).not.toBeCalled()
  })

  test('should dispatch ADD in async way', () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        store.dispatch({ type: 'ADD' })
        resolve()
      }, 250)
    }).then(() => {
      expect(store.getState().count).toBe(1)
    })
  })
})

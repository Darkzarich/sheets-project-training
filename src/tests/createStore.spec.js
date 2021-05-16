import { createStore } from '@engine/store/createStore'

describe('engine/store/createStore', () => {
  test('should be defined after calling', () => {
    const store = createStore(() => {}, {})
    expect(store).toBeDefined()
  })
})

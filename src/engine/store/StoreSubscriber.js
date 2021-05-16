import { isEqual } from '../utils'

export default class StoreSubscriber {
  constructor(store) {
    this.store = store
    this.unsubscribe = null
    this.prevState = {}
  }

  subscribeComponents(components) {
    this.prevState = this.store.getState()

    this.unsubscribe = this.store.subscribe((state) => {
      for (const key of Object.keys(state)) {
        if (!isEqual(this.prevState[key], state[key])) {
          for (const component of components) {
            if (component.isWatching(key)) {
              const changes = { [key]: state[key] }
              component.storeChanged(changes)
            }
          }
        }
      }

      this.prevState = this.store.getState()
    })
  }

  unsubscribeFromStore() {
    this.unsubscribe()
  }
}

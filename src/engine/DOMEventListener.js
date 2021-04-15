export class DOMEventListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('DOMEventListener: $root element must be provided!')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMEventListener() {
    console.log(this.listeners)
  }

  removeDOMEventListener() {

  }
}

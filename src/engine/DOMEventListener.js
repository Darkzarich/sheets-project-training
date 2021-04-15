export class DOMEventListener {
  constructor($root) {
    if (!$root) {
      throw new Error('DOMEventListener: $root element must be provided!')
    }
    this.$root = $root
  }
}

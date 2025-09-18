export class KeyboardManager {
  #keys: Set<string>;
  #interval: number;
  #subscribers: ((keys: Set<string>) => void)[];
  #intervalId: number | null;

  constructor({ interval = 100 }: { interval?: number }) {
    this.#keys = new Set<string>();
    this.#interval = interval;
    this.#subscribers = [];
    this.#intervalId = null;

    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.notify = this.notify.bind(this);
    this.handleKeyboardDown = this.handleKeyboardDown.bind(this);
    this.handleKeyboardUp = this.handleKeyboardUp.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  subscribe(callback: (keys: Set<string>) => void) {
    this.#subscribers.push(callback);

    window.addEventListener("keydown", this.handleKeyboardDown);
    window.addEventListener("keyup", this.handleKeyboardUp);

    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback: (keys: Set<string>) => void) {
    this.#subscribers = this.#subscribers.filter((c) => c !== callback);
  }

  handleKeyboardDown(e: KeyboardEvent) {
    if (this.#intervalId == null) {
      this.#intervalId = setInterval(() => {
        this.notify();
      }, this.#interval);
    }

    if (!this.#keys.has(e.key)) {
      this.#keys.add(e.key);
    }

    this.notify();
  }

  handleKeyboardUp(e: KeyboardEvent) {
    this.#keys.delete(e.key);

    if (this.#keys.size === 0 && this.#intervalId) {
      clearInterval(this.#intervalId);
      this.#intervalId = null;
    }
  }

  notify() {
    for (const subscriber of this.#subscribers) {
      subscriber(this.#keys);
    }
  }

  destroy() {
    window.removeEventListener("keydown", this.handleKeyboardDown);
    window.removeEventListener("keyup", this.handleKeyboardUp);

    this.#keys.clear();
    this.#subscribers = [];
  }
}

export class Node<T> {
  private _data: T;
  private _next: Node<T> | null = null;
  private _previous: Node<T> | null = null;

  constructor(data: T) {
    this._data = data;
  }

  get data(): T {
    return this._data;
  }

  set data(data: T) {
    this._data = data;
  }

  get next(): Node<T> | null {
    return this._next;
  }

  set next(node: Node<T> | null) {
    this._next = node;
  }

  get previous(): Node<T> | null {
    return this._previous;
  }

  set previous(node: Node<T> | null) {
    this._previous = node;
  }
}

export class LinkedList<T> {
  private head: Node<T> | null = null;
  private size: number = 0;

  // Add an element to the end of the list
  addToEnd(data: T) {
    const newNode = new Node(data);
    if (!this.head) {
      newNode.next = newNode;
      newNode.previous = newNode;
      this.head = newNode;
    } else {
      const tail = this.head.previous!;
      newNode.next = this.head;
      newNode.previous = tail;
      tail.next = newNode;
      this.head.previous = newNode;
    }
    this.size++;
  }

  // Add an element at a specific position (based on index)
  addToPosition(data: T, position: number) {
    if (position < 0 || position > this.size) {
      throw new Error('Invalid position');
    }

    const newNode = new Node(data);

    if (!this.head) {
      newNode.next = newNode;
      newNode.previous = newNode;
      this.head = newNode;
    } else if (position === 0) {
      const tail = this.head.previous!;
      newNode.next = this.head;
      newNode.previous = tail;
      tail.next = newNode;
      this.head.previous = newNode;
      this.head = newNode;
    } else {
      let current = this.head;
      for (let i = 0; i < position - 1; i++) {
        current = current.next!;
      }

      newNode.next = current.next;
      newNode.previous = current;
      current.next!.previous = newNode;
      current.next = newNode;

      if (position === this.size) {
        this.head.previous = newNode;
      }
    }

    this.size++;
  }

  // Remove an element at a specific position (based on index)
  removeFromPosition(position: number) {
    if (position < 0 || position >= this.size) {
      throw new Error('Invalid position');
    }

    if (this.size === 1) {
      this.head = null;
    } else if (position === 0) {
      const tail = this.head.previous!;
      tail.next = this.head.next;
      this.head.next!.previous = tail;
      this.head = this.head.next;
    } else {
      let current = this.head;
      for (let i = 0; i < position; i++) {
        current = current.next!;
      }

      current.previous!.next = current.next;
      current.next!.previous = current.previous;

      if (position === this.size - 1) {
        this.head.previous = current.previous;
      }
    }

    this.size--;
  }

  // Update an element at a specific position
  updateAtPosition(data: T, position: number) {
    if (position < 0 || position >= this.size) {
      throw new Error('Invalid position');
    }

    let current = this.head;
    for (let i = 0; i < position; i++) {
      current = current.next!;
    }

    current.data = data;
  }

  findAndRemove(predicate: (node: Node<T>) => boolean): Node<T> | null {
    if (!this.head) {
      return null; // Lista vacía
    }

    if (predicate(this.head)) {
      // El primer nodo coincide con la condición
      const removed = this.head;
      this.head = this.head.next;
      return removed;
    }

    let current = this.head;
    while (current.next) {
      if (predicate(current.next)) {
        const removed = current.next;
        current.next = current.next.next;
        return removed;
      }
      current = current.next;
    }

    return null; // No se encontró ningún nodo que coincida con la condición
  }

  findAndUpdate(
    predicate: (node: Node<T>) => boolean,
    newData: T,
  ): Node<T> | null {
    if (!this.head) {
      return null; // Lista vacía
    }

    let current = this.head;
    while (current) {
      if (predicate(current)) {
        current.data = newData;
        return current;
      }
      current = current.next;
    }

    return null; // No se encontró ningún nodo que coincida con la condición
  }

  // Get the size of the list
  getSize() {
    return this.size;
  }

  toJson(): string {
    if (!this.head) {
      return '[]'; // Devuelve un arreglo vacío en formato JSON
    }

    const jsonArray: T[] = [];
    let current = this.head;

    do {
      jsonArray.push(current.data);
      current = current.next!;
    } while (current !== this.head);

    return JSON.stringify(jsonArray);
  }

  // Print all elements in the list
  print() {
    if (!this.head) {
      return;
    }

    let current = this.head;
    do {
      console.log(current.data);
      current = current.next!;
    } while (current !== this.head);
  }
}

import { InputProps } from "../types";

export class Chainable<T> {
  constructor(private inputProps: InputProps<T>) {}

  public to<K extends keyof T>(key: K): Chainable<T[K]> {
    const newValue = this.inputProps.value[key];
    const newOnChange = (newValue: T[K]) => {
      this.inputProps.onChange({
        ...this.inputProps.value,
        [key]: newValue,
      });
    };
    return new Chainable({
      value: newValue,
      onChange: newOnChange,
    });
  }

  public get(): InputProps<T> {
    return this.inputProps;
  }
}

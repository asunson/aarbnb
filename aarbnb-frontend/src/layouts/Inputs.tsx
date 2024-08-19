import React from "react";
import Form from "react-bootstrap/Form";

interface TextInputProps {
  value: string;
  onChange: (newValue: string) => void;
  label: string;
  placeholderText?: string;
  type?: "text" | "password";
}

interface DateInputProps {
  value: string;
  onChange: (newValue: string) => void;
  label: string
}

export const TextInput: React.FC<TextInputProps> = (props) => {
  const { value, onChange, label, placeholderText, type } = props;
  return (
    <Form.Group controlId={label}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type ?? "text"}
        placeholder={placeholderText}
        value={value}
        onChange={(e) => {
          e.preventDefault();
          onChange(e.target.value);
        }}
      />
    </Form.Group>
  );
};

export const TextAreaInput: React.FC<TextInputProps> = (props) => {
  const { value, onChange, label } = props;
  return (
    <Form.Group controlId={label}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        value={value}
        onChange={(e) => {
          e.preventDefault();
          onChange(e.target.value);
        }}
      />
    </Form.Group>
  );
};

export const DateInput: React.FC<DateInputProps> = (props) => {
  const { value, onChange, label } = props;
  return (
    <Form.Group controlId={label}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
      />

    </Form.Group>
  )
}
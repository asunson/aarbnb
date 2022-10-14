import React, { useState } from 'react';
import { Button, Form, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { AppRequest } from '../types/types';
import { TextAreaInput, TextInput } from './Inputs';

interface RequestModalProps {
    showModal: boolean;
    onConfirm: (request: AppRequest) => void;
    onCancel: () => void;
}

export const RequestModal: React.FC<RequestModalProps> = (props) => {
    const { showModal, onCancel, onConfirm } = props;

    const [subject, setSubject] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const resetInputs = () => {
        setSubject("");
        setDescription("");
    }

    return <Modal show={showModal}>
        <ModalHeader>
            Submit Request
        </ModalHeader>
        <ModalBody>
            <Form>
                <TextInput
                    label="Subject"
                    placeholderText="What is this request about?"
                    value={subject}
                    onChange={setSubject}
                />

                <TextAreaInput
                    label="Description"
                    value={description}
                    onChange={setDescription}
                />
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button onClick={() => {
                onCancel();
                resetInputs();
            }}>
                Close
            </Button>
            <Button onClick={() => {
                onConfirm({
                    description: description,
                    subject: subject,
                    user: "",
                    timestamp: 0
                });
                resetInputs();
            }}>
                Submit
            </Button>
        </ModalFooter>
    </Modal >
}
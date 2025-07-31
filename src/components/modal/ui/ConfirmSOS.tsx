"use client"
import {Button} from "@heroui/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
} from "@heroui/modal";

interface RewardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ConfirmSOS({ isOpen, onClose }: RewardModalProps) {

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Okay")
    };
    
    return (
        <>
            <Modal 
                isOpen={isOpen} 
                onClose={onClose}
                placement="center"
                className=" max-w-[70%]"
            >
                <ModalContent>
                    <ModalHeader className="flex justify-center items-center">ยืนยันการกด SOS</ModalHeader>
                    <ModalBody className=" pb-4">
                        <Button onPress={() => onSubmit} color='danger' variant='shadow'>ยืนยัน SOS</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
            
        </>
    )
}
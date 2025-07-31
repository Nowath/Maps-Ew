"use client"
import {Button} from "@heroui/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/modal";
import {Textarea} from "@heroui/react";
import { useModal } from "@/components/modal/action/modal";
import {Form} from "@heroui/form";

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
"use client"
import {Button} from "@heroui/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/modal";
import { Input } from "@heroui/react";
import { Form } from "@heroui/form";
import type {SelectedItems, SharedSelection} from "@heroui/react";
import {Select, SelectItem, Avatar, Chip} from "@heroui/react";
import { useState } from "react";

interface AddPost {
    isOpen: boolean;
    onClose: () => void;
}

//name, title, image, address, subAddress, Tags, star

export interface PostInterface {
    name: string,
    title: string,
    image:string,
    address:string,
    subAddress: number[],
    Tags: string[],
    star: number
}

export function AddPosts({ isOpen, onClose }: AddPost) {
    const [selectedModes, setSelectedModes] = useState<Set<string>>(new Set());

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result as string;
                // Remove the data:image/jpeg;base64, prefix to get only base64 string
                const base64 = result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = error => reject(error);
        });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        try {
            const text = formData.get('text') as string;
            
            const imageFile = formData.get('image') as File;
            let fileBase64 = '';
            
            if (imageFile && imageFile.size > 0) {
                fileBase64 = await convertFileToBase64(imageFile);
            }
            const tagArray = Array.from(selectedModes);

            const data = {
                text: text,
                file: `data:image/png;base64,${fileBase64}`,
                tag: tagArray
            };
            
            console.log(data);
        } catch (error) {
            console.error('Error processing form:', error);
        }
    };

    const handleSelectionChange = (keys: SharedSelection) => {
        const newSelection = new Set<string>();
        
        if (keys === "all") {
            newSelection.add("โหมดกิจกรรม");
            newSelection.add("โหมดระวังภัย");
            newSelection.add("โหมดสร้างสรรค์");
        } else {
            keys.forEach(key => {
                newSelection.add(String(key));
            });
        }
        
        if (newSelection.has("โหมดสร้างสรรค์") && newSelection.has("โหมดระวังภัย")) {
            if (!selectedModes.has("โหมดสร้างสรรค์")) {
                newSelection.delete("โหมดระวังภัย");
            }
            else if (!selectedModes.has("โหมดระวังภัย")) {
                newSelection.delete("โหมดสร้างสรรค์");
            }
        }
        
        setSelectedModes(newSelection);
    };

    const getChipColor = (mode: string) => {
        switch(mode) {
            case "โหมดกิจกรรม":
                return "primary";
            case "โหมดระวังภัย":
                return "warning";
            case "โหมดสร้างสรรค์":
                return "secondary";
            default:
                return "default";
        }
    };
    
    return (
        <>
            <Modal 
                isOpen={isOpen} 
                onClose={onClose}
                placement="center"
                className=" max-w-[94%]"
            >
                <ModalContent>
                    <Form
                        onSubmit={onSubmit}
                    >
                        <ModalHeader className="flex justify-center items-center">ยืนยันการกด SOS</ModalHeader>
                        <ModalBody className="w-full flex flex-col">
                            <Input name="text" isRequired type="text" variant="faded" label="กรอกข้อความ" labelPlacement="outside" placeholder="ข้อความ" />
                            <Input name="image" isRequired type="file" variant="faded" label="ใส่รูปภาพประกอบ" labelPlacement="outside" accept="image/*" />
                            <Input name="address" isRequired type="text" variant="faded" label="ใส่ที่อยู่ที่เห็นได้ชัด" labelPlacement="outside" placeholder="สถานที่" />
                            <Select
                                isRequired
                                classNames={{
                                    base: "max-w-xs",
                                    trigger: "min-h-12 py-2",
                                }}
                                isMultiline={true}
                                label="เลือกโหมด"
                                name="tag"
                                labelPlacement="outside"
                                placeholder="เลือกโหมดที่ต้องการ"
                                selectionMode="multiple"
                                variant="bordered"
                                selectedKeys={selectedModes}
                                onSelectionChange={handleSelectionChange}
                                renderValue={(items: SelectedItems) => (
                                    <div className="flex flex-wrap gap-2">
                                        {Array.from(items).map((item) => (
                                            <Chip 
                                                key={item.key} 
                                                color={getChipColor(item.textValue || "")}
                                                variant="flat"
                                                size="sm"
                                            >
                                                {item.textValue}
                                            </Chip>
                                        ))}
                                    </div>
                                )}
                            >
                                <SelectItem key={"โหมดกิจกรรม"} textValue={"โหมดกิจกรรม"}>
                                    โหมดกิจกรรม
                                </SelectItem>
                                <SelectItem 
                                    key={"โหมดระวังภัย"} 
                                    textValue={"โหมดระวังภัย"}
                                    isDisabled={selectedModes.has("โหมดสร้างสรรค์")}
                                >
                                    โหมดระวังภัย
                                </SelectItem>
                                <SelectItem 
                                    key={"โหมดสร้างสรรค์"} 
                                    textValue={"โหมดสร้างสรรค์"}
                                    isDisabled={selectedModes.has("โหมดระวังภัย")}
                                >
                                    โหมดสร้างสรรค์
                                </SelectItem>
                            </Select>
                        </ModalBody>
                        <ModalFooter className="pb-4 w-full">
                            <Button type="submit" color='success' variant='shadow' className="text-white">เพิ่มโพสต์</Button>
                        </ModalFooter>
                    </Form>
                </ModalContent>
            </Modal>
            
        </>
    )
}
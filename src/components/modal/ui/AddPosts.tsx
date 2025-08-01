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
import { IoIosStarOutline, IoIosStar } from "react-icons/io"
import { createPost } from "@/page/community/api/posts";

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
    const [rating, setRating] = useState<number>(0);
    const [hoveredStar, setHoveredStar] = useState<number>(0);
    const [imageError, setImageError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result as string;
                const base64 = result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = error => reject(error);
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const maxSize = 8 * 1024 * 1024;
            if (file.size > maxSize) {
                setImageError("รูปภาพต้องมีขนาดไม่เกิน 8MB");

                e.target.value = "";
            } else {
                setImageError("");
            }
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (imageError) {
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        
        try {
            const text = formData.get('text') as string;
            
            const imageFile = formData.get('image') as File;
            let fileBase64 = '';

            const address = formData.get('address') as string;
            
            if (imageFile && imageFile.size > 0) {
                const maxSize = 8 * 1024 * 1024; // 8MB
                if (imageFile.size > maxSize) {
                    setImageError("รูปภาพต้องมีขนาดไม่เกิน 8MB");
                    setIsSubmitting(false);
                    return;
                }
                fileBase64 = await convertFileToBase64(imageFile);
            }
            const tagArray = Array.from(selectedModes);

            const data= {
                name: 'test',
                title: text,
                image: `data:image/png;base64,${fileBase64}`,
                address: address,
                Tags: tagArray,
                star: rating,
                subAddress: [200, 300]
            };
            
            await createPost(data);
            window.location.reload();
            onClose();
            
        } catch (error) {
            console.error('Error processing form:', error);
            alert('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง');
        } finally {
            setIsSubmitting(false);
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

    const handleStarClick = (starIndex: number) => {
        setRating(starIndex);
    };

    const handleStarHover = (starIndex: number) => {
        setHoveredStar(starIndex);
    };

    const handleStarLeave = () => {
        setHoveredStar(0);
    };

    const StarRating = () => {
        return (
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">ให้คะแนนรีวิว</label>
                <div className="flex gap-1 items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="text-2xl transition-colors duration-200 hover:scale-110 transform"
                            onClick={() => handleStarClick(star)}
                            onMouseEnter={() => handleStarHover(star)}
                            onMouseLeave={handleStarLeave}
                        >
                            {star <= (hoveredStar || rating) ? (
                                <IoIosStar className="text-yellow-400" />
                            ) : (
                                <IoIosStarOutline className="text-gray-300" />
                            )}
                        </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                        {rating > 0 ? `${rating} ดาว` : 'ยังไม่ได้ให้คะแนน'}
                    </span>
                </div>
            </div>
        );
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
                            
                            <div className="flex flex-col gap-1">
                                <Input 
                                    name="image" 
                                    isRequired 
                                    type="file" 
                                    variant="faded" 
                                    label="ใส่รูปภาพประกอบ (ไม่เกิน 8MB)" 
                                    labelPlacement="outside" 
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    isInvalid={!!imageError}
                                    errorMessage={imageError}
                                />
                                {imageError && (
                                    <p className="text-danger text-sm mt-1">{imageError}</p>
                                )}
                            </div>
                            
                            <Input name="address" isRequired type="text" variant="faded" label="ใส่ที่อยู่ที่เห็นได้ชัด" labelPlacement="outside" placeholder="สถานที่" />
                            
                            <StarRating />
                            
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
                            <Button 
                                type="submit" 
                                color='success' 
                                variant='shadow' 
                                className="text-white"
                                isLoading={isSubmitting}
                                isDisabled={!!imageError || isSubmitting}
                            >
                                {isSubmitting ? 'กำลังเพิ่มโพสต์...' : 'เพิ่มโพสต์'}
                            </Button>
                        </ModalFooter>
                    </Form>
                </ModalContent>
            </Modal>
            
        </>
    )
}
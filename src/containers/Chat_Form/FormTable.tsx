"use client"
import React, { useState } from 'react'
import { Button, Checkbox} from '@heroui/react' 
import { toast } from 'sonner';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@heroui/table";
import {AnswersState} from "@/types/form"
import { useRouter } from 'next/navigation'; // Changed from 'next/router' to 'next/navigation'

export function FormTable() {

    const router = useRouter()

    const [answers, setAnswers] = useState<AnswersState>({
            question1: null,
            question2: null,
            question3: null,
            question4: null,
            question5: null,
            question6: null,
            question7: null,
            question8: null,
            question9: null,
            question10: null,
    });

    const [submittedData, setSubmittedData] = useState<AnswersState[]>([]);

    const handleAnswerChange = (questionKey: keyof AnswersState, value: boolean): void => {
        setAnswers(prev => ({
            ...prev,
            [questionKey]: value
        }));
    }

    const handleSubmit = () => {
        const unansweredQuestions = Object.entries(answers).filter(([key, value]) => value === null);
        
        if (unansweredQuestions.length > 0) {
            toast.error(`กรุณาตอบคำถามให้ครบทุกข้อ (เหลืออีก ${unansweredQuestions.length} ข้อ)`);
            return;
        }

        const submissionData = {
            ...answers,
        };

        console.log('Form Submitted:', submissionData);
        console.log('Answers Summary:', answers);
        try {
            localStorage.setItem('formSubmissions', JSON.stringify(submissionData));
            console.log('Data overwritten in localStorage successfully');
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }

        setSubmittedData(prev => [...prev, answers]);
        
        toast.success('ส่งฟอร์มเรียบร้อยแล้ว!');
        
        setAnswers({
            question1: null,
            question2: null,
            question3: null,
            question4: null,
            question5: null,
            question6: null,
            question7: null,
            question8: null,
            question9: null,
            question10: null,
        });
        router.push('/chat/form/answer')
    };

    const data = [
        "1. คุณเคยลองสูบบุหรี่หรือบุหรี่ไฟฟ้ามาก่อนหรือไม่",
        "2. คุณเคยดื่มเครื่องดื่มแอลกอฮอล์(แม้แค่จิบ)หรือไม่",
        "3. มีเพื่อนหรือคนใกล้ชิดของคุณที่ใช้สารเสพติดหรือยาเสพติด",
        "4. เคยมีคนชวนคุณให้ลองใช้ยาเสพติด เช่น กัญชา, ยาบ้า, เค, เหล้า, ยานอนหลับ ฯลฯ",
        "5. คุณรู้สึกว่าสารบางอย่าง (เช่น ยา, เหล้า) ช่วยให้คุณลืมปัญหาหรือคลายเครียดหรือไม่",
        "6. คุณรู้สึกอยากลองของใหม่/ความรู้สึกใหม่ ๆ จากสารบางอย่างหรือไม่",
        "7. คุณมีความรู้สึกเบื่อ เครียด วิตกกังวล หรือซึมเศร้าบ่อย ๆ โดยไม่มีคนเข้าใจ หรือไม่",
        "8. คุณมีปัญหาครอบครัวหรือรู้สึกไม่มีคนคอยรับฟังที่บ้าน",
        "9. คุณใช้เวลากับโซเชียลมีเดียมากกว่า 6 ชั่วโมงต่อวัน โดยไม่ได้ทำกิจกรรมอย่างอื่นเลย",
        "10. คุณเคยใช้ยาแก้ปวด ยาคลายเครียด หรือยานอนหลับ โดยไม่ปรึกษาแพทย์"
    ];

    const questionKeys: (keyof AnswersState)[] = [
        'question1', 'question2', 'question3', 'question4', 'question5',
        'question6', 'question7', 'question8', 'question9', 'question10'
    ];

    return (
        <>
            <Table aria-label='table_form' bottomContent={
                <div className='flex justify-center items-center gap-4'>
                    <Button 
                        color='success' 
                        variant='shadow' 
                        className='text-white'
                        onPress={handleSubmit}
                    >
                        ส่งฟอร์ม
                    </Button>
                </div>
            }>
                <TableHeader>
                    <TableColumn aria-label='Question'>คำถาม</TableColumn>
                    <TableColumn aria-label='Yes' align='center'>ใช่</TableColumn>
                    <TableColumn aria-label='No' align='center'>ไม่ใช่</TableColumn>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => {
                        const questionKey = questionKeys[index];
                        return (
                            <TableRow key={`question-${index + 1}`}>
                                <TableCell>{item}</TableCell>
                                <TableCell>
                                    <Checkbox 
                                        isSelected={answers[questionKey] === true}
                                        onValueChange={() => handleAnswerChange(questionKey, true)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Checkbox 
                                        isSelected={answers[questionKey] === false}
                                        onValueChange={() => handleAnswerChange(questionKey, false)}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </>
    )
}
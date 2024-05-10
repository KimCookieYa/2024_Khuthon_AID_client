import Image from 'next/image';
import {useMisonyeoStore} from '../../../stores/useMisonyeoStore';
import {FaHeart} from 'react-icons/fa';
import {useEffect, useState} from 'react';
import {quizData} from '../../../datas/quiz';
import {useRouter} from 'next/router';


export default function QuizPage() {
    const misonyeoStore = useMisonyeoStore();
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const currentQuiz = quizData[currentQuizIndex];
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const onClickOption = (index: number) => {
        if (index === currentQuiz.answer) {
            misonyeoStore.changeFavorability(5);
            misonyeoStore.addScript('퀴즈를 맞췄어요!');
            setCorrectCount(correctCount + 1);
        } else {
            misonyeoStore.changeFavorability(-5);
            misonyeoStore.addScript('퀴즈를 틀렸어요... 멍청하군요!');
        }
        setCurrentQuizIndex(currentQuizIndex + 1);
    }

    useEffect(() => {
        if (currentQuizIndex >= quizData.length) {
            misonyeoStore.resetScript();
            misonyeoStore.addScript(`퀴즈를 ${correctCount}개 맞췄어요! 3초 후에 홈으로 갑니다.`);
            setTimeout(() => {
                router.push('/home');
            }, 3000);
        }
    }, [currentQuizIndex]);

    return (
        <main className={'relative w-full h-screen bg-gray-200 flex flex-col text-black p-20 items-center'}>
            <div
                className={'ml-auto flex gap-x-4 items-center'}>
                <FaHeart/>
                <label>호감도</label>
                <span>{misonyeoStore.favorability}</span>
            </div>
            <article
                className={'w-full h-100 bg-gray-200 flex flex-col items-center justify-center text-black px-20 border border-black'}>
                {isLoading ? '퀴즈 준비 중...' : currentQuiz?.question}
            </article>

            <div className={'relative w-200 h-200'}>
                <Image src={misonyeoStore.image} alt={'미소녀 이미지'} className={'w-200 h-200'}/>
                <div className={'absolute top-0 -right-100'}>
                    {misonyeoStore.scriptList.map((script, index) => (
                        <div key={index} className={`top-${index * 24} border-black border rounded-8 bg-white px-8`}>
                            {script}
                        </div>
                    ))}
                </div>
            </div>
                <div className={'flex w-full mt-24'}>
                    {!isLoading && currentQuiz?.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => onClickOption(index)}
                            className={'bg-white p-4 rounded-md m-auto hover:bg-gray-200'}>
                            {option}
                        </button>
                    ))}
                </div>
        </main>
);
}
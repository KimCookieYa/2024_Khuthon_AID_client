import Image from 'next/image';
import {useMisonyeoStore} from '../../../stores/useMisonyeoStore';
import {FaHeart} from 'react-icons/fa';
import {useEffect, useState} from 'react';
import {quizData} from '../../../datas/quiz';
import {useRouter} from 'next/router';
import BackgroundUI from '../../../components/backgroundUI';

export default function QuizPage() {
    const misonyeoStore = useMisonyeoStore();
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const currentQuiz = quizData[currentQuizIndex];
    const router = useRouter()

    useEffect(() => {
        misonyeoStore.buttonOn = false;
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const onClickOption = (index: number) => {
        if (index === currentQuiz.answer) {
            misonyeoStore.changeFavorability(20);
            misonyeoStore.addScript('퀴즈를 맞췄어요!');
            setCorrectCount(correctCount + 1);
        } else {
            misonyeoStore.changeFavorability(20);
            misonyeoStore.addScript('퀴즈를 틀렸어요... 멍청하군요!');
        }
        setCurrentQuizIndex(currentQuizIndex + 1);
    }

    useEffect(() => {
        if (currentQuizIndex >= quizData.length) {
            misonyeoStore.resetScript();
            misonyeoStore.addScript(`퀴즈를 ${correctCount}개 맞췄어요! 2초 후에 홈으로 갑니다.`);
            setTimeout(() => {
                router.push('/main');
            }, 2000);
        }
    }, [currentQuizIndex]);

    return (
        <main className={"relative w-450 h-600"}>
            <article
                className={'absolute flex top-50 left-1/2 -translate-x-1/2 w-400 h-100 z-30 flex flex-col items-center justify-center bg-white w-200 text-black rounded-full p-30 text-center'}>
                {isLoading ? '퀴즈 준비 중...' : currentQuiz?.question}
            </article>
                <div className={'absolute flex w-full mt-24 bottom-50'}>
                    {!isLoading && currentQuiz?.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => onClickOption(index)}
                            className={'bg-white z-[100000] p-10 rounded-md m-auto hover:bg-gray-200 text-black'}>
                            {option}
                        </button>
                    ))}
                </div>
            <BackgroundUI
                key={'background'}
            />
        </main>
);
}
import {useMisonyeoStore} from '../../../stores/useMisonyeoStore';
import {useEffect, useState} from 'react';
import {quizData} from '../../../datas/quiz';
import {useRouter} from 'next/router';
import BackgroundUI from '../../../components/backgroundUI';
import {mailData} from '../../../datas/mail';


export default function MailPage() {
    const misonyeoStore = useMisonyeoStore();
    const [isLoading, setIsLoading] = useState(true);
    const [currentMailIndex, setCurrentMailIndex] = useState(0);
    const [deleteCount, setDeleteCount] = useState(0);
    const currentMail = mailData[currentMailIndex];
    const router = useRouter();

    useEffect(() => {
        misonyeoStore.buttonOn = false;
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const onPassMail = () => {
        setCurrentMailIndex(currentMailIndex + 1);
    };

    const onDeleteMail = () => {
        setCurrentMailIndex(currentMailIndex + 1);
        setDeleteCount((prev) => prev + 1);
    };

    useEffect(() => {
        if (currentMailIndex >= quizData.length) {
            misonyeoStore.resetScript();
            misonyeoStore.addScript(`메일을 ${deleteCount}개 삭제했어요!! 3초 후에 홈으로 갑니다.`);
            setTimeout(() => {
                router.push('/main');
            }, 3000);
        }
    }, [currentMailIndex]);

    return (
        <main className={'relative w-450 h-600'}>
            <article
                className={'absolute flex top-50 left-1/2 -translate-x-1/2 w-400 h-fit z-30 flex-col items-center justify-center bg-white text-black rounded-full px-30 py-24 text-center'}>
                {isLoading ? '퀴즈 준비 중...' : (
                    <div className={'flex flex-col gap-y-2 w-full'}>
                        {
                            currentMail?.태그.map((tag, index) => (
                                <span key={index} className={'text-bases'}>#{tag}</span>
                            ))

                        }
                        <label className={'text-sm mt-12 ml-auto mr-24'}>보낸 사람: {currentMail?.보낸사람[0]}</label>
                    </div>
                )}
            </article>
            <div className={'absolute flex w-full mt-24 bottom-50'}>
                <button
                    onClick={() => onDeleteMail()}
                    className={'bg-white z-[100000] p-10 rounded-md m-auto hover:bg-gray-200 text-black'}>
                    이건 지워!
                </button>
                <button
                    onClick={() => onPassMail()}
                    className={'bg-white z-[100000] p-10 rounded-md m-auto hover:bg-gray-200 text-black'}>
                    이건 됐어!
                </button>
            </div>
            <BackgroundUI
                key={'background'}
            />
        </main>
    );
}
import {useMisonyeoStore} from '../stores/useMisonyeoStore';
import {useUserInfoStore} from '../stores/useUserInfoStore';
import Image from 'next/image';
import {useEffect, useRef} from 'react';
import {useRouter} from 'next/router';


export default function ZustandTestPage() {
    const router = useRouter()
    const misonyeoStore = useMisonyeoStore();
    const userInfoStore = useUserInfoStore();
    const scriptInputRef = useRef<HTMLInputElement>(null);


    // 처음 입장시 호감도에 따른 인삿말 추가
    useEffect(() => {
        misonyeoStore.resetScript();
        if (misonyeoStore.favorability >= 50) {
            misonyeoStore.addScript('안녕 동훈쿤! 반가워!');
        } else if (misonyeoStore.favorability >= 20) {
            misonyeoStore.addScript('안녕!');
        } else {
            misonyeoStore.addScript('안녕. 환경파괴범?');
        }
    }, []);

    // 호감도 100 진엔딩 이벤트
    useEffect(() => {
        if (misonyeoStore.favorability >= 100) {
            alert('호감도가 100이 되어 미소녀가 당신에게 고백합니다.');
            router.push('/story/ending');
        }
    }, [misonyeoStore.favorability]);

    return (
        <main className={'w-full h-full bg-gray-200 flex flex-col justify-center items-center text-black px-20'}>
            <div className={'w-200 flex'}>
                <label>미소녀</label>
                <span className={'ml-auto'}>{misonyeoStore.name}</span>
            </div>
            <div className={'relative w-200 h-200'}>
            <Image src={misonyeoStore.image} alt={'미소녀 이미지'} width={200} height={200}/>
                <div className={'absolute top-0 -right-100'}>
                    {misonyeoStore.scriptList.map((script, index) => <div key={index} className={`top-${index*20} border-black border rounded-8 bg-white px-8`}>{script}</div>)}
                </div>
            </div>

            <span className={'ml-20'}>호감도: {misonyeoStore.favorability}</span>
            <div className={'w-200 flex'}>
                <button onClick={() => misonyeoStore.changeFavorability(5)}
                        className={'rounded-8 border border-black px-8'}>호감도 증가
                </button>
                <button onClick={() => misonyeoStore.changeFavorability(-5)}
                        className={'rounded-8 border border-black px-8'}>호감도 감소
                </button>
            </div>
            <div className={'w-400 flex'}>
                <input ref={scriptInputRef} type={'text'} placeholder={`${misonyeoStore.name}가 해줬으면 하는 말`} className={'w-full'}/>
                <button onClick={() => misonyeoStore.addScript(scriptInputRef.current.value)} className={'flex rounded-8 border border-black px-8 text-nowrap'}>대화 추가</button>
            </div>
            <div className={'w-200 flex'}>
                <label>유저 닉네임</label>
                <span className={'ml-auto'}>{userInfoStore.nickname}</span>
            </div>
            <button onClick={() => userInfoStore.setUserInfo('준혁', '4alstjr@pusan.ac.kr')}  className={'rounded-8 border border-black px-8'}>닉네임 변경하기</button>
        </main>
);
}
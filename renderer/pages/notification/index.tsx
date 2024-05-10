import {useRouter} from 'next/router';
import {useMisonyeoStore} from '../../stores/useMisonyeoStore';
import Image from 'next/image';


export default function NotificationTestPage() {
    const router = useRouter();
    const {message} = router.query;
    const misonyeoStore = useMisonyeoStore();

    return (
        <main
            className={'w-300 h-100 bg-gray-200 flex gap-x-4 justify-center rounded-12 items-center text-black px-20 py-12 border border-black'}>
            <Image src={misonyeoStore.image} alt={'미소녀 이미지'} width={48} height={48} className={'rounded-8'}/>
            <div className={'flex flex-col gap-y-2'}>
                <label>미소녀</label>
                <span className={'ml-auto text-xs'}>{message}</span>
            </div>
        </main>
    );
}
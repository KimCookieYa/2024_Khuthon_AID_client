import {useRouter} from 'next/router';
import {useMisonyeoStore} from '../../stores/useMisonyeoStore';
import Image from 'next/image';


export default function NotificationTestPage() {
    const router = useRouter();
    const {message} = router.query;
    const misonyeoStore = useMisonyeoStore();

    const onOpenMainWindow = () => {
        window.ipc.send('open-main-window', '');
    };

    return (
        <main
            onClick={onOpenMainWindow}
            className={'w-300 h-100 bg-gray-200 flex gap-x-4 justify-center rounded-12 items-center text-black px-20 py-12 border border-black cursor-pointer'}>
            <Image src={misonyeoStore.image} alt={'profile'} width={48} height={48} className={'rounded-8'}/>
            <span className={'ml-auto text-xs'}>{message}</span>
        </main>
    );
}
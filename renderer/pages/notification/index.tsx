import {useRouter} from 'next/router';
import {useMisonyeoStore} from '../../stores/useMisonyeoStore';
import Image from 'next/image';
import chimg from '../../public/images/normal.png';


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
            className={'w-300 h-100 bg-gray-200 flex gap-x-4 justify-center rounded-12 items-center text-black border border-black cursor-pointer'}>
            <Image src={chimg} alt={'profile'} width={64} height={64} className={'rounded-8'}/>
            <span className={'ml-24 text-base'}>{message}</span>
        </main>
    );
}
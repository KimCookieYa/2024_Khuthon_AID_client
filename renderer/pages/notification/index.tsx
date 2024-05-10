import {useRouter} from 'next/router';


export default function NotificationTestPage() {
    const router = useRouter()
    const {query} = router
    const {message} = query

    return (
        <main className={'w-300 h-100 bg-gray-200 flex items-center text-black px-20'}>
           <label>미소녀</label>
            <span className={'ml-auto'}>{message}</span>
        </main>
    )
}
import React, {useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/router';


export default function HomePage() {
    return (
        <React.Fragment>
            <Head>
                <title>Home - Nextron (with-tailwindcss)</title>
            </Head>
            <div className="grid grid-col-1 text-2xl w-full text-center border-3 justify-center items-center">
                <div>
                    <Image
                        className="ml-auto mr-auto"
                        src="/images/logo.png"
                        alt="Logo image"
                        width={256}
                        height={256}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <Link href={`/main`} className='flex-wrap jutify-center bg-gray-500'>
                      게임 시작  
                    </Link>
                    <Link href={`/task/cpuManage`} className="flex-wrap jutify-center bg-gray-500">
                        CPU프로세스 감시
                    </Link>
                    <Link href={`/task/bluetooth`} className="flex-wrap jutify-center bg-gray-500">
                        블루투스 최적화
                    </Link>
                    <Link href={`/task/battery`} className="flex-wrap jutify-center bg-gray-500">
                        과충전 방지
                    </Link>
                    <Link href={`/task/file`} className="flex-wrap jutify-center bg-gray-500">
                        오래된 파일
                    </Link>
                    <Link href={`/task/unuseProgram`} className="flex-wrap jutify-center bg-gray-500">
                        안쓰는 프로그램
                    </Link>
                    <Link href={`/task/startingProgram`} className="flex-wrap jutify-center bg-gray-500">
                        시작프로그램 관리
                    </Link>
                    <Link href={`/task/mail`} className="flex-wrap jutify-center bg-gray-500">
                        메일 관리
                    </Link>
                    <Link href={`/zustand-test`} className="flex-wrap jutify-center bg-gray-500">
                        상태 관리 테스트
                    </Link>
                    <Link href={`/mini/quiz`} className="flex-wrap jutify-center bg-gray-500">
                        퀴즈 테스트
                    </Link>
                    <Link href={`/mini/mail`} className="flex-wrap jutify-center bg-gray-500">
                        메일 테스트
                    </Link>
                </div>
            </div>
            <div className="mt-1 w-full flex-wrap flex justify-center">
                <Link href="/next">Go to next page</Link>
                <Link href="/notification">Go to notification test page</Link>
            </div>
        </React.Fragment>
    );
}

import React, {useEffect, useState}  from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import {IProcessInfo} from '@/renderer/types/process';

export default function NextPage() {
  
  const [systemInfo, setSystemInfo] = useState<IProcessInfo[]>();

  useEffect(() => {
      const fetchSystemInfo = async () => {
          if (typeof window === 'undefined') return;

          window.ipc.on('get-system-info', (message: IProcessInfo[]) => {
              console.log('message', message);
              setSystemInfo(message);
          })
      };

      fetchSystemInfo();
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>Next - Nextron (with-tailwindcss)</title>
      </Head>
      <div className="grid grid-col-1 text-2xl w-full text-center">
        <div>
          <Image
            className="ml-auto mr-auto"
            src="/images/logo.png"
            alt="Logo image"
            width={256}
            height={256}
          />
        </div>
          <div className={'w-500 h-800 overflow-y-auto'}>
              {
                  systemInfo?.map((info, index) => (
                      <div key={index} className={'flex justify-between'}>
                          <span>{info.pid}</span>
                          <span>{info.command}</span>
                          <span>{info.arguments}</span>
                      </div>
                  ))
              }
              </div>
      </div>
      <div className="mt-1 w-full flex-wrap flex justify-center">
        <Link href="/home">Go to home page</Link>
      </div>
    </React.Fragment>
  )
}

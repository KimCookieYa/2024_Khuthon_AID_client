import React, {useEffect, useState}  from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import {IProcessInfo} from '@/renderer/types/process';

export default function NextPage() {
  const [battery, setBattery] = useState(false);
  useEffect(() => {
      const fetchBatteryInfo = async () => {
          if (typeof window === 'undefined') return;

          window.ipc.on('get-battery-info', (message: boolean) => {
              setBattery(message);
          })
      };

      fetchBatteryInfo();
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
                  !battery ?
                  <>배터리 80% 이상인데 과충전 중</>:
                  <>충전하시면 됩니다~</>
              }
          </div>
      </div>
      <div className="mt-1 w-full flex-wrap flex justify-center">
        <Link href="/home">Go to home page</Link>
      </div>
    </React.Fragment>
  )
}

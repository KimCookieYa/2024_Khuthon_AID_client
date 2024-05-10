import React, {useEffect, useState}  from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function NextPage() {
  useEffect(() => {
    const fetchBluetoothInfo = async () => {
      window.ipc.on('get-bluetooth-info', (message) => {
        console.log('message', message);
      })
    }
    fetchBluetoothInfo();
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
      </div>
      <div className="mt-1 w-full flex-wrap flex justify-center">
        <Link href="/home">Go to home page</Link>
      </div>
    </React.Fragment>
  )
}

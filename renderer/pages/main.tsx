import React, {useEffect, useState} from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import BackgroundUI from '../components/backgroundUI';

export default function HomePage() {

  return (
    <React.Fragment>
      <BackgroundUI
        key={'background'}
        aiText={null}
        text={null}
        love={50}
        mood={0}
      />
    </React.Fragment>
  )
}
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
      />
    </React.Fragment>
  )
}
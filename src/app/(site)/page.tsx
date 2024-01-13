import Image from 'next/image';
import LoginForm from './component/LoginForm';
import Footer from './component/Footer';
import Forms from './component/Forms';

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center items-center bg-base-100">
      <div className="flex-1 flex flex-col items-center justify-center">
        <Image alt='logo' height="58" width="58" src="/logo.png" className="mx-auto w-auto"/>
        <Forms/>
      </div>
      <Footer/>
    </div>
  )
}

import Header from '@/components/website/header';
import HeroSec from '@/components/website/hero-sec';

export default function Home() {
  return (
    <>
      <Header />
      <main
        className="relative before:absolute before:top-0 before:left-0 before:w-full
      before:h-full before:content-[''] before:opacity-[0.03] before:z-[100] before:pointer-events-none 
      before:bg-[url('/noise.gif')]"
      >
        <HeroSec />
      </main>
      <footer className='border-t pb-24 pt-4 xl:pb-4 absolute bottom-0 w-full z-[2]'>
        <div className='container mx-auto'>
          <p className='text-balance text-center text-sm leading-loose text-muted-foreground md:text-left'>
            Built by{' '}
            <a
              href='https://x.com/naymur_dev'
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'
            >
              naymur
            </a>{' '}
            . The source code is available on{' '}
            <a
              href='https://github.com/naymurdev/uilayout'
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    </>
  );
}

'use client';

import React, { useEffect, useRef, useState } from 'react';
import useMeasure from 'react-use-measure';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { cn } from '@/lib/utils';
import useClickOutside from '@/hooks/useClickOutside';
import {
  Cat,
  Folder,
  Layout,
  LayoutTemplate,
  MessageCircle,
  Rocket,
  User,
  WalletCards,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';

const transition = {
  type: 'spring',
  bounce: 0.1,
  duration: 0.25,
};

const ITEMS = [
  {
    id: 1,
    label: 'Introduction',
    title: <Cat className='h-5 w-5' />,
    content: (
      <div className='flex flex-col space-y-4'>
        <div className='flex flex-col space-y-1 text-zinc-700'>
          <div className='h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-400' />
          <span>Ibelick</span>
        </div>
        <button
          className='relative h-8 w-full scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]'
          type='button'
        >
          Edit Profile
        </button>
      </div>
    ),
  },
  {
    id: 2,
    label: 'Get-Started',
    title: <Rocket className='h-5 w-5' />,
    content: (
      <div className='flex flex-col space-y-4'>
        <div className='text-zinc-700'>You have 3 new messages.</div>
        <button
          className='relative h-8 w-full scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]'
          type='button'
        >
          View more
        </button>
      </div>
    ),
  },
  {
    id: 3,
    label: 'Layouts',
    title: <Layout className='h-5 w-5' />,
    content: (
      <div className='flex flex-col space-y-4'>
        <div className='text-zinc-700'>You have 3 new messages.</div>
        <div className='flex gap-14'>
          <ul>
            <li>Hero1</li>
            <li>Hero2</li>
            <li>Hero3</li>
            <li>Hero4</li>
            <li>Hero5</li>
            <li>Hero6</li>
            <li>Hero8</li>
          </ul>
          <ul>
            <li>Hero1</li>
            <li>Hero2</li>
            <li>Hero3</li>
            <li>Hero4</li>
            <li>Hero5</li>
            <li>Hero6</li>
            <li>Hero8</li>
          </ul>
          <ul>
            <li>Hero1</li>
            <li>Hero2</li>
            <li>Hero3</li>
            <li>Hero4</li>
            <li>Hero5</li>
            <li>Hero6</li>
            <li>Hero8</li>
          </ul>
        </div>
        <button
          className='relative h-8 w-full scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]'
          type='button'
        >
          View more
        </button>
      </div>
    ),
  },
  {
    id: 4,
    label: 'Template',
    title: <LayoutTemplate className='h-5 w-5' />,
    content: (
      <div className='flex flex-col space-y-4'>
        <div className='flex flex-col text-zinc-700'>
          <div className='space-y-1'>
            <div>Project_Proposal.pdf</div>
            <div>Meeting_Notes.docx</div>
            <div>Financial_Report.xls</div>
          </div>
        </div>
        <button
          className='relative h-8 w-full scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98]'
          type='button'
        >
          Manage documents
        </button>
      </div>
    ),
  },
];

export default function ToolbarExpandable() {
  const [active, setActive] = useState<number | null>(null);
  const [contentRef, { height: heightContent }] = useMeasure();
  const [menuRef, { width: widthContainer }] = useMeasure();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState(0);

  useClickOutside(ref, () => {
    setIsOpen(false);
    setActive(null);
  });

  useEffect(() => {
    if (!widthContainer || maxWidth > 0) return;

    setMaxWidth(widthContainer);
  }, [widthContainer, maxWidth]);

  return (
    <>
      <MotionConfig transition={transition}>
        <div
          className=' fixed bottom-4 left-[50%] translate-x-[-50%] w-fit '
          ref={ref}
        >
          <div className='h-full w-full   '>
            <div className='overflow-hidden '>
              <AnimatePresence initial={false} mode='sync'>
                {isOpen ? (
                  <motion.div
                    key='content'
                    initial={{ height: 0 }}
                    animate={{ height: heightContent || 0 }}
                    exit={{ height: 0 }}
                    style={{
                      width: maxWidth,
                    }}
                    className='bg-background/10 backdrop-blur-lg border rounded-lg'
                  >
                    <div ref={contentRef} className='p-2'>
                      {ITEMS.map((item) => {
                        const isSelected = active === item.id;

                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isSelected ? 1 : 0 }}
                            exit={{ opacity: 0 }}
                          >
                            <div
                              className={cn(
                                'px-2 pt-2 text-sm',
                                isSelected ? 'block' : 'hidden'
                              )}
                            >
                              {item.content}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
            <div
              className='flex space-x-2 p-2 mt-2 bg-background/10 backdrop-blur-lg border rounded-lg'
              ref={menuRef}
            >
              {ITEMS.map((item) => (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        key={item.id}
                        aria-label={item.label}
                        onClick={() => {
                          if (!isOpen) setIsOpen(true);
                          if (active === item.id) {
                            setIsOpen(false);
                            setActive(null);
                            return;
                          }

                          setActive(item.id);
                        }}
                        className={cn(
                          'group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-primary border px-3 font-medium  text-black transition-all duration-200 hover:translate-x-[-3px] translate-x-[0px] hover:translate-y-[-3px] translate-y-[0px] hover:[box-shadow:5px_5px_rgb(28_39_56)] dark:hover:[box-shadow:5px_5px_rgb(229_231_235)]',
                          active === item.id
                            ? 'dark:bg-primary-foreground  text-foreground translate-y-[-3px] translate-x-[-3px] [box-shadow:5px_5px_rgb(28_39_56)] dark:[box-shadow:5px_5px_rgb(229_231_235)]'
                            : ' dark:bg-primary-foreground text-foreground'
                        )}
                      >
                        {item.title}
                      </TooltipTrigger>
                      <TooltipContent className='bg-background text-primary border p-2 rounded-md -translate-y-1'>
                        <p className='capitalized'>{item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ))}
            </div>
          </div>
        </div>
      </MotionConfig>
    </>
  );
}

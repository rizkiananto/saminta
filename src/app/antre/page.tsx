'use client';
import { Fira_Sans } from 'next/font/google'
import { useEffect, useState } from 'react';
import {cloneDeep} from 'lodash';
import {
  Button,
  RadioGroup, Radio
} from "@nextui-org/react";
import BottomNavigation from '../component/BottomNavigation';
import { ModalQueuePlayerAdd, ModalQueuePlayerCustom, ModalQueueSettings, ModalQueueRemove } from './modal';
import { createClient } from '@supabase/supabase-js';
import toast, { Toaster } from 'react-hot-toast';

const firasans = Fira_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

interface PlayerFix {
  id: string;
  game_nickname: string;
  game_id: string;
  match_requested: string;
  created_at: string;
  email: (string | null);
  is_away: boolean;
  is_online: boolean;
}

interface Queue {
  label: string;
  player: (PlayerFix | null)[];
}

interface pId { //player ID - grouping
  group: string;
  player: (PlayerFix)[];
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AntreanPage () {
  const [isLoadData, setIsLoadData] = useState<boolean>(true);
  const [playerList, setPlayerList] = useState<PlayerFix[]>([]);
  const [queueData, setQueueData] = useState<any[]>([]);
  const [queueMode, setQueueMode] = useState<string>('game-queue');
  const [maxConsequencePlay, setMaxConsequencePlay] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
  const [isModalSettingsOpen, setIsModalSettingsOpen] = useState<boolean>(false);

  const queueCustomPlayerBased = () => {
    const QUEUE_LIST: Queue[] = [];
    const PLAYER_GROUP: pId[] = [];
    const maxPlayerQueue = 4;

    playerList.forEach(player => {
      const testQue = PLAYER_GROUP.find(pg => {
        const count = pg.player.filter((existingPlayer:PlayerFix) => existingPlayer.game_id === player.game_id)
        if (count.length < maxConsequencePlay) return true;
        return false
      })
      if (testQue) {
        testQue.player.push(player)
      } else {
        PLAYER_GROUP.push({
          group: `group ${PLAYER_GROUP.length+1}`,
          player: [player]
        })
      }
    })

    PLAYER_GROUP.forEach(group => {

      group.player.forEach(player => {
        const currentQueue = QUEUE_LIST.find(queue => (
          queue.player.length < maxPlayerQueue &&
          !queue.player.some((existingPlayer) => existingPlayer && existingPlayer.game_id === player.game_id)
        ))
        if (currentQueue) {
          currentQueue.player.push(player)
        } else {
          QUEUE_LIST.push({
            label: `${QUEUE_LIST.length === 0 ? 'Siap Bermain' : `Antrian ${QUEUE_LIST.length + 1}`}`,
            player: [player],
          })
        }
      });

    })

    const fillQueue: Array<Queue[]> = fillQueueSlot(QUEUE_LIST);

    setIsLoadData(false);
    setQueueData(fillQueue);
  }

  const queuePlayerBased = () => {
    const QUEUE_LIST: Queue[] = [];
    const PLAYER_GROUP: pId[] = [];
    const maxPlayerQueue = 4;

    playerList.forEach(player => {
      const currentQueue = PLAYER_GROUP.find(pg => (
        !pg.player.some((existingPlayer:PlayerFix) => existingPlayer.game_id === player.game_id)
      ))

      if (currentQueue) {
        currentQueue.player.push(player)
      } else {
        PLAYER_GROUP.push({
          group: `group ${PLAYER_GROUP.length+1}`,
          player: [player]
        })
      }
    })

    PLAYER_GROUP.forEach(group => {
      group.player.forEach(player => {
        const currentQueue = QUEUE_LIST.find(queue => (
          queue.player.length < maxPlayerQueue &&
          !queue.player.some((existingPlayer) => existingPlayer && existingPlayer.game_id === player.game_id)
        ))

        if (currentQueue) {
          currentQueue.player.push(player)
        } else {
          QUEUE_LIST.push({
            label: `${QUEUE_LIST.length === 0 ? 'Siap Bermain' : `Antrian ${QUEUE_LIST.length + 1}`}`,
            player: [player],
          })
        }
      });

    })

    const fillQueue: Array<Queue[]> = fillQueueSlot(QUEUE_LIST);
    
    setIsLoadData(false);
    setQueueData(fillQueue);
  }

  const queueGameBased = () => {
    const QUEUE_LIST:any = [];

    const maxPlayersPerQueue = 4;
    let currentQueue = null;

    playerList.forEach(player => {
      const existingQueue = QUEUE_LIST.find((queue:any) => (
        queue.player.length < maxPlayersPerQueue &&
        !queue.player.some((existingPlayer:any) => existingPlayer.game_id === player.game_id)
      ));

      if (existingQueue) existingQueue.player.push(player) 
      else {
        currentQueue = { label: `${QUEUE_LIST.length === 0 ? 'Siap Bermain' : `Antrian ${QUEUE_LIST.length + 1}`}`, player: [player] };
        QUEUE_LIST.push(currentQueue);
      }
    });

    const fillQueue: Array<Queue[]> = fillQueueSlot(QUEUE_LIST);

    setIsLoadData(false);
    setQueueData(fillQueue);
  }

  const fillQueueSlot = (Queue: Queue[]) => {
    const newQueue: Array<Queue[]> = Queue.map((list:any) => {
      if (list.player.length < 4) {
        const new_p:any = cloneDeep(list.player);
        for (let i=0; i < 4 - list.player.length; i++) {
          new_p.push(null);
        }
        list.player = new_p;
      }
      return list;
    });
    return newQueue;
  }
  
  const destructureList = (listPlayer:PlayerFix[]) => {
    const list = cloneDeep(listPlayer);
    const deformPlayerList:PlayerFix[] = [];

    list.forEach((player) => {
      const match = parseInt(player.match_requested)
      if (match > 1) {
        for (let i = 0; i < match; i++) {
          deformPlayerList.push(player)
        }
      } else deformPlayerList.push(player)
    })

    // testing purpose
    // setPlayerList([]);
    // setIsLoadData(false);

    setPlayerList(deformPlayerList);
  }

  const getPlayerList = async () => {
    const {data: player_game}= await supabase.from('player_game').select().order('id');
  
    if (player_game) destructureList(player_game)
  }

  const postPlayer = async (params:any) => {
    const post = await supabase.from('player_game').insert(params)

    if (post.status === 201) {
      setIsModalAddOpen(false);
      toast.success('Pemain ditambahkan dalam Antrian!');
      getPlayerList();
    }
  }

  const updatePlayer = async () => {
    const activeQueue = queueData[0];
    for (const player of activeQueue.player ) {
      const isDeleteRecord: Boolean = player.match_requested - 1 === 0 ? true : false;
      try {
        const update = !isDeleteRecord ? await supabase
          .from('player_game')
          .update({ match_requested: player.match_requested - 1 })
          .eq('id', player.id) : await supabase.from('player_game').delete().eq('id', player.id) 

        if (update) {
          console.log('sukses', update)
          getPlayerList();
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    getPlayerList();
  }, [])

  useEffect(() => {
    if (playerList && playerList.length > 0) queueGameBased();
  }, [playerList])

  useEffect(() => {
    queueCustomPlayerBased();
  }, [maxConsequencePlay])

  const cnQueueMode = (value:string) => {
    if (value === 'game-queue' || value === 'player-queue') setIsLoadData(true)
    if (value === 'game-queue') queueGameBased();
    else if (value === 'player-queue') queuePlayerBased();
    else if (value === 'player-custom-queue') setModalQueue();
    setQueueMode(value);
  }

  const cancelModalQueue = () => {
    cnQueueMode('game-queue');
    setIsModalOpen(false)
  }

  const setModalQueue = () => {
    setIsModalOpen(!isModalOpen);
  }

  const onSubmitMaxQueue = (value:number) => {
    setIsLoadData(true);
    setMaxConsequencePlay(value)
    setModalQueue();
  }

  return (
    <>
      <Toaster />
      <div className="h-full relative pb-24 overflow-hidden ">
        <div className='flex flex-wrap flex-col items-start gap-x-3'>
          {!isLoadData ?
          <>
            <h1 className={`${firasans.className} text-white text-xl`}>Halo John. Ada {queueData.length} total antrian nih</h1>
            <p className={`${firasans.className} text-gray-400 text-sm`}>slot kosong di antrian 4 - estimasi 3 Jam</p>
          </>
          : null}
        </div>
        <div className='text-white mt-4'>
          {!isLoadData && queueData.length > 0 ? <ToggleQueueType value={queueMode} cnQueueMode={cnQueueMode}/> : null }
          {!isLoadData &&
          <div className='flex my-6'>
            <Button color='primary' onClick={() => {setIsModalAddOpen(true)}}>Tambah Pemain</Button>
            <a className='grow flex items-center justify-end gap-1 text-gray-400 hover:cursor-pointer' onClick={() => {setIsModalSettingsOpen(true)}}>
              pengaturan
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 19 20" fill="none">
                <path d="M18.6843 12.5422L17.2222 11.2921C17.2914 10.8679 17.3271 10.4349 17.3271 10.0018C17.3271 9.56874 17.2914 9.13568 17.2222 8.71154L18.6843 7.46146C18.7946 7.36704 18.8736 7.2413 18.9106 7.10094C18.9477 6.96058 18.9412 6.81225 18.8919 6.67569L18.8719 6.61765C18.4693 5.49263 17.8666 4.44972 17.0927 3.53931L17.0525 3.49243C16.9587 3.38205 16.8335 3.3027 16.6937 3.26484C16.5538 3.22698 16.4057 3.2324 16.269 3.28036L14.4541 3.9255C13.7844 3.37635 13.0366 2.94328 12.2285 2.63969L11.8781 0.742239C11.8516 0.599466 11.7824 0.468118 11.6795 0.365645C11.5766 0.263173 11.445 0.194426 11.3021 0.168538L11.2419 0.157377C10.0788 -0.052459 8.85553 -0.052459 7.6925 0.157377L7.63223 0.168538C7.48936 0.194426 7.35774 0.263173 7.25487 0.365645C7.152 0.468118 7.08274 0.599466 7.0563 0.742239L6.7036 2.64862C5.90195 2.95228 5.15542 3.38511 4.49362 3.92996L2.66537 3.28036C2.52868 3.23201 2.38051 3.22641 2.24055 3.26429C2.1006 3.30217 1.97548 3.38174 1.88183 3.49243L1.84165 3.53931C1.06871 4.45036 0.466055 5.4931 0.0625089 6.61765L0.0424181 6.67569C-0.0580353 6.95472 0.0245598 7.26725 0.250022 7.46146L1.73004 8.72494C1.66083 9.14461 1.62735 9.57321 1.62735 9.99958C1.62735 10.4282 1.66083 10.8568 1.73004 11.2742L0.250022 12.5377C0.139737 12.6321 0.0608044 12.7579 0.0237204 12.8982C-0.0133636 13.0386 -0.006842 13.1869 0.0424181 13.3235L0.0625089 13.3815C0.466555 14.5066 1.06481 15.5446 1.84165 16.4598L1.88183 16.5067C1.97571 16.6171 2.10083 16.6965 2.2407 16.7343C2.38057 16.7722 2.52863 16.7668 2.66537 16.7188L4.49362 16.0692C5.15885 16.6161 5.9022 17.0492 6.7036 17.3505L7.0563 19.2569C7.08274 19.3997 7.152 19.531 7.25487 19.6335C7.35774 19.736 7.48936 19.8047 7.63223 19.8306L7.6925 19.8418C8.86622 20.0527 10.0681 20.0527 11.2419 19.8418L11.3021 19.8306C11.445 19.8047 11.5766 19.736 11.6795 19.6335C11.7824 19.531 11.8516 19.3997 11.8781 19.2569L12.2285 17.3595C13.0363 17.0567 13.7883 16.6222 14.4541 16.0737L16.269 16.7188C16.4057 16.7671 16.5539 16.7727 16.6938 16.7349C16.8338 16.697 16.9589 16.6174 17.0525 16.5067L17.0927 16.4598C17.8695 15.5424 18.4678 14.5066 18.8719 13.3815L18.8919 13.3235C18.9924 13.0489 18.9098 12.7364 18.6843 12.5422ZM15.6373 8.97495C15.6931 9.31203 15.7221 9.65804 15.7221 10.004C15.7221 10.35 15.6931 10.6961 15.6373 11.0331L15.4899 11.9283L17.1574 13.3547C16.9047 13.9371 16.5856 14.4884 16.2065 14.9977L14.1349 14.2633L13.434 14.8392C12.9005 15.2767 12.3067 15.6205 11.6638 15.8616L10.8133 16.1808L10.4137 18.3461C9.78321 18.4176 9.14669 18.4176 8.51622 18.3461L8.11664 16.1763L7.27283 15.8527C6.63663 15.6116 6.04507 15.2678 5.51601 14.8325L4.81507 14.2543L2.7301 14.9955C2.35061 14.4843 2.03363 13.9329 1.77915 13.3525L3.46453 11.9127L3.31943 11.0197C3.26586 10.6871 3.23684 10.3434 3.23684 10.004C3.23684 9.6625 3.26362 9.32096 3.31943 8.98835L3.46453 8.09543L1.77915 6.6556C2.0314 6.07297 2.35061 5.52382 2.7301 5.01262L4.81507 5.75375L5.51601 5.17558C6.04507 4.74028 6.63663 4.39651 7.27283 4.15542L8.11887 3.8362L8.51845 1.66641C9.14573 1.59498 9.7864 1.59498 10.4159 1.66641L10.8155 3.83174L11.666 4.15096C12.3067 4.39205 12.9027 4.73582 13.4362 5.17335L14.1371 5.74928L16.2087 5.01486C16.5882 5.52605 16.9052 6.07743 17.1597 6.65783L15.4922 8.08427L15.6373 8.97495ZM9.46941 5.85197C7.29962 5.85197 5.54057 7.61102 5.54057 9.78081C5.54057 11.9506 7.29962 13.7097 9.46941 13.7097C11.6392 13.7097 13.3983 11.9506 13.3983 9.78081C13.3983 7.61102 11.6392 5.85197 9.46941 5.85197ZM11.2374 11.5488C11.0055 11.7813 10.7299 11.9658 10.4265 12.0914C10.1231 12.2171 9.79782 12.2815 9.46941 12.281C8.80196 12.281 8.17468 12.0198 7.70143 11.5488C7.46888 11.3169 7.28447 11.0413 7.15881 10.7379C7.03315 10.4345 6.96873 10.1092 6.96924 9.78081C6.96924 9.11336 7.23042 8.48608 7.70143 8.01283C8.17468 7.53959 8.80196 7.28064 9.46941 7.28064C10.1369 7.28064 10.7641 7.53959 11.2374 8.01283C11.4699 8.24472 11.6544 8.5203 11.78 8.82372C11.9057 9.12714 11.9701 9.4524 11.9696 9.78081C11.9696 10.4483 11.7084 11.0755 11.2374 11.5488Z"
                fill="white" />
              </svg>
            </a>
          </div>}
        </div>
        <div className='h-full pb-28 overflow-scroll no-scroll'>
          {isLoadData ? 
            <div className='flex flex-col items-center justify-center gap-2 h-full'>
              <p>Loading ... </p>
            </div> 
          : <>
          { queueData.length > 0 ? queueData.map((queue, i) => {
            return (
            <div key={i}>
              <QueueCard data={queue} active={i===0} updatePlayer={updatePlayer} isReadyToPlay={i===0 && queue.player.length !== 3} />
            </div>
            )
          }) : 
          <div className={`w-full p-5 flex flex-wrap gap-4 justify-center mb-12`}>
            <div className={`text-center auo grow align-center gap-2 p-2 rounded-md w-min bg-transparent border-dashed border-2 border-gray-400`}>
              <p className='text-center my-10'>Tidak ada Antrian</p>
            </div>
          </div> }
          </> }
        </div>
      </div>
      <ModalQueuePlayerCustom 
        isOpen={isModalOpen} 
        onOpenChange={setModalQueue} 
        onClose={cancelModalQueue} 
        onSubmit={onSubmitMaxQueue} />
      <ModalQueuePlayerAdd 
        isOpen={isModalAddOpen} 
        onOpenChange={() => {setIsModalAddOpen(!isModalAddOpen)}} 
        onClose={() => {setIsModalAddOpen(!isModalAddOpen)}} 
        onSubmit={postPlayer} />
      <ModalQueueSettings
        isOpen={isModalSettingsOpen} 
        onOpenChange={() => {setIsModalSettingsOpen(!isModalSettingsOpen)}} 
        onClose={() => {setIsModalSettingsOpen(!isModalSettingsOpen)}} 
        onSubmit={onSubmitMaxQueue} />
    </>
  )
};

const QueueCard = ({data, active, updatePlayer, isReadyToPlay}: any) => {
  const bgCard = active ? 'bg-gradient-to-r from-teal-700 via-teal-800 to-zinc-800 shadow-md shadow-zinc-500' : ''
  return (
    <>
      <p className={`text-center mb-1 ${active?'text-xl text-yellow-400 font-bold':''}`}>{data.label}</p>
      <div className={`w-full ${bgCard} rounded-lg w-full p-5 flex flex-wrap gap-4 justify-center mb-6`}>
        {data.player && data.player.map((q:any, j:any) => {
          return (
            <div key={j} className={`text-center auo align-center gap-2 p-2 rounded-md w-min ${q? active ? 'bg-slate-100' : 'bg-zinc-500' : 'bg-transparent border-dashed border-2 border-gray-400'}`}>
              {q?
              <div className={`flex gap-2 justify-center items-center pe-2`}>
                <div className='w-6'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={`${active?'red':'white'}`} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className={`grow ${active?'text-black':''} sm:max-w-3 sm:w-8`}>
                  <p className={`font-semibold sm:max-w-3 sm:truncate ...`}>{q.game_nickname}</p>
                  {active && <p className={`sm:max-w-3 sm:truncate ...`}>{q.game_id}</p>}
                </div>
                <div className='w-6'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={`${active?'black':'currentColor'}`} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                  </svg>
                </div>
              </div>
              :
              <div className='flex items-center h-full justify-center'>
                <p>Antrian Kosong</p>
              </div> }
            </div>
          )
        })}
        {isReadyToPlay?
          <Button color="success" className='bg-yellow-400 mt-4' onClick={() => {}}>
            <label className='text-black text-lg font-medium mx-5' onClick={() => updatePlayer()}>selesai</label>
          </Button> 
          : active && <p className='text-gray-200 mt-4'>Tidak dapat memulai game dengan 3 orang pemain</p>
        }
      </div>
    </>
  )
}

interface fnProps {
  value: string,
  cnQueueMode: (val:string) => any
}

function ToggleQueueType({value, cnQueueMode}: fnProps) {
  return (
    <RadioGroup
      label=""
      color="success"
      defaultValue="game-queue"
      value={value} 
      classNames={{
        wrapper: 'flex flex-row gap-4'
      }}
      onValueChange={(value:string) => cnQueueMode(value)}
      >
      <Radio classNames={{ label: 'text-white' }} value="game-queue">Game Based</Radio>
      <Radio classNames={{ label: 'text-white' }}  value="player-queue">Player Based</Radio>
      <Radio classNames={{ label: 'text-white' }}  value="player-custom-queue">Custom Player Based</Radio>
    </RadioGroup>
  );
}
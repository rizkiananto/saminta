'use client';
import { useState } from 'react';
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button,
  RadioGroup, Radio,
  Input,
  Card,
  Select,
  SelectItem,
} from "@nextui-org/react";

interface fnProps {
  value: string,
  cnQueueMode: (val:string) => any
}

interface playerList {
  id: string,
  game_id: string,
  game_nickname: string,
  email: string,
  create_date: string,
  edit_date: string,
}
interface modalProps {
  playerList?: playerList[],
  isOpen: boolean,
  onOpenChange: () => any,
  onClose: () => void,
  onSubmit: (val:any) => any,
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
      <Radio classNames={{ label: 'text-black' }} value="queue-type-normal">Normal</Radio>
      <Radio classNames={{ label: 'text-black' }}  value="queue-type-requeue">
        1x Match Antri
      </Radio>
    </RadioGroup>
  );
}

export function ModalQueueSettings({isOpen, onOpenChange, onClose, onSubmit}: modalProps) {
  const [queueType, setQueueType] = useState<string>('game-queue');

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" backdrop='blur' isDismissable={false} size='xl'>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Pengaturan Ekstra untuk Antrean</ModalHeader>
            <ModalBody>
              <Card className='py-4 px-6'>
                <p className='font-semibold mb-3'>Tipe Antrian</p>
                <ToggleQueueType value={queueType} cnQueueMode={(value:string) => setQueueType(value)} />
              </Card>
              <Card className='py-4 px-6'>
                <p className='font-semibold'>Daftar Status Online</p>
                <p className='text-sm text-gray-600 mb-3'>pemain online akan mendapat prioritas antrian</p>
                <p className='text-sm text-gray-700'>Coming Soon!</p>
              </Card>
              <Card className='py-4 px-6'>
                <p className='font-semibold'>Hibernasi</p>
                <p className='text-sm text-gray-600 mb-3'>pemain dalam daftar ini tidak akan masuk antrian</p>
              </Card>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Batal
              </Button>
              <Button color="primary" onPress={() => console.log(queueType)}>
                Terapkan
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export function ModalQueueAdjust({isOpen, onOpenChange, onClose, onSubmit}: modalProps) {

  return (
    <Modal isOpen={isOpen} placement="center" size="sm" onOpenChange={onOpenChange} isDismissable={false} >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Tukar Posisi Pemain</ModalHeader>
            <ModalBody>
              <Select 
                label="Pilih pemain yang akan ditukar" 
                className="max-w-xs" >
                  <SelectItem key={0} value={'0'}>
                    #Ready - Supermicro 
                  </SelectItem>
                  <SelectItem key={1} value={'0'}>
                    #Ready - Juju 
                  </SelectItem>
                  <SelectItem key={2} value={'0'}>
                    #Antrian 1 - Shanni  
                  </SelectItem>
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Batal
              </Button>
              <Button color="primary" onPress={() => {}}>
                Terapkan
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export function ModalQueuePlayerCustom({isOpen, onOpenChange, onClose, onSubmit}: modalProps) {
  const [maxQue, setMaxQue] = useState<string>('')
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Custom Player Based Queue</ModalHeader>
            <ModalBody>
              <p> 
                Masukkan batas maksimal jumlah antrian yang player bisa masuk secara berturut-turut. <br/><br/>setelah mencapai batas, player harus menunggu sampai semua player sudah bermain minimal 1 kali.
              </p>
              <Input
                  autoFocus
                  label="Jumlah Game"
                  placeholder="1"
                  variant="bordered"
                  value={maxQue}
                  onValueChange={(val:string) => setMaxQue(val)}
                />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Batal
              </Button>
              <Button color="primary" onPress={() => onSubmit(parseInt(maxQue))}>
                Terapkan
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export function ModalQueuePlayerAdd({playerList, isOpen, onOpenChange, onClose, onSubmit}: modalProps) {
  const [data, setData] = useState<any>(null)

  return (
    <Modal isOpen={isOpen} size='lg' backdrop='blur' placement='center' onOpenChange={onOpenChange} isDismissable={false}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Buat Antrian Baru</ModalHeader>
            <ModalBody>
              <div>
              <Button 
                color='success' 
                variant='flat'
                startContent={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="color-gray-400" viewBox="0 0 24 24" id="plus"><g fill="none" fillRule="evenodd" stroke="#17C964" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" transform="translate(2 2)"><line x1="10" x2="10" y1="6.327" y2="13.654"></line><line x1="13.667" x2="6.333" y1="9.99" y2="9.99"></line><path d="M14.6857143,0 L5.31428571,0 C2.04761905,0 0,2.31208373 0,5.58515699 L0,14.414843 C0,17.6879163 2.03809524,20 5.31428571,20 L14.6857143,20 C17.9619048,20 20,17.6879163 20,14.414843 L20,5.58515699 C20,2.31208373 17.9619048,0 14.6857143,0 Z"></path></g></svg>}
                onClick={() => {}}>Field Antrean</Button>
              </div>
              <div className='flex gap-2 w-full'>
                <div className='grow'>
                <Input
                    label="Nickname"
                    variant="bordered"
                    value={data?.game_nickname}
                    onValueChange={(val:string) => setData({...data, game_nickname: val})}
                    classNames={{inputWrapper: 'grow'}}
                  />
                </div>
                <div className='grow'>
                <Input
                    label="ID Game"
                    variant="bordered"
                    value={data?.game_id}
                    classNames={{inputWrapper: 'grow'}}
                    onValueChange={(val:string) => setData({...data, game_id: val})}
                  />
                </div>
                <div>
                <Input
                  label="Match"
                  variant="bordered"
                  defaultValue='1'
                  placeholder='1'
                  value={data?.match_requested}
                  classNames={{inputWrapper: 'w-20'}}
                  onValueChange={(val:string) => setData({...data, match_requested: val})} />
                </div>
                <div className='h-full self-start hover:cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="close" width={24} height={24}><path fill="#F94646" d="M40 3H24C12.4 3 3 12.4 3 24v16c0 11.6 9.4 21 21 21h16c11.6 0 21-9.4 21-21V24c0-11.6-9.4-21-21-21z"></path><path fill="#E2E2E2" d="M36.8 32 48 20.8c.6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4-1.3-1.3-3.5-1.3-4.8 0L32 27.2 20.8 16c-1.3-1.3-3.5-1.3-4.8 0-.6.6-1 1.5-1 2.4 0 .9.4 1.8 1 2.4L27.2 32 16 43.2c-.6.6-1 1.5-1 2.4s.4 1.8 1 2.4c.6.6 1.5 1 2.4 1 .9 0 1.8-.4 2.4-1L32 36.8 43.2 48c1.3 1.3 3.5 1.3 4.8 0 .6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4L36.8 32z"></path></svg>
                </div>
              </div>
              <Select
                size={'md'}
                label="Favorite Animal"
                placeholder="Select an animal"
                className="max-w-xs">
                {playerList ? playerList.map((animal) => (
                  <SelectItem key={animal.id} value={animal.game_nickname}>
                    {animal.game_nickname}
                  </SelectItem>
                )) : <SelectItem key={0}>--no payer--</SelectItem>}
              </Select>
            </ModalBody>
            <ModalFooter>
              <div className='mt-6'>
              <Button color="danger" variant="light" onPress={onClose}>
                Batal
              </Button>
              <Button color="primary" onPress={() => onSubmit(data)}>
                Simpan
              </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export function ModalQueueDone({isOpen, onOpenChange, onClose, onSubmit}: modalProps) {
  const [data, setData] = useState<any>(null)

  return (
    <Modal isOpen={isOpen} size='md' backdrop='blur' placement='center' onOpenChange={onOpenChange} isDismissable={false}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Konfirmasi Selesai</ModalHeader>
            <ModalBody>
              <p>Apakah antrean ini sudah selesai?</p>
            </ModalBody>
            <ModalFooter>
              <div className='mt-6'>
              <Button color="danger" variant="light" onPress={onClose}>
                Batal
              </Button>
              <Button color="primary" onPress={() => onSubmit(data)}>
                Selesai
              </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
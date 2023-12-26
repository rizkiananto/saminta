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
  Card
} from "@nextui-org/react";

interface fnProps {
  value: string,
  cnQueueMode: (val:string) => any
}
interface modalProps {
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
      <Radio classNames={{ label: 'text-white' }} value="game-queue">Game Based</Radio>
      <Radio classNames={{ label: 'text-white' }}  value="player-queue">Player Based</Radio>
      <Radio classNames={{ label: 'text-white' }}  value="player-custom-queue">Custom Player Based</Radio>
    </RadioGroup>
  );
}

export function ModalQueueSettings({isOpen, onOpenChange, onClose, onSubmit}: modalProps) {
  const [queueType, setQueueType] = useState<string>('game-queue');

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} size='xl'>
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
                <p className='font-semibold'>Rehat</p>
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

export function ModalQueueRemove({isOpen, onOpenChange, onClose, onSubmit}: modalProps) {
  const [queueType, setQueueType] = useState<string>('game-queue');

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} size='xl'>
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
                <p className='font-semibold'>Rehat</p>
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

export function ModalQueuePlayerAdd({isOpen, onOpenChange, onClose, onSubmit}: modalProps) {
  const [data, setData] = useState<any>(null)

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Custom Player Based Queue</ModalHeader>
            <ModalBody>
              <p>Tambah Pemain dalam Antrian</p>
              <Input
                  label="ID Game"
                  variant="bordered"
                  value={data?.game_id}
                  onValueChange={(val:string) => setData({...data, game_id: val})}
                />
              <Input
                  label="Nickname"
                  variant="bordered"
                  value={data?.game_nickname}
                  onValueChange={(val:string) => setData({...data, game_nickname: val})}

                />
              <Input
                  label="Jumlah Match"
                  variant="bordered"
                  value={data?.match_requested}
                  onValueChange={(val:string) => setData({...data, match_requested: val})}
                />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Batal
              </Button>
              <Button color="primary" onPress={() => onSubmit(data)}>
                Terapkan
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
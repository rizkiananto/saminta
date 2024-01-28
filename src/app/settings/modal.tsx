'use client';
import { useState } from 'react';
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button,
  Card,
} from "@nextui-org/react";

interface modalProps {
  isOpen: boolean,
  onOpenChange: () => any,
  onClose: () => void,
  onSubmit: (val:any) => any,
}

export function ModalConfirmLogout({isOpen, onOpenChange, onClose, onSubmit}: modalProps) {

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" backdrop='blur' isDismissable={false} size='sm'>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Konfirmasi Log Out</ModalHeader>
            <ModalBody>
              <p className=''>Anda yakin ingin Log out?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onPress={onClose}>
                Batalkan
              </Button>
              <Button color="primary" variant="light" onPress={onSubmit}>
                Ya
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
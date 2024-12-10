import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react'

interface ModalComponentProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  title?: string
  children?: React.ReactNode
  bgColor?: string
}

export const ModalComponent = ({
  isOpen,
  onOpenChange,
  title,
  children,
  bgColor,
}: ModalComponentProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className={`${bgColor}`}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

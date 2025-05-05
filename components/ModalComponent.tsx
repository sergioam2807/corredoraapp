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
  hasCancelButton?: boolean
}

export const ModalComponent = ({
  isOpen,
  onOpenChange,
  title,
  children,
  bgColor,
  hasCancelButton = true,
}: ModalComponentProps) => {
  return (
    <Modal
      hideCloseButton
      className={`${bgColor}`}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              {title}
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            {hasCancelButton && (
              <ModalFooter>
                <Button color="default" variant="bordered" onPress={onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

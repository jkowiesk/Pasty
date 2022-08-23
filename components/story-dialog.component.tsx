import { styled } from "styled-components";

import { Dialog } from "@headlessui/react";

type Props = {
  isOpen: any;
  setIsOpen: any;
};

export default function StoryDialog({ isOpen, setIsOpen }: Props) {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel>
        <Dialog.Title>Deactivate account</Dialog.Title>
        <Dialog.Description>
          This will permanently deactivate your account
        </Dialog.Description>

        <p>
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>

        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </Dialog.Panel>
    </Dialog>
  );
}

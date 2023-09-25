import { SignIn } from "@clerk/clerk-react";
import { Dialog } from "@headlessui/react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="mx-auto rounded bg-zinc-600 text-white p-4 min-w-[400px] max-w-full">
          <Dialog.Title className="font-medium mb-4 text-lg">
            Login to Save Your Plugin Code
          </Dialog.Title>
          <div className="mb-4">
            <SignIn />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-zinc-800 px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

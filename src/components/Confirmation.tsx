import { Dialog } from "@headlessui/react";
import astronautAlert from "../assets/astronaut-alert.svg";
interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmTitle?: string;
  confirmDesc?: string;
}

export default function Confirmation({
  open,
  onClose,
  onConfirm,
  confirmTitle,
  confirmDesc,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="mx-auto rounded bg-zinc-600 text-white min-w-[400px] max-w-full">
          {/* <Dialog.Title className="font-medium mb-4 text-lg">
            Are You Sure?
          </Dialog.Title> */}
          <div className="bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 p-4 rounded-t">
            <img src={astronautAlert} className="w-48 mx-auto" />
          </div>
          <div className="p-4 rounded-b">
            <Dialog.Title className="font-semibold text-center mb-1 text-lg">
              {confirmTitle ? confirmTitle : "Do you wish to proceed?"}
            </Dialog.Title>
            <div className="font-mediu, text-center mb-4">
              {confirmDesc ? confirmDesc : "Please confirm your action"}
            </div>
            <div className="flex gap-2 justify-end">
              <button
                className="px-4 py-2 bg-zinc-700 hover:bg-zinc-800 rounded-md"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-zinc-800 rounded-md hover:bg-zinc-900"
                onClick={onConfirm}
              >
                Yes
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

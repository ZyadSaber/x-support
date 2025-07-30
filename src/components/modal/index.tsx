import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
    handleClose?: () => void;
    title?: string;
    handleSave?: () => void
}

const Modal = ({
    isOpen,
    children,
    handleClose,
    title,
    handleSave
}: ModalProps) => {
    return (
        <Dialog open={isOpen}>
            <form>
                <DialogContent onClose={handleClose} className="w-[900px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    {children}
                    <DialogFooter>
                        <Button type="submit" onClick={handleSave}>Save</Button>
                        <DialogClose asChild>
                            <Button variant="outline" onClick={handleClose}>Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default Modal
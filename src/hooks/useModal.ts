import { useState } from 'react';

const useModal = (defaultOpen?: boolean) => {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen ?? false);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return { isOpen, open, close, setIsOpen };
};

export default useModal;

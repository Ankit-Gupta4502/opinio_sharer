
import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import {
    FacebookShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    LinkedinIcon,
    WhatsappIcon,
    TwitterIcon,
    TwitterShareButton,
} from "react-share";
import { AiOutlinePaperClip } from "react-icons/ai"
import { toast } from "react-toastify"

const SocialSharer = ({ isOpen, setIsOpen, link = "" }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, link: string }) => {
    const toggle = () => setIsOpen(!isOpen);
    const handleCopy = () => {
        window.navigator.clipboard.writeText(link).then(() => toast.success("link copied successfully")).catch((err) => console.error(err)
        )
        setIsOpen(false)
    }
    return (
        <Modal isOpen={isOpen} toggle={toggle} centered >
            <ModalHeader toggle={toggle}>Share Question</ModalHeader>
            <ModalBody>
                <div className="d-flex align-items-center gap-2 justify-content-center">
                    <FacebookShareButton url={link}>
                        <FacebookIcon round size={24} />
                        <span className="text-base text-dark ms-2">Facebook</span>
                    </FacebookShareButton>

                    <LinkedinShareButton url={link}>
                        <LinkedinIcon round size={24} />
                        <span className="text-base text-dark ms-2">Linkedin</span>
                    </LinkedinShareButton>


                    <TwitterShareButton url={link}>
                        <TwitterIcon round size={24} />
                        <span className="text-base text-dark ms-2">Twitter</span>
                    </TwitterShareButton>

                    <WhatsappShareButton
                        url={link}
                    >
                        <WhatsappIcon round size={24} />
                        <span className="text-base text-dark ms-2">Whatsapp</span>
                    </WhatsappShareButton>
                    <div className='d-flex align-items-center' role='button' >

                        <AiOutlinePaperClip size={30} />
                        <span className='d-block text-base ' onClick={handleCopy} >Copy link</span>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default SocialSharer
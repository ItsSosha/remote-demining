"use client";
import Image from "next/image";
import { useToggle } from "usehooks-ts";

import Button from "@/components/Button/Button";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import Modal from "@/components/Modal/Modal";
import add_icon from "@/public/images/icons/buttons/add.svg";

import { AdminCardsData } from "../AdminCards";

import styles from "./AdminCardsList.module.css";

interface AdminCardsListProps {
  cardsData?: AdminCardsData[];
  handleEditCard: ({}:AdminCardsData) => void;
  onSave: () => void;
}

const AdminCardsList: React.FC<AdminCardsListProps> = ({
  onSave,
  cardsData,
  handleEditCard
}) => {
  const [confDelModal, toggleDelModal] = useToggle(false);
  const [successModal, toggleSuccessModal] = useToggle(false);
  const handleDeleteCard = (id: number) => {
    toggleDelModal();
  };
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {cardsData &&
          cardsData.map(({ id, img, title, text, img_description }) => (
            <li key={id} className={styles.card} onClick={() => {handleEditCard({id, img, title, text, img_description})}}>
              <Image src={img} className={styles.image} alt={img_description || title} />
              <div className={styles.body}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.text}>{text}</p>
              </div>
              <div
                className={styles.btn_container}
                onClick={() => handleDeleteCard(id)}
              >
                <Button isFullWidth outlined>
                  Видалити
                </Button>
              </div>
            </li>
          ))}
        <li className={styles.add_card}>
          <div
            className={styles.add_btn}
            onClick={() => {
              onSave();
            }}
          >
            <Image src={add_icon} width={50} height={51} alt={"add icon"} />
            <span>Додати</span>
          </div>
        </li>
        <li className={styles.last_card}></li>
      </ul>
      {confDelModal && (
        <Modal isModalOpen={confDelModal} toggleModal={() => toggleDelModal()}>
          <ConfirmationModal
            message="Ви дійсно бажаєте видалити картку?"
            approveChanges={() => {}}
            discardChanges={() => toggleDelModal()}
          />
        </Modal>
      )}
      {successModal && (
        <Modal
          isModalOpen={successModal}
          toggleModal={() => toggleSuccessModal()}
        >
          <ConfirmationModal message="Картку успішно додано" />
        </Modal>
      )}
    </div>
  );
};

export default AdminCardsList;

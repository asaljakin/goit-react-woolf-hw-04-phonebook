import { ContactItem } from 'components';
import styles from './ContactList.module.css';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul className={styles.ul}>
      <ContactItem contacts={contacts} deleteContact={deleteContact} />
    </ul>
  );
};

import styles from './ContactItem.module.css';

export const ContactItem = ({ contacts, deleteContact }) => {
  return (
    <>
      {contacts.map(({ id, name, number }) => {
        return (
          <li className={styles.item} key={id}>
            <p>{name + ' ' + number}</p>
            <button
              className={styles.btnItem}
              type="button"
              onClick={() => deleteContact(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </>
  );
};

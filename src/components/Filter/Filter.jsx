import styles from './Filter.module.css';

export const Filter = ({ filter, changeFilter }) => {
  return (
    <>
      <label className={styles.label}>Find contacts by name </label>
      <input
        type="text"
        name="filter"
        placeholder="Search name"
        title="Enter a name to search"
        value={filter}
        onChange={changeFilter}
      ></input>
    </>
  );
};

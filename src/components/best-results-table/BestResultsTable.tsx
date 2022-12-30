import React from "react";
import styles from "./BestResultsTable.module.scss";

interface BestResultsTableProps {
  children: React.ReactNode;
}

export const BestResultsTable = ({ children }: BestResultsTableProps) => {
  return (
    <table className={styles.table}>
      <thead className={styles.tableHeader}>
        <tr>
          <th className={styles.rankHeader}>Rank</th>
          <th className={styles.timeHeader}>Time</th>
          <th className={styles.playerHeader}>Player</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

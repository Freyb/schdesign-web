export const chunk = <T>(array: T[], groupSize: number) => {
  const groups = [];
  for (let i = 0; i < array.length; i += groupSize) {
    groups.push(array.slice(i, i + groupSize));
  }
  return groups;
};

export const sum = (array: number[]) =>
  array.reduce((accumulator, currentValue) => accumulator + currentValue);

export const zip = <T>(rows: T[][]) =>
  rows[0].map((_, i) => rows.map(row => row[i]));

export interface IAllergiesServiceFindByNames {
  allergies: string[];
}

export interface IAllergiesServiceBulkInsert {
  names: {
    name: string;
  }[];
}

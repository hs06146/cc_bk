export class UtilService {
  constructor() {
    this.createdAt = new Date();
  }
  getToday = () => {
    const year = this.createdAt.getFullYear();
    const month = this.createdAt.getMonth() + 1;
    const day = this.createdAt.getDate();
    const today = `${year}-${month}-${day}`;
    return today;
  };
}

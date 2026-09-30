export class StatusModel {
  statusId: number;
  statusName: string;
  isActive: boolean;

  constructor(statusId: number, statusName: string, isActive: boolean) {
    this.statusId = 0;
    this.statusName = '';
    this.isActive = false;
  }
}

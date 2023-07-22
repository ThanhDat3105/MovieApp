import moment from "moment";

export const formatDate = (date: any) => {
  return moment(new Date(date)).format("LL");
};

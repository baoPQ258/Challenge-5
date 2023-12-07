export type CardItem = {
  id : string;
  name: string;
  description: string;
  image?: string;
  like: number;
  comment : Comment[];
  quantity : number;
};
export type Comment = {
  name?: string;
  description?: string;
  date?: Date;
};

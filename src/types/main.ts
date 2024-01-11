export type DBMESSAGE = {
  id: any;
  title: string;
  sendersEmail: string;
  sendersName: string;
  receiversEmail: string;
  read: boolean;
  content: string;
  contentType: "plaintext" | "html";
  date: string;
};
export type DBMESSAGES = Array<DBMESSAGE>;

export type DashboardLayoutContextProps = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

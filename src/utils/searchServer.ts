interface Props {
  server: String;
  type: "searchById" | "searchByName" | "searchByUUID" | "searchByEID";
  key: string;
  admin: boolean;
}

export const searchServer = async ({ server, type, key, admin }: Props) => {

};

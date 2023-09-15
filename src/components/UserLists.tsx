import { SortBy, User } from "../types.d";

interface Props {
  changeSorting: (sort: SortBy) => void;
  users: User[];
  showColors: boolean;
  onDeleteUser: (email: string) => void;
}

export const UserLists = ({ changeSorting, onDeleteUser, showColors, users }: Props) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Foto</th>
          <th onClick={() => changeSorting(SortBy.NAME)}>Nombre</th>
          <th onClick={() => changeSorting(SortBy.LAST)}>Apellido</th>
          <th onClick={() => changeSorting(SortBy.COUNTRY)}>Pais</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555' 
          const color = showColors ? backgroundColor : 'transparent'

          return (
            <tr key={index} className="text-center" style={{ backgroundColor: color }}>
              <td className="flex justify-center">
                <img src={user?.picture.thumbnail} alt="" />
              </td>
              <td>{user?.name.first}</td>
              <td>{user?.name.last}</td>
              <td>{user?.location.country}</td>
              <td>
                <button onClick={() => onDeleteUser(user?.email)} className="w-full p-3 bg-red-600 rounded-lg hover:bg-red-950 transition-colors">
                  Borrar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
